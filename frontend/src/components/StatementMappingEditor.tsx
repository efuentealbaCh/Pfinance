import { Alert, Button, Grid, Group, SegmentedControl, Select, Stack, Text } from '@mantine/core';
import { IconInfoCircle, IconRefresh } from '@tabler/icons-react';
import type { ColumnRole, MappingOverride, StatementStructure } from '../api/queries';

interface StatementMappingEditorProps {
    structure: StatementStructure;
    value: MappingOverride;
    onChange: (mapping: MappingOverride) => void;
    /** Vuelve a pedir la previsualización con el mapeo corregido. */
    onReapply: () => void;
    loading: boolean;
}

/** Papeles que el usuario puede reasignar, con su nombre en pantalla. */
const ROLE_LABELS: Array<{ role: ColumnRole; label: string; help: string }> = [
    { role: 'date', label: 'Fecha', help: 'La fecha del movimiento' },
    { role: 'description', label: 'Descripción', help: 'La glosa o detalle' },
    { role: 'debit', label: 'Cargo', help: 'Lo que sale de la cuenta' },
    { role: 'credit', label: 'Abono', help: 'Lo que entra a la cuenta' },
    { role: 'amount', label: 'Monto único', help: 'Si el archivo trae una sola columna con signo' },
    { role: 'balance', label: 'Saldo', help: 'El saldo corriente, si lo trae' },
    { role: 'reference', label: 'N° documento', help: 'Referencia u operación' },
];

/**
 * Corrector manual del mapeo de columnas.
 *
 * Es la salida de escape del diseño: la detección automática cubre el caso general, pero si un
 * banco usa títulos que no se parecen a nada conocido, acá se arregla sin esperar un deploy.
 *
 * Va colapsado y solo aparece cuando hace falta, porque en el camino feliz el usuario no tiene
 * por qué pensar en columnas: ya vio la tabla interpretada y le calzó.
 */
export default function StatementMappingEditor({
    structure,
    value,
    onChange,
    onReapply,
    loading,
}: StatementMappingEditorProps) {
    const options = structure.available_columns
        .filter((column) => column.label !== '')
        .map((column) => ({ value: String(column.index), label: column.label }));

    /** Índice actualmente asignado a un papel, sea por corrección del usuario o por detección. */
    const currentIndex = (role: ColumnRole): string | null => {
        const overridden = value.columns?.[role];
        if (overridden !== undefined) return String(overridden);

        const detected = structure.columns[role];
        return detected ? String(detected.index) : null;
    };

    const setRole = (role: ColumnRole, index: string | null) => {
        const columns = { ...(value.columns ?? {}) };
        if (index === null) delete columns[role];
        else columns[role] = Number(index);

        onChange({ ...value, columns });
    };

    const shape = value.shape ?? structure.shape;

    return (
        <Stack gap="md">
            {options.length === 0 && (
                <Alert color="orange" icon={<IconInfoCircle size={18} />} radius="md">
                    El archivo no tiene una fila de encabezados reconocible, así que no se pueden elegir columnas por
                    nombre. Se están usando las posiciones detectadas por el contenido.
                </Alert>
            )}

            <div>
                <Text size="sm" fw={600} mb={4}>
                    ¿Cómo indica el archivo si un movimiento suma o resta?
                </Text>
                <SegmentedControl
                    fullWidth
                    radius="md"
                    value={shape}
                    onChange={(next) => onChange({ ...value, shape: next as 'signed' | 'debit_credit' })}
                    data={[
                        { label: 'Dos columnas: cargo y abono', value: 'debit_credit' },
                        { label: 'Una columna con signo', value: 'signed' },
                    ]}
                />
            </div>

            {shape === 'signed' && (
                <div>
                    <Text size="sm" fw={600} mb={4}>
                        Un monto positivo significa
                    </Text>
                    <SegmentedControl
                        fullWidth
                        radius="md"
                        value={value.positiveMeans ?? structure.positive_means}
                        onChange={(next) => onChange({ ...value, positiveMeans: next as 'income' | 'expense' })}
                        data={[
                            { label: 'Un ingreso', value: 'income' },
                            { label: 'Un gasto', value: 'expense' },
                        ]}
                    />
                </div>
            )}

            <Grid gutter="sm">
                {ROLE_LABELS.filter((entry) => {
                    // No tiene sentido pedir cargo y abono si el archivo usa una sola columna, ni al revés.
                    if (shape === 'debit_credit') return entry.role !== 'amount';
                    return entry.role !== 'debit' && entry.role !== 'credit';
                }).map((entry) => (
                    <Grid.Col span={{ base: 12, sm: 6 }} key={entry.role}>
                        <Select
                            label={entry.label}
                            description={entry.help}
                            placeholder="Sin asignar"
                            data={options}
                            value={currentIndex(entry.role)}
                            onChange={(next) => setRole(entry.role, next)}
                            clearable
                            radius="md"
                            disabled={options.length === 0}
                        />
                    </Grid.Col>
                ))}
            </Grid>

            <Group justify="flex-end">
                <Button
                    variant="light"
                    radius="md"
                    leftSection={<IconRefresh size={16} />}
                    onClick={onReapply}
                    loading={loading}
                >
                    Volver a interpretar
                </Button>
            </Group>
        </Stack>
    );
}
