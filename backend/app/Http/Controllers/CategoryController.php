<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Listar todas las categorías.
     */
    public function index(): JsonResponse
    {
        $categories = Category::orderBy('name')->get();

        return response()->json($categories);
    }

    /**
     * Crear una nueva categoría.
     */
    public function store(CategoryRequest $request): JsonResponse
    {
        $category = Category::create($request->validated());

        return response()->json([
            'message'  => 'Categoría creada exitosamente.',
            'category' => $category,
        ], 201);
    }

    /**
     * Mostrar una categoría específica.
     */
    public function show(string $id): JsonResponse
    {
        $category = Category::findOrFail($id);

        return response()->json(['category' => $category]);
    }

    /**
     * Actualizar una categoría.
     */
    public function update(CategoryRequest $request, string $id): JsonResponse
    {
        $category = Category::findOrFail($id);
        $category->update($request->validated());

        return response()->json([
            'message'  => 'Categoría actualizada exitosamente.',
            'category' => $category,
        ]);
    }

    /**
     * Eliminar una categoría.
     * Si tiene transacciones asociadas, devuelve 409 Conflict.
     */
    public function destroy(string $id): JsonResponse
    {
        $category = Category::withCount('transactions')->findOrFail($id);

        if ($category->transactions_count > 0) {
            return response()->json([
                'message' => "No puedes eliminar esta categoría porque tiene {$category->transactions_count} transacción(es) asociada(s).",
            ], 409);
        }

        $category->delete();

        return response()->json([
            'message' => 'Categoría eliminada exitosamente.',
        ]);
    }
}
