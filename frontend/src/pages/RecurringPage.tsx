import { useState } from 'react';
import {
    ActionIcon,
    Alert,
    Badge,
    Button,
    Card,
    Center,
    Container,
    Group,
    Loader,
    Menu,
    Paper,
    Stack,
    Text,
    Title,
    Tooltip,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
    IconCalendarRepeat,
    IconCheck,
    IconDotsVertical,
    IconPencil,
    IconPlayerPause,
    IconPlayerPlay,
    IconPlus,
    IconTrash,
    IconAlertCircle,
    IconPlayerSkipForward,
} from '@tabler/icons-react';
import Money from '../components/Money';
import RecurringModal from '../components/RecurringModal';
import {
    apiErrorMessage,
    useConfirmRecurrence,
    useDeleteRecurringTransaction,
    usePendingRecurrences,
    useRecurringTransactions,
    useSkipRecurrence,
    useToggleRecurringTransaction,
    type PendingRecurrence,
    type RecurringTransaction,
} from '../api/queries';

/** Nombre en pantalla de cada frecuencia. */
const FREQUENCY_LABELS: Record<string, string> = {
    weekly: 'Semanal',
    biweekly: 'Quincenal',
    monthly: 'Mensual',
    yearly: 'Anual',
};

/** Convierte `2026-08-03` a `03/08/2026` sin pasar por `Date`, que correría el día por zona horaria. */
function formatDate(isoDate: string): string {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
}

/** Describe una cuenta en una línea, para identificar de dónde sale la plata. */
function describeAccount(account?: { identifier: string | null; bank?: { name: string } | null }): string {
    if (!account) return 'Cuenta desconocida';
    const bank = account.bank?.name ?? 'Cuenta';
    return account.identifier ? `${bank} — ${account.identifier}` : bank;
}

export default function RecurringPage() {
    const { data: listData, isLoading } = useRecurringTransactions();
    const { data: pendingData } = usePendingRecurrences();
    const confirmMutation = useConfirmRecurrence();
    const skipMutation = useSkipRecurrence();
    const toggleMutation = useToggleRecurringTransaction();
    const deleteMutation = useDeleteRecurringTransaction();

    const [modalOpened, setModalOpened] = useState(false);
    const [editData, setEditData] = useState<RecurringTransaction | null>(null);

    const recurrences = listData?.recurring_transactions ?? [];
    const pending = pendingData?.pending ?? [];

    const openCreate = () => {
        setEditData(null);
        setModalOpened(true);
    };

    const openEdit = (recurrence: RecurringTransaction) => {
        setEditData(recurrence);
        setModalOpened(true);
    };

    const notifyError = (title: string) => (error: unknown) => {
        notifications.show({ title, message: apiErrorMessage(error, 'Intentá de nuevo.'), color: 'red' });
    };

    const handleConfirm = (id: string) => {
        confirmMutation.mutate(id, {
            onSuccess: (data) => {
                notifications.show({ title: 'Cuota registrada', message: data.message, color: 'teal' });
            },
            onError: notifyError('No se pudo confirmar la cuota'),
        });
    };

    const handleSkip = (id: string) => {
        skipMutation.mutate(id, {
            onSuccess: (data) => {
                notifications.show({ title: 'Cuota omitida', message: data.message, color: 'gray' });
            },
            onError: notifyError('No se pudo omitir la cuota'),
        });
    };

    const handleToggle = (id: string) => {
        toggleMutation.mutate(id, {
            onSuccess: (data) => {
                notifications.show({ title: 'Recurrencia actualizada', message: data.message, color: 'blue' });
            },
            onError: notifyError('No se pudo cambiar el estado'),
        });
    };

    const handleDelete = (recurrence: RecurringTransaction) => {
        const label = recurrence.description || 'esta recurrencia';
        if (!window.confirm(`¿Eliminar ${label}? Las cuotas ya confirmadas no se borran.`)) return;

        deleteMutation.mutate(recurrence.id, {
            onSuccess: (data) => {
                notifications.show({ title: 'Recurrencia eliminada', message: data.message, color: 'orange' });
            },
            onError: notifyError('No se pudo eliminar'),
        });
    };

    const pendingByRecurrence = pending.reduce<Record<string, PendingRecurrence[]>>((groups, occurrence) => {
        (groups[occurrence.recurring_transaction_id] ??= []).push(occurrence);
        return groups;
    }, {});

    const isRunning = confirmMutation.isPending || skipMutation.isPending;

    return (
        <Container size="xl" py="md">
            <Group justify="space-between" mb="xl">
                <Title order={2} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <IconCalendarRepeat size={26} /> Recurrentes
                </Title>
                <Button leftSection={<IconPlus size={16} />} color="teal" radius="md" onClick={openCreate}>
                    Nueva recurrencia
                </Button>
            </Group>

            {/* ─── Cuotas vencidas ──────────────────────────────── */}
            {pending.length > 0 && (
                <Paper withBorder shadow="sm" radius="lg" p="lg" mb="xl">
                    <Group justify="space-between" mb="md">
                        <Text fw={600} size="lg">
                            Cuotas vencidas
                        </Text>
                        <Badge color="orange" variant="light" size="lg">
                            {pending.length}
                        </Badge>
                    </Group>
                    <Text size="sm" c="dimmed" mb="md">
                        Confirmá las que efectivamente se cobraron para que se registren como movimientos
                        reales, y omití las que no.
                    </Text>

                    <Stack gap="sm">
                        {Object.values(pendingByRecurrence).map((occurrences) => {
                            const [oldest, ...rest] = occurrences;

                            return (
                                <Card key={oldest.recurring_transaction_id} withBorder radius="md" padding="md">
                                    <Group justify="space-between" wrap="nowrap" align="flex-start">
                                        <div style={{ minWidth: 0 }}>
                                            <Text fw={500} lineClamp={1}>
                                                {oldest.description || 'Sin descripción'}
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                Vencía el {formatDate(oldest.date)} · {describeAccount(oldest.user_account)}
                                                {oldest.installments_progress ? ` · ${oldest.installments_progress}` : ''}
                                            </Text>
                                        </div>
                                        <Group gap="xs" wrap="nowrap">
                                            <Money
                                                amount={oldest.amount}
                                                currency={oldest.user_account?.currency}
                                                fw={700}
                                                c={oldest.type === 'income' ? 'teal' : 'red'}
                                            />
                                            <Button
                                                size="xs"
                                                color="teal"
                                                radius="md"
                                                leftSection={<IconCheck size={14} />}
                                                onClick={() => handleConfirm(oldest.recurring_transaction_id)}
                                                disabled={isRunning}
                                            >
                                                Confirmar
                                            </Button>
                                            <Tooltip label="No se cobró: avanza sin crear el movimiento">
                                                <Button
                                                    size="xs"
                                                    variant="subtle"
                                                    color="gray"
                                                    radius="md"
                                                    leftSection={<IconPlayerSkipForward size={14} />}
                                                    onClick={() => handleSkip(oldest.recurring_transaction_id)}
                                                    disabled={isRunning}
                                                >
                                                    Omitir
                                                </Button>
                                            </Tooltip>
                                        </Group>
                                    </Group>

                                    {rest.length > 0 && (
                                        <Text size="xs" c="dimmed" mt="xs">
                                            Hay {rest.length} cuota{rest.length > 1 ? 's' : ''} más atrasada
                                            {rest.length > 1 ? 's' : ''} de esta recurrencia; aparecen al resolver esta.
                                        </Text>
                                    )}
                                </Card>
                            );
                        })}
                    </Stack>
                </Paper>
            )}

            {/* ─── Listado ──────────────────────────────────────── */}
            {isLoading ? (
                <Center py="xl">
                    <Loader color="teal" />
                </Center>
            ) : recurrences.length === 0 ? (
                <Alert color="blue" variant="light" radius="md" icon={<IconAlertCircle size={18} />}>
                    Todavía no tenés recurrencias. Sirven para lo que se repite solo: una suscripción, el
                    arriendo, o las cuotas de un crédito.
                </Alert>
            ) : (
                <Stack gap="sm">
                    {recurrences.map((recurrence) => (
                        <Card key={recurrence.id} withBorder shadow="sm" radius="md" padding="lg">
                            <Group justify="space-between" wrap="nowrap" align="flex-start">
                                <Stack gap={4} style={{ minWidth: 0 }}>
                                    <Group gap="xs" wrap="nowrap">
                                        <Text fw={600} lineClamp={1}>
                                            {recurrence.description || 'Sin descripción'}
                                        </Text>
                                        <Badge size="sm" variant="light" color={recurrence.active ? 'teal' : 'gray'}>
                                            {recurrence.active ? 'Activa' : 'Pausada'}
                                        </Badge>
                                        {recurrence.pending_count > 0 && (
                                            <Badge size="sm" variant="light" color="orange">
                                                {recurrence.pending_count} vencida{recurrence.pending_count > 1 ? 's' : ''}
                                            </Badge>
                                        )}
                                    </Group>

                                    <Text size="sm" c="dimmed">
                                        {FREQUENCY_LABELS[recurrence.frequency] ?? recurrence.frequency} ·{' '}
                                        {describeAccount(recurrence.user_account)}
                                        {recurrence.category ? ` · ${recurrence.category.name}` : ''}
                                    </Text>

                                    <Text size="xs" c="dimmed">
                                        Próxima: {formatDate(recurrence.next_run_date)}
                                        {recurrence.installments_progress
                                            ? ` · Cuota ${recurrence.installments_progress}`
                                            : ' · Sin fecha de término'}
                                    </Text>
                                </Stack>

                                <Group gap="xs" wrap="nowrap" align="center">
                                    <Money
                                        amount={recurrence.amount}
                                        currency={recurrence.user_account?.currency}
                                        fw={700}
                                        c={recurrence.type === 'income' ? 'teal' : 'red'}
                                    />
                                    <Menu position="bottom-end" withinPortal>
                                        <Menu.Target>
                                            <ActionIcon variant="subtle" color="gray">
                                                <IconDotsVertical size={18} />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item
                                                leftSection={<IconPencil size={14} />}
                                                onClick={() => openEdit(recurrence)}
                                            >
                                                Editar
                                            </Menu.Item>
                                            <Menu.Item
                                                leftSection={
                                                    recurrence.active ? (
                                                        <IconPlayerPause size={14} />
                                                    ) : (
                                                        <IconPlayerPlay size={14} />
                                                    )
                                                }
                                                onClick={() => handleToggle(recurrence.id)}
                                            >
                                                {recurrence.active ? 'Pausar' : 'Reanudar'}
                                            </Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item
                                                color="red"
                                                leftSection={<IconTrash size={14} />}
                                                onClick={() => handleDelete(recurrence)}
                                            >
                                                Eliminar
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Group>
                        </Card>
                    ))}
                </Stack>
            )}

            <RecurringModal opened={modalOpened} onClose={() => setModalOpened(false)} editData={editData} />
        </Container>
    );
}
