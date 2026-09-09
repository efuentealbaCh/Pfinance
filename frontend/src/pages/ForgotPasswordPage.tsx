import { Link } from 'react-router-dom';
import { Alert, Anchor, Button, Group, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconMailForward } from '@tabler/icons-react';
import AuthShell from '../components/AuthShell';
import { apiErrorMessage, useForgotPassword } from '../api/queries';

/**
 * Pide el enlace de recuperación de contraseña.
 *
 * La respuesta del backend es siempre la misma exista o no el correo, para no filtrar qué
 * direcciones están registradas. Por eso la pantalla no dice "te enviamos un correo" sino
 * que repite el mensaje genérico que devuelve el servidor: prometer un envío que quizás no
 * ocurrió dejaría al usuario esperando algo que nunca va a llegar.
 */
export default function ForgotPasswordPage() {
    const forgotMutation = useForgotPassword();

    const form = useForm({
        initialValues: { email: '' },
        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Ingresa un correo válido'),
        },
    });

    return (
        <AuthShell subtitle="Recupera el acceso a tu cuenta">
            <form onSubmit={form.onSubmit((values) => forgotMutation.mutate(values.email))}>
                <Stack>
                    {forgotMutation.isError && (
                        <Alert color="red" variant="light" radius="md">
                            {apiErrorMessage(forgotMutation.error, 'No se pudo procesar la solicitud.')}
                        </Alert>
                    )}

                    {forgotMutation.isSuccess ? (
                        <>
                            <Alert color="teal" variant="light" radius="md" icon={<IconMailForward size={18} />}>
                                {forgotMutation.data.message}
                            </Alert>
                            <Text size="sm" c="dimmed">
                                El enlace vence a los 30 minutos. Si no te llega nada, revisa la carpeta
                                de spam antes de volver a pedirlo.
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text size="sm" c="dimmed">
                                Escribe el correo con el que te registraste y te mandamos un enlace para
                                definir una contraseña nueva.
                            </Text>

                            <TextInput
                                label="Correo electrónico"
                                placeholder="tu@email.com"
                                required
                                size="md"
                                radius="md"
                                {...form.getInputProps('email')}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                size="md"
                                radius="md"
                                color="teal"
                                loading={forgotMutation.isPending}
                            >
                                Enviar enlace
                            </Button>
                        </>
                    )}

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
