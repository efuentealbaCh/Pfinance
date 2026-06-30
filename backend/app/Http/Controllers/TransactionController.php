<?php

namespace App\Http\Controllers;

use App\Models\User;

use App\Http\Requests\TransactionRequest;
use App\Models\Transaction;
use App\Models\TransactionLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Listar transacciones del usuario autenticado (con filtros opcionales).
     */
    public function index(Request $request): JsonResponse
    {
        $query = $request->user()
            ->transactions()
            ->with(['category', 'userAccount.bank']);

        // ─── Filtros opcionales ─────────────────────────────
        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        if ($request->filled('user_account_id')) {
            $query->where('user_account_id', $request->input('user_account_id'));
        }

        if ($request->filled('date_from')) {
            $query->whereDate('date', '>=', $request->input('date_from'));
        }

        if ($request->filled('date_to')) {
            $query->whereDate('date', '<=', $request->input('date_to'));
        }

        $transactions = $query->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json($transactions);
    }

    /**
     * Mostrar una transacción específica.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $transaction = $request->user()
            ->transactions()
            ->with(['category', 'userAccount.bank', 'logs'])
            ->findOrFail($id);

        return response()->json(['transaction' => $transaction]);
    }

    /**
     * Crear una nueva transacción.
     */
    public function store(TransactionRequest $request): JsonResponse
    {
        // Validar que la cuenta pertenece al usuario
        $request->user()
            ->accounts()
            ->findOrFail($request->validated()['user_account_id']);

        $transaction = $request->user()
            ->transactions()
            ->create($request->validated());

        // Actualizar el saldo de la cuenta
        $this->adjustAccountBalance($request->user(), $transaction->user_account_id, $transaction->type, $transaction->amount);

        $transaction->load(['category', 'userAccount.bank']);

        $this->logAction($request, $transaction, 'CREATE', null, $transaction->toArray());

        return response()->json([
            'message'     => 'Transacción creada exitosamente.',
            'transaction' => $transaction,
        ], 201);
    }

    /**
     * Actualizar una transacción existente.
     */
    public function update(TransactionRequest $request, string $id): JsonResponse
    {
        $transaction = $request->user()
            ->transactions()
            ->findOrFail($id);

        // Si cambió la cuenta, validar que la nueva también pertenece al usuario
        if ($request->validated()['user_account_id'] !== $transaction->user_account_id) {
            $request->user()
                ->accounts()
                ->findOrFail($request->validated()['user_account_id']);
        }

        $before = $transaction->toArray();

        // 1. Revertir el efecto de la transacción anterior
        $this->adjustAccountBalance($request->user(), $before['user_account_id'], $before['type'], $before['amount'], true);

        $transaction->update($request->validated());

        // 2. Aplicar el efecto de la nueva transacción
        $this->adjustAccountBalance($request->user(), $transaction->user_account_id, $transaction->type, $transaction->amount);

        $transaction->load(['category', 'userAccount.bank']);

        $this->logAction($request, $transaction, 'UPDATE', $before, $transaction->toArray());

        return response()->json([
            'message'     => 'Transacción actualizada exitosamente.',
            'transaction' => $transaction,
        ]);
    }

    /**
     * Eliminar una transacción.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $transaction = $request->user()
            ->transactions()
            ->findOrFail($id);

        $before = $transaction->toArray();

        $this->logAction($request, $transaction, 'DELETE', $before, null);

        // Revertir el saldo antes de eliminar la transacción
        $this->adjustAccountBalance($request->user(), $before['user_account_id'], $before['type'], $before['amount'], true);

        $transaction->delete();

        return response()->json([
            'message' => 'Transacción eliminada exitosamente.',
        ]);
    }

    // ─── Helpers ─────────────────────────────────────────────

    /**
     * Registrar acción en transaction_logs.
     */
    private function logAction(
        Request $request,
        Transaction $transaction,
        string $action,
        ?array $before,
        ?array $after,
    ): void {
        TransactionLog::create([
            'transaction_id' => $transaction->id,
            'user_id'        => $request->user()->id,
            'action'         => $action,
            'payload_before' => $before,
            'payload_after'  => $after,
            'ip_address'     => $request->ip(),
            'user_agent'     => $request->userAgent(),
        ]);
    }

    /**
     * Ajustar el balance de la cuenta según el tipo y monto de la transacción.
     * Si $revert es true, hace el efecto contrario (ideal para updates/deletes).
     */
    private function adjustAccountBalance(\App\Models\User $user, string $accountId, string $type, float $amount, bool $revert = false): void
    {
        $account = $user->accounts()->findOrFail($accountId);
        $factor = $revert ? -1 : 1;

        if ($type === 'income') {
            $account->balance += ($amount * $factor);
        } else {
            $account->balance -= ($amount * $factor);
        }

        $account->save();
    }
}
