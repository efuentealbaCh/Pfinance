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
  Loader,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconTrash, IconAlertCircle, IconLock, IconPencil } from '@tabler/icons-react';
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
  const [loadingAccountTypes, setLoadingAccountTypes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [cardsError, setCardsError] = useState('');

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

  // Load banks when modal opens
  useEffect(() => {
    if (opened) {
      const fetchBanks = async () => {
        try {
          const banksRes = await api.get('/banks');
          setBanks(banksRes.data);
        } catch {
          setError('Error al cargar los bancos.');
        }
      };
      fetchBanks();
      form.reset();
      setActiveStep(0);
      setError('');
      setCardsError('');
      setAccountTypes([]);
      if (editData) {
        form.setValues({
          bank_id: editData.bank_id,
          account_type_id: editData.account_type_id,
          identifier: editData.identifier,
          balance: editData.balance,
          cards: editData.cards || [],
        });
        // If editing, load account types for the existing bank
        if (editData.bank_id) {
          fetchAccountTypesForBank(editData.bank_id);
        }
      }
    }
  }, [opened, editData]);

  // Fetch account types when bank changes
  const fetchAccountTypesForBank = async (bankId: string) => {
    setLoadingAccountTypes(true);
    setAccountTypes([]);
    try {
      const res = await api.get(`/banks/${bankId}/account-types`);
      setAccountTypes(res.data);
    } catch {
      setError('Error al cargar los tipos de cuenta para este banco.');
    } finally {
      setLoadingAccountTypes(false);
    }
  };

  const handleBankChange = (value: string | null) => {
    form.setFieldValue('bank_id', value || '');
    // Reset account type when bank changes
    form.setFieldValue('account_type_id', '');
    setAccountTypes([]);

    if (value) {
      fetchAccountTypesForBank(value);
    }
  };

  const handleSubmit = async (values: AccountFormData) => {
    // Validate at least one card
    if (values.cards.length === 0) {
      setCardsError('Debes agregar al menos una tarjeta antes de guardar.');
      return;
    }

    setError('');
    setCardsError('');
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
    if (activeStep === 0) {
      // Validate only step 1 fields
      const bankError = form.validateField('bank_id');
      const typeError = form.validateField('account_type_id');
      const identifierError = form.validateField('identifier');
      const balanceError = form.validateField('balance');

      if (bankError.hasError || typeError.hasError || identifierError.hasError || balanceError.hasError) {
        return;
      }
    }
    setActiveStep((current) => (current < 1 ? current + 1 : current));
  };

  const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));

  const isBankSelected = !!form.values.bank_id;
  const hasCards = form.values.cards.length > 0;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap={6}>
          {editData ? <IconPencil size={18} /> : <IconPlus size={18} />}
          <Text fw={600}>{editData ? 'Editar Cuenta y Tarjetas' : 'Nueva Cuenta y Tarjetas'}</Text>
        </Group>
      }
      centered
      radius="lg"
      size="lg"
    >
      <Stepper active={activeStep} onStepClick={setActiveStep} pb="xl">
        <Stepper.Step label="Cuenta" description="Datos bancarios">
          <Stack mt="md">
            {error && (
              <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={16} />}>
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
              value={form.values.bank_id || null}
              onChange={handleBankChange}
              error={form.errors.bank_id}
            />

            <div style={{ position: 'relative' }}>
              <Select
                label="Tipo de cuenta"
                placeholder={
                  !isBankSelected
                    ? 'Primero selecciona un banco'
                    : loadingAccountTypes
                    ? 'Cargando tipos de cuenta...'
                    : accountTypes.length === 0
                    ? 'No hay tipos de cuenta para este banco'
                    : 'Selecciona un tipo'
                }
                data={accountTypes.map((t) => ({ value: t.id, label: t.name }))}
                required
                searchable
                radius="md"
                disabled={!isBankSelected || loadingAccountTypes}
                rightSection={
                  loadingAccountTypes ? (
                    <Loader size="xs" />
                  ) : !isBankSelected ? (
                    <IconLock size={14} style={{ opacity: 0.5 }} />
                  ) : undefined
                }
                {...form.getInputProps('account_type_id')}
              />
              {!isBankSelected && (
                <Text size="xs" c="dimmed" mt={4}>
                  Selecciona un banco para ver los tipos de cuenta disponibles.
                </Text>
              )}
            </div>

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
            <Alert
              variant="light"
              color={hasCards ? 'teal' : 'yellow'}
              radius="md"
              icon={hasCards ? undefined : <IconAlertCircle size={16} />}
            >
              {hasCards
                ? `${form.values.cards.length} tarjeta(s) vinculada(s). Puedes agregar más o finalizar.`
                : 'Debes agregar al menos una tarjeta para poder guardar la cuenta.'}
            </Alert>

            {cardsError && (
              <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={16} />}>
                {cardsError}
              </Alert>
            )}
            
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
              onClick={() => {
                form.insertListItem('cards', { name: '', type: 'debit', last_four: '', balance: 0 });
                setCardsError('');
              }}
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
          <Button
            onClick={() => handleSubmit(form.values)}
            loading={loading}
            color="teal"
            disabled={!hasCards}
          >
            Finalizar y Guardar
          </Button>
        )}
      </Group>
    </Modal>
  );
}
