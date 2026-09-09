/**
 * platform.ts — Detección del dispositivo y del modo en que se está ejecutando la app.
 *
 * Existe por una razón concreta: en iOS las notificaciones push solo funcionan si la PWA está
 * instalada en la pantalla de inicio (Safari 16.4+). En el navegador, la API de push
 * directamente no existe. Sin distinguir el caso, la pantalla de notificaciones le diría a un
 * usuario de iPhone "tu navegador no soporta notificaciones", que es falso y no le dice qué
 * hacer.
 *
 * Todo se resuelve leyendo el user agent, que es falsificable. No importa: acá no se protege
 * nada, solo se decide qué instrucción mostrar. En el peor caso alguien ve el instructivo
 * equivocado.
 */

/** `true` si la app corre en un iPhone, iPad o iPod. */
export function isIOS(): boolean {
    if (typeof navigator === 'undefined') return false;

    const isIPadOS = /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || isIPadOS;
}

/** `true` si la app corre en Android. */
export function isAndroid(): boolean {
    if (typeof navigator === 'undefined') return false;
    return /Android/.test(navigator.userAgent);
}

/** `true` en teléfonos y tablets. Es lo que decide si vale la pena ofrecer la instalación. */
export function isMobile(): boolean {
    return isIOS() || isAndroid();
}

/**
 * `true` si la app se abrió desde la pantalla de inicio y no desde una pestaña del navegador.
 *
 * Se consultan las dos formas porque no hay una sola: los navegadores basados en Chromium
 * exponen el modo de visualización por CSS, y Safari en iOS usa una propiedad propia que
 * nunca estandarizó.
 */
export function isStandalone(): boolean {
    if (typeof window === 'undefined') return false;

    const byDisplayMode = window.matchMedia?.('(display-mode: standalone)').matches ?? false;
    const bySafari = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    return byDisplayMode || bySafari;
}

/**
 * `true` si el navegador expone las APIs necesarias para Web Push.
 *
 * En iOS dentro del navegador esto da `false` aunque el equipo sea compatible: la API aparece
 * recién cuando la PWA se abre instalada. Por eso quien consume esto tiene que combinarlo con
 * `isIOS()` antes de concluir que el dispositivo no sirve.
 */
export function supportsWebPush(): boolean {
    if (typeof window === 'undefined') return false;
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

/**
 * `true` si el origen es seguro (HTTPS o localhost).
 *
 * Fuera de un contexto seguro el navegador no registra el service worker, así que push no
 * puede funcionar. Es el caso típico de probar la app desde el teléfono apuntando a la IP de
 * la red local por HTTP: todo se ve bien y nada se suscribe.
 */
export function isSecureOrigin(): boolean {
    if (typeof window === 'undefined') return false;
    return window.isSecureContext;
}
