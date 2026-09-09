import { Container, Title, Button, Card, Text, Group, Tabs, Table, Badge, ActionIcon, Stack, TextInput, Textarea, Modal, Alert } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import {
  apiErrorMessage,
  useConfirmDebtPayment,
  useDeclareDebtPayment,
  useGroup,
  useInviteUser,
  useRejectDebtPayment,
  useRemoveMember,
  type SplitStatus,
} from '../api/queries';
import { IconArrowLeft, IconUserPlus, IconCheck, IconX, IconMail, IconTrash, IconClock, IconInfoCircle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import AddSharedDebtModal from '../components/AddSharedDebtModal';
import Money from '../components/Money';
import { useAuth } from '../context/AuthContext';

/** Cómo se ve cada estado de una parte de deuda. */
const SPLIT_STATUS_META: Record<SplitStatus, { label: string; color: string }> = {
  pending: { label: 'Pendiente', color: 'red' },
  awaiting_confirmation: { label: 'Esperando confirmación', color: 'yellow' },
  paid: { label: 'Pagado', color: 'green' },
};

export default function GroupDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: group, isLoading } = useGroup(id!);
  const inviteMutation = useInviteUser();
  const declareMutation = useDeclareDebtPayment();
  const confirmMutation = useConfirmDebtPayment();
  const rejectMutation = useRejectDebtPayment();
  const removeMemberMutation = useRemoveMember();

  const [inviteOpened, { open: openInvite, close: closeInvite }] = useDisclosure(false);
  const [debtOpened, { open: openDebt, close: closeDebt }] = useDisclosure(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const [rejectTarget, setRejectTarget] = useState<{ debtId: string; splitId: string; debtor: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');

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

  /** Primer paso: el deudor declara que pagó. La parte queda esperando confirmación, no saldada. */
  const handleDeclare = (debtId: string) => {
    declareMutation.mutate(
      { debtId, groupId: id! },
      {
        onSuccess: (data) => {
          notifications.show({ title: 'Pago declarado', message: data.message, color: 'teal' });
        },
        onError: (error) => {
          notifications.show({
            title: 'No se pudo declarar el pago',
            message: apiErrorMessage(error, 'Intentá de nuevo.'),
            color: 'red',
          });
        },
      }
    );
  };

  /** Segundo paso: el acreedor confirma la recepción y recién ahí la parte queda saldada. */
  const handleConfirm = (debtId: string, splitId: string) => {
    confirmMutation.mutate(
      { debtId, splitId, groupId: id! },
      {
        onSuccess: (data) => {
          notifications.show({ title: 'Pago confirmado', message: data.message, color: 'green' });
        },
        onError: (error) => {
          notifications.show({
            title: 'No se pudo confirmar',
            message: apiErrorMessage(error, 'Intentá de nuevo.'),
            color: 'red',
          });
        },
      }
    );
  };

  const handleReject = () => {
    if (!rejectTarget) return;

    rejectMutation.mutate(
      { debtId: rejectTarget.debtId, splitId: rejectTarget.splitId, groupId: id!, reason: rejectReason || undefined },
      {
        onSuccess: (data) => {
          notifications.show({ title: 'Pago rechazado', message: data.message, color: 'orange' });
          setRejectTarget(null);
          setRejectReason('');
        },
        onError: (error) => {
          notifications.show({
            title: 'No se pudo rechazar',
            message: apiErrorMessage(error, 'Intentá de nuevo.'),
            color: 'red',
          });
        },
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

  const debts: any[] = group.shared_debts ?? [];

  const balances: Record<string, { name: string; owes: number; awaiting: number; paid: number }> = {};
  group.users.forEach((u: any) => (balances[u.id] = { name: u.name, owes: 0, awaiting: 0, paid: 0 }));

  debts.forEach((debt: any) => {
    debt.splits.forEach((split: any) => {
      const balance = balances[split.user_id];
      if (!balance) return;

      const amount = Number(split.amount_owed);
      if (split.status === 'paid') balance.paid += amount;
      else if (split.status === 'awaiting_confirmation') balance.awaiting += amount;
      else balance.owes += amount;
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
            {debts.length === 0 && <Text c="dimmed">No hay gastos compartidos aún.</Text>}
            {debts.map((debt: any) => {
              const mySplit = debt.splits.find((s: any) => s.user_id === user?.id);
              const isCreditor = debt.created_by === user?.id;
              const toConfirm = debt.splits.filter((s: any) => s.status === 'awaiting_confirmation');

              return (
                <Card key={debt.id} withBorder shadow="sm">
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>{debt.title}</Text>
                    <Money amount={Number(debt.amount)} fw={700} />
                  </Group>
                  <Text size="sm" c="dimmed" mb="md">Creado por {debt.creator?.name} el {debt.date}</Text>

                  {isCreditor && toConfirm.length > 0 && (
                    <Alert color="yellow" variant="light" radius="md" mb="md" icon={<IconInfoCircle size={16} />}>
                      {toConfirm.length === 1
                        ? 'Hay un pago declarado esperando que confirmes si lo recibiste.'
                        : `Hay ${toConfirm.length} pagos declarados esperando que confirmes si los recibiste.`}
                    </Alert>
                  )}

                  <Table striped>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Miembro</Table.Th>
                        <Table.Th>Porcentaje</Table.Th>
                        <Table.Th>Monto</Table.Th>
                        <Table.Th>Estado</Table.Th>
                        {isCreditor && <Table.Th>Acciones</Table.Th>}
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {debt.splits.map((split: any) => {
                        const status: SplitStatus = split.status ?? 'pending';
                        const meta = SPLIT_STATUS_META[status];

                        return (
                          <Table.Tr key={split.id}>
                            <Table.Td>{split.user?.name}</Table.Td>
                            <Table.Td>{split.percentage}%</Table.Td>
                            <Table.Td>
                              <Money amount={Number(split.amount_owed)} />
                            </Table.Td>
                            <Table.Td>
                              <Badge color={meta.color} variant="light">{meta.label}</Badge>
                            </Table.Td>
                            {isCreditor && (
                              <Table.Td>
                                {status === 'awaiting_confirmation' && (
                                  <Group gap="xs" wrap="nowrap">
                                    <Button
                                      size="xs"
                                      color="green"
                                      variant="light"
                                      radius="md"
                                      leftSection={<IconCheck size={14} />}
                                      onClick={() => handleConfirm(debt.id, split.id)}
                                      loading={confirmMutation.isPending}
                                    >
                                      Recibí el pago
                                    </Button>
                                    <Button
                                      size="xs"
                                      color="red"
                                      variant="subtle"
                                      radius="md"
                                      leftSection={<IconX size={14} />}
                                      onClick={() => {
                                        setRejectTarget({ debtId: debt.id, splitId: split.id, debtor: split.user?.name });
                                        setRejectReason('');
                                      }}
                                    >
                                      No me llegó
                                    </Button>
                                  </Group>
                                )}
                              </Table.Td>
                            )}
                          </Table.Tr>
                        );
                      })}
                    </Table.Tbody>
                  </Table>

                  {mySplit?.status === 'pending' && (
                    <Button
                      mt="md"
                      color="teal"
                      leftSection={<IconCheck size={16} />}
                      onClick={() => handleDeclare(debt.id)}
                      loading={declareMutation.isPending}
                    >
                      Declarar que pagué mi parte
                    </Button>
                  )}

                  {mySplit?.status === 'awaiting_confirmation' && (
                    <Alert color="yellow" variant="light" radius="md" mt="md" icon={<IconClock size={16} />}>
                      Declaraste tu pago. Queda a la espera de que {debt.creator?.name} confirme haberlo
                      recibido.
                    </Alert>
                  )}
                </Card>
              );
            })}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="balances" pt="xl">
          <Text fw={500} mb="md">Resumen de Saldos</Text>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Miembro</Table.Th>
                <Table.Th>Debe</Table.Th>
                <Table.Th>Declarado sin confirmar</Table.Th>
                <Table.Th>Saldado</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Object.values(balances).map((b, i) => (
                <Table.Tr key={i}>
                  <Table.Td>{b.name}</Table.Td>
                  <Table.Td><Money amount={b.owes} c={b.owes > 0 ? 'red' : undefined} fw={500} /></Table.Td>
                  <Table.Td><Money amount={b.awaiting} c={b.awaiting > 0 ? 'yellow.7' : undefined} /></Table.Td>
                  <Table.Td><Money amount={b.paid} c="green" /></Table.Td>
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

      <Modal
        opened={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        title="Rechazar el pago declarado"
        centered
      >
        <Stack>
          <Text size="sm" c="dimmed">
            La parte de {rejectTarget?.debtor} vuelve a quedar pendiente y va a poder declarar el pago
            de nuevo. El motivo es opcional y solo viaja en el aviso que le llega.
          </Text>
          <Textarea
            label="Motivo"
            placeholder="Ej: no vi la transferencia en mi cuenta"
            maxLength={255}
            autosize
            minRows={2}
            radius="md"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.currentTarget.value)}
          />
          <Group justify="flex-end">
            <Button variant="default" radius="md" onClick={() => setRejectTarget(null)}>
              Cancelar
            </Button>
            <Button color="red" radius="md" onClick={handleReject} loading={rejectMutation.isPending}>
              Rechazar pago
            </Button>
          </Group>
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
