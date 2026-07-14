import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: any;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: any;
export declare const JsonNull: any;
export declare const AnyNull: any;
export declare const ModelName: {
    readonly account_types: "account_types";
    readonly banks: "banks";
    readonly budgets: "budgets";
    readonly cache: "cache";
    readonly cache_locks: "cache_locks";
    readonly categories: "categories";
    readonly failed_jobs: "failed_jobs";
    readonly group_user: "group_user";
    readonly groups: "groups";
    readonly job_batches: "job_batches";
    readonly jobs: "jobs";
    readonly migrations: "migrations";
    readonly password_reset_tokens: "password_reset_tokens";
    readonly personal_access_tokens: "personal_access_tokens";
    readonly push_subscriptions: "push_subscriptions";
    readonly savings_goals: "savings_goals";
    readonly sessions: "sessions";
    readonly shared_debt_splits: "shared_debt_splits";
    readonly shared_debts: "shared_debts";
    readonly transaction_logs: "transaction_logs";
    readonly transactions: "transactions";
    readonly user_accounts: "user_accounts";
    readonly users: "users";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: any;
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const Account_typesScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Account_typesScalarFieldEnum = (typeof Account_typesScalarFieldEnum)[keyof typeof Account_typesScalarFieldEnum];
export declare const BanksScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly logo: "logo";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type BanksScalarFieldEnum = (typeof BanksScalarFieldEnum)[keyof typeof BanksScalarFieldEnum];
export declare const BudgetsScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly category_id: "category_id";
    readonly amount: "amount";
    readonly period: "period";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type BudgetsScalarFieldEnum = (typeof BudgetsScalarFieldEnum)[keyof typeof BudgetsScalarFieldEnum];
export declare const CacheScalarFieldEnum: {
    readonly key: "key";
    readonly value: "value";
    readonly expiration: "expiration";
};
export type CacheScalarFieldEnum = (typeof CacheScalarFieldEnum)[keyof typeof CacheScalarFieldEnum];
export declare const Cache_locksScalarFieldEnum: {
    readonly key: "key";
    readonly owner: "owner";
    readonly expiration: "expiration";
};
export type Cache_locksScalarFieldEnum = (typeof Cache_locksScalarFieldEnum)[keyof typeof Cache_locksScalarFieldEnum];
export declare const CategoriesScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly icon: "icon";
    readonly color: "color";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type CategoriesScalarFieldEnum = (typeof CategoriesScalarFieldEnum)[keyof typeof CategoriesScalarFieldEnum];
export declare const Failed_jobsScalarFieldEnum: {
    readonly id: "id";
    readonly uuid: "uuid";
    readonly connection: "connection";
    readonly queue: "queue";
    readonly payload: "payload";
    readonly exception: "exception";
    readonly failed_at: "failed_at";
};
export type Failed_jobsScalarFieldEnum = (typeof Failed_jobsScalarFieldEnum)[keyof typeof Failed_jobsScalarFieldEnum];
export declare const Group_userScalarFieldEnum: {
    readonly id: "id";
    readonly group_id: "group_id";
    readonly user_id: "user_id";
    readonly status: "status";
    readonly role: "role";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Group_userScalarFieldEnum = (typeof Group_userScalarFieldEnum)[keyof typeof Group_userScalarFieldEnum];
export declare const GroupsScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly created_by: "created_by";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type GroupsScalarFieldEnum = (typeof GroupsScalarFieldEnum)[keyof typeof GroupsScalarFieldEnum];
export declare const Job_batchesScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly total_jobs: "total_jobs";
    readonly pending_jobs: "pending_jobs";
    readonly failed_jobs: "failed_jobs";
    readonly failed_job_ids: "failed_job_ids";
    readonly options: "options";
    readonly cancelled_at: "cancelled_at";
    readonly created_at: "created_at";
    readonly finished_at: "finished_at";
};
export type Job_batchesScalarFieldEnum = (typeof Job_batchesScalarFieldEnum)[keyof typeof Job_batchesScalarFieldEnum];
export declare const JobsScalarFieldEnum: {
    readonly id: "id";
    readonly queue: "queue";
    readonly payload: "payload";
    readonly attempts: "attempts";
    readonly reserved_at: "reserved_at";
    readonly available_at: "available_at";
    readonly created_at: "created_at";
};
export type JobsScalarFieldEnum = (typeof JobsScalarFieldEnum)[keyof typeof JobsScalarFieldEnum];
export declare const MigrationsScalarFieldEnum: {
    readonly id: "id";
    readonly migration: "migration";
    readonly batch: "batch";
};
export type MigrationsScalarFieldEnum = (typeof MigrationsScalarFieldEnum)[keyof typeof MigrationsScalarFieldEnum];
export declare const Password_reset_tokensScalarFieldEnum: {
    readonly email: "email";
    readonly token: "token";
    readonly created_at: "created_at";
};
export type Password_reset_tokensScalarFieldEnum = (typeof Password_reset_tokensScalarFieldEnum)[keyof typeof Password_reset_tokensScalarFieldEnum];
export declare const Personal_access_tokensScalarFieldEnum: {
    readonly id: "id";
    readonly tokenable_type: "tokenable_type";
    readonly tokenable_id: "tokenable_id";
    readonly name: "name";
    readonly token: "token";
    readonly abilities: "abilities";
    readonly last_used_at: "last_used_at";
    readonly expires_at: "expires_at";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Personal_access_tokensScalarFieldEnum = (typeof Personal_access_tokensScalarFieldEnum)[keyof typeof Personal_access_tokensScalarFieldEnum];
export declare const Push_subscriptionsScalarFieldEnum: {
    readonly id: "id";
    readonly subscribable_type: "subscribable_type";
    readonly subscribable_id: "subscribable_id";
    readonly endpoint: "endpoint";
    readonly public_key: "public_key";
    readonly auth_token: "auth_token";
    readonly content_encoding: "content_encoding";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Push_subscriptionsScalarFieldEnum = (typeof Push_subscriptionsScalarFieldEnum)[keyof typeof Push_subscriptionsScalarFieldEnum];
export declare const Savings_goalsScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly name: "name";
    readonly target_amount: "target_amount";
    readonly current_amount: "current_amount";
    readonly deadline: "deadline";
    readonly icon: "icon";
    readonly color: "color";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Savings_goalsScalarFieldEnum = (typeof Savings_goalsScalarFieldEnum)[keyof typeof Savings_goalsScalarFieldEnum];
export declare const SessionsScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly ip_address: "ip_address";
    readonly user_agent: "user_agent";
    readonly payload: "payload";
    readonly last_activity: "last_activity";
};
export type SessionsScalarFieldEnum = (typeof SessionsScalarFieldEnum)[keyof typeof SessionsScalarFieldEnum];
export declare const Shared_debt_splitsScalarFieldEnum: {
    readonly id: "id";
    readonly shared_debt_id: "shared_debt_id";
    readonly user_id: "user_id";
    readonly percentage: "percentage";
    readonly amount_owed: "amount_owed";
    readonly is_paid: "is_paid";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Shared_debt_splitsScalarFieldEnum = (typeof Shared_debt_splitsScalarFieldEnum)[keyof typeof Shared_debt_splitsScalarFieldEnum];
export declare const Shared_debtsScalarFieldEnum: {
    readonly id: "id";
    readonly group_id: "group_id";
    readonly created_by: "created_by";
    readonly title: "title";
    readonly amount: "amount";
    readonly date: "date";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Shared_debtsScalarFieldEnum = (typeof Shared_debtsScalarFieldEnum)[keyof typeof Shared_debtsScalarFieldEnum];
export declare const Transaction_logsScalarFieldEnum: {
    readonly id: "id";
    readonly transaction_id: "transaction_id";
    readonly user_id: "user_id";
    readonly action: "action";
    readonly payload_before: "payload_before";
    readonly payload_after: "payload_after";
    readonly ip_address: "ip_address";
    readonly user_agent: "user_agent";
    readonly created_at: "created_at";
};
export type Transaction_logsScalarFieldEnum = (typeof Transaction_logsScalarFieldEnum)[keyof typeof Transaction_logsScalarFieldEnum];
export declare const TransactionsScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly user_account_id: "user_account_id";
    readonly category_id: "category_id";
    readonly amount: "amount";
    readonly description: "description";
    readonly date: "date";
    readonly type: "type";
    readonly is_shared: "is_shared";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type TransactionsScalarFieldEnum = (typeof TransactionsScalarFieldEnum)[keyof typeof TransactionsScalarFieldEnum];
export declare const User_accountsScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly bank_id: "bank_id";
    readonly account_type_id: "account_type_id";
    readonly identifier: "identifier";
    readonly balance: "balance";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type User_accountsScalarFieldEnum = (typeof User_accountsScalarFieldEnum)[keyof typeof User_accountsScalarFieldEnum];
export declare const UsersScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly email_verified_at: "email_verified_at";
    readonly password: "password";
    readonly remember_token: "remember_token";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: any;
    readonly JsonNull: any;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: any;
    readonly JsonNull: any;
    readonly AnyNull: any;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
