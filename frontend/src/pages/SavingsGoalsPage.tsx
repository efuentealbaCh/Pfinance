import { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Title,
    Button,
    Paper,
    Group,
    Text,
    ActionIcon,
    Tooltip,
    Stack,
    Progress,
    Badge,
    SimpleGrid,
    RingProgress,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import api from '../api/axios';
import SavingsGoalModal from '../components/SavingsGoalModal';
import SavingsGoalDepositModal from '../components/SavingsGoalDepositModal';

interface GoalData {
    id: string;
    name: string;
    target_amount: number;
    current_amount: number;
    deadline: string | null;
    icon: string | null;
    color: string | null;
    percentage: number;
    remaining: number;
    is_completed: boolean;
}

function formatCurrency(value: number): string {
    return '$' + value.toLocaleString('es-CL', { minimumFractionDigits: 0 });
}

function formatDate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
}

function getDaysRemaining(deadline: string): number {
    const now = new Date();
    const target = new Date(deadline + 'T23:59:59');
    const diff = target.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function SavingsGoalsPage() {
    const [goals, setGoals] = useState<GoalData[]>([]);
    const [modalOpened, setModalOpened] = useState(false);
    const [editGoal, setEditGoal] = useState<{
        id: string;
        name: string;
        target_amount: number;
        deadline: string | null;
        icon: string | null;
        color: string | null;
    } | null>(null);
    const [depositModal, setDepositModal] = useState<{
        opened: boolean;
        goalId: string | null;
        goalName: string;
        currentAmount: number;
        targetAmount: number;
    }>({
        opened: false,
        goalId: null,
        goalName: '',
        currentAmount: 0,
        targetAmount: 0,
    });

    const fetchGoals = useCallback(async () => {
        try {
            const res = await api.get('/savings-goals');
            setGoals(res.data.goals);
        } catch {
            notifications.show({
                title: 'Error',
                message: 'No se pudieron cargar las metas de ahorro.',
                color: 'red',
            });
        }
    }, []);

    useEffect(() => {
        fetchGoals();
    }, [fetchGoals]);

    const handleEdit = (goal: GoalData) => {
        setEditGoal({
            id: goal.id,
            name: goal.name,
            target_amount: goal.target_amount,
            deadline: goal.deadline,
            icon: goal.icon,
            color: goal.color,
        });
        setModalOpened(true);
    };

    const handleDeposit = (goal: GoalData) => {
        setDepositModal({
            opened: true,
            goalId: goal.id,
            goalName: goal.name,
            currentAmount: goal.current_amount,
            targetAmount: goal.target_amount,
        });
    };

    const handleDelete = async (goal: GoalData) => {
        if (!window.confirm(`¿Eliminar la meta "${goal.name}"?`)) return;
        try {
            await api.delete(`/savings-goals/${goal.id}`);
            notifications.show({
                title: 'Meta eliminada',
                message: `"${goal.name}" fue eliminada.`,
                color: 'teal',
            });
            fetchGoals();
        } catch {
            notifications.show({
                title: 'Error',
                message: 'No se pudo eliminar la meta.',
                color: 'red',
            });
        }
    };

    const handleModalClose = () => {
        setModalOpened(false);
        setEditGoal(null);
    };

    const handleGoalSaved = () => {
        notifications.show({
            title: editGoal ? 'Meta actualizada' : 'Meta creada',
            message: editGoal
                ? 'Los cambios fueron guardados.'
                : 'Tu nueva meta de ahorro fue creada.',
            color: 'teal',
        });
        fetchGoals();
    };

    // Resumen
    const totalSaved = goals.reduce((sum, g) => sum + g.current_amount, 0);
    const totalTarget = goals.reduce((sum, g) => sum + g.target_amount, 0);
    const completedGoals = goals.filter((g) => g.is_completed).length;

    return (
        <>
            <Container size="md" py="xl">
                <Paper withBorder shadow="xl" p="xl" radius="lg">
                    {/* ─── Header ─────────────────────────────────────── */}
                    <Group justify="space-between" mb="xl">
                        <Title order={3}>🎯 Metas de Ahorro</Title>
                        <Button
                            color="teal"
                            radius="md"
                            onClick={() => {
                                setEditGoal(null);
                                setModalOpened(true);
                            }}
                        >
                            ➕ Nueva meta
                        </Button>
                    </Group>

                    {/* ─── Resumen ─────────────────────────────────────── */}
                    {goals.length > 0 && (
                        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mb="xl">
                            <Paper withBorder p="md" radius="md" bg="dark.6">
                                <Text c="dimmed" size="xs" fw={600} tt="uppercase" mb={4}>
                                    Total Ahorrado
                                </Text>
                                <Text fw={700} size="xl" c="teal">
                                    {formatCurrency(totalSaved)}
                                </Text>
                            </Paper>
                            <Paper withBorder p="md" radius="md" bg="dark.6">
                                <Text c="dimmed" size="xs" fw={600} tt="uppercase" mb={4}>
                                    Total Objetivo
                                </Text>
                                <Text fw={700} size="xl" c="blue">
                                    {formatCurrency(totalTarget)}
                                </Text>
                            </Paper>
                            <Paper withBorder p="md" radius="md" bg="dark.6">
                                <Text c="dimmed" size="xs" fw={600} tt="uppercase" mb={4}>
                                    Metas Completadas
                                </Text>
                                <Text fw={700} size="xl" c={completedGoals > 0 ? 'teal' : 'dimmed'}>
                                    {completedGoals} / {goals.length}
                                </Text>
                            </Paper>
                        </SimpleGrid>
                    )}

                    {/* ─── Grid de metas ──────────────────────────────── */}
                    {goals.length === 0 ? (
                        <Stack align="center" py="xl" gap="md">
                            <Text size="3rem">🎯</Text>
                            <Text c="dimmed" ta="center">
                                No hay metas de ahorro registradas aún.
                            </Text>
                            <Text c="dimmed" size="sm" ta="center">
                                Crea una meta para empezar a ahorrar con propósito.
                            </Text>
                        </Stack>
                    ) : (
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                            {goals.map((goal) => {
                                const color = goal.color || '#4ECDC4';
                                const daysLeft = goal.deadline
                                    ? getDaysRemaining(goal.deadline)
                                    : null;

                                return (
                                    <Paper
                                        key={goal.id}
                                        withBorder
                                        p="lg"
                                        radius="md"
                                        style={{
                                            borderLeft: `4px solid ${color}`,
                                            transition:
                                                'transform 0.15s ease, box-shadow 0.15s ease',
                                            opacity: goal.is_completed ? 0.85 : 1,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow =
                                                '0 4px 12px rgba(0,0,0,0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {/* Top: Name + Actions */}
                                        <Group justify="space-between" mb="sm" wrap="nowrap">
                                            <Group gap="xs" wrap="nowrap">
                                                <Text size="xl">{goal.icon || '🎯'}</Text>
                                                <Stack gap={0}>
                                                    <Text fw={600} size="sm" lineClamp={1}>
                                                        {goal.name}
                                                    </Text>
                                                    <Group gap={4}>
                                                        {goal.is_completed && (
                                                            <Badge color="teal" variant="filled" size="xs">
                                                                ✅ Completada
                                                            </Badge>
                                                        )}
                                                        {goal.deadline && (
                                                            <Badge
                                                                size="xs"
                                                                variant="light"
                                                                color={
                                                                    daysLeft !== null && daysLeft < 0
                                                                        ? 'red'
                                                                        : daysLeft !== null && daysLeft <= 30
                                                                          ? 'orange'
                                                                          : 'gray'
                                                                }
                                                            >
                                                                📅 {formatDate(goal.deadline)}
                                                                {daysLeft !== null && daysLeft >= 0
                                                                    ? ` (${daysLeft}d)`
                                                                    : daysLeft !== null
                                                                      ? ' (vencida)'
                                                                      : ''}
                                                            </Badge>
                                                        )}
                                                    </Group>
                                                </Stack>
                                            </Group>

                                            <Group gap={4} wrap="nowrap">
                                                <Tooltip label="Abonar / Retirar">
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color="teal"
                                                        size="sm"
                                                        onClick={() => handleDeposit(goal)}
                                                    >
                                                        💰
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip label="Editar">
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color="blue"
                                                        size="sm"
                                                        onClick={() => handleEdit(goal)}
                                                    >
                                                        ✏️
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip label="Eliminar">
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color="red"
                                                        size="sm"
                                                        onClick={() => handleDelete(goal)}
                                                    >
                                                        🗑️
                                                    </ActionIcon>
                                                </Tooltip>
                                            </Group>
                                        </Group>

                                        {/* Ring + Info */}
                                        <Group wrap="nowrap" gap="md">
                                            <RingProgress
                                                size={80}
                                                thickness={8}
                                                roundCaps
                                                sections={[
                                                    {
                                                        value: Math.min(goal.percentage, 100),
                                                        color: goal.is_completed ? 'teal' : color,
                                                    },
                                                ]}
                                                label={
                                                    <Text ta="center" fw={700} size="xs">
                                                        {goal.percentage}%
                                                    </Text>
                                                }
                                            />
                                            <Stack gap={4} style={{ flex: 1 }}>
                                                <Group justify="space-between">
                                                    <Text size="xs" c="dimmed">
                                                        Ahorrado
                                                    </Text>
                                                    <Text size="sm" fw={600} c="teal">
                                                        {formatCurrency(goal.current_amount)}
                                                    </Text>
                                                </Group>
                                                <Progress
                                                    value={Math.min(goal.percentage, 100)}
                                                    color={goal.is_completed ? 'teal' : color}
                                                    size="sm"
                                                    radius="xl"
                                                    animated={!goal.is_completed && goal.percentage > 0}
                                                />
                                                <Group justify="space-between">
                                                    <Text size="xs" c="dimmed">
                                                        Objetivo
                                                    </Text>
                                                    <Text size="xs" c="dimmed">
                                                        {formatCurrency(goal.target_amount)}
                                                    </Text>
                                                </Group>
                                                {!goal.is_completed && (
                                                    <Text size="xs" c="dimmed" ta="right">
                                                        Faltan {formatCurrency(goal.remaining)}
                                                    </Text>
                                                )}
                                            </Stack>
                                        </Group>
                                    </Paper>
                                );
                            })}
                        </SimpleGrid>
                    )}
                </Paper>
            </Container>

            <SavingsGoalModal
                opened={modalOpened}
                onClose={handleModalClose}
                onSuccess={handleGoalSaved}
                editData={editGoal}
            />

            <SavingsGoalDepositModal
                opened={depositModal.opened}
                onClose={() =>
                    setDepositModal((prev) => ({ ...prev, opened: false }))
                }
                onSuccess={fetchGoals}
                goalId={depositModal.goalId}
                goalName={depositModal.goalName}
                currentAmount={depositModal.currentAmount}
                targetAmount={depositModal.targetAmount}
            />
        </>
    );
}
