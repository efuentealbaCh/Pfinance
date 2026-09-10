import { registerSW } from 'virtual:pwa-register';

/**
 * Tiempo mínimo entre comprobaciones de versión.
 *
 * La comprobación se dispara al volver a la app desde segundo plano, que en un teléfono puede
 * ocurrir muchas veces por minuto. Sin este piso, cambiar de app y volver golpearía el servidor
 * cada vez; con él, entre dos consultas siempre hay al menos media hora.
 */
const ESPERA_MINIMA_ENTRE_CONSULTAS_MS = 30 * 60 * 1000;

let aplicar: ((recargar?: boolean) => Promise<void>) | null = null;
let disponible = false;
let ultimaConsulta = Date.now();
const suscriptores = new Set<() => void>();

function avisar() {
    suscriptores.forEach((escuchar) => escuchar());
}

/**
 * Registra el service worker y avisa cuando hay una versión nueva esperando.
 *
 * El service worker nuevo queda en espera y no toma el control por su cuenta: recién se activa
 * cuando el usuario acepta, vía `aplicarVersionNueva`. Así una publicación no recarga la app en
 * medio de algo que la persona estaba haciendo.
 *
 * La comprobación ocurre al arrancar la app —que es cuando el navegador registra el service
 * worker— y al volver del segundo plano, con el piso de tiempo de arriba. No hay consulta
 * periódica: en una app que se abre varias veces al día no aporta nada y solo genera tráfico.
 */
export function iniciarControlDeVersion(): void {
    aplicar = registerSW({
        immediate: true,
        onNeedRefresh() {
            disponible = true;
            avisar();
        },
        onRegisteredSW(_swUrl, registration) {
            if (!registration) return;

            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState !== 'visible') return;
                if (Date.now() - ultimaConsulta < ESPERA_MINIMA_ENTRE_CONSULTAS_MS) return;

                ultimaConsulta = Date.now();
                void registration.update();
            });
        },
    });
}

/**
 * Se suscribe a la aparición de una versión nueva.
 *
 * @param escuchar se invoca cuando hay una versión lista para aplicar
 * @returns función para cancelar la suscripción
 */
export function alHaberVersionNueva(escuchar: () => void): () => void {
    suscriptores.add(escuchar);
    return () => suscriptores.delete(escuchar);
}

/** `true` si hay una versión descargada esperando que el usuario la acepte. */
export function hayVersionNueva(): boolean {
    return disponible;
}

/** Activa el service worker en espera y recarga la app con la versión nueva. */
export function aplicarVersionNueva(): void {
    void aplicar?.(true);
}
