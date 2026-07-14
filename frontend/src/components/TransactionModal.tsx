import { useState, useEffect } from 'react';
import {
    Modal,
    NumberInput,
    Select,
    Button,
    Stack,
    Alert,
    Textarea,
    SegmentedControl,
    Switch,
    Text,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useCreateTransaction, useUpdateTransaction, useCatalogs } from '../api/queries';

interface Category {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
}

interface UserAccount {
    id: string;
    identifier: string | null;
    bank: { id: string; name: string };
    account_type: { id: string; name: string };
}

interface TransactionFormData {
    user_account_id: string;
    target_account_id: string;
    category_id: string;
    type: string;
    amount: number;
    date: Date | null;
    description: string;
    is_shared: boolean;
}

interface TransactionEditData {
    id: string;
    user_account_id: string;
    target_account_id: string | null;
    category_id: string | null;
    type: string;
    amount: number;
    date: string;
    description: string;
    is_shared: boolean;
}

interface TransactionModalProps {
    opened: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editData?: TransactionEditData | null;
}

export default function TransactionModal({
    opened,
    onClose,
    onSuccess,
    editData,
}: TransactionModalProps) {
    const { data: catalogs } = useCatalogs();
    const categories = catalogs?.categories || [];
    const accounts = catalogs?.userAccounts || [];
    const [error, setError] = useState('');

    const createMutation = useCreateTransaction();
    const updateMutation = useUpdateTransaction();
    const loading = createMutation.isPending || updateMutation.isPending;

    const form = useForm<TransactionFormData>({
        initialValues: {
            user_account_id: '',
            target_account_id: '',
            category_id: '',
            type: 'expense',
            amount: 0,
            date: new Date(),
            description: '',
            is_shared: true,
        },
        validate: {
            user_account_id: (value) => (value ? null : 'Selecciona una cuenta de origen'),
            target_account_id: (value, values) => {
                if (values.type !== 'transfer') return null;
                if (!value) return 'Selecciona una cuenta de destino';
                if (value === values.user_account_id) return 'La cuenta destino debe ser distinta';
                return null;
            },
            category_id: (value, values) => {
                if (values.type === 'transfer') return null; // Opcional para transferencias
                return value ? null : 'Selecciona una categoría';
            },
            amount: (value) => (value >= 0.01 ? null : 'El monto debe ser mayor a cero'),
            date: (value) => (value ? null : 'La fecha es obligatoria'),
        },
    });

    // Rellenar formulario si es edición
    useEffect(() => {
        if (editData) {
            form.setValues({
                user_account_id: editData.user_account_id,
                target_account_id: editData.target_account_id || '',
                category_id: editData.category_id || '',
                type: editData.type,
                amount: editData.amount,
                date: new Date(editData.date),
                description: editData.description || '',
                is_shared: editData.is_shared,
            });
        } else {
            form.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData, opened]);

    const handleSubmit = (values: TransactionFormData) => {
        setError('');
        const payload = {
            ...values,
            date: values.date ? new Date(values.date).toISOString().split('T')[0] : null, // YYYY-MM-DD
        };

        const handleSuccess = () => {
            form.reset();
            onSuccess();
            onClose();
        };

        const handleError = (err: any) => {
            const axiosError = err as {
                response?: { data?: { message?: string; errors?: Record<string, string[]> } };
            };
            if (axiosError.response?.data?.errors) {
                const firstError = Object.values(axiosError.response.data.errors)[0];
                setError(firstError?.[0] || 'Error al guardar la transacción.');
            } else {
                setError(axiosError.response?.data?.message || 'Error al guardar la transacción.');
            }
        };

        if (editData) {
            updateMutation.mutate(
                { id: editData.id, data: payload },
                { onSuccess: handleSuccess, onError: handleError }
            );
        } else {
            createMutation.mutate(
                payload,
                { onSuccess: handleSuccess, onError: handleError }
            );
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={editData ? '✏️ Editar transacción' : '💰 Nueva transacción'}
            centered
            radius="lg"
            size="md"
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    {error && (
                        <Alert color="red" variant="light" radius="md">
                            {error}
                        </Alert>
                    )}

                    {/* Tipo: Ingreso / Gasto */}
                    <div>
                        <Text size="sm" fw={500} mb={4}>
                            Tipo
                        </Text>
                        <SegmentedControl
                            fullWidth
                            data={[
                                { label: '📉 Gasto', value: 'expense' },
                                { label: '📈 Ingreso', value: 'income' },
                                { label: '🔄 Transferencia', value: 'transfer' },
                            ]}
                            color={form.values.type === 'income' ? 'teal' : form.values.type === 'expense' ? 'red' : 'blue'}
                            radius="md"
                            {...form.getInputProps('type')}
                        />
                    </div>

                    <Select
                        label={form.values.type === 'transfer' ? 'Cuenta de origen' : 'Cuenta'}
                        placeholder="Selecciona una cuenta"
                        data={accounts.map((a) => ({
                            value: a.id,
                            label: `${a.bank.name}${a.identifier ? ` — ${a.identifier}` : ''}`,
                        }))}
                        required
                        searchable
                        radius="md"
                        {...form.getInputProps('user_account_id')}
                    />

                    {form.values.type === 'transfer' && (
                        <Select
                            label="Cuenta de destino"
                            placeholder="Selecciona cuenta destino"
                            data={accounts.map((a) => ({
                                value: a.id,
                                label: `${a.bank.name}${a.identifier ? ` — ${a.identifier}` : ''}`,
                                disabled: a.id === form.values.user_account_id
                            }))}
                            required
                            searchable
                            radius="md"
                            {...form.getInputProps('target_account_id')}
                        />
                    )}

                    {form.values.type !== 'transfer' && (
                        <Select
                            label="Categoría"
                            placeholder="Selecciona una categoría"
                            data={categories.map((c) => ({
                                value: c.id,
                                label: `${c.icon || '📁'} ${c.name}`,
                            }))}
                            required
                            searchable
                            radius="md"
                            {...form.getInputProps('category_id')}
                        />
                    )}

                    <NumberInput
                        label="Monto"
                        placeholder="0.00"
                        min={0.01}
                        decimalScale={2}
                        fixedDecimalScale
                        thousandSeparator="."
                        decimalSeparator=","
                        required
                        radius="md"
                        {...form.getInputProps('amount')}
                    />

                    <DateInput
                        label="Fecha"
                        placeholder="Selecciona una fecha"
                        required
                        radius="md"
                        valueFormat="DD/MM/YYYY"
                        {...form.getInputProps('date')}
                    />

                    <Textarea
                        label="Descripción"
                        placeholder="Ej: Compra en supermercado"
                        maxLength={500}
                        autosize
                        minRows={2}
                        maxRows={4}
                        radius="md"
                        {...form.getInputProps('description')}
                    />

                    <Switch
                        label="¿Transacción compartida?"
                        description="Visible para otros usuarios vinculados"
                        color="teal"
                        {...form.getInputProps('is_shared', { type: 'checkbox' })}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        color={form.values.type === 'income' ? 'teal' : form.values.type === 'expense' ? 'red' : 'blue'}
                        radius="md"
                        loading={loading}
                    >
                        {editData ? 'Guardar cambios' : 'Registrar transacción'}
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}
