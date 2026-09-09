import { useState } from 'react';
import {
    Alert,
    Badge,
    Button,
    Center,
    Code,
    Group,
    Image,
    Modal,
    PasswordInput,
    PinInput,
    Stack,
    Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconShieldCheck, IconShieldOff, IconAlertCircle } from '@tabler/icons-react';
import { apiErrorMessage, useConfirm2fa, useDisable2fa, useSetup2fa } from '../api/queries';
import { useAuth } from '../context/AuthContext';

/**
 * Activación y desactivación de la verificación en dos pasos.
 *
 * El flujo tiene tres estados en pantalla porque el backend tiene tres pasos reales:
 * `setup` genera el secreto y devuelve el QR (todavía sin activar nada), `confirm` valida el
 * primer código y recién ahí queda activo. Mostrar el QR y dar por activado el 2FA sin
 * confirmar dejaría cuentas trabadas: el próximo login pediría un código que la app del
 * usuario nunca llegó a generar.
 */
export default function TwoFactorCard() {
    const { user, refreshUser } = useAuth();
    const setupMutation = useSetup2fa();
    const confirmMutation = useConfirm2fa();
    const disableMutation = useDisable2fa();

    const [code, setCode] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [disableOpened, { open: openDisable, close: closeDisable }] = useDisclosure(false);
    const [password, setPassword] = useState('');
    const [disableError, setDisableError] = useState('');

    const isEnabled = !!user?.totp_enabled;
    const qrCode = setupMutation.data?.qrCode;

    const startSetup = () => {
        setCode('');
        setConfirmError('');
        setupMutation.mutate();
    };

    const handleConfirm = () => {
        setConfirmError('');
        confirmMutation.mutate(code, {
            onSuccess: async (data) => {
                notifications.show({ title: 'Verificación en dos pasos activada', message: data.message, color: 'teal' });
                setupMutation.reset();
                setCode('');
                await refreshUser();
            },
            onError: (error) => setConfirmError(apiErrorMessage(error, 'No se pudo confirmar el código.')),
        });
    };

    const handleDisable = () => {
        setDisableError('');
        disableMutation.mutate(password, {
            onSuccess: async (data) => {
                notifications.show({ title: 'Verificación en dos pasos desactivada', message: data.message, color: 'orange' });
                setPassword('');
                closeDisable();
                await refreshUser();
            },
            onError: (error) => setDisableError(apiErrorMessage(error, 'No se pudo desactivar el 2FA.')),
        });
    };

    return (
        <Stack>
            <Group justify="space-between">
                <Text fw={600} size="lg" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <IconShieldCheck size={18} /> Verificación en dos pasos
                </Text>
                <Badge color={isEnabled ? 'teal' : 'gray'} variant="light">
                    {isEnabled ? 'Activa' : 'Inactiva'}
                </Badge>
            </Group>

            {isEnabled ? (
                <>
                    <Text size="sm" c="dimmed">
                        Cada vez que inicies sesión te vamos a pedir un código de tu app autenticadora,
                        además de la contraseña.
                    </Text>
                    <Group>
                        <Button
                            color="red"
                            variant="light"
                            radius="md"
                            leftSection={<IconShieldOff size={16} />}
                            onClick={openDisable}
                        >
                            Desactivar
                        </Button>
                    </Group>
                </>
            ) : qrCode ? (
                <>
                    <Text size="sm" c="dimmed">
                        Escanea este código con Google Authenticator, Authy o similar, y después escribe
                        el código de 6 dígitos que te muestre.
                    </Text>

                    <Center>
                        <Image src={qrCode} alt="Código QR para configurar 2FA" w={180} h={180} radius="md" />
                    </Center>

                    <Text size="xs" c="dimmed" ta="center">
                        Si no podés escanear, cargá esta clave a mano: <Code>{setupMutation.data?.secret}</Code>
                    </Text>

                    {confirmError && (
                        <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={16} />}>
                            {confirmError}
                        </Alert>
                    )}

                    <Center>
                        <PinInput
                            length={6}
                            type="number"
                            inputMode="numeric"
                            oneTimeCode
                            value={code}
                            onChange={setCode}
                            aria-label="Código de verificación"
                        />
                    </Center>

                    <Group justify="flex-end">
                        <Button variant="default" radius="md" onClick={() => setupMutation.reset()}>
                            Cancelar
                        </Button>
                        <Button
                            color="teal"
                            radius="md"
                            onClick={handleConfirm}
                            disabled={code.length !== 6}
                            loading={confirmMutation.isPending}
                        >
                            Confirmar y activar
                        </Button>
                    </Group>
                </>
            ) : (
                <>
                    <Text size="sm" c="dimmed">
                        Suma una segunda barrera al inicio de sesión: aunque alguien tenga tu contraseña,
                        sin el código de tu teléfono no puede entrar.
                    </Text>

                    {setupMutation.isError && (
                        <Alert color="red" variant="light" radius="md" icon={<IconAlertCircle size={16} />}>
                            {apiErrorMessage(setupMutation.error, 'No se pudo iniciar la configuración.')}
                        </Alert>
                    )}

                    <Group>
                        <Button color="teal" radius="md" onClick={startSetup} loading={setupMutation.isPending}>
                            Activar 2FA
                        </Button>
                    </Group>
                </>
            )}

            <Modal opened={disableOpened} onClose={closeDisable} title="Desactivar verificación en dos pasos" centered>
                <Stack>
                    {disableError && (
                        <Alert color="red" variant="light" radius="md">
                            {disableError}
                        </Alert>
                    )}
                    <Text size="sm" c="dimmed">
                        Confirmá con tu contraseña actual. Tu cuenta vuelve a quedar protegida solo por
                        la contraseña.
                    </Text>
                    <PasswordInput
                        label="Contraseña actual"
                        placeholder="••••••••"
                        radius="md"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                    />
                    <Group justify="flex-end">
                        <Button variant="default" radius="md" onClick={closeDisable}>
                            Cancelar
                        </Button>
                        <Button
                            color="red"
                            radius="md"
                            onClick={handleDisable}
                            disabled={!password}
                            loading={disableMutation.isPending}
                        >
                            Desactivar
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Stack>
    );
}
