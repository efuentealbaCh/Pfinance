import { useState, useEffect } from 'react';
import {
    Modal,
    TextInput,
    Button,
    Stack,
    Alert,
    Text,
    SimpleGrid,
    Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateCategory, useUpdateCategory } from '../api/queries';

// Colores predefinidos para elegir rápido
const PRESET_COLORS = [
    '#FF6B6B', '#FF4757', '#D63031', '#E17055',
    '#F39C12', '#F9CA24', '#2ED573', '#00B894',
    '#4ECDC4', '#45B7D1', '#0984E3', '#7C4DFF',
    '#6C5CE7', '#E056A0', '#A29BFE', '#B2BEC3',
];

interface CategoryFormData {
    name: string;
    icon: string;
    color: string;
}

interface CategoryEditData {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
}

interface CategoryModalProps {
    opened: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editData?: CategoryEditData | null;
}

export default function CategoryModal({
    opened,
    onClose,
    onSuccess,
    editData,
}: CategoryModalProps) {
    const [error, setError] = useState('');
    const createMutation = useCreateCategory();
    const updateMutation = useUpdateCategory();
    const loading = createMutation.isPending || updateMutation.isPending;

    const form = useForm<CategoryFormData>({
        initialValues: {
            name: '',
            icon: '',
            color: '#4ECDC4',
        },
        validate: {
            name: (v) => (v.trim() ? null : 'El nombre es obligatorio'),
            color: (v) =>
                !v || /^#([A-Fa-f0-9]{6})$/.test(v)
                    ? null
                    : 'Color hex inválido (ej: #FF6B6B)',
        },
    });

    useEffect(() => {
        if (editData) {
            form.setValues({
                name: editData.name,
                icon: editData.icon || '',
                color: editData.color || '#4ECDC4',
            });
        } else {
            form.reset();
        }
        setError('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData, opened]);

    const handleSubmit = (values: CategoryFormData) => {
        setError('');

        const handleSuccess = () => {
            form.reset();
            onSuccess();
            onClose();
        };

        const handleError = (err: any) => {
            const axiosError = err as {
                response?: { data?: { message?: string; errors?: Record<string, string[]> } };
            };
            if (axiosError.response?.data?.errors) {
                const firstError = Object.values(axiosError.response.data.errors)[0];
                setError(firstError?.[0] || 'Error al guardar la categoría.');
            } else {
                setError(axiosError.response?.data?.message || 'Error al guardar la categoría.');
            }
        };

        if (editData) {
            updateMutation.mutate(
                { id: editData.id, data: values },
                { onSuccess: handleSuccess, onError: handleError }
            );
        } else {
            createMutation.mutate(
                values,
                { onSuccess: handleSuccess, onError: handleError }
            );
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={editData ? '✏️ Editar categoría' : '🏷️ Nueva categoría'}
            centered
            radius="lg"
            size="sm"
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    {error && (
                        <Alert color="red" variant="light" radius="md">
                            {error}
                        </Alert>
                    )}

                    <TextInput
                        label="Nombre"
                        placeholder="Ej: Alimentación"
                        required
                        radius="md"
                        {...form.getInputProps('name')}
                    />

                    <TextInput
                        label="Icono (emoji)"
                        placeholder="Ej: 🛒"
                        maxLength={10}
                        radius="md"
                        description="Pega un emoji directamente"
                        {...form.getInputProps('icon')}
                    />

                    {/* Selector de color */}
                    <div>
                        <Text size="sm" fw={500} mb={6}>
                            Color
                        </Text>
                        <SimpleGrid cols={8} spacing={6} mb={8}>
                            {PRESET_COLORS.map((c) => (
                                <Tooltip key={c} label={c} withArrow>
                                    <div
                                        onClick={() => form.setFieldValue('color', c)}
                                        style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: 6,
                                            backgroundColor: c,
                                            cursor: 'pointer',
                                            border:
                                                form.values.color === c
                                                    ? '3px solid white'
                                                    : '3px solid transparent',
                                            boxSizing: 'border-box',
                                            transition: 'transform 0.1s',
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.transform = 'scale(1.15)')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.transform = 'scale(1)')
                                        }
                                    />
                                </Tooltip>
                            ))}
                        </SimpleGrid>

                        <TextInput
                            placeholder="#FF6B6B"
                            maxLength={7}
                            radius="md"
                            description="O escribe un código hexadecimal manual"
                            leftSection={
                                <div
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: 4,
                                        backgroundColor: /^#([A-Fa-f0-9]{6})$/.test(
                                            form.values.color
                                        )
                                            ? form.values.color
                                            : '#ccc',
                                    }}
                                />
                            }
                            {...form.getInputProps('color')}
                        />
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        radius="md"
                        loading={loading}
                        style={{ backgroundColor: form.values.color }}
                    >
                        {editData ? 'Guardar cambios' : 'Crear categoría'}
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}
