import { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Group,
    Modal,
    NumberInput,
    SegmentedControl,
    Select,
    Stack,
    Switch,
    Text,
    TextInput,
    Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCalendarRepeat, IconPencil, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import {
    apiErrorMessage,
    useCatalogs,
    useCreateRecurringTransaction,
    useUpdateRecurringTransaction,
    type RecurringTransaction,
} from '../api/queries';

/** Frecuencias que acepta el backend, con su nombre en pantalla. */
const FREQUENCY_OPTIONS = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quincenal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'yearly', label: 'Anual' },
];

interface RecurringFormData {
    user_account_id: string;
    category_id: string;
    type: string;
    amount: number;
    description: string;
    frequency: string;
    start_date: string;
    hasInstallments: boolean;
    installments_total: number | string;
}

interface RecurringModalProps {
    opened: boolean;
    onClose: () => void;
    editData?: RecurringTransaction | null;
}

/** Fecha de hoy en `YYYY-MM-DD`, tomando el día local y no el UTC. */
function todayAsDateString(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Alta y edición de una transacción recurrente (una suscripción o un crédito en cuotas).
 *
 * La fecha va en un input nativo de tipo `date` en vez de un selector con objetos `Date`
 * porque el backend valida `start_date` contra `YYYY-MM-DD` exacto: convertir un `Date` con
 * `toISOString()` lo pasa por UTC y, de noche en Chile, guarda la cuota un día antes.
 */
export default function RecurringModal({ opened, onClose, editData }: RecurringModalProps) {
    const { data: catalogs } = useCatalogs();
    const categories = catalogs?.categories || [];
    const accounts = catalogs?.userAccounts || [];
    const [error, setError] = useState('');

    const createMutation = useCreateRecurringTransaction();
    const updateMutation = useUpdateRecurringTransaction();
    const loading = createMutation.isPending || updateMutation.isPending;

    const form = useForm<RecurringFormData>({
        initialValues: {
            user_account_id: '',
            category_id: '',
            type: 'expense',
            amount: 0,
            description: '',
            frequency: 'monthly',
            start_date: todayAsDateString(),
            hasInstallments: false,
            installments_total: 12,
        },
        validate: {
            user_account_id: (value) => (value ? null : 'Selecciona una cuenta'),
            amount: (value) => (value >= 0.01 ? null : 'El monto debe ser mayor a cero'),
            start_date: (value) =>
                /^\d{4}-\d{2}-\d{2}$/.test(value) ? null : 'Ingresa una fecha válida',
            installments_total: (value, values) => {
                if (!values.hasInstallments) return null;
                const total = Number(value);
                return total >= 1 && total <= 600 ? null : 'Entre 1 y 600 cuotas';
            },
        },
    });

    useEffect(() => {
        setError('');
        if (editData) {
            form.setValues({
                user_account_id: editData.user_account_id,
                category_id: editData.category_id || '',
                type: editData.type,
                amount: editData.amount,
                description: editData.description || '',
                frequency: editData.frequency,
                start_date: editData.start_date,
                hasInstallments: editData.installments_total !== null,
                installments_total: editData.installments_total ?? 12,
            });
        } else {
            form.reset();
        }
    }, [editData, opened]);

    const handleSubmit = (values: RecurringFormData) => {
        setError('');

        const payload: Record<string, any> = {
            user_account_id: values.user_account_id,
            type: values.type,
            amount: values.amount,
            frequency: values.frequency,
            start_date: values.start_date,
            category_id: values.category_id || null,
            description: values.description || null,
            installments_total: values.hasInstallments ? Number(values.installments_total) : null,
        };

        const handleSuccess = () => {
            form.reset();
            onClose();
        };
        const handleError = (err: unknown) => setError(apiErrorMessage(err, 'Error al guardar la recurrencia.'));

        if (editData) {
            updateMutation.mutate({ id: editData.id, data: payload }, { onSuccess: handleSuccess, onError: handleError });
        } else {
            createMutation.mutate(payload, { onSuccess: handleSuccess, onError: handleError });
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Group gap={6}>
                    {editData ? <IconPencil size={18} /> : <IconCalendarRepeat size={18} />}
                    <Text fw={600}>{editData ? 'Editar recurrencia' : 'Nueva recurrencia'}</Text>
                </Group>
            }
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

                    <div>
                        <Text size="sm" fw={500} mb={4}>
                            Tipo
                        </Text>
                        <SegmentedControl
                            fullWidth
                            radius="md"
                            color={form.values.type === 'income' ? 'teal' : 'red'}
                            data={[
                                {
                                    label: (
                                        <Group gap={4} justify="center" wrap="nowrap">
                                            <IconTrendingDown size={16} /> <span>Gasto</span>
                                        </Group>
                                    ),
                                    value: 'expense',
                                },
                                {
                                    label: (
                                        <Group gap={4} justify="center" wrap="nowrap">
                                            <IconTrendingUp size={16} /> <span>Ingreso</span>
                                        </Group>
                                    ),
                                    value: 'income',
                                },
                            ]}
                            {...form.getInputProps('type')}
                        />
                    </div>

                    <Select
                        label="Cuenta"
                        placeholder="Selecciona una cuenta"
                        data={accounts.map((a: any) => ({
                            value: a.id,
                            label: `${a.bank?.name ?? 'Cuenta'}${a.identifier ? ` — ${a.identifier}` : ''}`,
                        }))}
                        required
                        searchable
                        radius="md"
                        {...form.getInputProps('user_account_id')}
                    />

                    <Select
                        label="Categoría"
                        placeholder="Sin categoría"
                        data={categories.map((c: any) => ({
                            value: c.id,
                            label: `${c.icon || '📁'} ${c.name}`,
                        }))}
                        clearable
                        searchable
                        radius="md"
                        {...form.getInputProps('category_id')}
                    />

                    <NumberInput
                        label="Monto de cada cuota"
                        placeholder="0.00"
                        min={0.01}
                        decimalScale={2}
                        thousandSeparator="."
                        decimalSeparator=","
                        required
                        radius="md"
                        {...form.getInputProps('amount')}
                    />

                    <Group grow align="flex-start">
                        <Select
                            label="Frecuencia"
                            data={FREQUENCY_OPTIONS}
                            allowDeselect={false}
                            radius="md"
                            {...form.getInputProps('frequency')}
                        />
                        <TextInput
                            type="date"
                            label="Primera cuota"
                            description="Si ya pasó, aparece como vencida"
                            required
                            radius="md"
                            {...form.getInputProps('start_date')}
                        />
                    </Group>

                    <Textarea
                        label="Descripción"
                        placeholder="Ej: Plan de internet, cuota del auto"
                        maxLength={255}
                        autosize
                        minRows={2}
                        radius="md"
                        {...form.getInputProps('description')}
                    />

                    <Switch
                        label="Tiene una cantidad fija de cuotas"
                        description="Actívalo para un crédito; déjalo apagado para una suscripción sin fin"
                        color="teal"
                        {...form.getInputProps('hasInstallments', { type: 'checkbox' })}
                    />

                    {form.values.hasInstallments && (
                        <NumberInput
                            label="Cantidad total de cuotas"
                            min={1}
                            max={600}
                            radius="md"
                            {...form.getInputProps('installments_total')}
                        />
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        color={form.values.type === 'income' ? 'teal' : 'red'}
                        radius="md"
                        loading={loading}
                    >
                        {editData ? 'Guardar cambios' : 'Crear recurrencia'}
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}
