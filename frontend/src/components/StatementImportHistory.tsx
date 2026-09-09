import { useState } from 'react';
import { Badge, Button, Card, Center, Group, Loader, Modal, Paper, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowBackUp, IconHistory } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { apiErrorMessage, useStatementImports, useUndoStatementImport } from '../api/queries';

/** Una importación ya confirmada, tal como la devuelve `GET /statement-imports`. */
interface StatementImportRecord {
    id: string;
    filename: string;
    imported_count: number;
    duplicate_count: number;
    skipped_count: number;
    created_at: string;
    account: { id: string; identifier: string | null; bank: string | null };
}

/**
 * Historial de cartolas importadas, con la opción de revertir una.
 *
 * Es la red de seguridad de la importación: una confirmación crea decenas o cientos de
 * movimientos de una sola vez, y sin esta pantalla deshacer una equivocación significaba
 * borrarlos a mano uno por uno. El backend ya lo resolvía —cada movimiento guarda de qué
 * importación vino— pero no había desde dónde pedirlo.
 */
export default function StatementImportHistory() {
    const { data, isLoading } = useStatementImports();
    const undoMutation = useUndoStatementImport();

    const [pendingUndo, setPendingUndo] = useState<StatementImportRecord | null>(null);

    const imports: StatementImportRecord[] = data?.imports ?? [];

    const confirmUndo = () => {
        if (!pendingUndo) return;

        undoMutation.mutate(pendingUndo.id, {
            onSuccess: () => setPendingUndo(null),
            onError: (error) => {
                notifications.show({
                    title: 'No se pudo revertir',
                    message: apiErrorMessage(error, 'Intentá de nuevo.'),
                    color: 'red',
                });
            },
        });
    };

    if (isLoading) {
        return (
            <Center py="lg">
                <Loader size="sm" color="teal" />
            </Center>
        );
    }

    if (imports.length === 0) return null;

    return (
        <>
            <Paper withBorder radius="lg" p="lg" mt="xl">
                <Text fw={600} size="lg" mb="xs" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <IconHistory size={18} /> Importaciones anteriores
                </Text>
                <Text size="sm" c="dimmed" mb="md">
                    Si una cartola entró con la cuenta equivocada o el mapeo mal, revertila acá en vez de
                    borrar los movimientos uno por uno.
                </Text>

                <Stack gap="sm">
                    {imports.map((record) => (
                        <Card key={record.id} withBorder radius="md" padding="sm">
                            <Group justify="space-between" wrap="nowrap" align="flex-start">
                                <div style={{ minWidth: 0 }}>
                                    <Text size="sm" fw={500} lineClamp={1}>
                                        {record.filename}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {dayjs(record.created_at).format('DD/MM/YYYY HH:mm')} ·{' '}
                                        {record.account.bank ?? 'Cuenta'}
                                        {record.account.identifier ? ` — ${record.account.identifier}` : ''}
                                    </Text>
                                </div>

                                <Group gap="xs" wrap="nowrap">
                                    <Badge variant="light" color="teal">
                                        {record.imported_count} importados
                                    </Badge>
                                    {record.duplicate_count > 0 && (
                                        <Badge variant="light" color="gray">
                                            {record.duplicate_count} repetidos
                                        </Badge>
                                    )}
                                    <Button
                                        size="xs"
                                        variant="subtle"
                                        color="red"
                                        radius="md"
                                        leftSection={<IconArrowBackUp size={14} />}
                                        onClick={() => setPendingUndo(record)}
                                    >
                                        Revertir
                                    </Button>
                                </Group>
                            </Group>
                        </Card>
                    ))}
                </Stack>
            </Paper>

            <Modal
                opened={!!pendingUndo}
                onClose={() => setPendingUndo(null)}
                title="Revertir esta importación"
                centered
            >
                <Stack>
                    <Text size="sm">
                        Se van a eliminar los {pendingUndo?.imported_count} movimientos que entraron con{' '}
                        <b>{pendingUndo?.filename}</b>, y el saldo de la cuenta se va a ajustar. Los
                        movimientos que cargaste a mano no se tocan.
                    </Text>
                    <Group justify="flex-end">
                        <Button variant="default" radius="md" onClick={() => setPendingUndo(null)}>
                            Cancelar
                        </Button>
                        <Button color="red" radius="md" onClick={confirmUndo} loading={undoMutation.isPending}>
                            Revertir importación
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
}
