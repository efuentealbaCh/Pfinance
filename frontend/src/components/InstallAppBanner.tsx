import { useState } from 'react';
import { ActionIcon, Button, Group, List, Modal, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceMobile, IconDownload, IconShare2, IconX } from '@tabler/icons-react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import { isMobile } from '../utils/platform';

/** Clave donde se recuerda que el usuario cerró el aviso, para no volver a insistirle. */
const DISMISSED_KEY = 'pfinance_install_dismissed';

/**
 * Invitación a instalar la PWA, pensada para la pantalla de login.
 *
 * Aparece antes de iniciar sesión a propósito: en iOS las notificaciones push solo existen si
 * la app se abrió desde la pantalla de inicio, así que ofrecerla después —ya adentro, en el
 * perfil— llega tarde. El usuario tendría que instalar, volver a entrar y recién ahí activarlas.
 *
 * En Chromium alcanza con un botón, porque el navegador ofrece un cartel de instalación real.
 * En iOS no hay ninguna API equivalente: lo único posible es explicar los pasos.
 */
export default function InstallAppBanner() {
    const { method } = useInstallPrompt();
    const [stepsOpened, { open: openSteps, close: closeSteps }] = useDisclosure(false);

    const [dismissed, setDismissed] = useState(() => {
        try {
            return localStorage.getItem(DISMISSED_KEY) === '1';
        } catch {
            return false;
        }
    });

    const dismiss = () => {
        setDismissed(true);
        try {
            localStorage.setItem(DISMISSED_KEY, '1');
        } catch {
        }
    };

    if (dismissed || !isMobile() || method === 'unavailable') return null;

    return (
        <>
            <Paper withBorder radius="lg" p="md" mt="md">
                <Group justify="space-between" align="flex-start" wrap="nowrap" gap="sm">
                    <Group gap="sm" wrap="nowrap" align="flex-start">
                        <IconDeviceMobile size={22} style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                            <Text fw={600} size="sm">
                                {method === 'ios-manual'
                                    ? 'Agregá Pfinance a tu pantalla de inicio'
                                    : 'Instalá Pfinance en tu teléfono'}
                            </Text>
                            <Text size="xs" c="dimmed" mt={2}>
                                {method === 'ios-manual'
                                    ? 'En iPhone y iPad, los avisos de cuotas y deudas solo llegan si la app está instalada.'
                                    : 'Se abre como una app aparte y puede avisarte de cuotas y deudas.'}
                            </Text>
                        </div>
                    </Group>

                    <ActionIcon variant="subtle" color="gray" onClick={dismiss} aria-label="Cerrar aviso">
                        <IconX size={16} />
                    </ActionIcon>
                </Group>

                <Group mt="sm">
                    {method === 'ios-manual' ? (
                        <Button
                            size="xs"
                            variant="light"
                            color="teal"
                            leftSection={<IconShare2 size={14} />}
                            onClick={openSteps}
                        >
                            Ver cómo se hace
                        </Button>
                    ) : (
                        <InstallButton />
                    )}
                </Group>
            </Paper>

            <Modal opened={stepsOpened} onClose={closeSteps} title="Agregar Pfinance a la pantalla de inicio" centered>
                <Stack gap="sm">
                    <Text size="sm" c="dimmed">
                        En iOS la instalación la hace el propio Safari; la app no puede dispararla sola.
                        Son cuatro pasos:
                    </Text>
                    <List type="ordered" spacing="xs" size="sm">
                        <List.Item>Abrí Pfinance en Safari (desde otro navegador la opción no aparece).</List.Item>
                        <List.Item>Tocá el botón Compartir, el cuadrado con la flecha hacia arriba.</List.Item>
                        <List.Item>Deslizá el menú y elegí «Agregar a inicio».</List.Item>
                        <List.Item>Confirmá con «Agregar».</List.Item>
                    </List>
                    <Text size="sm">
                        Después entrá desde el ícono nuevo, no desde Safari: recién ahí vas a poder activar
                        las notificaciones en tu perfil.
                    </Text>
                    <Group justify="flex-end">
                        <Button variant="default" onClick={closeSteps}>
                            Entendido
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
}

/** Botón que dispara el cartel de instalación nativo de Chromium. */
function InstallButton() {
    const { promptInstall } = useInstallPrompt();
    const [working, setWorking] = useState(false);

    const handleClick = async () => {
        setWorking(true);
        try {
            await promptInstall();
        } finally {
            setWorking(false);
        }
    };

    return (
        <Button
            size="xs"
            variant="light"
            color="teal"
            leftSection={<IconDownload size={14} />}
            onClick={handleClick}
            loading={working}
        >
            Instalar app
        </Button>
    );
}
