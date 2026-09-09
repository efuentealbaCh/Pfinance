import { Badge, Center, Loader, ScrollArea, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';
import type { SecurityEventName } from '../api/queries';
import { useSecurityLog } from '../api/queries';

/** Nombre y color de cada evento. Las claves espejan los valores de `SECURITY_EVENTS` del backend. */
const EVENT_LABELS: Record<SecurityEventName, { label: string; color: string }> = {
    login: { label: 'Inicio de sesión', color: 'blue' },
    password_changed: { label: 'Cambio de contraseña', color: 'orange' },
    password_reset: { label: 'Contraseña restablecida', color: 'orange' },
    '2fa_enabled': { label: '2FA activado', color: 'teal' },
    '2fa_disabled': { label: '2FA desactivado', color: 'red' },
    profile_updated: { label: 'Perfil actualizado', color: 'gray' },
};

/**
 * Describe de forma corta el dispositivo detrás de un user agent.
 *
 * Es la misma aproximación que hace el backend para los correos de aviso, replicada acá porque
 * el historial devuelve el user agent crudo: mostrarlo entero ocuparía toda la fila y no dice
 * más que "Chrome en Windows".
 */
function describeUserAgent(userAgent: string | null): string {
    if (!userAgent) return 'Desconocido';

    const browsers: [string, string][] = [
        ['Edg/', 'Edge'],
        ['OPR/', 'Opera'],
        ['Firefox/', 'Firefox'],
        ['Chrome/', 'Chrome'],
        ['Safari/', 'Safari'],
    ];
    const systems: [string, string][] = [
        ['Windows', 'Windows'],
        ['Android', 'Android'],
        ['iPhone', 'iOS'],
        ['iPad', 'iPadOS'],
        ['Mac OS X', 'macOS'],
        ['Linux', 'Linux'],
    ];

    const browser = browsers.find(([token]) => userAgent.includes(token))?.[1];
    const system = systems.find(([token]) => userAgent.includes(token))?.[1];

    if (browser && system) return `${browser} en ${system}`;
    return browser ?? system ?? userAgent.slice(0, 40);
}

/**
 * Historial de eventos sensibles de la cuenta.
 *
 * Es la contraparte visible de los correos de aviso: si al usuario le llega un "detectamos un
 * inicio de sesión nuevo", acá puede revisar desde dónde y cuándo, sin depender de haber
 * guardado el correo.
 */
export default function SecurityLogTable() {
    const { data, isLoading, isError } = useSecurityLog();

    if (isLoading) {
        return (
            <Center py="lg">
                <Loader size="sm" color="teal" />
            </Center>
        );
    }

    if (isError) {
        return (
            <Text size="sm" c="dimmed">
                No se pudo cargar el historial de seguridad.
            </Text>
        );
    }

    const events = data?.events ?? [];

    if (events.length === 0) {
        return (
            <Text size="sm" c="dimmed">
                Todavía no hay eventos registrados en tu cuenta.
            </Text>
        );
    }

    return (
        <ScrollArea.Autosize mah={360} type="auto">
            <Table striped highlightOnHover stickyHeader verticalSpacing="xs" fz="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Evento</Table.Th>
                        <Table.Th>Fecha</Table.Th>
                        <Table.Th>Dispositivo</Table.Th>
                        <Table.Th>IP</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {events.map((event) => {
                        const meta = EVENT_LABELS[event.event] ?? { label: event.event, color: 'gray' };

                        return (
                            <Table.Tr key={event.id}>
                                <Table.Td>
                                    <Badge color={meta.color} variant="light" size="sm">
                                        {meta.label}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>{dayjs(event.created_at).format('DD/MM/YYYY HH:mm')}</Table.Td>
                                <Table.Td>{describeUserAgent(event.user_agent)}</Table.Td>
                                <Table.Td>
                                    <Text size="sm" c="dimmed">
                                        {event.ip ?? '—'}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        );
                    })}
                </Table.Tbody>
            </Table>
        </ScrollArea.Autosize>
    );
}
