import { Container, Title, Button, Card, Text, Group, Tabs, Table, Badge, ActionIcon, Stack, TextInput, Modal } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useGroup, useInviteUser, usePaySharedDebt, useRemoveMember } from '../api/queries';
import { IconArrowLeft, IconUserPlus, IconCheck, IconMail, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import AddSharedDebtModal from '../components/AddSharedDebtModal';
import { useAuth } from '../context/AuthContext';

export default function GroupDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: group, isLoading } = useGroup(id!);
  const inviteMutation = useInviteUser();
  const payMutation = usePaySharedDebt();
  const removeMemberMutation = useRemoveMember();
  
  const [inviteOpened, { open: openInvite, close: closeInvite }] = useDisclosure(false);
  const [debtOpened, { open: openDebt, close: closeDebt }] = useDisclosure(false);
  const [inviteEmail, setInviteEmail] = useState('');

  if (isLoading) return <Container py="xl"><Text>Cargando...</Text></Container>;
  if (!group) return <Container py="xl"><Text>Grupo no encontrado.</Text></Container>;

  const handleInvite = () => {
    inviteMutation.mutate(
      { groupId: id!, email: inviteEmail },
      {
        onSuccess: () => {
          notifications.show({ title: 'Invitación enviada', message: `Correo enviado a ${inviteEmail}`, color: 'green' });
          closeInvite();
          setInviteEmail('');
        },
        onError: (err: any) => {
          notifications.show({ title: 'Error', message: err.response?.data?.message || 'Error al invitar', color: 'red' });
        }
      }
    );
  };

  const handlePay = (debtId: string) => {
    payMutation.mutate(
      { debtId, groupId: id! },
      {
        onSuccess: () => {
          notifications.show({ title: 'Deuda Pagada', message: 'Has marcado tu parte como pagada.', color: 'green' });
        }
      }
    );
  };

  const handleRemoveMember = (userId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar a este miembro del grupo?')) return;
    
    removeMemberMutation.mutate(
      { groupId: id!, userId },
      {
        onSuccess: () => {
          notifications.show({ title: 'Miembro eliminado', message: 'El usuario ha sido eliminado del grupo.', color: 'green' });
        },
        onError: (err: any) => {
          notifications.show({ title: 'Error', message: err.response?.data?.message || 'Error al eliminar', color: 'red' });
        }
      }
    );
  };
  // Calculate balances (who owes what in total)
  const balances: Record<string, { name: string; owes: number; paid: number }> = {};
  group.users.forEach((u: any) => balances[u.id] = { name: u.name, owes: 0, paid: 0 });

  group.sharedDebts?.forEach((debt: any) => {
    debt.splits.forEach((split: any) => {
      if (balances[split.user_id]) {
        if (!split.is_paid) balances[split.user_id].owes += parseFloat(split.amount_owed);
        else balances[split.user_id].paid += parseFloat(split.amount_owed);
      }
    });
  });

  return (
    <Container size="xl" py="md">
      <Group mb="xl">
        <ActionIcon variant="subtle" onClick={() => navigate('/groups')} size="lg">
          <IconArrowLeft />
        </ActionIcon>
        <Title order={2}>{group.name}</Title>
      </Group>

      <Tabs defaultValue="debts">
        <Tabs.List>
          <Tabs.Tab value="debts">Deudas Compartidas</Tabs.Tab>
          <Tabs.Tab value="balances">Saldos</Tabs.Tab>
          <Tabs.Tab value="members">Miembros</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="debts" pt="xl">
          <Group justify="space-between" mb="md">
            <Text fw={500}>Historial de Gastos</Text>
            <Button onClick={openDebt}>Agregar Gasto</Button>
          </Group>
          <Stack>
            {group.sharedDebts?.length === 0 && <Text c="dimmed">No hay gastos compartidos aún.</Text>}
            {group.sharedDebts?.map((debt: any) => {
              const mySplit = debt.splits.find((s: any) => s.user_id === user?.id);
              
              return (
                <Card key={debt.id} withBorder shadow="sm">
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>{debt.title}</Text>
                    <Text fw={700}>${parseFloat(debt.amount).toFixed(2)}</Text>
                  </Group>
                  <Text size="sm" c="dimmed" mb="md">Creado por {debt.creator?.name} el {debt.date}</Text>

                  <Table size="sm" striped>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Miembro</Table.Th>
                        <Table.Th>Porcentaje</Table.Th>
                        <Table.Th>Monto</Table.Th>
                        <Table.Th>Estado</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {debt.splits.map((split: any) => (
                        <Table.Tr key={split.id}>
                          <Table.Td>{split.user?.name}</Table.Td>
                          <Table.Td>{split.percentage}%</Table.Td>
                          <Table.Td>${parseFloat(split.amount_owed).toFixed(2)}</Table.Td>
                          <Table.Td>
                            {split.is_paid ? (
                              <Badge color="green" variant="light">Pagado</Badge>
                            ) : (
                              <Badge color="red" variant="light">Pendiente</Badge>
                            )}
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>

                  {mySplit && !mySplit.is_paid && (
                    <Button 
                      mt="md" 
                      color="green" 
                      leftSection={<IconCheck size={16} />}
                      onClick={() => handlePay(debt.id)}
                      loading={payMutation.isPending}
                    >
                      Marcar mi parte como pagada (${parseFloat(mySplit.amount_owed).toFixed(2)})
                    </Button>
                  )}
                </Card>
              );
            })}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="balances" pt="xl">
          <Text fw={500} mb="md">Resumen de Saldos Pendientes</Text>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Miembro</Table.Th>
                <Table.Th>Total Pendiente (Debe)</Table.Th>
                <Table.Th>Total Pagado Histórico</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Object.values(balances).map((b, i) => (
                <Table.Tr key={i}>
                  <Table.Td>{b.name}</Table.Td>
                  <Table.Td c="red" fw={500}>${b.owes.toFixed(2)}</Table.Td>
                  <Table.Td c="green">${b.paid.toFixed(2)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel value="members" pt="xl">
          <Group justify="space-between" mb="md">
            <Text fw={500}>Miembros del Grupo</Text>
            <Button leftSection={<IconUserPlus size={16} />} onClick={openInvite}>Invitar</Button>
          </Group>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Estado</Table.Th>
                <Table.Th>Rol</Table.Th>
                <Table.Th>Acciones</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {group.users.map((u: any) => (
                <Table.Tr key={u.id}>
                  <Table.Td>{u.name}</Table.Td>
                  <Table.Td>
                    {u.pivot.status === 'accepted' ? (
                      <Badge color="green">Aceptado</Badge>
                    ) : (
                      <Badge color="orange">Pendiente</Badge>
                    )}
                  </Table.Td>
                  <Table.Td>
                    {u.pivot.role === 'admin' ? <Badge color="violet">Admin</Badge> : <Badge color="gray">Miembro</Badge>}
                  </Table.Td>
                  <Table.Td>
                    {group.created_by === user?.id && u.id !== user?.id && (
                      <ActionIcon 
                        color="red" 
                        variant="subtle" 
                        onClick={() => handleRemoveMember(u.id)}
                        loading={removeMemberMutation.isPending}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Tabs.Panel>
      </Tabs>

      <Modal opened={inviteOpened} onClose={closeInvite} title="Invitar Miembro" centered>
        <Stack>
          <Text size="sm" c="dimmed">Ingresa el correo electrónico del usuario registrado que deseas invitar.</Text>
          <TextInput 
            label="Correo Electrónico" 
            placeholder="usuario@ejemplo.com" 
            value={inviteEmail} 
            onChange={(e) => setInviteEmail(e.currentTarget.value)}
            leftSection={<IconMail size={16} />}
          />
          <Button onClick={handleInvite} loading={inviteMutation.isPending} disabled={!inviteEmail}>
            Enviar Invitación
          </Button>
        </Stack>
      </Modal>

      <AddSharedDebtModal 
        opened={debtOpened} 
        close={closeDebt} 
        groupId={id!} 
        members={group.users.filter((u: any) => u.pivot.status === 'accepted')} 
      />
    </Container>
  );
}
