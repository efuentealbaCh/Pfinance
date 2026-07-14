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

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Ingresa un correo válido',
      password: (value) =>
        value.length > 0 ? null : 'La contraseña es obligatoria',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setError('');
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(
        axiosError.response?.data?.message || 'Error al iniciar sesión.'
      );
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
          Inicia sesión para administrar tus finanzas
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
                label="Correo electrónico"
                placeholder="tu@email.com"
                required
                size="md"
                radius="md"
                {...form.getInputProps('email')}
              />

              <PasswordInput
                label="Contraseña"
                placeholder="Tu contraseña"
                required
                size="md"
                radius="md"
                {...form.getInputProps('password')}
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
                Iniciar sesión
              </Button>

              <Text ta="center" size="sm" c="dimmed">
                ¿No tienes cuenta?{' '}
                <Anchor component={Link} to="/register" size="sm" c="teal">
                  Regístrate aquí
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
