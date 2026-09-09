import { useState } from 'react';
import {
    Container,
    Title,
    TextInput,
    PasswordInput,
    Button,
    Paper,
    Stack,
    Alert,
    Divider,
    Group,
    Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconUser, IconLock, IconMailExclamation, IconHistory } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';
import {
    apiErrorMessage,
    useUpdateProfile,
    useUpdatePassword,
    useResendVerification,
} from '../api/queries';
import TwoFactorCard from '../components/TwoFactorCard';
import SecurityLogTable from '../components/SecurityLogTable';
import NotificationsCard from '../components/NotificationsCard';

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();
    const updateProfileMutation = useUpdateProfile();
    const updatePasswordMutation = useUpdatePassword();
    const resendMutation = useResendVerification();

    const emailPendingVerification = user?.email_verified === false;

    const handleResendVerification = () => {
        resendMutation.mutate(undefined, {
            onSuccess: (data) => {
                notifications.show({ title: 'Correo reenviado', message: data.message, color: 'teal' });
            },
            onError: (error) => {
                notifications.show({
                    title: 'No se pudo reenviar',
                    message: apiErrorMessage(error, 'Intentá de nuevo en un minuto.'),
                    color: 'red',
                });
            },
        });
    };

    // ─── Formulario de perfil ──────────────────────────────
    const [profileError, setProfileError] = useState('');

    const profileForm = useForm({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
        },
        validate: {
            name: (v: string) => (v.trim() ? null : 'El nombre es obligatorio'),
            email: (v: string) => (/^\S+@\S+$/.test(v) ? null : 'Email inválido'),
        },
    });

    const handleProfileSubmit = (values: { name: string; email: string }) => {
        setProfileError('');
        updateProfileMutation.mutate(values, {
            onSuccess: async () => {
                notifications.show({
                    title: 'Perfil actualizado',
                    message: 'Tu información fue guardada correctamente.',
                    color: 'teal',
                });
                await refreshUser();
            },
            onError: (err: any) => {
                const axiosError = err as {
                    response?: { data?: { message?: string; errors?: Record<string, string[]> } };
                };
                if (axiosError.response?.data?.errors) {
                    const firstError = Object.values(axiosError.response.data.errors)[0];
                    setProfileError(firstError?.[0] || 'Error al actualizar el perfil.');
                } else {
                    setProfileError(axiosError.response?.data?.message || 'Error al actualizar el perfil.');
                }
            }
        });
    };

    // ─── Formulario de contraseña ──────────────────────────
    const [passwordError, setPasswordError] = useState('');

    const passwordForm = useForm({
        initialValues: {
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
        },
        validate: {
            current_password: (v: string) => (v ? null : 'La contraseña actual es obligatoria'),
            new_password: (v: string) =>
                v.length >= 8 ? null : 'La nueva contraseña debe tener al menos 8 caracteres',
            new_password_confirmation: (v: string, values: { new_password: string }) =>
                v === values.new_password ? null : 'Las contraseñas no coinciden',
        },
    });

    const handlePasswordSubmit = (values: {
        current_password: string;
        new_password: string;
        new_password_confirmation: string;
    }) => {
        setPasswordError('');

        const payload = {
            current_password: values.current_password,
            password: values.new_password,
        };

        updatePasswordMutation.mutate(payload, {
            onSuccess: () => {
                notifications.show({
                    title: 'Contraseña actualizada',
                    message: 'Tu contraseña fue cambiada exitosamente.',
                    color: 'teal',
                });
                passwordForm.reset();
            },
            onError: (err: any) => {
                const axiosError = err as {
                    response?: { data?: { message?: string; errors?: Record<string, string[]> } };
                };
                if (axiosError.response?.data?.errors) {
                    const firstError = Object.values(axiosError.response.data.errors)[0];
                    setPasswordError(firstError?.[0] || 'Error al cambiar la contraseña.');
                } else {
                    setPasswordError(
                        axiosError.response?.data?.message || 'Error al cambiar la contraseña.'
                    );
                }
            }
        });
    };

    return (
        <Container size="sm" py="xl">
            <Title order={3} mb="xl" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IconUser size={24} /> Mi Perfil
            </Title>

            {/* ─── Aviso de correo sin verificar ─────────────────── */}
            {emailPendingVerification && (
                <Alert
                    color="yellow"
                    variant="light"
                    radius="md"
                    mb="xl"
                    icon={<IconMailExclamation size={18} />}
                    title="Tu correo todavía no está verificado"
                >
                    <Stack gap="xs">
                        <Text size="sm">
                            Te enviamos un enlace a {user?.email} cuando te registraste. Verificarlo nos
                            deja avisarte por correo si alguien entra a tu cuenta desde un dispositivo
                            nuevo.
                        </Text>
                        <Group>
                            <Button
                                size="xs"
                                variant="light"
                                color="yellow"
                                radius="md"
                                onClick={handleResendVerification}
                                loading={resendMutation.isPending}
                            >
                                Reenviar correo de verificación
                            </Button>
                        </Group>
                    </Stack>
                </Alert>
            )}

            {/* ─── Datos personales ──────────────────────────────── */}
            <Paper withBorder shadow="md" p="xl" radius="lg" mb="xl">
                <Text fw={600} size="lg" mb="md">
                    Datos personales
                </Text>
                <form onSubmit={profileForm.onSubmit(handleProfileSubmit)}>
                    <Stack>
                        {profileError && (
                            <Alert color="red" variant="light" radius="md">
                                {profileError}
                            </Alert>
                        )}
                        <TextInput
                            label="Nombre"
                            placeholder="Tu nombre"
                            radius="md"
                            required
                            {...profileForm.getInputProps('name')}
                        />
                        <TextInput
                            label="Correo electrónico"
                            placeholder="tu@email.com"
                            radius="md"
                            required
                            {...profileForm.getInputProps('email')}
                        />
                        <Button type="submit" color="teal" radius="md" loading={updateProfileMutation.isPending}>
                            Guardar cambios
                        </Button>
                    </Stack>
                </form>
            </Paper>

            <Divider my="lg" />

            {/* ─── Cambiar contraseña ────────────────────────────── */}
            <Paper withBorder shadow="md" p="xl" radius="lg">
                <Text fw={600} size="lg" mb="md" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <IconLock size={18} /> Cambiar contraseña
                </Text>
                <form onSubmit={passwordForm.onSubmit(handlePasswordSubmit)}>
                    <Stack>
                        {passwordError && (
                            <Alert color="red" variant="light" radius="md">
                                {passwordError}
                            </Alert>
                        )}
                        <PasswordInput
                            label="Contraseña actual"
                            placeholder="••••••••"
                            radius="md"
                            required
                            {...passwordForm.getInputProps('current_password')}
                        />
                        <PasswordInput
                            label="Nueva contraseña"
                            placeholder="Mínimo 8 caracteres"
                            radius="md"
                            required
                            {...passwordForm.getInputProps('new_password')}
                        />
                        <PasswordInput
                            label="Confirmar nueva contraseña"
                            placeholder="Repite la nueva contraseña"
                            radius="md"
                            required
                            {...passwordForm.getInputProps('new_password_confirmation')}
                        />
                        <Button type="submit" color="violet" radius="md" loading={updatePasswordMutation.isPending}>
                            Cambiar contraseña
                        </Button>
                    </Stack>
                </form>
            </Paper>

            <Divider my="lg" />

            {/* ─── Verificación en dos pasos ─────────────────────── */}
            <Paper withBorder shadow="md" p="xl" radius="lg" mb="xl">
                <TwoFactorCard />
            </Paper>

            {/* ─── Notificaciones push ───────────────────────────── */}
            <Paper withBorder shadow="md" p="xl" radius="lg" mb="xl">
                <NotificationsCard />
            </Paper>

            {/* ─── Historial de seguridad ────────────────────────── */}
            <Paper withBorder shadow="md" p="xl" radius="lg">
                <Text fw={600} size="lg" mb="md" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <IconHistory size={18} /> Actividad de tu cuenta
                </Text>
                <Text size="sm" c="dimmed" mb="md">
                    Últimos accesos y cambios sensibles. Si ves algo que no reconocés, cambiá tu
                    contraseña y activá la verificación en dos pasos.
                </Text>
                <SecurityLogTable />
            </Paper>
        </Container>
    );
}
