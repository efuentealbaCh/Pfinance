import { useState, useEffect } from 'react';
import {
    Modal,
    TextInput,
    NumberInput,
    Button,
    Stack,
    Text,
    Group,
    ColorInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import api from '../api/axios';

interface GoalEditData {
    id: string;
    name: string;
    target_amount: number;
    deadline: string | null;
    icon: string | null;
    color: string | null;
}

interface SavingsGoalModalProps {
    opened: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editData: GoalEditData | null;
}

export default function SavingsGoalModal({ opened, onClose, onSuccess, editData }: SavingsGoalModalProps) {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: '',
            target_amount: 0,
            deadline: null as Date | null,
            icon: '',
            color: '#4ECDC4',
        },
        validate: {
            name: (v) => (!v.trim() ? 'El nombre es obligatorio' : null),
            target_amount: (v) => (v < 1 ? 'El monto debe ser al menos $1' : null),
        },
    });

    useEffect(() => {
        if (opened) {
            if (editData) {
                form.setValues({
                    name: editData.name,
                    target_amount: editData.target_amount,
                    deadline: editData.deadline ? new Date(editData.deadline + 'T12:00:00') : null,
                    icon: editData.icon || '',
                    color: editData.color || '#4ECDC4',
                });
            } else {
                form.reset();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened, editData]);

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            const payload = {
                name: values.name,
                target_amount: values.target_amount,
                deadline: values.deadline ? values.deadline.toISOString().split('T')[0] : null,
                icon: values.icon || null,
                color: values.color || null,
            };

            if (editData) {
                await api.put(`/savings-goals/${editData.id}`, payload);
            } else {
                await api.post('/savings-goals', payload);
            }
            onSuccess();
            onClose();
        } catch (err: unknown) {
            const axiosError = err as {
                response?: { data?: { message?: string; errors?: Record<string, string[]> } };
            };
            if (axiosError.response?.data?.errors) {
                const errors = axiosError.response.data.errors;
                Object.entries(errors).forEach(([field, messages]) => {
                    form.setFieldError(field, messages[0]);
                });
            } else {
                notifications.show({
                    title: 'Error',
                    message: axiosError.response?.data?.message || 'No se pudo guardar la meta.',
                    color: 'red',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Text fw={700} size="lg">
                    {editData ? '✏️ Editar Meta' : '🎯 Nueva Meta de Ahorro'}
                </Text>
            }
            centered
            radius="lg"
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                    <TextInput
                        label="Nombre de la meta"
                        placeholder="Ej: Vacaciones, Fondo de emergencia"
                        {...form.getInputProps('name')}
                        radius="md"
                    />

                    <NumberInput
                        label="Monto objetivo"
                        placeholder="Ej: 1000000"
                        min={1}
                        prefix="$"
                        thousandSeparator="."
                        decimalSeparator=","
                        {...form.getInputProps('target_amount')}
                        radius="md"
                    />

                    <DateInput
                        label="Fecha límite (opcional)"
                        placeholder="Selecciona una fecha"
                        clearable
                        valueFormat="DD/MM/YYYY"
                        minDate={new Date()}
                        {...form.getInputProps('deadline')}
                        radius="md"
                    />

                    <Group grow>
                        <TextInput
                            label="Icono (emoji)"
                            placeholder="Ej: 🏖️"
                            {...form.getInputProps('icon')}
                            radius="md"
                        />
                        <ColorInput
                            label="Color"
                            format="hex"
                            swatches={[
                                '#4ECDC4', '#12b886', '#228be6', '#7950f2',
                                '#be4bdb', '#e64980', '#fa5252', '#fd7e14',
                                '#fab005', '#82c91e',
                            ]}
                            {...form.getInputProps('color')}
                            radius="md"
                        />
                    </Group>

                    <Button
                        type="submit"
                        color="teal"
                        radius="md"
                        fullWidth
                        mt="md"
                        loading={loading}
                    >
                        {editData ? 'Guardar cambios' : 'Crear meta'}
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}
