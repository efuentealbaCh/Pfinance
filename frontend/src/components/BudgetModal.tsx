import { useEffect } from 'react';
import {
    Modal,
    NumberInput,
    Select,
    Button,
    Stack,
    Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useCatalogs, useCreateBudget, useUpdateBudget } from '../api/queries';

interface BudgetEditData {
    id: string;
    category_id: string;
    amount: number;
    period: string;
}

interface BudgetModalProps {
    opened: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editData: BudgetEditData | null;
}

const PERIOD_OPTIONS = [
    { value: 'monthly', label: '📅 Mensual' },
    { value: 'weekly', label: '📆 Semanal' },
    { value: 'yearly', label: '🗓️ Anual' },
];

export default function BudgetModal({ opened, onClose, onSuccess, editData }: BudgetModalProps) {
    const { data: catalogs } = useCatalogs();
    const categories = catalogs?.categories || [];

    const createMutation = useCreateBudget();
    const updateMutation = useUpdateBudget();
    const loading = createMutation.isPending || updateMutation.isPending;

    const form = useForm({
        initialValues: {
            category_id: '',
            amount: 0,
            period: 'monthly',
        },
        validate: {
            category_id: (v: string) => (!v ? 'Selecciona una categoría' : null),
            amount: (v: number) => (v < 1 ? 'El monto debe ser al menos $1' : null),
            period: (v: string) => (!v ? 'Selecciona un período' : null),
        },
    });

    // Cargar datos al editar
    useEffect(() => {
        if (opened) {
            if (editData) {
                form.setValues({
                    category_id: editData.category_id,
                    amount: editData.amount,
                    period: editData.period,
                });
            } else {
                form.reset();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened, editData]);

    const handleSubmit = (values: typeof form.values) => {
        const handleSuccess = () => {
            onSuccess();
            onClose();
        };

        const handleError = (err: any) => {
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
                    message:
                        axiosError.response?.data?.message ||
                        'No se pudo guardar el presupuesto.',
                    color: 'red',
                });
            }
        };

        if (editData) {
            updateMutation.mutate(
                { id: editData.id, data: values },
                { onSuccess: handleSuccess, onError: handleError }
            );
        } else {
            createMutation.mutate(
                values,
                { onSuccess: handleSuccess, onError: handleError }
            );
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Text fw={700} size="lg">
                    {editData ? '✏️ Editar Presupuesto' : '📋 Nuevo Presupuesto'}
                </Text>
            }
            centered
            radius="lg"
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                    <Select
                        label="Categoría"
                        placeholder="Selecciona una categoría"
                        searchable
                        data={categories.map((c: any) => ({
                            value: c.id,
                            label: `${c.icon || '📁'} ${c.name}`,
                        }))}
                        {...form.getInputProps('category_id')}
                        radius="md"
                    />

                    <NumberInput
                        label="Monto límite"
                        placeholder="Ej: 200000"
                        min={1}
                        prefix="$"
                        thousandSeparator="."
                        decimalSeparator=","
                        {...form.getInputProps('amount')}
                        radius="md"
                    />

                    <Select
                        label="Período"
                        placeholder="Selecciona el período"
                        data={PERIOD_OPTIONS}
                        {...form.getInputProps('period')}
                        radius="md"
                    />

                    <Button
                        type="submit"
                        color="teal"
                        radius="md"
                        fullWidth
                        mt="md"
                        loading={loading}
                    >
                        {editData ? 'Guardar cambios' : 'Crear presupuesto'}
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}
