import { useState } from 'react';
import {
    Modal,
    Button,
    Stack,
    Text,
    SegmentedControl,
    Group,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import api from '../api/axios';

interface ExportModalProps {
    opened: boolean;
    onClose: () => void;
}

export default function ExportModal({ opened, onClose }: ExportModalProps) {
    const [format, setFormat] = useState<string>('excel');
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('format', format);
            if (dateFrom) {
                const dFrom = new Date(dateFrom);
                if (!isNaN(dFrom.getTime())) params.append('date_from', dFrom.toISOString().split('T')[0]);
            }
            if (dateTo) {
                const dTo = new Date(dateTo);
                if (!isNaN(dTo.getTime())) params.append('date_to', dTo.toISOString().split('T')[0]);
            }

            // Request with responseType blob to handle file download
            const response = await api.get(`/export/transactions?${params.toString()}`, {
                responseType: 'blob',
            });

            // Handle file download
            const blob = new Blob([response.data], {
                type: format === 'excel' 
                    ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                    : 'application/pdf'
            });
            const url = window.URL.createObjectURL(blob);
            
            // Generate filename based on headers if available or generic
            const contentDisposition = response.headers['content-disposition'];
            let filename = `transacciones_${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : 'pdf'}`;
            
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch && filenameMatch.length === 2) {
                    filename = filenameMatch[1];
                }
            }

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            notifications.show({
                title: 'Exportación exitosa',
                message: 'Tu archivo ha sido descargado correctamente.',
                color: 'teal',
            });
            onClose();
        } catch (err) {
            console.error('Export error:', err);
            notifications.show({
                title: 'Error',
                message: `No se pudo generar el archivo de exportación. Detalle: ${err instanceof Error ? err.message : String(err)}`,
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Text fw={700} size="lg">
                    📥 Exportar Transacciones
                </Text>
            }
            centered
            radius="lg"
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Stack gap="md">
                <Text size="sm" c="dimmed">
                    Selecciona el formato y el rango de fechas para generar tu reporte. Si no seleccionas fechas, se exportará el historial completo.
                </Text>

                <SegmentedControl
                    value={format}
                    onChange={setFormat}
                    data={[
                        { label: '📊 Excel (.xlsx)', value: 'excel' },
                        { label: '📄 PDF (Documento)', value: 'pdf' },
                    ]}
                    radius="md"
                    fullWidth
                    color={format === 'excel' ? 'teal' : 'blue'}
                />

                <Group grow align="flex-start">
                    <DateInput
                        label="Desde"
                        placeholder="Fecha inicio"
                        clearable
                        valueFormat="DD/MM/YYYY"
                        value={dateFrom}
                        onChange={(val: any) => setDateFrom(val)}
                        maxDate={dateTo || undefined}
                        radius="md"
                    />
                    <DateInput
                        label="Hasta"
                        placeholder="Fecha fin"
                        clearable
                        valueFormat="DD/MM/YYYY"
                        value={dateTo}
                        onChange={(val: any) => setDateTo(val)}
                        minDate={dateFrom || undefined}
                        maxDate={new Date()}
                        radius="md"
                    />
                </Group>

                <Button
                    color={format === 'csv' ? 'teal' : 'blue'}
                    radius="md"
                    fullWidth
                    mt="md"
                    loading={loading}
                    onClick={handleExport}
                >
                    Descargar {format.toUpperCase()}
                </Button>
            </Stack>
        </Modal>
    );
}
