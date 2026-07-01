import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { label: 'Dashboard',      icon: '📊', path: '/dashboard' },
  { label: 'Transacciones',  icon: '💰', path: '/transactions' },
  { label: 'Categorías',     icon: '🏷️', path: '/categories' },
  { label: 'Presupuestos',   icon: '📋', path: '/budgets' },
  { label: 'Metas',          icon: '🎯', path: '/savings' },
  { label: 'Mi Perfil',      icon: '👤', path: '/profile' },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure();
  const [loggingOut, setLoggingOut] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate('/login');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        main: {
          background: 'light-dark(#f8f9fa, linear-gradient(135deg, #0f172a 0%, #1e293b 100%))',
          minHeight: '100vh',
        },
        header: {
          backgroundColor: 'light-dark(#ffffff, #0f172a)',
          borderBottom: '1px solid light-dark(#e9ecef, #1e293b)',
        },
        navbar: {
          backgroundColor: 'light-dark(#ffffff, #0f172a)',
          borderRight: '1px solid light-dark(#e9ecef, #1e293b)',
        },
      }}
    >
      {/* ─── Header ──────────────────────────────────────── */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="light-dark(black, white)" />
            <Text
              size="xl"
              fw={800}
              variant="gradient"
              gradient={{ from: 'teal', to: 'cyan', deg: 45 }}
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
              title="Alternar tema oscuro"
            >
              {colorScheme === 'dark' ? '☀️' : '🌙'}
            </ActionIcon>
            <Avatar color="teal" radius="xl" size="sm">
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </Avatar>
            <Text size="sm" c="dimmed" visibleFrom="sm">
              {user?.name}
            </Text>
          </Group>
        </Group>
      </AppShell.Header>

      {/* ─── Sidebar ─────────────────────────────────────── */}
      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          <Stack gap={4}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={close}
                style={{ textDecoration: 'none' }}
              >
                {({ isActive }) => (
                  <UnstyledButton
                    w="100%"
                    p="sm"
                    style={{
                      borderRadius: 8,
                      backgroundColor: isActive
                        ? 'rgba(18, 184, 134, 0.15)'
                        : 'transparent',
                      borderLeft: isActive
                        ? '3px solid #12b886'
                        : '3px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          'rgba(255,255,255,0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          'transparent';
                      }
                    }}
                  >
                    <Group gap="sm">
                      <Text size="lg">{item.icon}</Text>
                      <Text
                        size="sm"
                        fw={isActive ? 600 : 400}
                        c={isActive ? 'teal' : 'dimmed'}
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

        <Divider my="sm" />

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
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  'rgba(250, 82, 82, 0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  'transparent';
              }}
            >
              <Group gap="sm">
                <Text size="lg">🚪</Text>
                <Text size="sm" c="red.4">
                  {loggingOut ? 'Cerrando...' : 'Cerrar sesión'}
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
