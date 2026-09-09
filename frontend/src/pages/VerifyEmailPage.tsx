import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Alert, Button, Center, Loader, Stack, Text } from '@mantine/core';
import { IconCircleCheck, IconAlertCircle } from '@tabler/icons-react';
import AuthShell from '../components/AuthShell';
import { useAuth } from '../context/AuthContext';
import { apiErrorMessage, useVerifyEmail } from '../api/queries';

/**
 * Destino del enlace que llega por correo (`/verify-email?token=...`).
 *
 * Verifica apenas se monta, sin pedirle al usuario que haga clic en nada más: ya hizo clic
 * una vez en el correo, un segundo botón acá solo agregaría un paso sin información nueva.
 */
export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const { isAuthenticated, refreshUser } = useAuth();
    const verifyMutation = useVerifyEmail();

    const attempted = useRef(false);

    useEffect(() => {
        if (!token || attempted.current) return;
        attempted.current = true;

        verifyMutation.mutate(token, {
            onSuccess: () => {
                if (isAuthenticated) void refreshUser();
            },
        });
    }, [token]);

    const renderBody = () => {
        if (!token) {
            return (
                <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={18} />}>
                    El enlace no incluye un token de verificación. Revisa que hayas copiado la
                    dirección completa desde el correo.
                </Alert>
            );
        }

        if (verifyMutation.isPending) {
            return (
                <Center py="lg">
                    <Stack align="center" gap="xs">
                        <Loader color="teal" />
                        <Text size="sm" c="dimmed">
                            Verificando tu correo...
                        </Text>
                    </Stack>
                </Center>
            );
        }

        if (verifyMutation.isError) {
            return (
                <Stack>
                    <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={18} />}>
                        {apiErrorMessage(verifyMutation.error, 'No se pudo verificar el correo.')}
                    </Alert>
                    <Text size="sm" c="dimmed">
                        Los enlaces de verificación duran 24 horas. Si el tuyo expiró, inicia sesión y
                        pide uno nuevo desde tu perfil.
                    </Text>
                </Stack>
            );
        }

        if (verifyMutation.isSuccess) {
            return (
                <Alert color="teal" variant="light" radius="md" icon={<IconCircleCheck size={18} />}>
                    {verifyMutation.data.message}
                </Alert>
            );
        }

        return null;
    };

    return (
        <AuthShell subtitle="Confirmación de tu correo electrónico">
            <Stack>
                {renderBody()}

                <Button
                    component={Link}
                    to={isAuthenticated ? '/dashboard' : '/login'}
                    fullWidth
                    color="teal"
                    radius="md"
                    variant={verifyMutation.isSuccess ? 'filled' : 'light'}
                >
                    {isAuthenticated ? 'Volver al dashboard' : 'Ir a iniciar sesión'}
                </Button>
            </Stack>
        </AuthShell>
    );
}
