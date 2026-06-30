import { useState, useEffect, useCallback } from 'react';
import {
    Paper,
    Text,
    Group,
    Stack,
    Select,
    SimpleGrid,
    Title,
    Divider,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import api from '../api/axios';
import { notifications } from '@mantine/notifications';

interface UserAccount {
    id: string;
    identifier: string | null;
    bank: { id: string; name: string };
}

interface AnalyticsSummary {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

interface ExpenseCategory {
    name: string;
    total: number;
    color: string;
}

interface ChartDataPoint {
    date: string;
    income: number;
    expense: number;
}

interface DashboardAnalyticsProps {
    accounts: UserAccount[];
}

export default function DashboardAnalytics({ accounts }: DashboardAnalyticsProps) {
    const [summary, setSummary] = useState<AnalyticsSummary>({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
    });
    const [expensesByCategory, setExpensesByCategory] = useState<ExpenseCategory[]>([]);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

    const [accountId, setAccountId] = useState<string | null>(null);
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);

    const fetchAnalytics = useCallback(async () => {
        try {
            const params: Record<string, string> = {};
            if (accountId) params.user_account_id = accountId;
            if (dateFrom) params.date_from = dateFrom.toISOString().split('T')[0];
            if (dateTo) params.date_to = dateTo.toISOString().split('T')[0];

            const res = await api.get('/dashboard/summary', { params });
            setSummary(res.data.summary);
            setExpensesByCategory(res.data.expensesByCategory);
            setChartData(res.data.chartData);
        } catch {
            notifications.show({
                title: 'Error',
                message: 'No se pudieron cargar las analíticas del dashboard.',
                color: 'red',
            });
        }
    }, [accountId, dateFrom, dateTo]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    // Formateador para pesos chilenos
    const formatCurrency = (value: number) =>
        '$' + value.toLocaleString('es-CL');

    // Custom Tooltip para el AreaChart
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <Paper p="sm" withBorder shadow="md" bg="dark.7">
                    <Text size="sm" fw={600} mb="xs">
                        {label}
                    </Text>
                    {payload.map((entry: any, index: number) => (
                        <Group key={index} justify="space-between" gap="xl" wrap="nowrap">
                            <Text size="xs" c={entry.color}>
                                {entry.name === 'income' ? 'Ingresos' : 'Egresos'}
                            </Text>
                            <Text size="xs" fw={700}>
                                {formatCurrency(entry.value)}
                            </Text>
                        </Group>
                    ))}
                </Paper>
            );
        }
        return null;
    };

    return (
        <Stack gap="xl">
            {/* ─── Filtros ───────────────────────────────────────── */}
            <Paper withBorder p="md" radius="md" bg="dark.6">
                <Group align="flex-end" grow>
                    <Select
                        label="Cuenta Bancaria"
                        placeholder="Todas las cuentas"
                        clearable
                        searchable
                        data={accounts.map((a) => ({
                            value: a.id,
                            label: `${a.bank.name}${a.identifier ? ` — ${a.identifier}` : ''}`,
                        }))}
                        value={accountId}
                        onChange={setAccountId}
                        radius="md"
                    />
                    <DateInput
                        label="Desde"
                        placeholder="Fecha inicio"
                        clearable
                        valueFormat="DD/MM/YYYY"
                        value={dateFrom}
                        onChange={setDateFrom}
                        radius="md"
                    />
                    <DateInput
                        label="Hasta"
                        placeholder="Fecha fin"
                        clearable
                        valueFormat="DD/MM/YYYY"
                        value={dateTo}
                        onChange={setDateTo}
                        radius="md"
                    />
                </Group>
            </Paper>

            {/* ─── Tarjetas de Resumen ───────────────────────────── */}
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                <Paper withBorder p="xl" radius="md" bg="dark.6">
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase" mb={4}>
                        ingresos Totales
                    </Text>
                    <Text fw={700} size="xl" c="teal">
                        {formatCurrency(summary.totalIncome)}
                    </Text>
                </Paper>
                <Paper withBorder p="xl" radius="md" bg="dark.6">
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase" mb={4}>
                        gastos Totales
                    </Text>
                    <Text fw={700} size="xl" c="red">
                        {formatCurrency(summary.totalExpense)}
                    </Text>
                </Paper>
                <Paper withBorder p="xl" radius="md" bg="dark.6">
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase" mb={4}>
                        Balance Neto
                    </Text>
                    <Text fw={700} size="xl" c={summary.balance >= 0 ? 'teal' : 'red'}>
                        {formatCurrency(summary.balance)}
                    </Text>
                </Paper>
            </SimpleGrid>

            <Divider />

            {/* ─── Gráficos ──────────────────────────────────────── */}
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                {/* Gráfico de Evolución */}
                <Paper withBorder p="md" radius="md">
                    <Title order={5} mb="lg" fw={600}>
                        📈 Evolución en el tiempo
                    </Title>
                    {chartData.length === 0 ? (
                        <Text c="dimmed" ta="center" py="xl">
                            No hay datos para mostrar en este periodo.
                        </Text>
                    ) : (
                        <div style={{ height: 300, width: '100%' }}>
                            <ResponsiveContainer>
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#12b886" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#12b886" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#fa5252" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#fa5252" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(val) => {
                                            const [, m, d] = val.split('-');
                                            return `${d}/${m}`;
                                        }}
                                        stroke="#5C5F66"
                                        fontSize={12}
                                        tickMargin={10}
                                    />
                                    <YAxis
                                        tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                                        stroke="#5C5F66"
                                        fontSize={12}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2C2E33" vertical={false} />
                                    <RechartsTooltip content={<CustomTooltip />} />
                                    <Legend verticalAlign="top" height={36} formatter={(value) => (value === 'income' ? 'Ingresos' : 'Egresos')} />
                                    <Area
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#12b886"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorIncome)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="expense"
                                        stroke="#fa5252"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorExpense)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </Paper>

                {/* Gráfico de Dona */}
                <Paper withBorder p="md" radius="md">
                    <Title order={5} mb="lg" fw={600}>
                        🍩 Gastos por Categoría
                    </Title>
                    {expensesByCategory.length === 0 ? (
                        <Text c="dimmed" ta="center" py="xl">
                            No hay gastos registrados en este periodo.
                        </Text>
                    ) : (
                        <div style={{ height: 300, width: '100%' }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={expensesByCategory}
                                        dataKey="total"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={2}
                                    >
                                        {expensesByCategory.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || '#4ECDC4'} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#1A1B1E', borderColor: '#2C2E33', borderRadius: 8 }}
                                        itemStyle={{ color: '#C1C2C5' }}
                                        formatter={(value: number) => formatCurrency(value)}
                                    />
                                    <Legend
                                        layout="vertical"
                                        verticalAlign="middle"
                                        align="right"
                                        wrapperStyle={{ fontSize: 12 }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </Paper>
            </SimpleGrid>
        </Stack>
    );
}
