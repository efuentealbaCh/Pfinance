import React, { useEffect } from 'react';
import { Modal, TextInput, NumberInput, Button, Stack, Table, Slider, Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { useCreateSharedDebt } from '../api/queries';
import { notifications } from '@mantine/notifications';

interface Props {
  opened: boolean;
  close: () => void;
  groupId: string;
  members: any[];
}

export default function AddSharedDebtModal({ opened, close, groupId, members }: Props) {
  const createDebtMutation = useCreateSharedDebt();
  
  const form = useForm({
    initialValues: {
      title: '',
      amount: 0,
      date: new Date(),
      splits: members.map(m => ({ user_id: m.id, percentage: (100 / members.length) })),
    },
    validate: {
      title: (v) => (!v ? 'Requerido' : null),
      amount: (v) => (v <= 0 ? 'Monto debe ser mayor a 0' : null),
      date: (v) => (!v ? 'Requerido' : null),
    }
  });

  // Keep members sync if they change
  useEffect(() => {
    if (opened) {
      form.setFieldValue('splits', members.map(m => ({ user_id: m.id, percentage: (100 / members.length) })));
      form.setFieldValue('title', '');
      form.setFieldValue('amount', 0);
      form.setFieldValue('date', new Date());
    }
  }, [opened, members]);

  const totalPercentage = form.values.splits.reduce((acc, curr) => acc + curr.percentage, 0);

  const handleSubmit = (values: typeof form.values) => {
    if (Math.abs(totalPercentage - 100) > 0.1) {
      notifications.show({
        title: 'Error',
        message: 'Los porcentajes deben sumar exactamente 100%',
        color: 'red'
      });
      return;
    }

    createDebtMutation.mutate(
      {
        groupId,
        data: {
          title: values.title,
          amount: values.amount,
          date: values.date.toISOString().split('T')[0],
          splits: values.splits
        }
      },
      {
        onSuccess: () => {
          notifications.show({ title: 'Deuda Creada', message: 'Se ha registrado el gasto compartido.', color: 'green' });
          close();
        }
      }
    );
  };

  return (
    <Modal opened={opened} onClose={close} title="Registrar Gasto Compartido" centered size="lg">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Título o Concepto" placeholder="Ej. Cena" {...form.getInputProps('title')} />
          <Group grow>
            <NumberInput label="Monto Total ($)" placeholder="0.00" min={0} {...form.getInputProps('amount')} />
            <DatePickerInput label="Fecha" {...form.getInputProps('date')} />
          </Group>

          <Text fw={500} mt="md">División del Gasto</Text>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Miembro</Table.Th>
                <Table.Th>Porcentaje (%)</Table.Th>
                <Table.Th>Debe Pagar</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {members.map((member, index) => {
                const percentage = form.values.splits[index]?.percentage || 0;
                const owe = ((form.values.amount || 0) * percentage) / 100;
                return (
                  <Table.Tr key={member.id}>
                    <Table.Td>{member.name}</Table.Td>
                    <Table.Td>
                      <NumberInput 
                        min={0} 
                        max={100} 
                        {...form.getInputProps(`splits.${index}.percentage`)} 
                      />
                    </Table.Td>
                    <Table.Td>${owe.toFixed(2)}</Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>

          <Text c={Math.abs(totalPercentage - 100) > 0.1 ? 'red' : 'dimmed'} size="sm" ta="right">
            Suma actual: {totalPercentage.toFixed(1)}% / 100%
          </Text>

          <Button type="submit" loading={createDebtMutation.isPending} fullWidth mt="md">
            Guardar Gasto
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
