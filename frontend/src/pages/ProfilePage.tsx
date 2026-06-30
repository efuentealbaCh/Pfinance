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
    Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function ProfilePage() {
    const { user } = useAuth();

    // ─── Formulario de perfil ──────────────────────────────
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileError, setProfileError] = useState('');

    const profileForm = useForm({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
        },
        validate: {
            name: (v) => (v.trim() ? null : 'El nombre es obligatorio'),
            email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Email inválido'),
        },
    });

    const handleProfileSubmit = async (values: { name: string; email: string }) => {
        setProfileError('');
        setProfileLoading(true);
        try {
            await api.put('/profile', values);
            notifications.show({
                title: 'Perfil actualizado',
                message: 'Tu información fue guardada correctamente.',
                color: 'teal',
            });
        } catch (err: unknown) {
            const axiosError = err as {
                response?: { data?: { message?: string; errors?: Record<string, string[]> } };
            };
            if (axiosError.response?.data?.errors) {
                const firstError = Object.values(axiosError.response.data.errors)[0];
                setProfileError(firstError?.[0] || 'Error al actualizar el perfil.');
            } else {
                setProfileError(axiosError.response?.data?.message || 'Error al actualizar el perfil.');
            }
        } finally {
            setProfileLoading(false);
        }
    };

    // ─── Formulario de contraseña ──────────────────────────
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const passwordForm = useForm({
        initialValues: {
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
        },
        validate: {
            current_password: (v) => (v ? null : 'La contraseña actual es obligatoria'),
            new_password: (v) =>
                v.length >= 8 ? null : 'La nueva contraseña debe tener al menos 8 caracteres',
            new_password_confirmation: (v, values) =>
                v === values.new_password ? null : 'Las contraseñas no coinciden',
        },
    });

    const handlePasswordSubmit = async (values: {
        current_password: string;
        new_password: string;
        new_password_confirmation: string;
    }) => {
        setPasswordError('');
        setPasswordLoading(true);
        try {
            await api.put('/profile/password', values);
            notifications.show({
                title: 'Contraseña actualizada',
                message: 'Tu contraseña fue cambiada exitosamente.',
                color: 'teal',
            });
            passwordForm.reset();
        } catch (err: unknown) {
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
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <Container size="sm" py="xl">
            <Title order={3} mb="xl">
                👤 Mi Perfil
            </Title>

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
                        <Button type="submit" color="teal" radius="md" loading={profileLoading}>
                            Guardar cambios
                        </Button>
                    </Stack>
                </form>
            </Paper>

            <Divider my="lg" />

            {/* ─── Cambiar contraseña ────────────────────────────── */}
            <Paper withBorder shadow="md" p="xl" radius="lg">
                <Text fw={600} size="lg" mb="md">
                    🔒 Cambiar contraseña
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
                        <Button type="submit" color="violet" radius="md" loading={passwordLoading}>
                            Cambiar contraseña
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}
