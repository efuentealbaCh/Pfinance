import type { ReactNode } from 'react';
import { Container, Paper, Text, Title } from '@mantine/core';
import { IconWallet } from '@tabler/icons-react';

interface AuthShellProps {
    /** Línea bajo el logo que explica qué se hace en esta pantalla. */
    subtitle: string;
    children: ReactNode;
    /** Contenido suelto debajo de la tarjeta, fuera del formulario (ej. el aviso de instalación). */
    after?: ReactNode;
}

/**
 * Marco compartido de las pantallas fuera de la sesión (login, registro, verificación de
 * correo, recuperación de contraseña).
 *
 * Existe porque son cinco pantallas con el mismo encabezado y el mismo fondo: repetido en
 * cada archivo, cualquier ajuste al degradado o al logo se aplicaba en unas y en otras no,
 * y el usuario veía dos versiones distintas de la misma app según por dónde entrara.
 */
export default function AuthShell({ subtitle, children, after }: AuthShellProps) {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem 0',
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <IconWallet size={32} stroke={2} /> Pfinance
                </Title>
                <Text c="dimmed" size="sm" ta="center" mb={30}>
                    {subtitle}
                </Text>

                <Paper withBorder shadow="xl" p={30} radius="lg">
                    {children}
                </Paper>

                {after}
            </Container>
        </div>
    );
}
