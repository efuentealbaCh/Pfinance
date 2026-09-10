import { useEffect } from 'react';
import { Button, Group, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconRefresh } from '@tabler/icons-react';
import { alHaberVersionNueva, aplicarVersionNueva, hayVersionNueva } from '../pwa';

/** Identificador fijo del aviso, para que no se apilen dos si se comprueba más de una vez. */
const ID_DEL_AVISO = 'pfinance-version-nueva';

/**
 * Avisa que hay una versión nueva de la app y deja que el usuario decida cuándo aplicarla.
 *
 * No dibuja nada por sí mismo: su trabajo es mostrar una notificación persistente con el botón
 * de actualizar. La actualización recarga la app, así que forzarla sola interrumpiría a quien
 * está a mitad de cargar un movimiento — por eso la decisión es del usuario.
 */
export default function PwaUpdateNotice() {
    useEffect(() => {
        const mostrar = () => {
            notifications.show({
                id: ID_DEL_AVISO,
                title: 'Hay una versión nueva',
                message: (
                    <Stack gap="xs" mt={4}>
                        <Text size="sm">Actualizá para tener los últimos cambios. Se recarga la app.</Text>
                        <Group>
                            <Button
                                size="xs"
                                radius="md"
                                color="teal"
                                leftSection={<IconRefresh size={14} />}
                                onClick={aplicarVersionNueva}
                            >
                                Actualizar ahora
                            </Button>
                        </Group>
                    </Stack>
                ),
                color: 'teal',
                withCloseButton: true,
                autoClose: false,
            });
        };

        if (hayVersionNueva()) mostrar();
        return alHaberVersionNueva(mostrar);
    }, []);

    return null;
}
