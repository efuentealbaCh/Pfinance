"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.UsersScalarFieldEnum = exports.User_accountsScalarFieldEnum = exports.TransactionsScalarFieldEnum = exports.Transaction_logsScalarFieldEnum = exports.Shared_debtsScalarFieldEnum = exports.Shared_debt_splitsScalarFieldEnum = exports.SessionsScalarFieldEnum = exports.Savings_goalsScalarFieldEnum = exports.Push_subscriptionsScalarFieldEnum = exports.Personal_access_tokensScalarFieldEnum = exports.Password_reset_tokensScalarFieldEnum = exports.MigrationsScalarFieldEnum = exports.JobsScalarFieldEnum = exports.Job_batchesScalarFieldEnum = exports.GroupsScalarFieldEnum = exports.Group_userScalarFieldEnum = exports.Failed_jobsScalarFieldEnum = exports.CategoriesScalarFieldEnum = exports.Cache_locksScalarFieldEnum = exports.CacheScalarFieldEnum = exports.BudgetsScalarFieldEnum = exports.BanksScalarFieldEnum = exports.Account_typesScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    account_types: 'account_types',
    banks: 'banks',
    budgets: 'budgets',
    cache: 'cache',
    cache_locks: 'cache_locks',
    categories: 'categories',
    failed_jobs: 'failed_jobs',
    group_user: 'group_user',
    groups: 'groups',
    job_batches: 'job_batches',
    jobs: 'jobs',
    migrations: 'migrations',
    password_reset_tokens: 'password_reset_tokens',
    personal_access_tokens: 'personal_access_tokens',
    push_subscriptions: 'push_subscriptions',
    savings_goals: 'savings_goals',
    sessions: 'sessions',
    shared_debt_splits: 'shared_debt_splits',
    shared_debts: 'shared_debts',
    transaction_logs: 'transaction_logs',
    transactions: 'transactions',
    user_accounts: 'user_accounts',
    users: 'users'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.Account_typesScalarFieldEnum = {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.BanksScalarFieldEnum = {
    id: 'id',
    name: 'name',
    logo: 'logo',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.BudgetsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    category_id: 'category_id',
    amount: 'amount',
    period: 'period',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.CacheScalarFieldEnum = {
    key: 'key',
    value: 'value',
    expiration: 'expiration'
};
exports.Cache_locksScalarFieldEnum = {
    key: 'key',
    owner: 'owner',
    expiration: 'expiration'
};
exports.CategoriesScalarFieldEnum = {
    id: 'id',
    name: 'name',
    icon: 'icon',
    color: 'color',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Failed_jobsScalarFieldEnum = {
    id: 'id',
    uuid: 'uuid',
    connection: 'connection',
    queue: 'queue',
    payload: 'payload',
    exception: 'exception',
    failed_at: 'failed_at'
};
exports.Group_userScalarFieldEnum = {
    id: 'id',
    group_id: 'group_id',
    user_id: 'user_id',
    status: 'status',
    role: 'role',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.GroupsScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    created_by: 'created_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Job_batchesScalarFieldEnum = {
    id: 'id',
    name: 'name',
    total_jobs: 'total_jobs',
    pending_jobs: 'pending_jobs',
    failed_jobs: 'failed_jobs',
    failed_job_ids: 'failed_job_ids',
    options: 'options',
    cancelled_at: 'cancelled_at',
    created_at: 'created_at',
    finished_at: 'finished_at'
};
exports.JobsScalarFieldEnum = {
    id: 'id',
    queue: 'queue',
    payload: 'payload',
    attempts: 'attempts',
    reserved_at: 'reserved_at',
    available_at: 'available_at',
    created_at: 'created_at'
};
exports.MigrationsScalarFieldEnum = {
    id: 'id',
    migration: 'migration',
    batch: 'batch'
};
exports.Password_reset_tokensScalarFieldEnum = {
    email: 'email',
    token: 'token',
    created_at: 'created_at'
};
exports.Personal_access_tokensScalarFieldEnum = {
    id: 'id',
    tokenable_type: 'tokenable_type',
    tokenable_id: 'tokenable_id',
    name: 'name',
    token: 'token',
    abilities: 'abilities',
    last_used_at: 'last_used_at',
    expires_at: 'expires_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Push_subscriptionsScalarFieldEnum = {
    id: 'id',
    subscribable_type: 'subscribable_type',
    subscribable_id: 'subscribable_id',
    endpoint: 'endpoint',
    public_key: 'public_key',
    auth_token: 'auth_token',
    content_encoding: 'content_encoding',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Savings_goalsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    name: 'name',
    target_amount: 'target_amount',
    current_amount: 'current_amount',
    deadline: 'deadline',
    icon: 'icon',
    color: 'color',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.SessionsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    payload: 'payload',
    last_activity: 'last_activity'
};
exports.Shared_debt_splitsScalarFieldEnum = {
    id: 'id',
    shared_debt_id: 'shared_debt_id',
    user_id: 'user_id',
    percentage: 'percentage',
    amount_owed: 'amount_owed',
    is_paid: 'is_paid',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Shared_debtsScalarFieldEnum = {
    id: 'id',
    group_id: 'group_id',
    created_by: 'created_by',
    title: 'title',
    amount: 'amount',
    date: 'date',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Transaction_logsScalarFieldEnum = {
    id: 'id',
    transaction_id: 'transaction_id',
    user_id: 'user_id',
    action: 'action',
    payload_before: 'payload_before',
    payload_after: 'payload_after',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    created_at: 'created_at'
};
exports.TransactionsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    user_account_id: 'user_account_id',
    category_id: 'category_id',
    amount: 'amount',
    description: 'description',
    date: 'date',
    type: 'type',
    is_shared: 'is_shared',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.User_accountsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    bank_id: 'bank_id',
    account_type_id: 'account_type_id',
    identifier: 'identifier',
    balance: 'balance',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.UsersScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    email_verified_at: 'email_verified_at',
    password: 'password',
    remember_token: 'remember_token',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map