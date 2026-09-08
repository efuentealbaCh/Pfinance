import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import {
    Accordion,
    Alert,
    Badge,
    Box,
    Button,
    Card,
    Center,
    Divider,
    Grid,
    Group,
    List,
    Loader,
    Paper,
    Select,
    SimpleGrid,
    Stack,
    Stepper,
    Switch,
    Text,
    ThemeIcon,
    Title,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import {
    IconAlertTriangle,
    IconArrowLeft,
    IconArrowRight,
    IconCheck,
    IconChecklist,
    IconCircleCheck,
    IconCloudUpload,
    IconFileSpreadsheet,
    IconFileUpload,
    IconSettings,
    IconTrash,
    IconX,
} from '@tabler/icons-react';
import {
    useCatalogs,
    useConfirmStatement,
    usePreviewStatement,
    useUndoStatementImport,
    type MappingOverride,
    type StatementImportResult,
    type StatementPreview,
} from '../api/queries';
import StatementPreviewTable from '../components/StatementPreviewTable';
import StatementMappingEditor from '../components/StatementMappingEditor';

/** Extensiones que acepta el backend. */
const ACCEPTED_EXTENSIONS = ['.xlsx', '.xls', '.csv'];

/** Tope de tamaño, el mismo que aplica el backend. */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/** Nombre en pantalla de cada papel de columna. */
const ROLE_NAMES: Record<string, string> = {
    date: 'Fecha',
    description: 'Descripción',
    amount: 'Monto',
    debit: 'Cargo',
    credit: 'Abono',
    balance: 'Saldo',
    reference: 'N° documento',
};

/**
 * Formatea un monto según su moneda. El peso chileno no lleva decimales, y mostrarlos haría que
 * el número no calce con la cartola que el usuario tiene abierta al lado.
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

/** Cuenta del usuario, con lo poco que necesita esta pantalla. */
interface AccountOption {
    id: string;
    identifier: string | null;
    currency?: string;
    bank?: { name?: string } | null;
}

/** Extrae el mensaje de error del backend, que es más útil que un "algo salió mal". */
function errorMessage(error: AxiosError<{ message?: string | string[] }>, fallback: string): string {
    const detail = error?.response?.data?.message;
    if (Array.isArray(detail)) return detail.join(' ');
    return detail || fallback;
}

/**
 * Asistente de importación de cartolas bancarias.
 *
 * El paso de revisión es la razón de ser de toda la pantalla: la importación crea decenas o
 * cientos de transacciones de una vez, así que el usuario tiene que poder ver exactamente qué
 * entendió el sistema antes de que se escriba nada. La previsualización del backend no toca la
 * base, y recién la confirmación importa.
 */
export default function StatementImportPage() {
    const navigate = useNavigate();
    const { data: catalogs, isLoading: loadingCatalogs } = useCatalogs();

    const [step, setStep] = useState(0);
    const [accountId, setAccountId] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [mapping, setMapping] = useState<MappingOverride>({});
    const [preview, setPreview] = useState<StatementPreview | null>(null);
    const [result, setResult] = useState<StatementImportResult | null>(null);
    const [setBalanceToClosing, setSetBalanceToClosing] = useState(false);
    const [saveMapping, setSaveMapping] = useState(true);

    const previewMutation = usePreviewStatement();
    const confirmMutation = useConfirmStatement();
    const undoMutation = useUndoStatementImport();

    const accounts = catalogs?.userAccounts ?? [];

    const accountOptions = accounts.map((account: AccountOption) => ({
        value: account.id,
        label: `${account.bank?.name ?? 'Cuenta'} · ${account.identifier ?? 'sin identificar'} (${account.currency ?? 'CLP'})`,
    }));

    /** Pide la previsualización. Nada se escribe: solo se muestra qué se importaría. */
    const runPreview = (override: MappingOverride = mapping) => {
        if (!file || !accountId) return;

        previewMutation.mutate(
            { file, accountId, mapping: Object.keys(override).length > 0 ? override : undefined },
            {
                onSuccess: (data) => {
                    setPreview(data);
                    setStep(1);
                },
                onError: (error) => {
                    notifications.show({
                        title: 'No se pudo leer la cartola',
                        message: errorMessage(error, 'Revisá que el archivo sea el que descargaste del banco.'),
                        color: 'red',
                        icon: <IconX size={18} />,
                        autoClose: 10000,
                    });
                },
            },
        );
    };

    const runConfirm = () => {
        if (!file || !accountId) return;

        confirmMutation.mutate(
            {
                file,
                accountId,
                mapping: Object.keys(mapping).length > 0 ? mapping : undefined,
                setBalanceToClosing,
                saveMapping,
            },
            {
                onSuccess: (data) => {
                    setResult(data);
                    setStep(2);
                },
                onError: (error) => {
                    notifications.show({
                        title: 'No se pudo importar',
                        message: errorMessage(error, 'Ocurrió un problema al importar los movimientos.'),
                        color: 'red',
                        icon: <IconX size={18} />,
                        autoClose: 10000,
                    });
                },
            },
        );
    };

    const restart = () => {
        setStep(0);
        setFile(null);
        setPreview(null);
        setResult(null);
        setMapping({});
        setSetBalanceToClosing(false);
    };

    const currency = preview?.account.currency ?? 'CLP';
    // Se ofrece corregir el mapeo solo cuando hay motivo: en el camino feliz el usuario no tiene
    // por qué pensar en columnas, ya vio la tabla interpretada y le calzó.
    const needsAttention = (preview?.warnings.length ?? 0) > 0 || (preview?.totals.detected ?? 0) === 0;

    return (
        <Stack gap="lg">
            <Group justify="space-between" align="flex-start">
                <div>
                    <Title order={2}>Importar cartola</Title>
                    <Text c="dimmed" size="sm">
                        Cargá el archivo que descargaste del banco y revisá los movimientos antes de importarlos.
                    </Text>
                </div>
                <Button variant="subtle" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate('/transactions')}>
                    Volver
                </Button>
            </Group>

            <Stepper active={step} onStepClick={(next) => next < step && setStep(next)} radius="md" size="sm">
                <Stepper.Step label="Archivo" description="Cuenta y cartola" icon={<IconFileUpload size={18} />} />
                <Stepper.Step label="Revisión" description="Qué se importará" icon={<IconChecklist size={18} />} />
                <Stepper.Step label="Listo" description="Resultado" icon={<IconCircleCheck size={18} />} />
            </Stepper>

            {/* ── Paso 1: cuenta y archivo ───────────────────────────── */}
            {step === 0 && (
                <Card withBorder radius="lg" p="lg">
                    <Stack gap="md">
                        {loadingCatalogs ? (
                            <Center py="xl">
                                <Loader />
                            </Center>
                        ) : accounts.length === 0 ? (
                            <Alert color="orange" icon={<IconAlertTriangle size={18} />} radius="md">
                                Primero necesitás crear una cuenta desde el dashboard para poder importarle movimientos.
                            </Alert>
                        ) : (
                            <>
                                <Select
                                    label="¿A qué cuenta pertenece esta cartola?"
                                    description="Los movimientos se importarán en la moneda de la cuenta"
                                    placeholder="Elegí una cuenta"
                                    data={accountOptions}
                                    value={accountId}
                                    onChange={setAccountId}
                                    radius="md"
                                    searchable
                                />

                                <Dropzone
                                    onDrop={(files) => setFile(files[0] ?? null)}
                                    onReject={() =>
                                        notifications.show({
                                            title: 'Archivo rechazado',
                                            message: `Solo se aceptan ${ACCEPTED_EXTENSIONS.join(', ')} de hasta 5 MB.`,
                                            color: 'orange',
                                        })
                                    }
                                    maxSize={MAX_FILE_SIZE}
                                    maxFiles={1}
                                    radius="md"
                                    disabled={!accountId}
                                >
                                    <Group justify="center" gap="xl" mih={140} style={{ pointerEvents: 'none' }}>
                                        <Dropzone.Accept>
                                            <IconCloudUpload size={48} color="var(--mantine-color-blue-6)" />
                                        </Dropzone.Accept>
                                        <Dropzone.Reject>
                                            <IconX size={48} color="var(--mantine-color-red-6)" />
                                        </Dropzone.Reject>
                                        <Dropzone.Idle>
                                            <IconFileSpreadsheet size={48} color="var(--mantine-color-dimmed)" />
                                        </Dropzone.Idle>

                                        <div>
                                            <Text size="lg" inline>
                                                {file ? file.name : 'Arrastrá la cartola acá o hacé clic para elegirla'}
                                            </Text>
                                            <Text size="sm" c="dimmed" inline mt={7}>
                                                {file
                                                    ? `${(file.size / 1024).toFixed(0)} KB · listo para revisar`
                                                    : `Excel o CSV (${ACCEPTED_EXTENSIONS.join(', ')}), hasta 5 MB`}
                                            </Text>
                                        </div>
                                    </Group>
                                </Dropzone>

                                <Alert color="blue" variant="light" icon={<IconCircleCheck size={18} />} radius="md">
                                    En el siguiente paso vas a ver exactamente qué movimientos se importarían.{' '}
                                    <Text span fw={600}>
                                        Hasta que confirmes, no se guarda nada.
                                    </Text>
                                </Alert>

                                <Group justify="flex-end">
                                    <Button
                                        radius="md"
                                        rightSection={<IconArrowRight size={16} />}
                                        disabled={!file || !accountId}
                                        loading={previewMutation.isPending}
                                        onClick={() => runPreview()}
                                    >
                                        Revisar movimientos
                                    </Button>
                                </Group>
                            </>
                        )}
                    </Stack>
                </Card>
            )}

            {/* ── Paso 2: revisión ───────────────────────────────────── */}
            {step === 1 && preview && (
                <Stack gap="md">
                    <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
                        <SummaryTile label="Se importarán" value={preview.totals.to_import} color="teal" highlight />
                        <SummaryTile label="Detectados" value={preview.totals.detected} color="blue" />
                        <SummaryTile label="Ya importados" value={preview.totals.already_imported} color="gray" />
                        <SummaryTile label="Sin interpretar" value={preview.totals.skipped} color="orange" />
                    </SimpleGrid>

                    {preview.warnings.map((warning, index) => (
                        <Alert key={index} color="yellow" icon={<IconAlertTriangle size={18} />} radius="md">
                            {warning}
                        </Alert>
                    ))}

                    {preview.totals.to_import === 0 && (
                        <Alert color="blue" icon={<IconCircleCheck size={18} />} radius="md">
                            No hay nada nuevo que importar: todos los movimientos de este archivo ya están en la cuenta.
                        </Alert>
                    )}

                    <Card withBorder radius="lg" p="lg">
                        <Group justify="space-between" mb="sm" wrap="wrap">
                            <div>
                                <Text fw={600}>Cómo se interpretó el archivo</Text>
                                <Text size="xs" c="dimmed">
                                    {preview.structure.detected_by === 'headers'
                                        ? 'Las columnas se reconocieron por sus títulos'
                                        : 'Sin encabezados: las columnas se dedujeron del contenido'}
                                    {preview.structure.period &&
                                        ` · período ${formatDate(preview.structure.period.from)} a ${formatDate(
                                            preview.structure.period.to,
                                        )}`}
                                </Text>
                            </div>
                            <Badge variant="light" color={needsAttention ? 'yellow' : 'teal'} size="lg">
                                {needsAttention ? 'Revisar con atención' : 'Se ve correcto'}
                            </Badge>
                        </Group>

                        <Group gap="xs" wrap="wrap">
                            {Object.entries(preview.structure.columns).map(([role, column]) => (
                                <Badge key={role} variant="outline" color="gray" radius="sm" size="lg" tt="none">
                                    <Text span size="xs" fw={700}>
                                        {ROLE_NAMES[role] ?? role}
                                    </Text>
                                    <Text span size="xs" c="dimmed">
                                        {' → '}
                                        {column?.label ?? `columna ${(column?.index ?? 0) + 1}`}
                                    </Text>
                                </Badge>
                            ))}
                        </Group>
                    </Card>

                    <Card withBorder radius="lg" p={0}>
                        <Box p="md" pb="xs">
                            <Text fw={600}>Movimientos que se importarán</Text>
                            <Text size="xs" c="dimmed">
                                Si las fechas o los montos se ven raros, el mapeo de columnas está mal.
                            </Text>
                        </Box>
                        <Divider />
                        <Box p="md" pt="xs">
                            <StatementPreviewTable
                                rows={preview.rows}
                                currency={currency}
                                truncated={preview.rows_truncated}
                            />
                        </Box>
                    </Card>

                    <Accordion variant="separated" radius="md" defaultValue={needsAttention ? 'mapping' : null}>
                        <Accordion.Item value="mapping">
                            <Accordion.Control icon={<IconSettings size={18} />}>
                                <Text size="sm" fw={600}>
                                    Corregir el mapeo de columnas
                                </Text>
                                <Text size="xs" c="dimmed">
                                    Solo si algo se ve mal en la tabla de arriba
                                </Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <StatementMappingEditor
                                    structure={preview.structure}
                                    value={mapping}
                                    onChange={setMapping}
                                    onReapply={() => runPreview()}
                                    loading={previewMutation.isPending}
                                />
                            </Accordion.Panel>
                        </Accordion.Item>

                        {preview.skipped.length > 0 && (
                            <Accordion.Item value="skipped">
                                <Accordion.Control icon={<IconAlertTriangle size={18} />}>
                                    <Text size="sm" fw={600}>
                                        {preview.skipped.length} fila(s) que no se pudieron interpretar
                                    </Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <List size="sm" spacing="xs">
                                        {preview.skipped.map((row) => (
                                            <List.Item key={row.rowIndex}>
                                                <Text size="sm" fw={500}>
                                                    {row.reason}
                                                </Text>
                                                <Text size="xs" c="dimmed" lineClamp={1}>
                                                    {row.preview}
                                                </Text>
                                            </List.Item>
                                        ))}
                                    </List>
                                </Accordion.Panel>
                            </Accordion.Item>
                        )}
                    </Accordion>

                    <Card withBorder radius="lg" p="lg">
                        <Stack gap="md">
                            <Switch
                                checked={saveMapping}
                                onChange={(event) => setSaveMapping(event.currentTarget.checked)}
                                label="Recordar este mapeo para las próximas cartolas de este banco"
                            />

                            <Switch
                                checked={setBalanceToClosing}
                                onChange={(event) => setSetBalanceToClosing(event.currentTarget.checked)}
                                disabled={preview.closing_balance === null}
                                label={
                                    preview.closing_balance === null
                                        ? 'La cartola no trae saldo de cierre'
                                        : `Dejar el saldo de la cuenta en ${formatAmount(preview.closing_balance, currency)}`
                                }
                                description={
                                    preview.closing_balance === null
                                        ? undefined
                                        : `Hoy la cuenta tiene ${formatAmount(preview.account.balance, currency)}. Importar no cambia el saldo salvo que actives esto: la cartola registra movimientos que el banco ya aplicó.`
                                }
                            />
                        </Stack>
                    </Card>

                    <Group justify="space-between">
                        <Button variant="default" radius="md" leftSection={<IconArrowLeft size={16} />} onClick={restart}>
                            Elegir otro archivo
                        </Button>
                        <Button
                            radius="md"
                            color="teal"
                            leftSection={<IconCheck size={16} />}
                            disabled={preview.totals.to_import === 0}
                            loading={confirmMutation.isPending}
                            onClick={runConfirm}
                        >
                            Importar {preview.totals.to_import} movimiento{preview.totals.to_import === 1 ? '' : 's'}
                        </Button>
                    </Group>
                </Stack>
            )}

            {/* ── Paso 3: resultado ──────────────────────────────────── */}
            {step === 2 && result && (
                <Card withBorder radius="lg" p="xl">
                    <Stack align="center" gap="md">
                        <ThemeIcon size={64} radius="xl" color="teal" variant="light">
                            <IconCircleCheck size={38} />
                        </ThemeIcon>

                        <div style={{ textAlign: 'center' }}>
                            <Title order={3}>Importación completada</Title>
                            <Text c="dimmed" size="sm">
                                Se agregaron {result.imported} movimiento{result.imported === 1 ? '' : 's'} a tu cuenta.
                            </Text>
                        </div>

                        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm" w="100%" maw={560}>
                            <SummaryTile label="Importados" value={result.imported} color="teal" highlight />
                            <SummaryTile label="Ya estaban" value={result.already_imported} color="gray" />
                            <SummaryTile label="Sin interpretar" value={result.skipped} color="orange" />
                        </SimpleGrid>

                        <Paper withBorder radius="md" p="sm" w="100%" maw={560}>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">
                                    Saldo de la cuenta
                                </Text>
                                <Text size="sm" fw={600}>
                                    {result.balance.changed
                                        ? `${formatAmount(result.balance.before, currency)} → ${formatAmount(result.balance.after, currency)}`
                                        : `${formatAmount(result.balance.after, currency)} (sin cambios)`}
                                </Text>
                            </Group>
                        </Paper>

                        <Grid w="100%" maw={560} gutter="sm">
                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                <Button
                                    fullWidth
                                    variant="light"
                                    color="red"
                                    radius="md"
                                    leftSection={<IconTrash size={16} />}
                                    loading={undoMutation.isPending}
                                    onClick={() =>
                                        undoMutation.mutate(result.import_id, { onSuccess: () => navigate('/transactions') })
                                    }
                                >
                                    Deshacer importación
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                <Button fullWidth radius="md" onClick={() => navigate('/transactions')}>
                                    Ver mis transacciones
                                </Button>
                            </Grid.Col>
                        </Grid>

                        <Button variant="subtle" size="sm" onClick={restart}>
                            Importar otra cartola
                        </Button>
                    </Stack>
                </Card>
            )}
        </Stack>
    );
}

/** Cuadro con un número grande, para los conteos del resumen. */
function SummaryTile({
    label,
    value,
    color,
    highlight,
}: {
    label: string;
    value: number;
    color: string;
    highlight?: boolean;
}) {
    return (
        <Paper withBorder radius="md" p="sm" bg={highlight ? `var(--mantine-color-${color}-light)` : undefined}>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                {label}
            </Text>
            <Text size="xl" fw={700} c={value > 0 ? color : 'dimmed'}>
                {value}
            </Text>
        </Paper>
    );
}
