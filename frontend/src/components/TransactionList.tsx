import {
    Paper,
    Text,
    Group,
    Badge,
    ActionIcon,
    Stack,
    Tooltip,
    Select,
    SegmentedControl,
    Button,
    Collapse,
    NumberInput,
    Avatar,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';

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

interface TransactionListProps {
    transactions: Transaction[];
    categories: Category[];
    accounts: UserAccount[];
    onEdit: (transaction: Transaction) => void;
    onDelete: (id: string) => void;
    onFilterChange: (filters: TransactionFilters) => void;
    hasMore: boolean;
    onLoadMore: () => void;
    loadingMore: boolean;
}

export interface TransactionFilters {
    type: string;
    category_id: string;
    user_account_id: string;
    date_from: Date | null;
    date_to: Date | null;
    amount_min: string | number;
    amount_max: string | number;
}

export default function TransactionList({
    transactions,
    categories,
    accounts,
    onEdit,
    onDelete,
    onFilterChange,
    hasMore,
    onLoadMore,
    loadingMore,
}: TransactionListProps) {
    const [filters, setFilters] = useState<TransactionFilters>({
        type: '',
        category_id: '',
        user_account_id: '',
        date_from: null,
        date_to: null,
        amount_min: '',
        amount_max: '',
    });

    const [filtersOpened, setFiltersOpened] = useState(false);

    const updateFilter = (key: keyof TransactionFilters, value: string | number | Date | null) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <Stack gap="md">
            {/* ─── Filtros ─────────────────────────────────────── */}
            <Paper withBorder p="md" radius="md">
                <Group justify="space-between" mb={filtersOpened ? 'sm' : 0}>
                    <Text size="sm" fw={600}>
                        🔍 Filtros
                    </Text>
                    <Button variant="subtle" size="xs" onClick={() => setFiltersOpened((o) => !o)}>
                        {filtersOpened ? 'Ocultar' : 'Mostrar'}
                    </Button>
                </Group>
                
                <Collapse in={filtersOpened}>
                    <Stack gap="sm">
                        <Group grow>
                            <div>
                                <Text size="xs" c="dimmed" mb={4}>
                                    Tipo
                                </Text>
                                <SegmentedControl
                                    fullWidth
                                    size="xs"
                                    data={[
                                        { label: 'Todos', value: '' },
                                        { label: '📉 Gastos', value: 'expense' },
                                        { label: '📈 Ingresos', value: 'income' },
                                        { label: '🔄 Transferencias', value: 'transfer' },
                                    ]}
                                    value={filters.type}
                                    onChange={(value) => updateFilter('type', value)}
                                    radius="md"
                                />
                            </div>
                        </Group>

                        <Group grow>
                            <Select
                                size="xs"
                                placeholder="Todas las categorías"
                                clearable
                                searchable
                                data={categories.map((c) => ({
                                    value: c.id,
                                    label: `${c.icon || '📁'} ${c.name}`,
                                }))}
                                value={filters.category_id || null}
                                onChange={(value) => updateFilter('category_id', value || '')}
                                radius="md"
                            />
                            <Select
                                size="xs"
                                placeholder="Todas las cuentas"
                                clearable
                                searchable
                                data={accounts.map((a) => ({
                                    value: a.id,
                                    label: `${a.bank.name}${a.identifier ? ` — ${a.identifier}` : ''}`,
                                }))}
                                value={filters.user_account_id || null}
                                onChange={(value) => updateFilter('user_account_id', value || '')}
                                radius="md"
                            />
                        </Group>

                        <Group grow>
                            <DateInput
                                size="xs"
                                placeholder="Desde"
                                clearable
                                valueFormat="DD/MM/YYYY"
                                value={filters.date_from}
                                onChange={(value) => updateFilter('date_from', value)}
                                radius="md"
                            />
                            <DateInput
                                size="xs"
                                placeholder="Hasta"
                                clearable
                                valueFormat="DD/MM/YYYY"
                                value={filters.date_to}
                                onChange={(value) => updateFilter('date_to', value)}
                                radius="md"
                            />
                        </Group>

                        <Group grow>
                            <NumberInput
                                size="xs"
                                placeholder="Monto mínimo"
                                clearable
                                hideControls
                                value={filters.amount_min}
                                onChange={(value) => updateFilter('amount_min', value)}
                                radius="md"
                                leftSection={<Text size="xs" c="dimmed">$</Text>}
                            />
                            <NumberInput
                                size="xs"
                                placeholder="Monto máximo"
                                clearable
                                hideControls
                                value={filters.amount_max}
                                onChange={(value) => updateFilter('amount_max', value)}
                                radius="md"
                                leftSection={<Text size="xs" c="dimmed">$</Text>}
                            />
                        </Group>
                    </Stack>
                </Collapse>
            </Paper>

            {/* ─── Lista de Transacciones ──────────────────────── */}
            {transactions.length === 0 ? (
                <Text c="dimmed" ta="center" size="sm" py="xl">
                    No se encontraron transacciones. ¡Registra una!
                </Text>
            ) : (
                transactions.map((tx) => (
                    <Paper
                        key={tx.id}
                        withBorder
                        p="md"
                        radius="md"
                        style={{
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                            cursor: 'default',
                            borderLeft: `3px solid ${tx.type === 'income' ? '#12b886' : tx.type === 'expense' ? '#fa5252' : '#228be6'}`,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <Group justify="space-between" wrap="nowrap">
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <Group gap="xs" mb={4}>
                                    <Text fw={600} size="sm">
                                        {tx.type === 'transfer' ? '🔄 Transferencia' : (tx.category?.icon || '📁') + ' ' + (tx.category?.name || 'Sin categoría')}
                                    </Text>
                                    <Badge
                                        size="xs"
                                        variant="light"
                                        color={tx.type === 'income' ? 'teal' : tx.type === 'expense' ? 'red' : 'blue'}
                                    >
                                        {tx.type === 'income' ? 'Ingreso' : tx.type === 'expense' ? 'Gasto' : 'Transferencia'}
                                    </Badge>
                                    {tx.is_shared && (
                                        <Badge size="xs" variant="dot" color="blue">
                                            Compartida
                                        </Badge>
                                    )}
                                </Group>
                                <Group gap="xs">
                                        {tx.type === 'transfer' ? (
                                        <Group gap="xs">
                                            {tx.user_account?.bank?.logo ? (
                                                <Avatar src={tx.user_account.bank.logo} size="xs" radius="xl" alt={tx.user_account.bank.name} />
                                            ) : null}
                                            <Text c="dimmed" size="xs">
                                                Desde: {tx.user_account?.bank?.name} {tx.user_account?.identifier} ➔ Hacia: {tx.target_account?.bank?.name} {tx.target_account?.identifier}
                                            </Text>
                                        </Group>
                                    ) : (
                                        <Group gap="xs">
                                            {tx.user_account?.bank?.logo ? (
                                                <Avatar src={tx.user_account.bank.logo} size="xs" radius="xl" alt={tx.user_account.bank.name} />
                                            ) : null}
                                            <Text c="dimmed" size="xs">
                                                {tx.user_account?.bank?.name}
                                                {tx.user_account?.identifier ? ` — ${tx.user_account.identifier}` : ''}
                                            </Text>
                                        </Group>
                                    )}
                                    <Text c="dimmed" size="xs">
                                        •
                                    </Text>
                                    <Text c="dimmed" size="xs">
                                        {new Date(tx.date).toLocaleDateString('es-CL')}
                                    </Text>
                                </Group>
                                {tx.description && (
                                    <Text c="dimmed" size="xs" mt={4} lineClamp={2}>
                                        {tx.description}
                                    </Text>
                                )}
                            </div>

                            <Group gap="xs" wrap="nowrap">
                                <Text
                                    fw={700}
                                    size="lg"
                                    c={tx.type === 'income' ? 'teal' : tx.type === 'expense' ? 'red' : 'blue'}
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''}$
                                    {Number(tx.amount).toLocaleString('es-CL', {
                                        minimumFractionDigits: 2,
                                    })}
                                </Text>

                                <Tooltip label="Editar">
                                    <ActionIcon
                                        variant="subtle"
                                        color="blue"
                                        size="sm"
                                        onClick={() => onEdit(tx)}
                                    >
                                        ✏️
                                    </ActionIcon>
                                </Tooltip>

                                <Tooltip label="Eliminar">
                                    <ActionIcon
                                        variant="subtle"
                                        color="red"
                                        size="sm"
                                        onClick={() => onDelete(tx.id)}
                                    >
                                        🗑️
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Group>
                    </Paper>
                ))
            )}

            {/* ─── Cargar más ──────────────────────────────────── */}
            {hasMore && (
                <Button
                    variant="light"
                    color="gray"
                    radius="md"
                    fullWidth
                    loading={loadingMore}
                    onClick={onLoadMore}
                >
                    Cargar más transacciones
                </Button>
            )}
        </Stack>
    );
}
