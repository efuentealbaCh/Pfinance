<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Retorna el resumen financiero y datos para gráficos.
     */
    public function summary(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        // Base query conditions shared across queries
        $conditions = function ($query) use ($request, $userId) {
            $query->where('transactions.user_id', $userId);
            if ($request->filled('user_account_id')) {
                $query->where('transactions.user_account_id', $request->input('user_account_id'));
            }
            if ($request->filled('date_from')) {
                $query->whereDate('transactions.date', '>=', $request->input('date_from'));
            }
            if ($request->filled('date_to')) {
                $query->whereDate('transactions.date', '<=', $request->input('date_to'));
            }
        };

        // 1. Resumen general (Tarjetas) - Suma directa en base de datos
        $totals = DB::table('transactions')
            ->selectRaw("
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense
            ")
            ->where($conditions)
            ->first();

        $totalIncome = (float)($totals->total_income ?? 0);
        $totalExpense = (float)($totals->total_expense ?? 0);
        $balance = $totalIncome - $totalExpense;

        // 2. Gastos por categoría - Agrupación directa en SQL
        $expensesByCategory = DB::table('transactions')
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->selectRaw("
                categories.name,
                categories.color,
                SUM(transactions.amount) as total
            ")
            ->where('transactions.type', 'expense')
            ->where($conditions)
            ->groupBy('categories.id', 'categories.name', 'categories.color')
            ->orderByDesc('total')
            ->get()
            ->map(function ($row) {
                return [
                    'name' => $row->name,
                    'total' => (float)$row->total,
                    'color' => $row->color ?? '#cccccc',
                ];
            });

        // 3. Evolución en el tiempo - Agrupación por fecha en SQL
        $chartData = DB::table('transactions')
            ->selectRaw("
                DATE(date) as date_string,
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
            ")
            ->where($conditions)
            ->groupBy(DB::raw('DATE(date)'))
            ->orderBy('date_string', 'asc')
            ->get()
            ->map(function ($row) {
                return [
                    'date' => $row->date_string,
                    'income' => (float)$row->income,
                    'expense' => (float)$row->expense,
                ];
            });

        return response()->json([
            'summary' => [
                'totalIncome'  => $totalIncome,
                'totalExpense' => $totalExpense,
                'balance'      => $balance,
            ],
            'expensesByCategory' => $expensesByCategory,
            'chartData'          => $chartData,
        ]);
    }
}
