import { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Title,
    Button,
    Paper,
    Group,
    SimpleGrid,
    Text,
    ActionIcon,
    Tooltip,
    Badge,
    Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import api from '../api/axios';
import CategoryModal from '../components/CategoryModal';

interface Category {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalOpened, setModalOpened] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    const fetchCategories = useCallback(async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch {
            notifications.show({
                title: 'Error',
                message: 'No se pudieron cargar las categorías.',
                color: 'red',
            });
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleEdit = (category: Category) => {
        setEditCategory(category);
        setModalOpened(true);
    };

    const handleDelete = async (category: Category) => {
        if (!window.confirm(`¿Eliminar la categoría "${category.name}"?`)) return;
        try {
            await api.delete(`/categories/${category.id}`);
            notifications.show({
                title: 'Categoría eliminada',
                message: `"${category.name}" fue eliminada.`,
                color: 'teal',
            });
            fetchCategories();
        } catch (err: unknown) {
            const axiosError = err as {
                response?: { data?: { message?: string }; status?: number };
            };
            notifications.show({
                title:
                    axiosError.response?.status === 409
                        ? 'No se puede eliminar'
                        : 'Error',
                message:
                    axiosError.response?.data?.message ||
                    'No se pudo eliminar la categoría.',
                color: 'red',
            });
        }
    };

    const handleModalClose = () => {
        setModalOpened(false);
        setEditCategory(null);
    };

    const handleCategorySaved = () => {
        notifications.show({
            title: editCategory ? 'Categoría actualizada' : 'Categoría creada',
            message: editCategory
                ? 'Los cambios fueron guardados.'
                : 'La nueva categoría fue registrada.',
            color: 'teal',
        });
        fetchCategories();
    };

    return (
        <>
            <Container size="md" py="xl">
                <Paper withBorder shadow="xl" p="xl" radius="lg">
                    {/* ─── Header ─────────────────────────────────────── */}
                    <Group justify="space-between" mb="xl">
                        <Title order={3}>🏷️ Categorías</Title>
                        <Button
                            color="teal"
                            radius="md"
                            onClick={() => {
                                setEditCategory(null);
                                setModalOpened(true);
                            }}
                        >
                            ➕ Nueva categoría
                        </Button>
                    </Group>

                    {/* ─── Grid de categorías ──────────────────────────── */}
                    {categories.length === 0 ? (
                        <Text c="dimmed" ta="center" py="xl">
                            No hay categorías registradas aún.
                        </Text>
                    ) : (
                        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                            {categories.map((cat) => (
                                <Paper
                                    key={cat.id}
                                    withBorder
                                    p="md"
                                    radius="md"
                                    style={{
                                        borderLeft: `4px solid ${cat.color || '#4ECDC4'}`,
                                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow =
                                            '0 4px 12px rgba(0,0,0,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <Group justify="space-between" wrap="nowrap">
                                        <Stack gap={4}>
                                            <Group gap="xs">
                                                <Text size="xl">{cat.icon || '📁'}</Text>
                                                <Text fw={600} size="sm" lineClamp={1}>
                                                    {cat.name}
                                                </Text>
                                            </Group>
                                            {cat.color && (
                                                <Badge
                                                    size="xs"
                                                    variant="dot"
                                                    style={{ color: cat.color }}
                                                >
                                                    {cat.color}
                                                </Badge>
                                            )}
                                        </Stack>

                                        <Group gap={4} wrap="nowrap">
                                            <Tooltip label="Editar">
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="blue"
                                                    size="sm"
                                                    onClick={() => handleEdit(cat)}
                                                >
                                                    ✏️
                                                </ActionIcon>
                                            </Tooltip>
                                            <Tooltip label="Eliminar">
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="red"
                                                    size="sm"
                                                    onClick={() => handleDelete(cat)}
                                                >
                                                    🗑️
                                                </ActionIcon>
                                            </Tooltip>
                                        </Group>
                                    </Group>
                                </Paper>
                            ))}
                        </SimpleGrid>
                    )}
                </Paper>
            </Container>

            <CategoryModal
                opened={modalOpened}
                onClose={handleModalClose}
                onSuccess={handleCategorySaved}
                editData={editCategory}
            />
        </>
    );
}
