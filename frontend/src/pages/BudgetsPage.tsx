import { useState, useEffect } from "react";
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
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useBudgets, useDeleteBudget } from "../api/queries";
import BudgetModal from "../components/BudgetModal";

interface BudgetData {
  id: string;
  category_id: string;
  amount: number;
  period: string;
  spent: number;
  percentage: number;
  period_from: string;
  period_to: string;
  category: {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
  };
}

const PERIOD_LABELS: Record<string, string> = {
  monthly: "Mensual",
  weekly: "Semanal",
  yearly: "Anual",
};

function getProgressColor(percentage: number): string {
  if (percentage >= 100) return "red";
  if (percentage >= 80) return "orange";
  if (percentage >= 50) return "yellow";
  return "teal";
}

function formatCurrency(value: number): string {
  return "$" + value.toLocaleString("es-CL", { minimumFractionDigits: 0 });
}

export default function BudgetsPage() {
  const { data: budgetsResponse, isLoading, isError } = useBudgets();
  const budgets: BudgetData[] = Array.isArray(budgetsResponse)
    ? budgetsResponse
    : [];
  const deleteMutation = useDeleteBudget();

  const [modalOpened, setModalOpened] = useState(false);
  const [editBudget, setEditBudget] = useState<{
    id: string;
    category_id: string;
    amount: number;
    period: string;
  } | null>(null);

  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Error",
        message: "No se pudieron cargar los presupuestos.",
        color: "red",
      });
    }
  }, [isError]);

  const handleEdit = (budget: BudgetData) => {
    setEditBudget({
      id: budget.id,
      category_id: budget.category_id,
      amount: budget.amount,
      period: budget.period,
    });
    setModalOpened(true);
  };

  const handleDelete = (budget: BudgetData) => {
    if (
      !window.confirm(`¿Eliminar el presupuesto de "${budget.category.name}"?`)
    )
      return;

    deleteMutation.mutate(budget.id, {
      onSuccess: () => {
        notifications.show({
          title: "Presupuesto eliminado",
          message: `El presupuesto de "${budget.category.name}" fue eliminado.`,
          color: "teal",
        });
      },
      onError: () => {
        notifications.show({
          title: "Error",
          message: "No se pudo eliminar el presupuesto.",
          color: "red",
        });
      },
    });
  };

  const handleModalClose = () => {
    setModalOpened(false);
    setEditBudget(null);
  };

  const handleBudgetSaved = () => {
    notifications.show({
      title: editBudget ? "Presupuesto actualizado" : "Presupuesto creado",
      message: editBudget
        ? "Los cambios fueron guardados."
        : "El nuevo presupuesto fue registrado.",
      color: "teal",
    });
  };

  return (
    <>
      <Container size="md" py="xl">
        <Paper withBorder shadow="xl" p="xl" radius="lg">
          {/* ─── Header ─────────────────────────────────────── */}
          <Group justify="space-between" mb="xl">
            <Title order={3}>📋 Presupuestos</Title>
            <Button
              color="teal"
              radius="md"
              onClick={() => {
                setEditBudget(null);
                setModalOpened(true);
              }}
            >
              ➕ Nuevo presupuesto
            </Button>
          </Group>

          {/* ─── Grid de presupuestos ──────────────────────── */}
          {budgets.length === 0 ? (
            <Stack align="center" py="xl" gap="md">
              <Text size="3rem">📊</Text>
              <Text c="dimmed" ta="center">
                No hay presupuestos registrados aún.
              </Text>
              <Text c="dimmed" size="sm" ta="center">
                Crea un presupuesto para controlar tus gastos por categoría.
              </Text>
            </Stack>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {budgets.map((budget: any) => {
                const progressColor = getProgressColor(budget.percentage);
                const isOver = budget.percentage >= 100;
                const isWarning =
                  budget.percentage >= 80 && budget.percentage < 100;

                return (
                  <Paper
                    key={budget.id}
                    withBorder
                    p="lg"
                    radius="md"
                    style={{
                      borderLeft: `4px solid ${budget.category.color || "#4ECDC4"}`,
                      transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Top row: Category + Actions */}
                    <Group justify="space-between" mb="sm" wrap="nowrap">
                      <Group gap="xs" wrap="nowrap">
                        <Text size="xl">{budget.category.icon || "📁"}</Text>
                        <Stack gap={0}>
                          <Text fw={600} size="sm" lineClamp={1}>
                            {budget.category.name}
                          </Text>
                          <Badge size="xs" variant="light" color="gray">
                            {PERIOD_LABELS[budget.period] || budget.period}
                          </Badge>
                        </Stack>
                      </Group>

                      <Group gap={4} wrap="nowrap">
                        <Tooltip label="Editar">
                          <ActionIcon
                            variant="subtle"
                            color="blue"
                            size="sm"
                            onClick={() => handleEdit(budget)}
                          >
                            ✏️
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Eliminar">
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            size="sm"
                            onClick={() => handleDelete(budget)}
                          >
                            🗑️
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Group>

                    {/* Amount info */}
                    <Group justify="space-between" mb={6}>
                      <Text size="xs" c="dimmed">
                        {formatCurrency(budget.spent)} gastado
                      </Text>
                      <Text size="xs" c="dimmed">
                        {formatCurrency(budget.amount)} límite
                      </Text>
                    </Group>

                    {/* Progress bar */}
                    <Progress
                      value={Math.min(budget.percentage, 100)}
                      color={progressColor}
                      size="lg"
                      radius="xl"
                      animated={isWarning || isOver}
                    />

                    {/* Percentage & alerts */}
                    <Group justify="space-between" mt={6}>
                      <Text size="sm" fw={700} c={progressColor}>
                        {budget.percentage}%
                      </Text>
                      {isOver && (
                        <Badge color="red" variant="filled" size="xs">
                          ⚠️ Excedido
                        </Badge>
                      )}
                      {isWarning && (
                        <Badge color="orange" variant="filled" size="xs">
                          ⚠️ Casi al límite
                        </Badge>
                      )}
                    </Group>
                  </Paper>
                );
              })}
            </SimpleGrid>
          )}
        </Paper>
      </Container>

      <BudgetModal
        opened={modalOpened}
        onClose={handleModalClose}
        onSuccess={handleBudgetSaved}
        editData={editBudget}
      />
    </>
  );
}
