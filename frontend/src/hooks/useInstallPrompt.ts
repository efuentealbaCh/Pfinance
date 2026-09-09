import { useEffect, useState } from 'react';
import { isIOS, isStandalone } from '../utils/platform';

/**
 * Evento propietario de Chromium que avisa que la app se puede instalar. No está en las
 * definiciones estándar del DOM porque no es parte de ninguna especificación aprobada.
 */
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * El evento llega una sola vez y muy temprano —normalmente antes de que React monte nada—, y
 * si no se lo captura en ese momento se pierde para siempre. Por eso el listener se registra al
 * cargar el módulo y guarda el evento acá, en vez de vivir dentro de un `useEffect`.
 *
 * `main.tsx` importa este módulo explícitamente para garantizar que eso pase temprano.
 */
let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();

function notify() {
    listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (event) => {
        // Sin esto el navegador muestra su propio cartel de instalación cuando quiere. Se lo
        // frena para ofrecerlo desde la app, en un momento en que se entiende para qué sirve.
        event.preventDefault();
        deferredPrompt = event as BeforeInstallPromptEvent;
        notify();
    });

    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        notify();
    });
}

/** Cómo se instala la app en este dispositivo. */
export type InstallMethod =
    /** Chromium ofreció el cartel nativo: alcanza con un botón. */
    | 'prompt'
    /** iOS no expone ninguna API: hay que explicarle al usuario los pasos a mano. */
    | 'ios-manual'
    /** Ya está instalada, o el navegador no permite instalarla. */
    | 'unavailable';

export interface InstallPromptState {
    method: InstallMethod;
    /** `true` si la app ya se está ejecutando instalada. */
    installed: boolean;
    /** Lanza el cartel nativo. Solo tiene efecto con `method === 'prompt'`. */
    promptInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
}

/**
 * Estado de instalación de la PWA.
 *
 * Distingue tres situaciones porque se resuelven distinto: en Chromium hay un cartel nativo que
 * se dispara con un botón; en iOS no existe ninguna API y lo único posible es mostrar los pasos
 * de "Compartir → Agregar a inicio"; y si ya está instalada no hay nada que ofrecer.
 */
export function useInstallPrompt(): InstallPromptState {
    const [hasPrompt, setHasPrompt] = useState(deferredPrompt !== null);
    const [installed, setInstalled] = useState(isStandalone());

    useEffect(() => {
        const listener = () => {
            setHasPrompt(deferredPrompt !== null);
            setInstalled(isStandalone());
        };

        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    }, []);

    let method: InstallMethod = 'unavailable';
    if (!installed) {
        if (hasPrompt) method = 'prompt';
        else if (isIOS()) method = 'ios-manual';
    }

    const promptInstall = async () => {
        if (!deferredPrompt) return 'unavailable' as const;

        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        // El evento se consume: no se puede volver a mostrar el mismo cartel. Si el usuario
        // dijo que no, el navegador decidirá si vuelve a ofrecerlo más adelante.
        deferredPrompt = null;
        notify();

        return outcome;
    };

    return { method, installed, promptInstall };
}
