<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\SavingsGoalController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserAccountController;
use App\Models\AccountType;
use App\Models\Bank;
use App\Models\Category;
use Illuminate\Support\Facades\Route;

// ─── Rutas Públicas ──────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// ─── Rutas Protegidas (requieren token) ──────────────────────
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/me',      [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile',          [AuthController::class, 'updateProfile']);
    Route::put('/profile/password', [AuthController::class, 'changePassword']);

    // Catálogos de solo lectura
    Route::get('/banks', fn() => response()->json(Bank::all()));
    Route::get('/account-types', fn() => response()->json(AccountType::all()));

    // Categorías (CRUD completo)
    Route::apiResource('categories', CategoryController::class);

    // Cuentas del usuario
    Route::apiResource('user-accounts', UserAccountController::class);

    // Transacciones y Exportaciones
    Route::get('/transactions/export', [ExportController::class, 'exportTransactions']);
    Route::apiResource('transactions', TransactionController::class);

    // Presupuestos
    Route::apiResource('budgets', BudgetController::class);

    // Metas de Ahorro
    Route::apiResource('savings-goals', SavingsGoalController::class);
    Route::post('/savings-goals/{savings_goal}/deposit',  [SavingsGoalController::class, 'deposit']);
    Route::post('/savings-goals/{savings_goal}/withdraw', [SavingsGoalController::class, 'withdraw']);

    // Dashboard Analíticas
    Route::get('/dashboard/summary', [DashboardController::class, 'summary']);
});
