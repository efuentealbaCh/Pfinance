import { useState, useEffect } from 'react';
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import api from '../api/axios';

interface Bank {
  id: string;
  name: string;
}

interface AccountType {
  id: string;
  name: string;
}

interface AccountFormData {
  bank_id: string;
  account_type_id: string;
  identifier: string;
  balance: number;
}

interface AccountModalProps {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: {
    id: string;
    bank_id: string;
    account_type_id: string;
    identifier: string;
    balance: number;
  } | null;
}

export default function AccountModal({
  opened,
  onClose,
  onSuccess,
  editData,
}: AccountModalProps) {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<AccountFormData>({
    initialValues: {
      bank_id: '',
      account_type_id: '',
      identifier: '',
      balance: 0,
    },
    validate: {
      bank_id: (value) => (value ? null : 'Selecciona un banco'),
      account_type_id: (value) => (value ? null : 'Selecciona un tipo de cuenta'),
      balance: (value) => (value >= 0 ? null : 'El saldo no puede ser negativo'),
    },
  });

  // Cargar catálogos al abrir el modal
  useEffect(() => {
    if (opened) {
      const fetchCatalogs = async () => {
        try {
          const [banksRes, typesRes] = await Promise.all([
            api.get('/banks'),
            api.get('/account-types'),
          ]);
          setBanks(banksRes.data);
          setAccountTypes(typesRes.data);
        } catch {
          setError('Error al cargar los catálogos.');
        }
      };
      fetchCatalogs();
    }
  }, [opened]);

  // Rellenar formulario si es edición
  useEffect(() => {
    if (editData) {
      form.setValues({
        bank_id: editData.bank_id,
        account_type_id: editData.account_type_id,
        identifier: editData.identifier || '',
        balance: editData.balance,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData, opened]);

  const handleSubmit = async (values: AccountFormData) => {
    setError('');
    setLoading(true);
    try {
      if (editData) {
        await api.put(`/user-accounts/${editData.id}`, values);
      } else {
        await api.post('/user-accounts', values);
      }
      form.reset();
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const axiosError = err as {
        response?: { data?: { message?: string; errors?: Record<string, string[]> } };
      };
      if (axiosError.response?.data?.errors) {
        const firstError = Object.values(axiosError.response.data.errors)[0];
        setError(firstError?.[0] || 'Error al guardar la cuenta.');
      } else {
        setError(axiosError.response?.data?.message || 'Error al guardar la cuenta.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={editData ? '✏️ Editar cuenta' : '➕ Nueva cuenta'}
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

          <Select
            label="Banco"
            placeholder="Selecciona un banco"
            data={banks.map((b) => ({ value: b.id, label: b.name }))}
            required
            searchable
            radius="md"
            {...form.getInputProps('bank_id')}
          />

          <Select
            label="Tipo de cuenta"
            placeholder="Selecciona un tipo"
            data={accountTypes.map((t) => ({ value: t.id, label: t.name }))}
            required
            searchable
            radius="md"
            {...form.getInputProps('account_type_id')}
          />

          <TextInput
            label="Identificador"
            placeholder='Ej: "Terminada en 4455"'
            radius="md"
            {...form.getInputProps('identifier')}
          />

          <NumberInput
            label="Saldo inicial"
            placeholder="0.00"
            min={0}
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator="."
            decimalSeparator=","
            required
            radius="md"
            {...form.getInputProps('balance')}
          />

          <Button
            type="submit"
            fullWidth
            color="teal"
            radius="md"
            loading={loading}
          >
            {editData ? 'Guardar cambios' : 'Crear cuenta'}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
