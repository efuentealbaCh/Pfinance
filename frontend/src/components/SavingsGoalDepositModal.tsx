import { useState } from 'react';
import {
    Modal,
    NumberInput,
    Button,
    Stack,
    Text,
    SegmentedControl,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import api from '../api/axios';

interface SavingsGoalDepositModalProps {
    opened: boolean;
    onClose: () => void;
    onSuccess: () => void;
    goalId: string | null;
    goalName: string;
    currentAmount: number;
    targetAmount: number;
}

export default function SavingsGoalDepositModal({
    opened,
    onClose,
    onSuccess,
    goalId,
    goalName,
    currentAmount,
    targetAmount,
}: SavingsGoalDepositModalProps) {
    const [amount, setAmount] = useState<number | string>(0);
    const [action, setAction] = useState<string>('deposit');
    const [loading, setLoading] = useState(false);

    const remaining = Math.max(0, targetAmount - currentAmount);

    const handleSubmit = async () => {
        const numAmount = Number(amount);
        if (!numAmount || numAmount < 0.01) {
            notifications.show({
                title: 'Error',
                message: 'Ingresa un monto válido.',
                color: 'red',
            });
            return;
        }

        if (action === 'withdraw' && numAmount > currentAmount) {
            notifications.show({
                title: 'Error',
                message: `No puedes retirar más de lo ahorrado ($${currentAmount.toLocaleString('es-CL')}).`,
                color: 'red',
            });
            return;
        }

        setLoading(true);
        try {
            const res = await api.post(`/savings-goals/${goalId}/${action}`, {
                amount: numAmount,
            });

            notifications.show({
                title: action === 'deposit' ? '💰 Abono registrado' : '📤 Retiro registrado',
                message: res.data.message,
                color: action === 'deposit' ? 'teal' : 'orange',
            });
            setAmount(0);
            onSuccess();
            onClose();
        } catch (err: unknown) {
            const axiosError = err as {
                response?: { data?: { message?: string } };
            };
            notifications.show({
                title: 'Error',
                message: axiosError.response?.data?.message || 'No se pudo procesar la operación.',
                color: 'red',
            });
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
                    {action === 'deposit' ? '💰 Abonar a' : '📤 Retirar de'} "{goalName}"
                </Text>
            }
            centered
            radius="lg"
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Stack gap="md">
                <SegmentedControl
                    value={action}
                    onChange={setAction}
                    data={[
                        { label: '💰 Abonar', value: 'deposit' },
                        { label: '📤 Retirar', value: 'withdraw' },
                    ]}
                    radius="md"
                    fullWidth
                    color={action === 'deposit' ? 'teal' : 'orange'}
                />

                <Text size="sm" c="dimmed" ta="center">
                    {action === 'deposit'
                        ? `Restante para la meta: $${remaining.toLocaleString('es-CL')}`
                        : `Disponible para retirar: $${currentAmount.toLocaleString('es-CL')}`}
                </Text>

                <NumberInput
                    label={action === 'deposit' ? 'Monto a abonar' : 'Monto a retirar'}
                    placeholder="Ej: 50000"
                    min={0.01}
                    max={action === 'withdraw' ? currentAmount : undefined}
                    prefix="$"
                    thousandSeparator="."
                    decimalSeparator=","
                    value={amount}
                    onChange={setAmount}
                    radius="md"
                    size="lg"
                />

                <Button
                    color={action === 'deposit' ? 'teal' : 'orange'}
                    radius="md"
                    fullWidth
                    mt="md"
                    loading={loading}
                    onClick={handleSubmit}
                >
                    {action === 'deposit' ? 'Abonar' : 'Retirar'}
                </Button>
            </Stack>
        </Modal>
    );
}
