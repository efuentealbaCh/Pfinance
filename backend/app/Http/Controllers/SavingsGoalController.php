<?php

namespace App\Http\Controllers;

use App\Http\Requests\SavingsGoalRequest;
use App\Models\SavingsGoal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SavingsGoalController extends Controller
{
    /**
     * Listar metas de ahorro del usuario autenticado.
     */
    public function index(Request $request): JsonResponse
    {
        $goals = $request->user()
            ->savingsGoals()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn (SavingsGoal $goal) => $this->formatGoal($goal));

        return response()->json(['goals' => $goals]);
    }

    /**
     * Crear una nueva meta de ahorro.
     */
    public function store(SavingsGoalRequest $request): JsonResponse
    {
        $goal = $request->user()
            ->savingsGoals()
            ->create($request->validated());

        return response()->json([
            'message' => 'Meta de ahorro creada exitosamente.',
            'goal'    => $this->formatGoal($goal),
        ], 201);
    }

    /**
     * Mostrar una meta de ahorro específica.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $goal = $request->user()
            ->savingsGoals()
            ->findOrFail($id);

        return response()->json(['goal' => $this->formatGoal($goal)]);
    }

    /**
     * Actualizar una meta de ahorro.
     */
    public function update(SavingsGoalRequest $request, string $id): JsonResponse
    {
        $goal = $request->user()
            ->savingsGoals()
            ->findOrFail($id);

        $goal->update($request->validated());

        return response()->json([
            'message' => 'Meta de ahorro actualizada exitosamente.',
            'goal'    => $this->formatGoal($goal),
        ]);
    }

    /**
     * Eliminar una meta de ahorro.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $goal = $request->user()
            ->savingsGoals()
            ->findOrFail($id);

        $goal->delete();

        return response()->json([
            'message' => 'Meta de ahorro eliminada exitosamente.',
        ]);
    }

    /**
     * Abonar dinero a una meta de ahorro.
     */
    public function deposit(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
        ], [
            'amount.required' => 'El monto es obligatorio.',
            'amount.numeric'  => 'El monto debe ser un valor numérico.',
            'amount.min'      => 'El monto debe ser al menos $0.01.',
        ]);

        $goal = $request->user()
            ->savingsGoals()
            ->findOrFail($id);

        $goal->current_amount = (float) $goal->current_amount + (float) $request->input('amount');
        $goal->save();

        $message = $goal->is_completed
            ? '🎉 ¡Felicidades! Has alcanzado tu meta de ahorro.'
            : 'Abono registrado exitosamente.';

        return response()->json([
            'message' => $message,
            'goal'    => $this->formatGoal($goal),
        ]);
    }

    /**
     * Retirar dinero de una meta de ahorro.
     */
    public function withdraw(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
        ], [
            'amount.required' => 'El monto es obligatorio.',
            'amount.numeric'  => 'El monto debe ser un valor numérico.',
            'amount.min'      => 'El monto debe ser al menos $0.01.',
        ]);

        $goal = $request->user()
            ->savingsGoals()
            ->findOrFail($id);

        $withdrawAmount = (float) $request->input('amount');

        if ($withdrawAmount > (float) $goal->current_amount) {
            return response()->json([
                'message' => 'No puedes retirar más de lo que tienes ahorrado ($' . number_format((float) $goal->current_amount, 2) . ').',
            ], 422);
        }

        $goal->current_amount = (float) $goal->current_amount - $withdrawAmount;
        $goal->save();

        return response()->json([
            'message' => 'Retiro registrado exitosamente.',
            'goal'    => $this->formatGoal($goal),
        ]);
    }

    // ─── Helpers ─────────────────────────────────────────────

    /**
     * Formatear una meta con campos calculados.
     */
    private function formatGoal(SavingsGoal $goal): array
    {
        $data = $goal->toArray();
        $data['percentage']   = $goal->percentage;
        $data['remaining']    = $goal->remaining;
        $data['is_completed'] = $goal->is_completed;

        return $data;
    }
}
