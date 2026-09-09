import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  TextInput,
  PasswordInput,
  PinInput,
  Button,
  Text,
  Anchor,
  Stack,
  Alert,
  Group,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconShieldLock, IconArrowLeft } from '@tabler/icons-react';
import AuthShell from '../components/AuthShell';
import InstallAppBanner from '../components/InstallAppBanner';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  /** Pasa a true cuando el backend responde que la cuenta tiene 2FA y falta el código. */
  const [needsCode, setNeedsCode] = useState(false);
  const [code, setCode] = useState('');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : 'Ingresa un correo válido',
      password: (value: string) =>
        value.length > 0 ? null : 'La contraseña es obligatoria',
    },
  });

  /**
   * Envía las credenciales, con el código TOTP si ya estamos en el segundo paso.
   *
   * El backend distingue "faltó el código" (401 con `requires2fa`) de "credenciales o código
   * inválidos" (401 a secas). Sin esa distinción, una cuenta con 2FA quedaría trabada: el
   * login respondería siempre 401 y no habría dónde escribir el código.
   */
  const handleSubmit = async (values: typeof form.values) => {
    setError('');
    setLoading(true);
    try {
      await login(values.email, values.password, needsCode ? code : undefined);
      navigate('/dashboard');
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string; requires2fa?: boolean } } };

      if (axiosError.response?.data?.requires2fa) {
        setNeedsCode(true);
        setError('');
      } else {
        setError(axiosError.response?.data?.message || 'Error al iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  /** Vuelve al primer paso y limpia el código, para poder corregir el correo o la contraseña. */
  const backToCredentials = () => {
    setNeedsCode(false);
    setCode('');
    setError('');
  };

  return (
    <AuthShell
      subtitle={
        needsCode
          ? 'Confirma tu identidad con la app autenticadora'
          : 'Inicia sesión para administrar tus finanzas'
      }
      after={!needsCode ? <InstallAppBanner /> : undefined}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {error && (
            <Alert color="red" variant="light" radius="md">
              {error}
            </Alert>
          )}

          {needsCode ? (
            <>
              <Alert color="teal" variant="light" radius="md" icon={<IconShieldLock size={18} />}>
                Tu cuenta tiene verificación en dos pasos. Ingresa el código de 6 dígitos que
                muestra tu app autenticadora para {form.values.email}.
              </Alert>

              <Center>
                <PinInput
                  length={6}
                  type="number"
                  inputMode="numeric"
                  size="md"
                  autoFocus
                  oneTimeCode
                  value={code}
                  onChange={setCode}
                  aria-label="Código de verificación"
                />
              </Center>

              <Button
                fullWidth
                type="submit"
                size="md"
                radius="md"
                loading={loading}
                color="teal"
                disabled={code.length !== 6}
              >
                Verificar y entrar
              </Button>

              <Anchor component="button" type="button" size="sm" c="dimmed" onClick={backToCredentials}>
                <Group gap={4} justify="center">
                  <IconArrowLeft size={14} /> Usar otra cuenta
                </Group>
              </Anchor>
            </>
          ) : (
            <>
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

              <Group justify="flex-end" mt={-8}>
                <Anchor component={Link} to="/forgot-password" size="xs" c="teal">
                  ¿Olvidaste tu contraseña?
                </Anchor>
              </Group>

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
            </>
          )}
        </Stack>
      </form>
    </AuthShell>
  );
}
