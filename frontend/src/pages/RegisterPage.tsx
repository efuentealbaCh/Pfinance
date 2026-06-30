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
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: {
      name: (value) =>
        value.length >= 2 ? null : 'El nombre debe tener al menos 2 caracteres',
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Ingresa un correo válido',
      password: (value) =>
        value.length >= 8
          ? null
          : 'La contraseña debe tener al menos 8 caracteres',
      passwordConfirmation: (value, values) =>
        value === values.password ? null : 'Las contraseñas no coinciden',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setError('');
    setLoading(true);
    try {
      await register(
        values.name,
        values.email,
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
                label="Correo electrónico"
                placeholder="tu@email.com"
                required
                size="md"
                radius="md"
                {...form.getInputProps('email')}
              />

              <PasswordInput
                label="Contraseña"
                placeholder="Mínimo 8 caracteres"
                required
                size="md"
                radius="md"
                {...form.getInputProps('password')}
              />

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
