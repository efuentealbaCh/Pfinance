import {
  Paper,
  Text,
  Group,
  Badge,
  ActionIcon,
  Stack,
  Tooltip,
  Avatar,
} from '@mantine/core';

interface Account {
  id: string;
  identifier: string | null;
  balance: string;
  bank_id: string;
  account_type_id: string;
  bank: { id: string; name: string; logo?: string | null };
  account_type: { id: string; name: string };
}

export interface AccountListProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}

export default function AccountList({ accounts, onEdit, onDelete }: AccountListProps) {
  if (accounts.length === 0) {
    return (
      <Text c="dimmed" ta="center" size="sm" py="md">
        No tienes cuentas registradas. ¡Agrega una!
      </Text>
    );
  }

  return (
    <Stack gap="sm">
      {accounts.map((account) => (
        <Paper
          key={account.id}
          withBorder
          p="md"
          radius="md"
          style={{
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            cursor: 'default',
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
                {account.bank.logo ? (
                  <Avatar src={account.bank.logo} size="sm" radius="xl" alt={account.bank.name} />
                ) : (
                  <Avatar size="sm" radius="xl" color="teal">
                    {account.bank.name.charAt(0)}
                  </Avatar>
                )}
                <Text fw={600} size="sm" truncate>
                  {account.bank.name}
                </Text>
                <Badge size="xs" variant="light" color="teal">
                  {account.account_type.name}
                </Badge>
              </Group>
              {account.identifier && (
                <Text c="dimmed" size="xs">
                  {account.identifier}
                </Text>
              )}
            </div>

            <Group gap="xs" wrap="nowrap">
              <Text fw={700} size="lg" c="teal" style={{ whiteSpace: 'nowrap' }}>
                ${Number(account.balance).toLocaleString('es-CL', {
                  minimumFractionDigits: 2,
                })}
              </Text>

              <Tooltip label="Editar">
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  size="sm"
                  onClick={() => onEdit(account)}
                >
                  ✏️
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Eliminar">
                <ActionIcon
                  variant="subtle"
                  color="red"
                  size="sm"
                  onClick={() => onDelete(account.id)}
                >
                  🗑️
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}
