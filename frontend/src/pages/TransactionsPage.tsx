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
import api from '../api/axios';
import TransactionModal from '../components/TransactionModal';
import TransactionList, { type TransactionFilters } from '../components/TransactionList';

interface Transaction {
    id: string;
    user_account_id: string;
    category_id: string;
    amount: string;
    description: string | null;
    date: string;
    type: 'income' | 'expense';
    is_shared: boolean;
    category: { id: string; name: string; icon: string | null; color: string | null };
    user_account: {
        id: string;
        identifier: string | null;
        bank: { id: string; name: string };
    };
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
    const [categories, setCategories] = useState<Category[]>([]);
    const [accounts, setAccounts] = useState<UserAccount[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [filters, setFilters] = useState<TransactionFilters>({
        type: '',
        category_id: '',
        user_account_id: '',
        date_from: null,
        date_to: null,
    });

    const [modalOpened, setModalOpened] = useState(false);
    const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);

    // Cargar catálogos una sola vez
    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const [accountsRes, categoriesRes] = await Promise.all([
                    api.get('/user-accounts'),
                    api.get('/categories'),
                ]);
                setAccounts(accountsRes.data.accounts);
                setCategories(categoriesRes.data);
            } catch {
                notifications.show({
                    title: 'Error',
                    message: 'No se pudieron cargar los catálogos.',
                    color: 'red',
                });
            }
        };
        fetchCatalogs();
    }, []);

    const fetchTransactions = useCallback(
        async (pageNum: number, append = false) => {
            try {
                const params: Record<string, string> = { page: String(pageNum) };
                if (filters.type) params.type = filters.type;
                if (filters.category_id) params.category_id = filters.category_id;
                if (filters.user_account_id) params.user_account_id = filters.user_account_id;
                if (filters.date_from) params.date_from = filters.date_from.toISOString().split('T')[0];
                if (filters.date_to) params.date_to = filters.date_to.toISOString().split('T')[0];

                const res = await api.get<PaginatedResponse>('/transactions', { params });

                if (append) {
                    setTransactions((prev) => [...prev, ...res.data.data]);
                } else {
                    setTransactions(res.data.data);
                }
                setPage(res.data.current_page);
                setLastPage(res.data.last_page);
            } catch {
                notifications.show({
                    title: 'Error',
                    message: 'No se pudieron cargar las transacciones.',
                    color: 'red',
                });
            }
        },
        [filters]
    );

    // Recargar al cambiar filtros
    useEffect(() => {
        fetchTransactions(1);
    }, [fetchTransactions]);

    const handleLoadMore = async () => {
        setLoadingMore(true);
        await fetchTransactions(page + 1, true);
        setLoadingMore(false);
    };

    const handleFilterChange = (newFilters: TransactionFilters) => {
        setFilters(newFilters);
    };

    const handleEdit = (transaction: Transaction) => {
        setEditTransaction(transaction);
        setModalOpened(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('¿Estás seguro de eliminar esta transacción?')) return;
        try {
            await api.delete(`/transactions/${id}`);
            notifications.show({
                title: 'Transacción eliminada',
                message: 'La transacción fue eliminada correctamente.',
                color: 'teal',
            });
            fetchTransactions(1);
        } catch {
            notifications.show({
                title: 'Error',
                message: 'No se pudo eliminar la transacción.',
                color: 'red',
            });
        }
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
        fetchTransactions(1);
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
                            category_id: editTransaction.category_id,
                            type: editTransaction.type,
                            amount: Number(editTransaction.amount),
                            date: editTransaction.date,
                            description: editTransaction.description || '',
                            is_shared: editTransaction.is_shared,
                        }
                        : null
                }
            />
        </>
    );
}
