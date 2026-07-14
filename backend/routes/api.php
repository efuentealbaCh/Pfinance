<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\SavingsGoalController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserAccountController;
use App\Http\Controllers\PushSubscriptionController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\GroupInvitationController;
use App\Http\Controllers\SharedDebtController;
use App\Models\AccountType;
use App\Models\Bank;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;

// ─── Rutas Públicas ──────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:auth');
Route::post('/login',    [AuthController::class, 'login'])->middleware('throttle:auth');
Route::get('/vapid-public-key', fn() => response()->json(['key' => config('webpush.vapid.public_key')]));

// ─── Rutas Protegidas (requieren token) ──────────────────────
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/me',      [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile',          [AuthController::class, 'updateProfile']);
    Route::put('/profile/password', [AuthController::class, 'changePassword']);
    Route::post('/push-subscribe',  [PushSubscriptionController::class, 'update']);

    // Catálogos de solo lectura (Caché infinito porque rara vez cambian)
    Route::get('/banks', fn() => response()->json(Cache::rememberForever('banks', fn() => Bank::all())));
    Route::get('/account-types', fn() => response()->json(Cache::rememberForever('account-types', fn() => AccountType::all())));

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

    // Grupos y Deudas Compartidas
    Route::apiResource('groups', GroupController::class)->only(['index', 'store', 'show']);
    
    // Invitaciones
    Route::get('/groups/invitations/pending', [GroupInvitationController::class, 'pending']);
    Route::post('/groups/{group}/invite', [GroupInvitationController::class, 'invite']);
    Route::post('/groups/{groupId}/accept', [GroupInvitationController::class, 'accept']);
    Route::post('/groups/{groupId}/reject', [GroupInvitationController::class, 'reject']);
    Route::delete('/groups/{groupId}/members/{userId}', [GroupController::class, 'removeMember']);

    // Deudas compartidas
    Route::post('/groups/{groupId}/debts', [SharedDebtController::class, 'store']);
    Route::put('/debts/{debt}/pay', [SharedDebtController::class, 'pay']);
});
