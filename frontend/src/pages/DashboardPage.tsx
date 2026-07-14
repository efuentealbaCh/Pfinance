import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Title,
  Text,
  Button,
  Paper,
  Group,
  Stack,
  Collapse,
  Divider,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import api from "../api/axios";
import AccountModal from "../components/AccountModal";
import AccountList from "../components/AccountList";
import DashboardAnalytics from "../components/DashboardAnalytics";

interface Account {
  id: string;
  identifier: string | null;
  balance: string;
  bank_id: string;
  account_type_id: string;
  bank: { id: string; name: string };
  account_type: { id: string; name: string };
}

export default function DashboardPage() {
  const { user } = useAuth();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showAccounts, setShowAccounts] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [editAccount, setEditAccount] = useState<Account | null>(null);

  const fetchAccounts = useCallback(async () => {
    try {
      const res = await api.get("/user-accounts");
      setAccounts(res.data.accounts);
    } catch {
      notifications.show({
        title: "Error",
        message: "No se pudieron cargar las cuentas.",
        color: "red",
      });
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + Number(acc.balance),
    0,
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar esta cuenta?")) return;
    try {
      await api.delete(`/user-accounts/${id}`);
      notifications.show({
        title: "Cuenta eliminada",
        message: "La cuenta fue eliminada correctamente.",
        color: "teal",
      });
      fetchAccounts();
    } catch {
      notifications.show({
        title: "Error",
        message: "No se pudo eliminar la cuenta.",
        color: "red",
      });
    }
  };

  const handleModalClose = () => {
    setModalOpened(false);
    setEditAccount(null);
  };

  const handleAccountSaved = () => {
    notifications.show({
      title: editAccount ? "Cuenta actualizada" : "Cuenta creada",
      message: editAccount
        ? "Los cambios fueron guardados."
        : "Tu nueva cuenta fue registrada.",
      color: "teal",
    });
    fetchAccounts();
  };

  return (
    <>
      <Container size="md" py="xl">
        <Title order={3} mb="xl">
          📊 Dashboard — ¡Hola, {user?.name}!
        </Title>

        <Stack gap="md">
          {/* ─── Balance Total ─────────────────────────────── */}
          <Paper withBorder p="lg" radius="md">
            <Text c="dimmed" size="sm" mb={4}>
              Balance total
            </Text>
            <Title order={2} c="teal">
              $
              {totalBalance.toLocaleString("es-CL", {
                minimumFractionDigits: 2,
              })}
            </Title>
            <Text c="dimmed" size="xs" mt={4}>
              Suma de todas tus cuentas registradas
            </Text>
          </Paper>

          {/* ─── Analíticas y Gráficos ─────────────────────── */}
          <DashboardAnalytics accounts={accounts} />

          {/* ─── Acciones de Cuentas ───────────────────────── */}
          <Divider label="Mis cuentas" labelPosition="center" />

          <Group justify="center" gap="sm">
            <Button
              color="teal"
              radius="md"
              onClick={() => {
                setEditAccount(null);
                setModalOpened(true);
              }}
            >
              ➕ Agregar cuenta
            </Button>
            <Button
              variant={showAccounts ? "filled" : "outline"}
              color="teal"
              radius="md"
              onClick={() => setShowAccounts(!showAccounts)}
            >
              {showAccounts
                ? "🔽 Ocultar cuentas"
                : `📋 Ver cuentas (${accounts.length})`}
            </Button>
          </Group>

          {/* ─── Lista de Cuentas (Toggle) ─────────────────── */}
          <Collapse in={showAccounts} transitionDuration={300}>
            <AccountList
              accounts={accounts}
              onEdit={(acc) => {
                setEditAccount(acc);
                setModalOpened(true);
              }}
              onDelete={handleDelete}
            />
          </Collapse>
        </Stack>
      </Container>

      <AccountModal
        opened={modalOpened}
        onClose={handleModalClose}
        onSuccess={handleAccountSaved}
        editData={
          editAccount
            ? {
                id: editAccount.id,
                bank_id: editAccount.bank_id,
                account_type_id: editAccount.account_type_id,
                identifier: editAccount.identifier || "",
                balance: Number(editAccount.balance),
              }
            : null
        }
      />
    </>
  );
}
