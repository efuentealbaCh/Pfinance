<?php

namespace App\Http\Controllers;

use App\Http\Requests\BudgetRequest;
use App\Models\Budget;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller
{
    /**
     * Listar presupuestos del usuario autenticado con el gasto actual calculado.
     */
    public function index(Request $request): JsonResponse
    {
        $budgets = $request->user()
            ->budgets()
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function (Budget $budget) use ($request) {
                return $this->enrichBudgetWithSpent($budget, $request->user());
            });

        return response()->json(['budgets' => $budgets]);
    }

    /**
     * Crear un nuevo presupuesto.
     */
    public function store(BudgetRequest $request): JsonResponse
    {
        $budget = $request->user()
            ->budgets()
            ->create($request->validated());

        $budget->load('category');

        return response()->json([
            'message' => 'Presupuesto creado exitosamente.',
            'budget'  => $this->enrichBudgetWithSpent($budget, $request->user()),
        ], 201);
    }

    /**
     * Mostrar un presupuesto específico.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $budget = $request->user()
            ->budgets()
            ->with('category')
            ->findOrFail($id);

        return response()->json([
            'budget' => $this->enrichBudgetWithSpent($budget, $request->user()),
        ]);
    }

    /**
     * Actualizar un presupuesto.
     */
    public function update(BudgetRequest $request, string $id): JsonResponse
    {
        $budget = $request->user()
            ->budgets()
            ->findOrFail($id);

        $budget->update($request->validated());
        $budget->load('category');

        return response()->json([
            'message' => 'Presupuesto actualizado exitosamente.',
            'budget'  => $this->enrichBudgetWithSpent($budget, $request->user()),
        ]);
    }

    /**
     * Eliminar un presupuesto.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $budget = $request->user()
            ->budgets()
            ->findOrFail($id);

        $budget->delete();

        return response()->json([
            'message' => 'Presupuesto eliminado exitosamente.',
        ]);
    }

    // ─── Helpers ─────────────────────────────────────────────

    /**
     * Enriquecer el presupuesto con el gasto actual del período y porcentaje.
     */
    private function enrichBudgetWithSpent(Budget $budget, $user): array
    {
        [$dateFrom, $dateTo] = $this->getPeriodRange($budget->period);

        $spent = (float) DB::table('transactions')
            ->where('user_id', $user->id)
            ->where('category_id', $budget->category_id)
            ->where('type', 'expense')
            ->whereDate('date', '>=', $dateFrom)
            ->whereDate('date', '<=', $dateTo)
            ->sum('amount');

        $budgetArray = $budget->toArray();
        $budgetArray['spent'] = round($spent, 2);
        $budgetArray['percentage'] = $budget->amount > 0
            ? round(($spent / (float) $budget->amount) * 100, 1)
            : 0;
        $budgetArray['period_from'] = $dateFrom->toDateString();
        $budgetArray['period_to'] = $dateTo->toDateString();

        return $budgetArray;
    }

    /**
     * Obtener el rango de fechas del período actual.
     */
    private function getPeriodRange(string $period): array
    {
        $now = Carbon::now();

        return match ($period) {
            'weekly'  => [$now->copy()->startOfWeek(), $now->copy()->endOfWeek()],
            'yearly'  => [$now->copy()->startOfYear(), $now->copy()->endOfYear()],
            default   => [$now->copy()->startOfMonth(), $now->copy()->endOfMonth()], // monthly
        };
    }
}
