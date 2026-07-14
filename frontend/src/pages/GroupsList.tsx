import { Container, Title, Button, Card, Text, Group, Badge, SimpleGrid, Modal, TextInput, Stack, ActionIcon, Alert, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconPlus, IconUsers, IconArrowRight, IconBell, IconCheck, IconX } from '@tabler/icons-react';
import { useGroups, useCreateGroup, usePendingInvitations, useAcceptInvite, useRejectInvite } from '../api/queries';
import { useNavigate } from 'react-router-dom';

export default function GroupsList() {
  const { data: groups, isLoading } = useGroups();
  const { data: pendingInvitations, isLoading: isInvitationsLoading } = usePendingInvitations();
  const createGroupMutation = useCreateGroup();
  const acceptMutation = useAcceptInvite();
  const rejectMutation = useRejectInvite();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { name: '', description: '' },
    validate: { name: (v) => (v.trim().length === 0 ? 'Requerido' : null) },
  });

  const handleSubmit = (values: typeof form.values) => {
    createGroupMutation.mutate(values, {
      onSuccess: () => {
        close();
        form.reset();
      },
    });
  };

  return (
    <Container size="xl" py="md">
      <Group justify="space-between" mb="xl">
        <Title order={2}>Mis Grupos</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={open}>
          Crear Grupo
        </Button>
      </Group>

      {pendingInvitations && pendingInvitations.length > 0 && (
        <Stack mb="xl">
          {pendingInvitations.map((invitation: any) => (
            <Alert key={invitation.id} icon={<IconBell size={16} />} title="Nueva Invitación de Grupo" color="blue">
              <Group justify="space-between" align="center">
                <Text>Has sido invitado a unirte a <b>{invitation.name}</b></Text>
                <Group>
                  <Button 
                    size="xs" 
                    color="red" 
                    variant="light" 
                    leftSection={<IconX size={14} />} 
                    onClick={() => rejectMutation.mutate(invitation.id)}
                    loading={rejectMutation.isPending}
                  >
                    Rechazar
                  </Button>
                  <Button 
                    size="xs" 
                    color="green" 
                    leftSection={<IconCheck size={14} />} 
                    onClick={() => acceptMutation.mutate(invitation.id)}
                    loading={acceptMutation.isPending}
                  >
                    Aceptar
                  </Button>
                </Group>
              </Group>
            </Alert>
          ))}
        </Stack>
      )}

      {isLoading && <Loader />}
      {!isLoading && (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {groups?.map((group: any) => (
          <Card key={group.id} shadow="sm" p="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500} size="lg">{group.name}</Text>
              <Badge color="blue" variant="light">{group.users_count || 1} Miembros</Badge>
            </Group>

            <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
              {group.description || 'Sin descripción.'}
            </Text>

            <Button 
              variant="light" 
              color="blue" 
              fullWidth 
              mt="md" 
              radius="md"
              rightSection={<IconArrowRight size={16} />}
              onClick={() => navigate(`/groups/${group.id}`)}
            >
              Ver Detalles
            </Button>
          </Card>
        ))}
        {groups?.length === 0 && (
          <Text c="dimmed">No perteneces a ningún grupo aún.</Text>
        )}
        </SimpleGrid>
      )}

      <Modal opened={opened} onClose={close} title="Crear Nuevo Grupo" centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Nombre del Grupo" placeholder="Ej. Viaje al Sur" {...form.getInputProps('name')} withAsterisk />
            <TextInput label="Descripción (opcional)" placeholder="Gastos compartidos..." {...form.getInputProps('description')} />
            <Button type="submit" loading={createGroupMutation.isPending} fullWidth mt="md">
              Crear
            </Button>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
}
