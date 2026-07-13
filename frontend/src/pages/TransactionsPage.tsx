import { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Title,
    Text,
    Button,
    Paper,
    Group,
    Stack,
    Divider,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTransactions, useCatalogs, useDeleteTransaction } from '../api/queries';
import TransactionModal from '../components/TransactionModal';
import TransactionList, { type TransactionFilters } from '../components/TransactionList';
import ExportModal from '../components/ExportModal';

interface Transaction {
    id: string;
    user_account_id: string;
    category_id: string;
    amount: string;
    description: string | null;
    date: string;
    type: 'income' | 'expense' | 'transfer';
    is_shared: boolean;
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

interface Category {
    id: string;
    name: string;
    icon: string | null;
}

interface UserAccount {
    id: string;
    identifier: string | null;
    bank: { id: string; name: string };
}

interface PaginatedResponse {
    data: Transaction[];
    current_page: number;
    last_page: number;
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

    // Queries
    const { data: catalogs } = useCatalogs();
    const categories = catalogs?.categories || [];
    const accounts = catalogs?.userAccounts || [];

    const queryParams: Record<string, string> = { page: String(page) };
    if (filters.type) queryParams.type = filters.type;
    if (filters.category_id) queryParams.category_id = filters.category_id;
    if (filters.user_account_id) queryParams.user_account_id = filters.user_account_id;
    if (filters.date_from) queryParams.date_from = filters.date_from.toISOString().split('T')[0];
    if (filters.date_to) queryParams.date_to = filters.date_to.toISOString().split('T')[0];
    if (filters.amount_min) queryParams.amount_min = filters.amount_min;
    if (filters.amount_max) queryParams.amount_max = filters.amount_max;

    const { data: txData, isFetching } = useTransactions(queryParams);
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
                                onClick={() => {
                                    setEditTransaction(null);
                                    setModalOpened(true);
                                }}
                            >
                                ➕ Nueva transacción
                            </Button>
                        </Group>
                    </Group>

                    <Stack gap="md">
                        {/* ─── Resumen ──────────────────────────────────── */}
                        <Group grow>
                            <Paper withBorder p="md" radius="md" bg="dark.6">
                                <Text c="dimmed" size="xs" mb={2}>
                                    Ingresos
                                </Text>
                                <Text fw={700} size="lg" c="teal">
                                    +${totalIncome.toLocaleString('es-CL', { minimumFractionDigits: 2 })}
                                </Text>
                            </Paper>
                            <Paper withBorder p="md" radius="md" bg="dark.6">
                                <Text c="dimmed" size="xs" mb={2}>
                                    Gastos
                                </Text>
                                <Text fw={700} size="lg" c="red">
                                    -${totalExpense.toLocaleString('es-CL', { minimumFractionDigits: 2 })}
                                </Text>
                            </Paper>
                            <Paper withBorder p="md" radius="md" bg="dark.6">
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

            {/* ─── Modal ──────────────────────────────────────────── */}
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
                        }
                        : null
                }
            />

            <ExportModal 
                opened={exportModalOpened}
                onClose={() => setExportModalOpened(false)}
            />
        </>
    );
}
