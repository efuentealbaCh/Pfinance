import { useState } from 'react';
import {
    Alert,
    Badge,
    Card,
    Center,
    Container,
    Group,
    Loader,
    Paper,
    Progress,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import {
    IconAlertCircle,
    IconArrowDownRight,
    IconArrowUpRight,
    IconChartDonut,
    IconMinus,
    IconReportMoney,
} from '@tabler/icons-react';
import Money from '../components/Money';
import { formatMoney } from '../utils/money';
import { apiErrorMessage, useMonthlySummary, type MonthlyVariation } from '../api/queries';

/** Nombre del mes a partir de un `YYYY-MM`, sin pasar por `Date` para no correr el mes por huso. */
const MONTH_NAMES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function describeMonth(key: string): string {
    const [year, month] = key.split('-');
    return `${MONTH_NAMES[Number(month) - 1]} de ${year}`;
}

/** Mes anterior al actual en `YYYY-MM`. Es el mismo default que aplica el backend. */
function previousMonthKey(): string {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

interface VariationBadgeProps {
    variation: MonthlyVariation;
    /** En gastos, subir es malo; en ingresos, es bueno. Sin esto todo subir se vería verde. */
    higherIsBetter: boolean;
    currency: string;
}

/** Comparación contra el mes anterior, con el color puesto según lo que significa para el usuario. */
function VariationBadge({ variation, higherIsBetter, currency }: VariationBadgeProps) {
    if (variation.direction === 'flat') {
        return (
            <Badge color="gray" variant="light" leftSection={<IconMinus size={12} />}>
                Igual que el mes anterior
            </Badge>
        );
    }

    const isUp = variation.direction === 'up';
    const isGood = isUp === higherIsBetter;

    return (
        <Badge
            color={isGood ? 'teal' : 'red'}
            variant="light"
            leftSection={isUp ? <IconArrowUpRight size={12} /> : <IconArrowDownRight size={12} />}
        >
            {variation.percentage !== null
                ? `${Math.abs(variation.percentage)}% vs mes anterior`
                : `${formatMoney(Math.abs(variation.difference), currency as any)} vs mes anterior`}
        </Badge>
    );
}

/**
 * Resumen mensual bajo demanda.
 *
 * Existe como pantalla, y no solo como el correo del día 1, porque en Render gratuito el
 * servicio se duerme y ese cron puede no ejecutarse nunca: sin esta vista, un mes sin correo
 * es un mes sin resumen.
 */
export default function MonthlySummaryPage() {
    const [month, setMonth] = useState(previousMonthKey());
    const { data, isLoading, isError, error } = useMonthlySummary(month);

    const currency = data?.currency ?? 'CLP';

    return (
        <Container size="xl" py="md">
            <Group justify="space-between" mb="xl" align="flex-end">
                <div>
                    <Title order={2} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <IconReportMoney size={26} /> Resumen mensual
                    </Title>
                    {data && (
                        <Text size="sm" c="dimmed" mt={4}>
                            {describeMonth(data.month.key)} · {data.totals.transactions_count} movimiento
                            {data.totals.transactions_count === 1 ? '' : 's'} · montos en {data.currency}
                        </Text>
                    )}
                </div>
                <TextInput
                    type="month"
                    label="Mes"
                    radius="md"
                    value={month}
                    onChange={(event) => setMonth(event.currentTarget.value)}
                    w={180}
                />
            </Group>

            {isLoading && (
                <Center py="xl">
                    <Loader color="teal" />
                </Center>
            )}

            {isError && (
                <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={18} />}>
                    {apiErrorMessage(error, 'No se pudo cargar el resumen de este mes.')}
                </Alert>
            )}

            {data && !data.has_activity && (
                <Alert color="blue" variant="light" radius="md" icon={<IconAlertCircle size={18} />}>
                    No hubo movimientos en {describeMonth(data.month.key)}. Elegí otro mes para ver un
                    resumen con datos.
                </Alert>
            )}

            {data && data.has_activity && (
                <Stack gap="xl">
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                        <Card withBorder shadow="sm" radius="lg" padding="lg">
                            <Text size="sm" c="dimmed" mb={4}>
                                Ingresos
                            </Text>
                            <Money amount={data.totals.income} currency={currency} fw={700} fz="1.6rem" c="teal" />
                            <Group mt="sm">
                                <VariationBadge variation={data.comparison.income} higherIsBetter currency={currency} />
                            </Group>
                        </Card>

                        <Card withBorder shadow="sm" radius="lg" padding="lg">
                            <Text size="sm" c="dimmed" mb={4}>
                                Gastos
                            </Text>
                            <Money amount={data.totals.expense} currency={currency} fw={700} fz="1.6rem" c="red" />
                            <Group mt="sm">
                                <VariationBadge
                                    variation={data.comparison.expense}
                                    higherIsBetter={false}
                                    currency={currency}
                                />
                            </Group>
                        </Card>

                        <Card withBorder shadow="sm" radius="lg" padding="lg">
                            <Text size="sm" c="dimmed" mb={4}>
                                Balance
                            </Text>
                            <Money
                                amount={data.totals.balance}
                                currency={currency}
                                fw={700}
                                fz="1.6rem"
                                c={data.totals.balance >= 0 ? 'teal' : 'red'}
                            />
                            <Text size="xs" c="dimmed" mt="sm">
                                Mes anterior:{' '}
                                {formatMoney(data.previous_totals.balance, currency as any)}
                            </Text>
                        </Card>
                    </SimpleGrid>

                    <Paper withBorder shadow="sm" radius="lg" p="lg">
                        <Text fw={600} size="lg" mb="md" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <IconChartDonut size={18} /> En qué se fue la plata
                        </Text>

                        {data.expenses_by_category.length === 0 ? (
                            <Text size="sm" c="dimmed">
                                Este mes no hubo gastos registrados.
                            </Text>
                        ) : (
                            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                                <div style={{ height: 280 }}>
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={data.expenses_by_category}
                                                dataKey="total"
                                                nameKey="name"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={2}
                                            >
                                                {data.expenses_by_category.map((category) => (
                                                    <Cell key={category.name} fill={category.color} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip
                                                formatter={(value) => formatMoney(Number(value), currency as any)}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <Stack gap="sm" justify="center">
                                    {data.expenses_by_category.map((category) => (
                                        <div key={category.name}>
                                            <Group justify="space-between" mb={4} wrap="nowrap">
                                                <Group gap={6} wrap="nowrap">
                                                    <div
                                                        style={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: '50%',
                                                            backgroundColor: category.color,
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                    <Text size="sm" lineClamp={1}>
                                                        {category.name}
                                                    </Text>
                                                </Group>
                                                <Group gap={8} wrap="nowrap">
                                                    <Money amount={category.total} currency={currency} size="sm" fw={600} />
                                                    <Text size="xs" c="dimmed" w={44} ta="right">
                                                        {category.percentage}%
                                                    </Text>
                                                </Group>
                                            </Group>
                                            <Progress value={category.percentage} color={category.color} size="sm" radius="xl" />
                                        </div>
                                    ))}
                                </Stack>
                            </SimpleGrid>
                        )}
                    </Paper>
                </Stack>
            )}
        </Container>
    );
}
