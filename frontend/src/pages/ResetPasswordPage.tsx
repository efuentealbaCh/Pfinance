import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, Anchor, Button, Group, PasswordInput, Progress, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconArrowLeft, IconCircleCheck } from '@tabler/icons-react';
import AuthShell from '../components/AuthShell';
import { apiErrorMessage, useResetPassword } from '../api/queries';

/** Fuerza aproximada de la contraseña, en porcentaje. Mismo criterio que el registro. */
function getStrength(password: string): number {
    if (password.length === 0) return 0;
    let requirements = 0;
    if (password.length >= 8) requirements += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) requirements += 1;
    if (/\d/.test(password)) requirements += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) requirements += 1;
    return (requirements / 4) * 100;
}

function getStrengthColor(percentage: number): string {
    if (percentage < 30) return 'red';
    if (percentage < 60) return 'yellow';
    if (percentage < 80) return 'blue';
    return 'teal';
}

/**
 * Destino del enlace de recuperación (`/reset-password?token=...`): define la contraseña nueva.
 *
 * A diferencia de la verificación de correo, acá no se hace nada al montar — el token se
 * consume recién al enviar el formulario, así que abrir el enlace y no completarlo lo deja
 * utilizable.
 */
export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const resetMutation = useResetPassword();

    const form = useForm({
        initialValues: { password: '', passwordConfirmation: '' },
        validate: {
            password: (value: string) =>
                value.length >= 8 ? null : 'La contraseña debe tener al menos 8 caracteres',
            passwordConfirmation: (value: string, values: { password: string }) =>
                value === values.password ? null : 'Las contraseñas no coinciden',
        },
    });

    if (!token) {
        return (
            <AuthShell subtitle="Define una contraseña nueva">
                <Stack>
                    <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={18} />}>
                        El enlace no incluye un token válido. Pedí uno nuevo desde la pantalla de
                        recuperación.
                    </Alert>
                    <Button component={Link} to="/forgot-password" fullWidth color="teal" radius="md">
                        Pedir un enlace nuevo
                    </Button>
                </Stack>
            </AuthShell>
        );
    }

    if (resetMutation.isSuccess) {
        return (
            <AuthShell subtitle="Contraseña actualizada">
                <Stack>
                    <Alert color="teal" variant="light" radius="md" icon={<IconCircleCheck size={18} />}>
                        {resetMutation.data.message}
                    </Alert>
                    <Button onClick={() => navigate('/login')} fullWidth color="teal" radius="md">
                        Iniciar sesión
                    </Button>
                </Stack>
            </AuthShell>
        );
    }

    return (
        <AuthShell subtitle="Define una contraseña nueva">
            <form
                onSubmit={form.onSubmit((values) =>
                    resetMutation.mutate({ token, password: values.password }),
                )}
            >
                <Stack>
                    {resetMutation.isError && (
                        <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={18} />}>
                            {apiErrorMessage(resetMutation.error, 'No se pudo restablecer la contraseña.')}
                        </Alert>
                    )}

                    <div>
                        <PasswordInput
                            label="Nueva contraseña"
                            placeholder="Mínimo 8 caracteres"
                            required
                            size="md"
                            radius="md"
                            {...form.getInputProps('password')}
                        />
                        <Group gap={5} grow mt="xs">
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
                        placeholder="Repite la contraseña"
                        required
                        size="md"
                        radius="md"
                        {...form.getInputProps('passwordConfirmation')}
                    />

                    <Text size="xs" c="dimmed">
                        Al guardar se cierra el enlace: si necesitas cambiarla de nuevo, vas a tener que
                        pedir otro.
                    </Text>

                    <Button
                        fullWidth
                        type="submit"
                        size="md"
                        radius="md"
                        color="teal"
                        loading={resetMutation.isPending}
                    >
                        Guardar contraseña
                    </Button>

                    <Anchor component={Link} to="/login" size="sm" c="dimmed" ta="center">
                        <Group gap={4} justify="center">
                            <IconArrowLeft size={14} /> Volver a iniciar sesión
                        </Group>
                    </Anchor>
                </Stack>
            </form>
        </AuthShell>
    );
}
