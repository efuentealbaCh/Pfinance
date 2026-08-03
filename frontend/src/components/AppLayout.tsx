import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  AppShell,
  Group,
  Text,
  UnstyledButton,
  Stack,
  Avatar,
  Burger,
  Divider,
  Tooltip,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../context/AuthContext";
import { usePushSubscribe, getVapidPublicKey } from "../api/queries";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "📊", path: "/dashboard" },
  { label: "Transacciones", icon: "💰", path: "/transactions" },
  { label: "Categorías", icon: "🏷️", path: "/categories" },
  { label: "Presupuestos", icon: "📋", path: "/budgets" },
  { label: "Metas", icon: "🎯", path: "/savings" },
  { label: "Grupos", icon: "👥", path: "/groups" },
  { label: "Mi Perfil", icon: "👤", path: "/profile" },
];

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure();
  const [loggingOut, setLoggingOut] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const pushSubscribeMutation = usePushSubscribe();

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window && user) {
      navigator.serviceWorker.ready.then(async (registration) => {
        try {
          const subscription = await registration.pushManager.getSubscription();
          if (!subscription) {
            const vapidPublicKey = await getVapidPublicKey();
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            const newSubscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey,
            });

            pushSubscribeMutation.mutate(newSubscription);
          } else {
            pushSubscribeMutation.mutate(subscription);
          }
        } catch (err) {
          console.error("Error during push subscription:", err);
        }
      });
    }
  }, [user]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate("/login");
  };

  const isDark = colorScheme === "dark";

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        main: {
          background:
            "light-dark(#f1f5f9, linear-gradient(135deg, #0b1329 0%, #111827 100%))",
          minHeight: "100vh",
        },
        header: {
          backgroundColor: "light-dark(#303132, #0b1329)",
          borderBottom: "1px solid light-dark(#4a4b4c, #1e293b)",
        },
        navbar: {
          backgroundColor: "light-dark(#303132, #0b1329)",
          borderRight: "1px solid light-dark(#4a4b4c, #1e293b)",
        },
      }}
    >
      {/* ─── Header ──────────────────────────────────────── */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              color="#ffffff"
            />
            <Text
              size="xl"
              fw={800}
              variant="gradient"
              gradient={{ from: "teal.3", to: "cyan.3", deg: 45 }}
            >
              💸 Pfinance
            </Text>
          </Group>
          <Group gap="sm">
            <ActionIcon
              variant="default"
              size="lg"
              radius="xl"
              onClick={toggleColorScheme}
              title="Alternar tema claro/oscuro"
              style={{
                color: "#ffffff",
                borderColor: "rgba(255, 255, 255, 0.15)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              {isDark ? "☀️" : "🌙"}
            </ActionIcon>
            <Avatar color="teal" radius="xl" size="sm">
              {user?.name?.charAt(0).toUpperCase() || "?"}
            </Avatar>
            <Text
              size="sm"
              visibleFrom="sm"
              fw={600}
              style={{ color: "#e2e8f0" }}
            >
              {user?.name}
            </Text>
          </Group>
        </Group>
      </AppShell.Header>

      {/* ─── Sidebar ─────────────────────────────────────── */}
      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          <Stack gap={6}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={close}
                style={{ textDecoration: "none" }}
              >
                {({ isActive }) => (
                  <UnstyledButton
                    w="100%"
                    p="sm"
                    style={{
                      borderRadius: 8,
                      backgroundColor: isActive
                        ? "rgba(45, 212, 191, 0.18)"
                        : "transparent",
                      borderLeft: isActive
                        ? "3px solid #2dd4bf"
                        : "3px solid transparent",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(255, 255, 255, 0.08)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "transparent";
                      }
                    }}
                  >
                    <Group gap="sm">
                      <Text size="lg">{item.icon}</Text>
                      <Text
                        size="sm"
                        fw={isActive ? 600 : 400}
                        style={{
                          color: isActive ? "#2dd4bf" : "#cbd5e1",
                        }}
                      >
                        {item.label}
                      </Text>
                    </Group>
                  </UnstyledButton>
                )}
              </NavLink>
            ))}
          </Stack>
        </AppShell.Section>

        <Divider my="sm" color="rgba(255, 255, 255, 0.12)" />

        <AppShell.Section>
          <Tooltip label="Cerrar sesión" position="right">
            <UnstyledButton
              w="100%"
              p="sm"
              onClick={handleLogout}
              disabled={loggingOut}
              style={{
                borderRadius: 8,
                opacity: loggingOut ? 0.5 : 1,
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "rgba(248, 113, 113, 0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
              }}
            >
              <Group gap="sm">
                <Text size="lg">🚪</Text>
                <Text size="sm" fw={500} style={{ color: "#f87171" }}>
                  {loggingOut ? "Cerrando..." : "Cerrar sesión"}
                </Text>
              </Group>
            </UnstyledButton>
          </Tooltip>
        </AppShell.Section>
      </AppShell.Navbar>

      {/* ─── Content ─────────────────────────────────────── */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
