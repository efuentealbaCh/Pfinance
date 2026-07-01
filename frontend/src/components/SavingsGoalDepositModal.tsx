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
import { useTransactionSavingsGoal } from '../api/queries';

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
    const transactionMutation = useTransactionSavingsGoal();
    const loading = transactionMutation.isPending;

    const remaining = Math.max(0, targetAmount - currentAmount);

    const handleSubmit = () => {
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

        if (!goalId) return;

        transactionMutation.mutate(
            { id: goalId, action, amount: numAmount },
            {
                onSuccess: (data) => {
                    notifications.show({
                        title: action === 'deposit' ? '💰 Abono registrado' : '📤 Retiro registrado',
                        message: data.message || 'Operación exitosa',
                        color: action === 'deposit' ? 'teal' : 'orange',
                    });
                    setAmount(0);
                    onSuccess();
                    onClose();
                },
                onError: (err: any) => {
                    const axiosError = err as {
                        response?: { data?: { message?: string } };
                    };
                    notifications.show({
                        title: 'Error',
                        message: axiosError.response?.data?.message || 'No se pudo procesar la operación.',
                        color: 'red',
                    });
                }
            }
        );
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
