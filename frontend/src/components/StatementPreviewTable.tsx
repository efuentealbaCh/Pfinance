import { Badge, Group, ScrollArea, Table, Text, Tooltip } from '@mantine/core';
import { IconArrowDownLeft, IconArrowUpRight } from '@tabler/icons-react';
import type { StatementPreviewRow } from '../api/queries';

interface StatementPreviewTableProps {
    rows: StatementPreviewRow[];
    /** Moneda de la cuenta destino, para formatear los montos como corresponde. */
    currency: string;
    /** Cuántas filas quedaron fuera de la muestra. */
    truncated: number;
}

/**
 * Formatea un monto con los decimales de su moneda.
 *
 * El peso chileno no lleva fracción: mostrar `$85.000,00` se ve mal y no coincide con la cartola
 * que el usuario tiene al lado para comparar.
 */
function formatAmount(amount: number, currency: string): string {
    const decimals = currency === 'CLP' ? 0 : 2;
    const formatted = new Intl.NumberFormat(currency === 'CLP' ? 'es-CL' : 'en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(amount);

    return `${currency === 'CLP' ? '$' : 'US$'}${formatted}`;
}

/** Convierte `2026-08-03` a `03/08/2026` sin pasar por `Date`, que correría el día por zona horaria. */
function formatDate(isoDate: string): string {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
}

/**
 * Tabla con los movimientos ya interpretados, tal como quedarían al importar.
 *
 * Es el corazón de la revisión: si el mapeo de columnas está mal, acá se ve al instante porque
 * las fechas o los montos salen absurdos, y todavía no se escribió nada en la base.
 */
export default function StatementPreviewTable({ rows, currency, truncated }: StatementPreviewTableProps) {
    return (
        <>
            <ScrollArea.Autosize mah={420} type="auto">
                <Table striped highlightOnHover stickyHeader verticalSpacing="xs" fz="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w={100}>Fecha</Table.Th>
                            <Table.Th>Descripción</Table.Th>
                            <Table.Th w={140} ta="right">
                                Monto
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.map((row) => (
                            <Table.Tr key={row.row_index} opacity={row.already_imported ? 0.45 : 1}>
                                <Table.Td>
                                    <Text size="sm" fw={500}>
                                        {formatDate(row.date)}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap={6} wrap="nowrap">
                                        <Text size="sm" lineClamp={1}>
                                            {row.description}
                                        </Text>
                                        {row.already_imported && (
                                            <Tooltip label="Este movimiento ya está en la cuenta, no se volverá a crear">
                                                <Badge size="xs" variant="light" color="gray" style={{ flexShrink: 0 }}>
                                                    Ya importado
                                                </Badge>
                                            </Tooltip>
                                        )}
                                    </Group>
                                </Table.Td>
                                <Table.Td ta="right">
                                    <Group gap={4} justify="flex-end" wrap="nowrap">
                                        {row.type === 'income' ? (
                                            <IconArrowUpRight size={14} color="var(--mantine-color-teal-6)" />
                                        ) : (
                                            <IconArrowDownLeft size={14} color="var(--mantine-color-red-6)" />
                                        )}
                                        <Text size="sm" fw={600} c={row.type === 'income' ? 'teal' : 'red'}>
                                            {formatAmount(row.amount, currency)}
                                        </Text>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea.Autosize>

            {truncated > 0 && (
                <Text size="xs" c="dimmed" mt="xs" ta="center">
                    Se muestran las primeras {rows.length} filas. Hay {truncated} más que también se importarán.
                </Text>
            )}
        </>
    );
}
