import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Group, List, Stack, Text } from '@mantine/core';
import { notifications as toast } from '@mantine/notifications';
import {
    IconAlertCircle,
    IconBell,
    IconBellOff,
    IconDeviceMobile,
    IconLock,
} from '@tabler/icons-react';
import { apiErrorMessage, getVapidPublicKey, usePushSubscribe, usePushUnsubscribe } from '../api/queries';
import { isIOS, isSecureOrigin, isStandalone, supportsWebPush } from '../utils/platform';
import { createSubscription, getExistingSubscription, notificationPermission, removeSubscription } from '../utils/push';

/**
 * Situación en la que está este dispositivo respecto de las notificaciones. Cada una se
 * resuelve distinto, y mostrar el mensaje equivocado deja al usuario sin saber qué hacer.
 */
type PushState =
    /** Todavía se está averiguando si hay una suscripción activa. */
    | 'checking'
    /** iOS en el navegador: la API no existe hasta instalar la app. */
    | 'ios-needs-install'
    /** Origen sin HTTPS: el navegador no registra el service worker. */
    | 'insecure-origin'
    /** El navegador no soporta Web Push. */
    | 'unsupported'
    /** El usuario rechazó el permiso; desde la app no se puede volver a pedir. */
    | 'denied'
    /** Se puede activar. */
    | 'off'
    /** Activadas en este dispositivo. */
    | 'on';

/**
 * Control de las notificaciones push del dispositivo actual.
 *
 * Hasta ahora la app se suscribía sola al cargar el layout y se tragaba cualquier error en la
 * consola: no había forma de saber si habían quedado activas, ni de apagarlas. Esta tarjeta
 * hace explícitas las dos cosas.
 *
 * El permiso se pide únicamente desde el botón. Los navegadores penalizan —y en varios casos
 * bloquean— los pedidos que no salen de una acción deliberada del usuario, y un rechazo no se
 * puede deshacer desde la app: hay que ir a la configuración del sitio en el navegador.
 */
export default function NotificationsCard() {
    const [state, setState] = useState<PushState>('checking');
    const [working, setWorking] = useState(false);
    const subscribeMutation = usePushSubscribe();
    const unsubscribeMutation = usePushUnsubscribe();

    useEffect(() => {
        let cancelled = false;

        const resolveState = async () => {
            if (isIOS() && !isStandalone()) {
                setState('ios-needs-install');
                return;
            }
            if (!isSecureOrigin()) {
                setState('insecure-origin');
                return;
            }
            if (!supportsWebPush()) {
                setState('unsupported');
                return;
            }
            if (notificationPermission() === 'denied') {
                setState('denied');
                return;
            }

            const subscription = await getExistingSubscription();
            if (!cancelled) setState(subscription ? 'on' : 'off');
        };

        void resolveState();
        return () => {
            cancelled = true;
        };
    }, []);

    const enable = async () => {
        setWorking(true);
        try {
            const vapidKey = await getVapidPublicKey();
            const subscription = await createSubscription(vapidKey);

            await subscribeMutation.mutateAsync(subscription.toJSON());
            setState('on');
            toast.show({
                title: 'Notificaciones activadas',
                message: 'Vas a recibir avisos de cuotas por vencer y de deudas compartidas.',
                color: 'teal',
            });
        } catch (error) {
            if (notificationPermission() === 'denied') {
                setState('denied');
            }
            toast.show({
                title: 'No se pudieron activar',
                message: apiErrorMessage(error, (error as Error).message || 'Intentá de nuevo.'),
                color: 'red',
            });
        } finally {
            setWorking(false);
        }
    };

    const disable = async () => {
        setWorking(true);
        try {
            const endpoint = await removeSubscription();
            if (endpoint) await unsubscribeMutation.mutateAsync(endpoint);

            setState('off');
            toast.show({
                title: 'Notificaciones desactivadas',
                message: 'Este dispositivo deja de recibir avisos.',
                color: 'orange',
            });
        } catch (error) {
            toast.show({
                title: 'No se pudieron desactivar',
                message: apiErrorMessage(error, 'Intentá de nuevo.'),
                color: 'red',
            });
        } finally {
            setWorking(false);
        }
    };

    return (
        <Stack>
            <Group justify="space-between">
                <Text fw={600} size="lg" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <IconBell size={18} /> Notificaciones en este dispositivo
                </Text>
                <Badge color={state === 'on' ? 'teal' : 'gray'} variant="light">
                    {state === 'on' ? 'Activas' : state === 'checking' ? '—' : 'Inactivas'}
                </Badge>
            </Group>

            {state === 'ios-needs-install' && (
                <Alert color="blue" variant="light" radius="md" icon={<IconDeviceMobile size={18} />}>
                    <Stack gap="xs">
                        <Text size="sm">
                            En iPhone y iPad las notificaciones solo funcionan con Pfinance instalada en la
                            pantalla de inicio. Desde Safari:
                        </Text>
                        <List type="ordered" size="sm" spacing={2}>
                            <List.Item>Tocá Compartir, el cuadrado con la flecha hacia arriba.</List.Item>
                            <List.Item>Elegí «Agregar a inicio» y confirmá.</List.Item>
                            <List.Item>Abrí la app desde el ícono nuevo y volvé a esta pantalla.</List.Item>
                        </List>
                    </Stack>
                </Alert>
            )}

            {state === 'insecure-origin' && (
                <Alert color="orange" variant="light" radius="md" icon={<IconLock size={18} />}>
                    Esta página no se está sirviendo por HTTPS, así que el navegador no permite registrar
                    notificaciones. Pasa al abrir la app por la IP de la red local; funciona en{' '}
                    <code>localhost</code> y en el sitio publicado.
                </Alert>
            )}

            {state === 'unsupported' && (
                <Alert color="gray" variant="light" radius="md" icon={<IconAlertCircle size={18} />}>
                    Este navegador no soporta notificaciones push.
                </Alert>
            )}

            {state === 'denied' && (
                <Alert color="red" variant="light" radius="md" icon={<IconBellOff size={18} />}>
                    Bloqueaste las notificaciones para este sitio. La app no puede volver a preguntarte:
                    hay que habilitarlas desde la configuración del sitio en tu navegador y recargar.
                </Alert>
            )}

            {(state === 'on' || state === 'off') && (
                <>
                    <Text size="sm" c="dimmed">
                        Avisos de cuotas recurrentes por vencer y de movimientos en tus deudas compartidas.
                        La configuración es por dispositivo: activarlas acá no las activa en tu teléfono.
                    </Text>
                    <Group>
                        {state === 'on' ? (
                            <Button
                                color="red"
                                variant="light"
                                radius="md"
                                leftSection={<IconBellOff size={16} />}
                                onClick={disable}
                                loading={working}
                            >
                                Desactivar
                            </Button>
                        ) : (
                            <Button
                                color="teal"
                                radius="md"
                                leftSection={<IconBell size={16} />}
                                onClick={enable}
                                loading={working}
                            >
                                Activar notificaciones
                            </Button>
                        )}
                    </Group>
                </>
            )}
        </Stack>
    );
}
