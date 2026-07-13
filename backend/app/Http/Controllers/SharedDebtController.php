<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\SharedDebt;
use App\Models\SharedDebtSplit;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class SharedDebtController extends Controller
{
    public function store(Request $request, string $groupId): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'date' => 'required|date',
            'splits' => 'required|array',
            'splits.*.user_id' => 'required|exists:users,id',
            'splits.*.percentage' => 'required|numeric|min:0|max:100',
        ]);

        // Check sum of percentages
        $sum = collect($request->splits)->sum('percentage');
        if (round($sum, 2) !== 100.00) {
            return response()->json(['message' => 'Percentages must sum to 100.'], 422);
        }

        $group = $request->user()->groups()->findOrFail($groupId);

        DB::beginTransaction();
        try {
            $debt = SharedDebt::create([
                'group_id' => $group->id,
                'created_by' => $request->user()->id,
                'title' => $request->title,
                'amount' => $request->amount,
                'date' => $request->date,
            ]);

            foreach ($request->splits as $split) {
                if ($split['percentage'] > 0) {
                    $amount_owed = ($request->amount * $split['percentage']) / 100;
                    SharedDebtSplit::create([
                        'shared_debt_id' => $debt->id,
                        'user_id' => $split['user_id'],
                        'percentage' => $split['percentage'],
                        'amount_owed' => $amount_owed,
                        'is_paid' => false
                    ]);
                }
            }
            DB::commit();

            return response()->json($debt->load('splits.user'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error creating debt.'], 500);
        }
    }

    public function pay(Request $request, string $debtId): JsonResponse
    {
        // Find the split for the current user
        $split = SharedDebtSplit::where('shared_debt_id', $debtId)
                    ->where('user_id', $request->user()->id)
                    ->firstOrFail();

        $split->update(['is_paid' => true]);

        return response()->json(['message' => 'Debt marked as paid.', 'split' => $split]);
    }
}
