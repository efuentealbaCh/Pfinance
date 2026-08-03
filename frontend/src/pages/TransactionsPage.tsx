import { useState, useEffect } from 'react';
import {
    Container,
    Title,
    Text,
    Button,
    Paper,
    Group,
    Stack,
    Divider,
    Alert,
    Modal,
    ThemeIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconBuildingBank, IconPlus } from '@tabler/icons-react';
import { useTransactions, useCatalogs, useDeleteTransaction } from '../api/queries';
import TransactionModal from '../components/TransactionModal';
import TransactionList, { type TransactionFilters } from '../components/TransactionList';
import ExportModal from '../components/ExportModal';
import AccountModal from '../components/AccountModal';

interface Transaction {
    id: string;
    user_account_id: string;
    category_id: string;
    amount: string;
    description: string | null;
    date: string;
    type: 'income' | 'expense' | 'transfer';
    is_shared: boolean;
    card_id?: string | null;
    category: { id: string; name: string; icon: string | null; color: string | null };
    user_account: {
        id: string;
        identifier: string | null;
        bank: { id: string; name: string };
    };
    target_account?: {
        id: string;
        identifier: string | null;
        bank: { id: string; name: string };
    } | null;
    target_account_id?: string | null;
}



export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [filters, setFilters] = useState<TransactionFilters>({
        type: '',
        category_id: '',
        user_account_id: '',
        date_from: null,
        date_to: null,
        amount_min: '',
        amount_max: '',
    });

    const [modalOpened, setModalOpened] = useState(false);
    const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
    const [exportModalOpened, setExportModalOpened] = useState(false);
    const [noAccountModalOpened, setNoAccountModalOpened] = useState(false);
    const [accountModalOpened, setAccountModalOpened] = useState(false);

    // Queries
    const { data: catalogs, refetch: refetchCatalogs } = useCatalogs();
    const categories = catalogs?.categories || [];
    const accounts = catalogs?.userAccounts || [];
    const hasAccounts = accounts.length > 0;

    const queryParams: Record<string, string> = { page: String(page) };
    if (filters.type) queryParams.type = filters.type;
    if (filters.category_id) queryParams.category_id = filters.category_id;
    if (filters.user_account_id) queryParams.user_account_id = filters.user_account_id;
    if (filters.date_from) queryParams.date_from = filters.date_from.toISOString().split('T')[0];
    if (filters.date_to) queryParams.date_to = filters.date_to.toISOString().split('T')[0];
    if (filters.amount_min) queryParams.amount_min = String(filters.amount_min);
    if (filters.amount_max) queryParams.amount_max = String(filters.amount_max);

    const { data: txData } = useTransactions(queryParams);
    const deleteMutation = useDeleteTransaction();

    useEffect(() => {
        if (txData) {
            if (page === 1) {
                setTransactions(txData.data);
            } else {
                setTransactions((prev) => {
                    // Prevent duplicates in StrictMode
                    const existingIds = new Set(prev.map(t => t.id));
                    const newItems = txData.data.filter((t: any) => !existingIds.has(t.id));
                    return [...prev, ...newItems];
                });
            }
            setLastPage(txData.last_page);
            setLoadingMore(false);
        }
    }, [txData, page]);

    const handleLoadMore = () => {
        setLoadingMore(true);
        setPage((p) => p + 1);
    };

    const handleFilterChange = (newFilters: TransactionFilters) => {
        setFilters(newFilters);
        setPage(1); // Reset page on filter change
    };

    const handleEdit = (transaction: Transaction) => {
        setEditTransaction(transaction);
        setModalOpened(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('¿Estás seguro de eliminar esta transacción?')) return;
        deleteMutation.mutate(id, {
            onSuccess: () => {
                notifications.show({
                    title: 'Transacción eliminada',
                    message: 'La transacción fue eliminada correctamente.',
                    color: 'teal',
                });
                setPage(1); // Refresh page 1
            },
            onError: () => {
                notifications.show({
                    title: 'Error',
                    message: 'No se pudo eliminar la transacción.',
                    color: 'red',
                });
            }
        });
    };

    const handleModalClose = () => {
        setModalOpened(false);
        setEditTransaction(null);
    };

    const handleTransactionSaved = () => {
        notifications.show({
            title: editTransaction ? 'Transacción actualizada' : 'Transacción creada',
            message: editTransaction
                ? 'Los cambios fueron guardados.'
                : 'Tu nueva transacción fue registrada.',
            color: 'teal',
        });
        setPage(1); // Refresh page 1
    };

    const handleNewTransactionClick = () => {
        if (!hasAccounts) {
            setNoAccountModalOpened(true);
        } else {
            setEditTransaction(null);
            setModalOpened(true);
        }
    };

    const handleCreateAccountFromPrompt = () => {
        setNoAccountModalOpened(false);
        setAccountModalOpened(true);
    };

    const handleAccountCreated = () => {
        refetchCatalogs();
        notifications.show({
            title: 'Cuenta creada',
            message: '¡Tu cuenta fue registrada! Ahora puedes agregar transacciones.',
            color: 'teal',
        });
    };

    // Calcular resumen del listado actual
    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    return (
        <>
            <Container size="md" py="xl">
                <Paper withBorder shadow="xl" p="xl" radius="lg">
                    {/* ─── Header ─────────────────────────────────────── */}
                    <Group justify="space-between" mb="xl">
                        <Title order={3}>💰 Transacciones</Title>
                        <Group gap="sm">
                            <Button
                                variant="light"
                                color="blue"
                                radius="md"
                                onClick={() => setExportModalOpened(true)}
                            >
                                📥 Exportar
                            </Button>
                            <Button
                                color="teal"
                                radius="md"
                                onClick={handleNewTransactionClick}
                            >
                                ➕ Nueva transacción
                            </Button>
                        </Group>
                    </Group>

                    {/* ─── Alert when no accounts ─────────────────────── */}
                    {!hasAccounts && (
                        <Alert
                            variant="light"
                            color="yellow"
                            radius="md"
                            mb="lg"
                            icon={<IconAlertCircle size={20} />}
                            title="Sin cuentas bancarias"
                        >
                            <Text size="sm" mb="xs">
                                No tienes cuentas bancarias registradas. Necesitas al menos una cuenta para poder registrar transacciones.
                            </Text>
                            <Button
                                size="xs"
                                variant="filled"
                                color="teal"
                                leftSection={<IconPlus size={14} />}
                                onClick={handleCreateAccountFromPrompt}
                            >
                                Crear mi primera cuenta
                            </Button>
                        </Alert>
                    )}

                    <Stack gap="md">
                        {/* ─── Resumen ──────────────────────────────────── */}
                        <Group grow>
                            <Paper withBorder p="md" radius="md">
                                <Text c="dimmed" size="xs" mb={2}>
                                    Ingresos
                                </Text>
                                <Text fw={700} size="lg" c="teal">
                                    +${totalIncome.toLocaleString('es-CL', { minimumFractionDigits: 2 })}
                                </Text>
                            </Paper>
                            <Paper withBorder p="md" radius="md">
                                <Text c="dimmed" size="xs" mb={2}>
                                    Gastos
                                </Text>
                                <Text fw={700} size="lg" c="red">
                                    -${totalExpense.toLocaleString('es-CL', { minimumFractionDigits: 2 })}
                                </Text>
                            </Paper>
                            <Paper withBorder p="md" radius="md">
                                <Text c="dimmed" size="xs" mb={2}>
                                    Balance
                                </Text>
                                <Text
                                    fw={700}
                                    size="lg"
                                    c={totalIncome - totalExpense >= 0 ? 'teal' : 'red'}
                                >
                                    ${(totalIncome - totalExpense).toLocaleString('es-CL', {
                                        minimumFractionDigits: 2,
                                    })}
                                </Text>
                            </Paper>
                        </Group>

                        <Divider label="Historial" labelPosition="center" />

                        {/* ─── Lista con filtros ────────────────────────── */}
                        <TransactionList
                            transactions={transactions}
                            categories={categories}
                            accounts={accounts}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onFilterChange={handleFilterChange}
                            hasMore={page < lastPage}
                            onLoadMore={handleLoadMore}
                            loadingMore={loadingMore}
                        />
                    </Stack>
                </Paper>
            </Container>

            {/* ─── Modal: No accounts prompt ─────────────────────── */}
            <Modal
                opened={noAccountModalOpened}
                onClose={() => setNoAccountModalOpened(false)}
                title="⚠️ No puedes agregar transacciones aún"
                centered
                radius="lg"
                size="sm"
            >
                <Stack align="center" gap="md" py="md">
                    <ThemeIcon size={64} radius="xl" color="yellow" variant="light">
                        <IconBuildingBank size={32} />
                    </ThemeIcon>
                    <Text ta="center" size="sm">
                        Para registrar una transacción, primero necesitas tener al menos una <strong>cuenta bancaria</strong> registrada con una tarjeta asociada.
                    </Text>
                    <Group gap="sm">
                        <Button
                            variant="default"
                            radius="md"
                            onClick={() => setNoAccountModalOpened(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color="teal"
                            radius="md"
                            leftSection={<IconPlus size={16} />}
                            onClick={handleCreateAccountFromPrompt}
                        >
                            Crear cuenta ahora
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* ─── Modal: Transaction ──────────────────────────────── */}
            <TransactionModal
                opened={modalOpened}
                onClose={handleModalClose}
                onSuccess={handleTransactionSaved}
                editData={
                    editTransaction
                        ? {
                            id: editTransaction.id,
                            user_account_id: editTransaction.user_account_id,
                            target_account_id: editTransaction.target_account_id || null,
                            category_id: editTransaction.category_id || null,
                            type: editTransaction.type,
                            amount: Number(editTransaction.amount),
                            date: editTransaction.date,
                            description: editTransaction.description || '',
                            is_shared: editTransaction.is_shared,
                            card_id: editTransaction.card_id || null,
                        }
                        : null
                }
            />

            {/* ─── Modal: Account (quick create) ──────────────────── */}
            <AccountModal
                opened={accountModalOpened}
                onClose={() => setAccountModalOpened(false)}
                onSuccess={handleAccountCreated}
            />

            <ExportModal 
                opened={exportModalOpened}
                onClose={() => setExportModalOpened(false)}
            />
        </>
    );
}
