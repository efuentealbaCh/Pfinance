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
    Progress,
    Badge,
    SegmentedControl,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
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

interface BudgetProgress {
    id: string;
    category_name: string;
    category_icon: string | null;
    category_color: string;
    amount: number;
    spent: number;
    percentage: number;
    period: string;
    alert: boolean;
}

interface SavingsGoalProgress {
    id: string;
    name: string;
    icon: string | null;
    color: string;
    target_amount: number;
    current_amount: number;
    percentage: number;
    remaining: number;
    is_completed: boolean;
    deadline: string | null;
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
    const [budgetProgress, setBudgetProgress] = useState<BudgetProgress[]>([]);
    const [savingsGoals, setSavingsGoals] = useState<SavingsGoalProgress[]>([]);
    const [alertsShown, setAlertsShown] = useState(false);

    const [accountId, setAccountId] = useState<string | null>(null);
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [period, setPeriod] = useState<string>('');

    const handlePeriodChange = (val: string) => {
        setPeriod(val);
        const to = new Date();
        let from = new Date();
        if (val === '30d') {
            from.setDate(to.getDate() - 30);
        } else if (val === '3m') {
            from.setMonth(to.getMonth() - 3);
        } else if (val === '6m') {
            from.setMonth(to.getMonth() - 6);
        } else if (val === '1y') {
            from.setFullYear(to.getFullYear() - 1);
        } else {
            return;
        }
        setDateFrom(from);
        setDateTo(to);
    };

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
            setBudgetProgress(res.data.budgetProgress || []);
            setSavingsGoals(res.data.savingsGoals || []);
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

    // Mostrar alertas de presupuestos al 80%+ (solo una vez por carga)
    useEffect(() => {
        if (budgetProgress.length > 0 && !alertsShown) {
            const alertBudgets = budgetProgress.filter((b) => b.alert);
            alertBudgets.forEach((b) => {
                notifications.show({
                    title: b.percentage >= 100
                        ? `⛔ Presupuesto excedido: ${b.category_name}`
                        : `⚠️ Presupuesto al límite: ${b.category_name}`,
                    message: `Has gastado ${formatCurrency(b.spent)} de ${formatCurrency(b.amount)} (${b.percentage}%)`,
                    color: b.percentage >= 100 ? 'red' : 'orange',
                    autoClose: 8000,
                });
            });
            setAlertsShown(true);
        }
    }, [budgetProgress, alertsShown]);

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
                    {payload.map((entry: any, index: number) => {
                        let nameLabel = entry.name;
                        if (entry.name === 'income') nameLabel = 'Ingresos';
                        if (entry.name === 'expense') nameLabel = 'Egresos';
                        if (entry.name === 'balance') nameLabel = 'Saldo Acumulado';

                        return (
                            <Group key={index} justify="space-between" gap="xl" wrap="nowrap">
                                <Text size="xs" c={entry.color}>
                                    {nameLabel}
                                </Text>
                                <Text size="xs" fw={700}>
                                    {formatCurrency(entry.value)}
                                </Text>
                            </Group>
                        );
                    })}
                </Paper>
            );
        }
        return null;
    };

    // Process cumulative balance
    let runningBalance = 0;
    const cumulativeChartData = chartData.map(d => {
        const netFlow = d.income - d.expense;
        runningBalance += netFlow;
        return {
            ...d,
            balance: runningBalance
        };
    });

    // Process monthly data for bar chart
    const monthlyDataMap = new Map<string, { income: number; expense: number }>();
    chartData.forEach(d => {
        const month = d.date.substring(0, 7); // YYYY-MM
        const existing = monthlyDataMap.get(month) || { income: 0, expense: 0 };
        monthlyDataMap.set(month, {
            income: existing.income + d.income,
            expense: existing.expense + d.expense
        });
    });
    const monthlyChartData = Array.from(monthlyDataMap.entries()).map(([month, data]) => ({
        date: month,
        income: data.income,
        expense: data.expense
    }));

    return (
        <Stack gap="xl">
            {/* ─── Filtros ───────────────────────────────────────── */}
            <Paper withBorder p="md" radius="md" bg="dark.6">
                <Stack gap="sm">
                    <SegmentedControl
                        value={period}
                        onChange={handlePeriodChange}
                        data={[
                            { label: 'Personalizado', value: '' },
                            { label: 'Últimos 30 días', value: '30d' },
                            { label: 'Últimos 3 meses', value: '3m' },
                            { label: 'Últimos 6 meses', value: '6m' },
                            { label: 'Último año', value: '1y' },
                        ]}
                    />
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
                        onChange={(val) => { setDateTo(val); setPeriod(''); }}
                        radius="md"
                    />
                </Group>
                </Stack>
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
                {/* Gráfico de Evolución del Saldo */}
                <Paper withBorder p="md" radius="md">
                    <Title order={5} mb="lg" fw={600}>
                        📈 Evolución del Saldo
                    </Title>
                    {cumulativeChartData.length === 0 ? (
                        <Text c="dimmed" ta="center" py="xl">
                            No hay datos para mostrar en este periodo.
                        </Text>
                    ) : (
                        <div style={{ height: 300, width: '100%' }}>
                            <ResponsiveContainer>
                                <AreaChart data={cumulativeChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4dabf7" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4dabf7" stopOpacity={0} />
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
                                    <Legend verticalAlign="top" height={36} formatter={() => 'Saldo Acumulado'} />
                                    <Area
                                        type="monotone"
                                        dataKey="balance"
                                        name="balance"
                                        stroke="#4dabf7"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorBalance)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </Paper>

                {/* Gráfico de Barras: Ingresos vs Egresos por mes */}
                <Paper withBorder p="md" radius="md">
                    <Title order={5} mb="lg" fw={600}>
                        📊 Ingresos vs Egresos por Mes
                    </Title>
                    {monthlyChartData.length === 0 ? (
                        <Text c="dimmed" ta="center" py="xl">
                            No hay datos para mostrar.
                        </Text>
                    ) : (
                        <div style={{ height: 300, width: '100%' }}>
                            <ResponsiveContainer>
                                <BarChart data={monthlyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <XAxis
                                        dataKey="date"
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
                                    <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#2C2E33' }} />
                                    <Legend verticalAlign="top" height={36} formatter={(value) => (value === 'income' ? 'Ingresos' : 'Egresos')} />
                                    <Bar dataKey="income" name="income" fill="#12b886" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="expense" name="expense" fill="#fa5252" radius={[4, 4, 0, 0]} />
                                </BarChart>
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

            {/* ─── Presupuestos ─────────────────────────────────────── */}
            {budgetProgress.length > 0 && (
                <>
                    <Divider />
                    <Paper withBorder p="md" radius="md">
                        <Title order={5} mb="lg" fw={600}>
                            📋 Presupuestos del Período
                        </Title>
                        <Stack gap="md">
                            {budgetProgress.map((b) => {
                                const color =
                                    b.percentage >= 100
                                        ? 'red'
                                        : b.percentage >= 80
                                          ? 'orange'
                                          : b.percentage >= 50
                                            ? 'yellow'
                                            : 'teal';
                                const periodLabel =
                                    b.period === 'weekly'
                                        ? 'Semanal'
                                        : b.period === 'yearly'
                                          ? 'Anual'
                                          : 'Mensual';

                                return (
                                    <div key={b.id}>
                                        <Group justify="space-between" mb={4}>
                                            <Group gap="xs">
                                                <Text size="lg">
                                                    {b.category_icon || '📁'}
                                                </Text>
                                                <Text size="sm" fw={600}>
                                                    {b.category_name}
                                                </Text>
                                                <Badge
                                                    size="xs"
                                                    variant="light"
                                                    color="gray"
                                                >
                                                    {periodLabel}
                                                </Badge>
                                            </Group>
                                            <Group gap="xs">
                                                <Text size="xs" c="dimmed">
                                                    {formatCurrency(b.spent)} / {formatCurrency(b.amount)}
                                                </Text>
                                                <Text size="sm" fw={700} c={color}>
                                                    {b.percentage}%
                                                </Text>
                                                {b.percentage >= 100 && (
                                                    <Badge color="red" variant="filled" size="xs">
                                                        Excedido
                                                    </Badge>
                                                )}
                                            </Group>
                                        </Group>
                                        <Progress
                                            value={Math.min(b.percentage, 100)}
                                            color={color}
                                            size="md"
                                            radius="xl"
                                            animated={b.percentage >= 80}
                                        />
                                    </div>
                                );
                            })}
                        </Stack>
                    </Paper>
                </>
            )}

            {/* ─── Metas de Ahorro ──────────────────────────────────── */}
            {savingsGoals.length > 0 && (
                <>
                    <Divider />
                    <Paper withBorder p="md" radius="md">
                        <Title order={5} mb="lg" fw={600}>
                            🎯 Progreso de Metas de Ahorro
                        </Title>
                        <Stack gap="md">
                            {savingsGoals.map((g) => {
                                const color = g.is_completed ? 'teal' : (g.color || '#4ECDC4');
                                
                                return (
                                    <div key={g.id}>
                                        <Group justify="space-between" mb={4}>
                                            <Group gap="xs">
                                                <Text size="lg">
                                                    {g.icon || '🎯'}
                                                </Text>
                                                <Text size="sm" fw={600}>
                                                    {g.name}
                                                </Text>
                                            </Group>
                                            <Group gap="xs">
                                                <Text size="xs" c="dimmed">
                                                    {formatCurrency(g.current_amount)} / {formatCurrency(g.target_amount)}
                                                </Text>
                                                <Text size="sm" fw={700} c={color}>
                                                    {g.percentage}%
                                                </Text>
                                                {g.is_completed && (
                                                    <Badge color="teal" variant="filled" size="xs">
                                                        ¡Alcanzada!
                                                    </Badge>
                                                )}
                                            </Group>
                                        </Group>
                                        <Progress
                                            value={Math.min(g.percentage, 100)}
                                            color={color}
                                            size="md"
                                            radius="xl"
                                            animated={!g.is_completed && g.percentage > 0}
                                        />
                                    </div>
                                );
                            })}
                        </Stack>
                    </Paper>
                </>
            )}
        </Stack>
    );
}
