import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get account_types(): Prisma.account_typesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get banks(): Prisma.banksDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get budgets(): Prisma.budgetsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get cache(): Prisma.cacheDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get cache_locks(): Prisma.cache_locksDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get categories(): Prisma.categoriesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get failed_jobs(): Prisma.failed_jobsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get group_user(): Prisma.group_userDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get groups(): Prisma.groupsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get job_batches(): Prisma.job_batchesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get jobs(): Prisma.jobsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get migrations(): Prisma.migrationsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get password_reset_tokens(): Prisma.password_reset_tokensDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get personal_access_tokens(): Prisma.personal_access_tokensDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get push_subscriptions(): Prisma.push_subscriptionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get savings_goals(): Prisma.savings_goalsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get sessions(): Prisma.sessionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get shared_debt_splits(): Prisma.shared_debt_splitsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get shared_debts(): Prisma.shared_debtsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get transaction_logs(): Prisma.transaction_logsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get transactions(): Prisma.transactionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get user_accounts(): Prisma.user_accountsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get users(): Prisma.usersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
