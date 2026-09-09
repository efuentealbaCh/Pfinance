/**
 * push.ts — Utilidades de Web Push del lado del browser.
 *
 * Concentra el trato con el service worker y el `PushManager` para que las pantallas trabajen
 * con promesas normales y no con las APIs crudas, que tienen un par de trampas
 * (`serviceWorker.ready` que no resuelve nunca, claves en base64 URL-safe).
 */

/** Cuánto se espera al service worker antes de dar por perdido el registro. */
const SERVICE_WORKER_TIMEOUT_MS = 10_000;

/**
 * Convierte la clave pública VAPID de base64 URL-safe al `Uint8Array` que espera
 * `pushManager.subscribe`.
 *
 * El formato URL-safe reemplaza `+` y `/` por `-` y `_`, y se come el relleno final: hay que
 * deshacer las tres cosas antes de decodificar, o la suscripción falla con un error de clave
 * inválida que no dice nada sobre la causa real.
 *
 * @param base64String clave pública tal como la devuelve `GET /vapid-public-key`
 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

/**
 * Devuelve el registro del service worker, o `null` si no hay ninguno tras la espera.
 *
 * El límite de tiempo no es una precaución de más: `navigator.serviceWorker.ready` devuelve una
 * promesa que **nunca se rechaza**; si nadie registró un service worker se queda pendiente para
 * siempre. Sin el corte, cualquier botón que dependa de esto giraría indefinidamente sin error.
 */
export async function getServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (!('serviceWorker' in navigator)) return null;

    const timeout = new Promise<null>((resolve) => {
        window.setTimeout(() => resolve(null), SERVICE_WORKER_TIMEOUT_MS);
    });

    return Promise.race([navigator.serviceWorker.ready, timeout]);
}

/** Suscripción push actual de este browser, o `null` si todavía no hay ninguna. */
export async function getExistingSubscription(): Promise<PushSubscription | null> {
    const registration = await getServiceWorker();
    if (!registration) return null;

    return registration.pushManager.getSubscription();
}

/**
 * Crea la suscripción push de este browser.
 *
 * Si el permiso de notificaciones todavía está en `default`, esta llamada es la que dispara el
 * cartel del navegador — por eso solo debe invocarse desde un clic explícito del usuario y
 * nunca al montar una pantalla: los navegadores penalizan (y en varios casos bloquean) los
 * pedidos de permiso que no vienen de una acción deliberada.
 *
 * @param vapidPublicKey clave pública del servidor
 * @throws si no hay service worker registrado, o si el usuario rechaza el permiso
 */
export async function createSubscription(vapidPublicKey: string): Promise<PushSubscription> {
    const registration = await getServiceWorker();
    if (!registration) {
        throw new Error('No hay un service worker activo en esta página.');
    }

    return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
}

/**
 * Cancela la suscripción en el browser.
 *
 * Es solo la mitad de la baja: el servidor sigue teniendo la fila hasta que se le avise por
 * `POST /push-unsubscribe`. Quien llame a esto tiene que hacer las dos cosas, o el backend
 * seguirá intentando enviar a un endpoint muerto hasta que el servicio de push responda 410.
 *
 * @returns el endpoint dado de baja, o `null` si no había suscripción
 */
export async function removeSubscription(): Promise<string | null> {
    const subscription = await getExistingSubscription();
    if (!subscription) return null;

    const { endpoint } = subscription;
    await subscription.unsubscribe();
    return endpoint;
}

/** Estado del permiso de notificaciones, o `null` si el navegador no expone la API. */
export function notificationPermission(): NotificationPermission | null {
    if (typeof window === 'undefined' || !('Notification' in window)) return null;
    return Notification.permission;
}
