<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAccountRequest;
use App\Models\UserAccount;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserAccountController extends Controller
{
    /**
     * Listar todas las cuentas del usuario autenticado.
     */
    public function index(Request $request): JsonResponse
    {
        $accounts = $request->user()
            ->accounts()
            ->with(['bank', 'accountType'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['accounts' => $accounts]);
    }

    /**
     * Mostrar una cuenta específica.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $account = $request->user()
            ->accounts()
            ->with(['bank', 'accountType'])
            ->findOrFail($id);

        return response()->json(['account' => $account]);
    }

    /**
     * Crear una nueva cuenta.
     */
    public function store(UserAccountRequest $request): JsonResponse
    {
        $account = $request->user()->accounts()->create($request->validated());
        $account->load(['bank', 'accountType']);

        return response()->json([
            'message' => 'Cuenta creada exitosamente.',
            'account' => $account,
        ], 201);
    }

    /**
     * Actualizar una cuenta existente.
     */
    public function update(UserAccountRequest $request, string $id): JsonResponse
    {
        $account = $request->user()->accounts()->findOrFail($id);
        $account->update($request->validated());
        $account->load(['bank', 'accountType']);

        return response()->json([
            'message' => 'Cuenta actualizada exitosamente.',
            'account' => $account,
        ]);
    }

    /**
     * Eliminar una cuenta.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $account = $request->user()->accounts()->findOrFail($id);
        $account->delete();

        return response()->json([
            'message' => 'Cuenta eliminada exitosamente.',
        ]);
    }
}
