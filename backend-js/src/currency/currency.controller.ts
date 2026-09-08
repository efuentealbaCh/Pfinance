import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrencyService } from './currency.service';
import {
  CURRENCY_DECIMALS,
  Currency,
  SUPPORTED_CURRENCIES,
  isSupportedCurrency,
} from '../common/currency.util';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  /**
   * Monedas que la app soporta, con sus decimales, para que el frontend arme el selector de
   * moneda de una cuenta sin tener la lista hardcodeada.
   */
  @Get('currencies')
  listCurrencies() {
    return {
      currencies: SUPPORTED_CURRENCIES.map(code => ({
        code,
        decimals: CURRENCY_DECIMALS[code],
      })),
    };
  }

  /**
   * Última cotización conocida de un par, para mostrar en la interfaz con qué valor se están
   * convirtiendo los totales y de qué fecha es.
   *
   * @param from moneda base (default `USD`)
   * @param to moneda de cotización (default `CLP`)
   * @throws BadRequestException si alguna de las monedas no está soportada
   */
  @Get('exchange-rates/latest')
  async latestRate(@Query('from') from = 'USD', @Query('to') to = 'CLP') {
    if (!isSupportedCurrency(from) || !isSupportedCurrency(to)) {
      throw new BadRequestException(
        `Moneda no soportada. Las disponibles son: ${SUPPORTED_CURRENCIES.join(', ')}.`,
      );
    }

    const resolved = await this.currencyService.getLatestRate(from as Currency, to as Currency);
    if (!resolved) {
      return { from, to, rate: null, date: null };
    }

    return { from, to, rate: resolved.rate, date: resolved.date };
  }
}
