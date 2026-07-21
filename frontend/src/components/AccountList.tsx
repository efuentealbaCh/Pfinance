import {
  Text,
  Group,
  Badge,
  ActionIcon,
  Stack,
  Tooltip,
  Avatar,
  Accordion,
  CopyButton,
  Divider,
} from '@mantine/core';
import { IconCopy, IconCheck, IconEdit, IconTrash, IconCreditCard } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';

interface CardData {
  id: string;
  name: string;
  type: string;
  last_four: string;
  balance: string;
}

interface Account {
  id: string;
  identifier: string | null;
  balance: string;
  bank_id: string;
  account_type_id: string;
  bank: { id: string; name: string; logo?: string | null };
  account_type: { id: string; name: string };
  cards?: CardData[];
}

export interface AccountListProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}

export default function AccountList({ accounts, onEdit, onDelete }: AccountListProps) {
  const { user } = useAuth();

  if (accounts.length === 0) {
    return (
      <Text c="dimmed" ta="center" size="sm" py="md">
        No tienes cuentas registradas. ¡Agrega una!
      </Text>
    );
  }

  const formatCopyData = (account: Account) => {
    return `${user?.name || 'Nombre no disponible'}
${user?.rut || 'RUT no disponible'}
${account.account_type.name}
${account.identifier || 'Sin número'}
${account.bank.name}
${user?.email || 'Email no disponible'}`;
  };

  return (
    <Accordion variant="separated" radius="md">
      {accounts.map((account) => (
        <Accordion.Item key={account.id} value={account.id}>
          <Accordion.Control>
            <Group justify="space-between" wrap="nowrap" w="100%">
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
              <Group gap="xs" wrap="nowrap" onClick={(e) => e.stopPropagation()}>
                <Text fw={700} size="lg" c="teal" style={{ whiteSpace: 'nowrap', marginRight: '8px' }}>
                  ${Number(account.balance).toLocaleString('es-CL', { minimumFractionDigits: 2 })}
                </Text>

                <CopyButton value={formatCopyData(account)} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copiado' : 'Copiar Datos'}>
                      <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                        {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>

                <Tooltip label="Editar">
                  <ActionIcon variant="subtle" color="blue" onClick={() => onEdit(account)}>
                    <IconEdit size={18} />
                  </ActionIcon>
                </Tooltip>

                <Tooltip label="Eliminar">
                  <ActionIcon variant="subtle" color="red" onClick={() => onDelete(account.id)}>
                    <IconTrash size={18} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
          </Accordion.Control>
          
          <Accordion.Panel>
            <Divider my="sm" />
            <Text fw={600} size="sm" mb="sm" c="dimmed">
              Tarjetas Asociadas
            </Text>
            {account.cards && account.cards.length > 0 ? (
              <Stack gap="xs">
                {account.cards.map((card) => (
                  <Group key={card.id} justify="space-between" align="center" p="sm" style={{ borderRadius: '8px', border: '1px solid var(--mantine-color-default-border)' }}>
                    <Group gap="sm">
                      <ActionIcon variant="light" color={card.type === 'credit' ? 'blue' : 'green'} size="lg" radius="xl">
                        <IconCreditCard size={18} />
                      </ActionIcon>
                      <div>
                        <Text size="sm" fw={500}>{card.name}</Text>
                        <Text size="xs" c="dimmed">
                          {card.type === 'credit' ? 'Crédito' : 'Débito'} •••• {card.last_four}
                        </Text>
                      </div>
                    </Group>
                    <Text fw={600} size="sm" c={card.type === 'credit' ? 'blue' : 'green'}>
                      ${Number(card.balance).toLocaleString('es-CL', { minimumFractionDigits: 2 })}
                    </Text>
                  </Group>
                ))}
              </Stack>
            ) : (
              <Text size="sm" c="dimmed">No hay tarjetas vinculadas a esta cuenta.</Text>
            )}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
