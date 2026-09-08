import { Injectable, Logger, OnModuleInit, ServiceUnavailableException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { Currency, normalizeCurrency, roundToCurrency, toDateKey } from '../common/currency.util';

/**
 * Endpoint público del dólar observado del Banco Central. No requiere API key.
 * Sin año devuelve los últimos ~30 valores; con `/YYYY` devuelve la serie completa de ese año.
 */
const MINDICADOR_URL = 'https://mindicador.cl/api/dolar';

/** Par que publica mindicador: cuántos pesos vale un dólar. */
const MINDICADOR_BASE: Currency = 'USD';
const MINDICADOR_QUOTE: Currency = 'CLP';

/** Identificador que queda en `exchange_rates.source` para las filas traídas por el cron. */
const MINDICADOR_SOURCE = 'mindicador';

/**
 * Años hacia atrás que se cargan la primera vez que la tabla está vacía.
 *
 * Con el año en curso y el anterior alcanza para cualquier transacción razonable de la app, y
 * evita bajar décadas de serie histórica en el arranque.
 */
const BACKFILL_YEARS = 2;

/** Cada cuántos días sin cotización nueva se considera que los datos quedaron viejos. */
const STALE_AFTER_DAYS = 3;

/**
 * Mínimo entre dos intentos de recuperación automática. Evita que, con la API caída, cada
 * request del dashboard dispare su propio fetch fallido.
 */
const CATCH_UP_COOLDOWN_MS = 60 * 60 * 1000;

/** Timeout de la llamada a mindicador. Ninguna lectura del dashboard debe quedarse colgada. */
const FETCH_TIMEOUT_MS = 10_000;

/**
 * Día hábil a las 10:00 (hora del servidor). El dólar observado del día se publica temprano en
 * la mañana, y de lunes a viernes porque no hay cotización para sábados, domingos ni feriados.
 */
const RATES_CRON = '0 10 * * 1-5';

/** Una cotización resuelta, con la fecha real de la que salió. */
export interface ResolvedRate {
  /** Cuántas unidades de la moneda destino vale una de la moneda origen. */
  rate: number;
  /** Fecha de la cotización efectivamente usada, que puede no ser la pedida (fin de semana). */
  date: string;
}

@Injectable()
export class CurrencyService implements OnModuleInit {
  private readonly logger = new Logger(CurrencyService.name);

  /**
   * Caché en memoria de cotizaciones ya resueltas, con clave `origen:destino:fecha`.
   *
   * Es seguro cachear porque las filas de `exchange_rates` son inmutables: una fecha ya cargada
   * nunca se pisa. Se limpia al escribir filas nuevas, porque una carga posterior puede aportar
   * la fecha exacta de una cotización que antes se había resuelto por aproximación.
   */
  private readonly rateCache = new Map<string, ResolvedRate>();

  /** Momento del último intento de recuperación automática, para respetar el cooldown. */
  private lastCatchUpAttempt = 0;

  constructor(private prisma: PrismaService) {}

  /**
   * Carga inicial de cotizaciones al levantar la app.
   *
   * No se espera el resultado a propósito: si mindicador está caído o lento, la API igual tiene
   * que levantar. Todo lo que no depende de conversión sigue funcionando, y las lecturas que sí
   * dependen fallan con un mensaje claro en vez de quedar bloqueadas en el arranque.
   */
  onModuleInit() {
    void this.ensureRatesAvailable().catch(error => {
      this.logger.error(`No se pudieron cargar las cotizaciones iniciales: ${(error as Error).message}`);
    });
  }

  /**
   * Trae la cotización del día y la guarda si todavía no existe.
   *
   * Corre de lunes a viernes, pero en el plan gratuito de Render el servicio se duerme y el cron
   * puede no dispararse nunca. Por eso `getRate` también verifica que los datos no estén viejos
   * y dispara esta misma recuperación bajo demanda.
   */
  @Cron(RATES_CRON)
  async refreshDailyRates(): Promise<void> {
    try {
      const inserted = await this.fetchAndStore();
      this.logger.log(`Cotizaciones actualizadas desde mindicador: ${inserted} fecha(s) nueva(s).`);
    } catch (error) {
      this.logger.error(`Falló la actualización diaria de cotizaciones: ${(error as Error).message}`);
    }
  }

  /**
   * Resuelve la cotización entre dos monedas para una fecha dada.
   *
   * Cuando la fecha pedida no tiene cotización (fin de semana, feriado, o el día de hoy antes de
   * que se publique), se usa la última anterior disponible — que es exactamente el criterio con
   * el que opera un banco. Si la fecha es más vieja que toda la serie cargada, se usa la más
   * antigua que haya, porque devolver un total incompleto sería peor que una aproximación
   * explícita.
   *
   * @param from moneda de origen del monto
   * @param to moneda de destino
   * @param date fecha del movimiento a convertir
   * @returns la cotización y la fecha de la que efectivamente salió
   * @throws ServiceUnavailableException si no hay ninguna cotización cargada para el par
   */
  async getRate(from: Currency, to: Currency, date: Date): Promise<ResolvedRate> {
    const dateKey = toDateKey(date);

    if (from === to) return { rate: 1, date: dateKey };

    const cacheKey = `${from}:${to}:${dateKey}`;
    const cached = this.rateCache.get(cacheKey);
    if (cached) return cached;

    // La serie se guarda en un solo sentido (USD -> CLP); el sentido inverso se deriva
    // invirtiendo el valor, para no tener dos filas que puedan quedar desincronizadas.
    const inverted = from === MINDICADOR_QUOTE && to === MINDICADOR_BASE;
    const baseCurrency = inverted ? to : from;
    const quoteCurrency = inverted ? from : to;

    await this.ensureRatesFresh();

    const row = await this.findNearestRate(baseCurrency, quoteCurrency, date);
    if (!row) {
      throw new ServiceUnavailableException(
        `No hay cotización disponible para ${baseCurrency}/${quoteCurrency}. ` +
          'No se pueden calcular totales con cuentas en más de una moneda hasta que se cargue una.',
      );
    }

    const stored = Number(row.rate);
    const resolved: ResolvedRate = {
      rate: inverted ? 1 / stored : stored,
      date: toDateKey(row.date),
    };

    this.rateCache.set(cacheKey, resolved);
    return resolved;
  }

  /**
   * Convierte un monto entre monedas usando la cotización de una fecha.
   *
   * @param amount monto en la moneda de origen
   * @param from moneda de origen
   * @param to moneda de destino
   * @param date fecha del movimiento
   * @returns el monto convertido, redondeado a los decimales de la moneda de destino
   */
  async convert(amount: number, from: Currency, to: Currency, date: Date): Promise<number> {
    if (from === to) return roundToCurrency(amount, to);

    const { rate } = await this.getRate(from, to, date);
    return roundToCurrency(amount * rate, to);
  }

  /**
   * Moneda en la que se le muestran los totales agregados a un usuario.
   *
   * @param userId usuario dueño de los totales
   * @returns su moneda base, o la moneda por defecto si el usuario no existe
   */
  async getUserBaseCurrency(userId: string): Promise<Currency> {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { base_currency: true },
    });
    return normalizeCurrency(user?.base_currency);
  }

  /**
   * Última cotización cargada de un par, para mostrarla en la interfaz.
   *
   * @param from moneda base
   * @param to moneda de cotización
   * @returns la cotización más reciente, o `null` si no hay ninguna
   */
  async getLatestRate(from: Currency, to: Currency): Promise<ResolvedRate | null> {
    if (from === to) return { rate: 1, date: toDateKey(new Date()) };

    const inverted = from === MINDICADOR_QUOTE && to === MINDICADOR_BASE;
    const row = await this.prisma.exchange_rates.findFirst({
      where: {
        base_currency: inverted ? to : from,
        quote_currency: inverted ? from : to,
      },
      orderBy: { date: 'desc' },
    });
    if (!row) return null;

    const stored = Number(row.rate);
    return { rate: inverted ? 1 / stored : stored, date: toDateKey(row.date) };
  }

  /**
   * Busca la cotización aplicable a una fecha: la última menor o igual, y si no existe, la más
   * antigua posterior.
   *
   * @param baseCurrency moneda base del par tal como está guardado
   * @param quoteCurrency moneda de cotización del par tal como está guardado
   * @param date fecha buscada
   * @returns la fila aplicable, o `null` si el par no tiene ninguna cotización cargada
   */
  private async findNearestRate(baseCurrency: Currency, quoteCurrency: Currency, date: Date) {
    const pair = { base_currency: baseCurrency, quote_currency: quoteCurrency };

    const previous = await this.prisma.exchange_rates.findFirst({
      where: { ...pair, date: { lte: date } },
      orderBy: { date: 'desc' },
    });
    if (previous) return previous;

    return this.prisma.exchange_rates.findFirst({
      where: { ...pair, date: { gt: date } },
      orderBy: { date: 'asc' },
    });
  }

  /**
   * Garantiza que exista al menos una cotización cargada, haciendo el backfill inicial si la
   * tabla está vacía.
   */
  private async ensureRatesAvailable(): Promise<void> {
    const existing = await this.prisma.exchange_rates.count();
    if (existing > 0) {
      await this.ensureRatesFresh();
      return;
    }

    const currentYear = new Date().getUTCFullYear();
    let total = 0;
    for (let offset = 0; offset < BACKFILL_YEARS; offset++) {
      total += await this.fetchAndStore(currentYear - offset);
    }
    this.logger.log(`Backfill inicial de cotizaciones completado: ${total} fecha(s) cargada(s).`);
  }

  /**
   * Dispara una actualización si la cotización más reciente quedó vieja.
   *
   * Es la contraparte del cron para el plan gratuito de Render, donde el servicio se duerme y
   * los jobs programados no corren: la primera lectura que necesite convertir se encarga de
   * ponerse al día. Nunca lanza — si la API falla, se sigue con lo último que haya en la base.
   */
  private async ensureRatesFresh(): Promise<void> {
    if (Date.now() - this.lastCatchUpAttempt < CATCH_UP_COOLDOWN_MS) return;

    const latest = await this.prisma.exchange_rates.findFirst({
      where: { base_currency: MINDICADOR_BASE, quote_currency: MINDICADOR_QUOTE },
      orderBy: { date: 'desc' },
      select: { date: true },
    });

    const staleThreshold = new Date(Date.now() - STALE_AFTER_DAYS * 24 * 60 * 60 * 1000);
    if (latest && latest.date >= staleThreshold) return;

    this.lastCatchUpAttempt = Date.now();
    try {
      const inserted = await this.fetchAndStore();
      if (inserted > 0) {
        this.logger.log(`Cotizaciones puestas al día bajo demanda: ${inserted} fecha(s) nueva(s).`);
      }
    } catch (error) {
      this.logger.warn(
        `No se pudieron actualizar las cotizaciones bajo demanda, se usarán las últimas guardadas: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Descarga la serie del dólar observado y guarda las fechas que falten.
   *
   * Usa `createMany` con `skipDuplicates`, así una fecha ya cargada nunca se pisa: los montos ya
   * convertidos en saldos y reportes tienen que seguir cuadrando con la cotización original.
   *
   * @param year año a descargar; si se omite, trae los últimos valores publicados
   * @returns cuántas fechas nuevas se insertaron
   */
  private async fetchAndStore(year?: number): Promise<number> {
    const series = await this.fetchSeries(year);
    if (series.length === 0) return 0;

    const result = await this.prisma.exchange_rates.createMany({
      data: series.map(entry => ({
        date: entry.date,
        base_currency: MINDICADOR_BASE,
        quote_currency: MINDICADOR_QUOTE,
        rate: entry.value,
        source: MINDICADOR_SOURCE,
      })),
      skipDuplicates: true,
    });

    if (result.count > 0) this.rateCache.clear();
    return result.count;
  }

  /**
   * Llama a mindicador.cl y normaliza la serie que devuelve.
   *
   * Las fechas vienen como `2026-09-07T03:00:00.000Z`: es medianoche de Chile expresada en UTC,
   * y como el país está en UTC-3/UTC-4 el día UTC siempre coincide con el día local. Por eso
   * alcanza con recortar la parte de fecha del ISO.
   *
   * @param year año a consultar; si se omite, la API devuelve los últimos valores
   * @returns la serie normalizada a fecha UTC y valor numérico
   * @throws Error si la API no responde, responde con error o devuelve algo que no es la serie
   */
  private async fetchSeries(year?: number): Promise<{ date: Date; value: number }[]> {
    const url = year ? `${MINDICADOR_URL}/${year}` : MINDICADOR_URL;

    const response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!response.ok) {
      throw new Error(`mindicador.cl respondió ${response.status} para ${url}`);
    }

    const payload = (await response.json()) as { serie?: { fecha?: string; valor?: number }[] };
    if (!Array.isArray(payload.serie)) {
      throw new Error(`mindicador.cl no devolvió una serie válida para ${url}`);
    }

    const series: { date: Date; value: number }[] = [];
    for (const entry of payload.serie) {
      if (!entry?.fecha || typeof entry.valor !== 'number' || !Number.isFinite(entry.valor) || entry.valor <= 0) {
        continue;
      }
      const parsed = new Date(entry.fecha);
      if (Number.isNaN(parsed.getTime())) continue;

      series.push({ date: new Date(`${toDateKey(parsed)}T00:00:00.000Z`), value: entry.valor });
    }

    return series;
  }
}
