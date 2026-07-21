import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Anchor,
  Stack,
  Alert,
  Progress,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      rut: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: {
      name: (value: string) =>
        value.length >= 2 ? null : 'El nombre debe tener al menos 2 caracteres',
      rut: (value: string) => (value.trim().length > 0 ? null : 'El RUT es obligatorio'),
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : 'Ingresa un correo válido',
      password: (value: string) =>
        value.length >= 8
          ? null
          : 'La contraseña debe tener al menos 8 caracteres',
      passwordConfirmation: (value: string, values: { password: string }) =>
        value === values.password ? null : 'Las contraseñas no coinciden',
    },
  });

  const formatRut = (value: string) => {
    let cleaned = value.replace(/[^0-9kK]/g, '').toUpperCase();
    if (cleaned.length <= 1) return cleaned;
    let result = cleaned.slice(-1);
    let rutBody = cleaned.slice(0, -1);
    let formattedBody = '';
    while (rutBody.length > 3) {
      formattedBody = '.' + rutBody.slice(-3) + formattedBody;
      rutBody = rutBody.slice(0, -3);
    }
    formattedBody = rutBody + formattedBody;
    return formattedBody + '-' + result;
  };

  const getStrength = (password: string) => {
    if (password.length === 0) return 0;
    let requirements = 0;
    if (password.length >= 8) requirements += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) requirements += 1;
    if (/\d/.test(password)) requirements += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) requirements += 1;
    return (requirements / 4) * 100;
  };

  const getStrengthColor = (percentage: number) => {
    if (percentage < 30) return 'red';
    if (percentage < 60) return 'yellow';
    if (percentage < 80) return 'blue';
    return 'teal';
  };

  const handleSubmit = async (values: typeof form.values) => {
    setError('');
    setLoading(true);
    try {
      await register(
        values.name,
        values.email,
        values.rut,
        values.password,
        values.passwordConfirmation
      );
      navigate('/dashboard');
    } catch (err: unknown) {
      const axiosError = err as {
        response?: { data?: { message?: string; errors?: Record<string, string[]> } };
      };
      if (axiosError.response?.data?.errors) {
        const firstError = Object.values(axiosError.response.data.errors)[0];
        setError(firstError?.[0] || 'Error al registrarse.');
      } else {
        setError(
          axiosError.response?.data?.message || 'Error al registrarse.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f766e 100%)',
      }}
    >
      <Container size={420} w="100%">
        <Title
          ta="center"
          fw={900}
          style={{
            color: '#fff',
            fontSize: '2.2rem',
            marginBottom: '0.5rem',
          }}
        >
          💰 Pfinance
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb={30}>
          Crea tu cuenta y toma el control de tus finanzas
        </Text>

        <Paper withBorder shadow="xl" p={30} radius="lg">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              {error && (
                <Alert color="red" variant="light" radius="md">
                  {error}
                </Alert>
              )}

              <TextInput
                label="Nombre"
                placeholder="Tu nombre completo"
                required
                size="md"
                radius="md"
                {...form.getInputProps('name')}
              />

              <TextInput
                label="RUT"
                placeholder="Ej. 12.345.678-9"
                description="Solicitamos tu RUT para agilizar la copia de datos bancarios cuando necesites recibir transferencias."
                required
                size="md"
                radius="md"
                {...form.getInputProps('rut')}
                onChange={(e) => form.setFieldValue('rut', formatRut(e.currentTarget.value))}
              />

              <TextInput
                label="Correo electrónico"
                placeholder="tu@email.com"
                required
                size="md"
                radius="md"
                {...form.getInputProps('email')}
              />

              <div>
                <PasswordInput
                  label="Contraseña"
                  placeholder="Mínimo 8 caracteres"
                  required
                  size="md"
                  radius="md"
                  {...form.getInputProps('password')}
                />
                <Group gap={5} grow mt="xs" mb="md">
                  <Progress
                    size="sm"
                    color={getStrengthColor(getStrength(form.values.password))}
                    value={getStrength(form.values.password)}
                    transitionDuration={250}
                  />
                </Group>
              </div>

              <PasswordInput
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                required
                size="md"
                radius="md"
                {...form.getInputProps('passwordConfirmation')}
              />

              <Button
                fullWidth
                type="submit"
                size="md"
                radius="md"
                loading={loading}
                color="teal"
                style={{
                  marginTop: '0.5rem',
                }}
              >
                Crear cuenta
              </Button>

              <Text ta="center" size="sm" c="dimmed">
                ¿Ya tienes cuenta?{' '}
                <Anchor component={Link} to="/login" size="sm" c="teal">
                  Inicia sesión
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
