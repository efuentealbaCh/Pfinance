import { useState, useEffect } from 'react';
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
  Alert,
  Stepper,
  Group,
  Text,
  ActionIcon,
  Card,
  Badge,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import api from '../api/axios';

interface Bank {
  id: string;
  name: string;
}

interface AccountType {
  id: string;
  name: string;
}

interface CardData {
  name: string;
  type: string;
  last_four: string;
  balance: number;
}

interface AccountFormData {
  bank_id: string;
  account_type_id: string;
  identifier: string;
  balance: number;
  cards: CardData[];
}

interface AccountModalProps {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: any;
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
  const [activeStep, setActiveStep] = useState(0);

  const form = useForm<AccountFormData>({
    initialValues: {
      bank_id: '',
      account_type_id: '',
      identifier: '',
      balance: 0,
      cards: [],
    },
    validate: {
      bank_id: (value) => (value ? null : 'Selecciona un banco'),
      account_type_id: (value) => (value ? null : 'Selecciona un tipo de cuenta'),
      identifier: (value) => (value ? null : 'Requerido'),
      balance: (value) => (value >= 0 ? null : 'No puede ser negativo'),
      cards: {
        name: (value) => (value.trim().length > 0 ? null : 'Nombre requerido'),
        type: (value) => (value ? null : 'Requerido'),
      },
    },
  });

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
      form.reset();
      setActiveStep(0);
      setError('');
      if (editData) {
        form.setValues({
          bank_id: editData.bank_id,
          account_type_id: editData.account_type_id,
          identifier: editData.identifier,
          balance: editData.balance,
          cards: editData.cards || [],
        });
      }
    }
  }, [opened, editData]);

  const handleSubmit = async (values: AccountFormData) => {
    setError('');
    setLoading(true);
    try {
      if (editData?.id) {
        await api.put(`/user-accounts/${editData.id}`, values);
      } else {
        await api.post('/user-accounts', values);
      }
      form.reset();
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const axiosError = err as any;
      setError(axiosError.response?.data?.message || 'Error al guardar la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setActiveStep((current) => (current < 1 ? current + 1 : current));
    }
  };

  const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={editData ? "📝 Editar Cuenta y Tarjetas" : "➕ Nueva Cuenta y Tarjetas"}
      centered
      radius="lg"
      size="lg"
    >
      <Stepper active={activeStep} onStepClick={setActiveStep} pb="xl">
        <Stepper.Step label="Cuenta" description="Datos bancarios">
          <Stack mt="md">
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
              label="Número de Cuenta"
              placeholder="Ej: 000-123456-7"
              required
              radius="md"
              {...form.getInputProps('identifier')}
            />

            <NumberInput
              label="Saldo inicial de la cuenta"
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
          </Stack>
        </Stepper.Step>

        <Stepper.Step label="Tarjetas" description="Vincular tarjetas">
          <Stack mt="md">
            <Text size="sm" c="dimmed">
              Agrega las tarjetas de débito o crédito asociadas a esta cuenta.
            </Text>
            
            {form.values.cards.map((card, index) => (
              <Card key={index} withBorder shadow="sm" radius="md" p="sm">
                <Group justify="space-between" mb="xs">
                  <Badge color={card.type === 'credit' ? 'blue' : 'green'}>
                    {card.type === 'credit' ? 'Crédito' : 'Débito'}
                  </Badge>
                  <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem('cards', index)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
                
                <Stack gap="xs">
                  <TextInput
                    placeholder="Nombre (Ej. Visa Platinum)"
                    required
                    {...form.getInputProps(`cards.${index}.name`)}
                  />
                  <Group grow>
                    <Select
                      placeholder="Tipo"
                      data={[
                        { value: 'debit', label: 'Débito' },
                        { value: 'credit', label: 'Crédito' },
                      ]}
                      required
                      {...form.getInputProps(`cards.${index}.type`)}
                    />
                    <TextInput
                      placeholder="Últimos 4 (Ej. 4455)"
                      maxLength={4}
                      {...form.getInputProps(`cards.${index}.last_four`)}
                    />
                  </Group>
                  <NumberInput
                    placeholder={card.type === 'credit' ? 'Cupo / Saldo de Crédito' : 'Saldo de Tarjeta'}
                    min={0}
                    thousandSeparator="."
                    decimalSeparator=","
                    {...form.getInputProps(`cards.${index}.balance`)}
                  />
                </Stack>
              </Card>
            ))}

            <Button 
              variant="light" 
              color="teal" 
              leftSection={<IconPlus size={16} />} 
              onClick={() => form.insertListItem('cards', { name: '', type: 'debit', last_four: '', balance: 0 })}
            >
              Añadir Tarjeta
            </Button>
          </Stack>
        </Stepper.Step>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {activeStep !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Atrás
          </Button>
        )}
        {activeStep !== 1 ? (
          <Button onClick={nextStep} color="teal">Siguiente</Button>
        ) : (
          <Button onClick={() => handleSubmit(form.values)} loading={loading} color="teal">
            Finalizar y Guardar
          </Button>
        )}
      </Group>
    </Modal>
  );
}
