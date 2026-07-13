import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: any;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: any;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: any;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: any;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: any;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: any;
export declare const empty: any;
export declare const join: any;
export declare const raw: any;
export declare const Sql: any;
export type Sql = runtime.Sql;
export declare const Decimal: any;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: any;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: any;
export declare const JsonNull: any;
export declare const AnyNull: any;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "account_types" | "banks" | "budgets" | "cache" | "cache_locks" | "categories" | "failed_jobs" | "group_user" | "groups" | "job_batches" | "jobs" | "migrations" | "password_reset_tokens" | "personal_access_tokens" | "push_subscriptions" | "savings_goals" | "sessions" | "shared_debt_splits" | "shared_debts" | "transaction_logs" | "transactions" | "user_accounts" | "users";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        account_types: {
            payload: Prisma.$account_typesPayload<ExtArgs>;
            fields: Prisma.account_typesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.account_typesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.account_typesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload>;
                };
                findFirst: {
                    args: Prisma.account_typesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.account_typesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload>;
                };
                findMany: {
                    args: Prisma.account_typesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload>[];
                };
                create: {
                    args: Prisma.account_typesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload>;
                };
                createMany: {
                    args: Prisma.account_typesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.account_typesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload>[];
                };
                delete: {
                    args: Prisma.account_typesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload>;
                };
                update: {
                    args: Prisma.account_typesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload>;
                };
                deleteMany: {
                    args: Prisma.account_typesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.account_typesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.account_typesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload>[];
                };
                upsert: {
                    args: Prisma.account_typesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$account_typesPayload>;
                };
                aggregate: {
                    args: Prisma.Account_typesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAccount_types>;
                };
                groupBy: {
                    args: Prisma.account_typesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Account_typesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.account_typesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Account_typesCountAggregateOutputType> | number;
                };
            };
        };
        banks: {
            payload: Prisma.$banksPayload<ExtArgs>;
            fields: Prisma.banksFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.banksFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.banksFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload>;
                };
                findFirst: {
                    args: Prisma.banksFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.banksFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload>;
                };
                findMany: {
                    args: Prisma.banksFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload>[];
                };
                create: {
                    args: Prisma.banksCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload>;
                };
                createMany: {
                    args: Prisma.banksCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.banksCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload>[];
                };
                delete: {
                    args: Prisma.banksDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload>;
                };
                update: {
                    args: Prisma.banksUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload>;
                };
                deleteMany: {
                    args: Prisma.banksDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.banksUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.banksUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload>[];
                };
                upsert: {
                    args: Prisma.banksUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$banksPayload>;
                };
                aggregate: {
                    args: Prisma.BanksAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBanks>;
                };
                groupBy: {
                    args: Prisma.banksGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BanksGroupByOutputType>[];
                };
                count: {
                    args: Prisma.banksCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BanksCountAggregateOutputType> | number;
                };
            };
        };
        budgets: {
            payload: Prisma.$budgetsPayload<ExtArgs>;
            fields: Prisma.budgetsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.budgetsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.budgetsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload>;
                };
                findFirst: {
                    args: Prisma.budgetsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.budgetsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload>;
                };
                findMany: {
                    args: Prisma.budgetsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload>[];
                };
                create: {
                    args: Prisma.budgetsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload>;
                };
                createMany: {
                    args: Prisma.budgetsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.budgetsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload>[];
                };
                delete: {
                    args: Prisma.budgetsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload>;
                };
                update: {
                    args: Prisma.budgetsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload>;
                };
                deleteMany: {
                    args: Prisma.budgetsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.budgetsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.budgetsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload>[];
                };
                upsert: {
                    args: Prisma.budgetsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$budgetsPayload>;
                };
                aggregate: {
                    args: Prisma.BudgetsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBudgets>;
                };
                groupBy: {
                    args: Prisma.budgetsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BudgetsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.budgetsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BudgetsCountAggregateOutputType> | number;
                };
            };
        };
        cache: {
            payload: Prisma.$cachePayload<ExtArgs>;
            fields: Prisma.cacheFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.cacheFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.cacheFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload>;
                };
                findFirst: {
                    args: Prisma.cacheFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.cacheFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload>;
                };
                findMany: {
                    args: Prisma.cacheFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload>[];
                };
                create: {
                    args: Prisma.cacheCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload>;
                };
                createMany: {
                    args: Prisma.cacheCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.cacheCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload>[];
                };
                delete: {
                    args: Prisma.cacheDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload>;
                };
                update: {
                    args: Prisma.cacheUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload>;
                };
                deleteMany: {
                    args: Prisma.cacheDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.cacheUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.cacheUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload>[];
                };
                upsert: {
                    args: Prisma.cacheUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cachePayload>;
                };
                aggregate: {
                    args: Prisma.CacheAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCache>;
                };
                groupBy: {
                    args: Prisma.cacheGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CacheGroupByOutputType>[];
                };
                count: {
                    args: Prisma.cacheCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CacheCountAggregateOutputType> | number;
                };
            };
        };
        cache_locks: {
            payload: Prisma.$cache_locksPayload<ExtArgs>;
            fields: Prisma.cache_locksFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.cache_locksFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.cache_locksFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload>;
                };
                findFirst: {
                    args: Prisma.cache_locksFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.cache_locksFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload>;
                };
                findMany: {
                    args: Prisma.cache_locksFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload>[];
                };
                create: {
                    args: Prisma.cache_locksCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload>;
                };
                createMany: {
                    args: Prisma.cache_locksCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.cache_locksCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload>[];
                };
                delete: {
                    args: Prisma.cache_locksDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload>;
                };
                update: {
                    args: Prisma.cache_locksUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload>;
                };
                deleteMany: {
                    args: Prisma.cache_locksDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.cache_locksUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.cache_locksUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload>[];
                };
                upsert: {
                    args: Prisma.cache_locksUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$cache_locksPayload>;
                };
                aggregate: {
                    args: Prisma.Cache_locksAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCache_locks>;
                };
                groupBy: {
                    args: Prisma.cache_locksGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Cache_locksGroupByOutputType>[];
                };
                count: {
                    args: Prisma.cache_locksCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Cache_locksCountAggregateOutputType> | number;
                };
            };
        };
        categories: {
            payload: Prisma.$categoriesPayload<ExtArgs>;
            fields: Prisma.categoriesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.categoriesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.categoriesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload>;
                };
                findFirst: {
                    args: Prisma.categoriesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.categoriesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload>;
                };
                findMany: {
                    args: Prisma.categoriesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload>[];
                };
                create: {
                    args: Prisma.categoriesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload>;
                };
                createMany: {
                    args: Prisma.categoriesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.categoriesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload>[];
                };
                delete: {
                    args: Prisma.categoriesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload>;
                };
                update: {
                    args: Prisma.categoriesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload>;
                };
                deleteMany: {
                    args: Prisma.categoriesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.categoriesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.categoriesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload>[];
                };
                upsert: {
                    args: Prisma.categoriesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$categoriesPayload>;
                };
                aggregate: {
                    args: Prisma.CategoriesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCategories>;
                };
                groupBy: {
                    args: Prisma.categoriesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoriesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.categoriesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoriesCountAggregateOutputType> | number;
                };
            };
        };
        failed_jobs: {
            payload: Prisma.$failed_jobsPayload<ExtArgs>;
            fields: Prisma.failed_jobsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.failed_jobsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.failed_jobsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload>;
                };
                findFirst: {
                    args: Prisma.failed_jobsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.failed_jobsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload>;
                };
                findMany: {
                    args: Prisma.failed_jobsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload>[];
                };
                create: {
                    args: Prisma.failed_jobsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload>;
                };
                createMany: {
                    args: Prisma.failed_jobsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.failed_jobsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload>[];
                };
                delete: {
                    args: Prisma.failed_jobsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload>;
                };
                update: {
                    args: Prisma.failed_jobsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload>;
                };
                deleteMany: {
                    args: Prisma.failed_jobsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.failed_jobsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.failed_jobsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload>[];
                };
                upsert: {
                    args: Prisma.failed_jobsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$failed_jobsPayload>;
                };
                aggregate: {
                    args: Prisma.Failed_jobsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFailed_jobs>;
                };
                groupBy: {
                    args: Prisma.failed_jobsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Failed_jobsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.failed_jobsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Failed_jobsCountAggregateOutputType> | number;
                };
            };
        };
        group_user: {
            payload: Prisma.$group_userPayload<ExtArgs>;
            fields: Prisma.group_userFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.group_userFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.group_userFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload>;
                };
                findFirst: {
                    args: Prisma.group_userFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.group_userFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload>;
                };
                findMany: {
                    args: Prisma.group_userFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload>[];
                };
                create: {
                    args: Prisma.group_userCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload>;
                };
                createMany: {
                    args: Prisma.group_userCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.group_userCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload>[];
                };
                delete: {
                    args: Prisma.group_userDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload>;
                };
                update: {
                    args: Prisma.group_userUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload>;
                };
                deleteMany: {
                    args: Prisma.group_userDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.group_userUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.group_userUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload>[];
                };
                upsert: {
                    args: Prisma.group_userUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$group_userPayload>;
                };
                aggregate: {
                    args: Prisma.Group_userAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGroup_user>;
                };
                groupBy: {
                    args: Prisma.group_userGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Group_userGroupByOutputType>[];
                };
                count: {
                    args: Prisma.group_userCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Group_userCountAggregateOutputType> | number;
                };
            };
        };
        groups: {
            payload: Prisma.$groupsPayload<ExtArgs>;
            fields: Prisma.groupsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.groupsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.groupsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload>;
                };
                findFirst: {
                    args: Prisma.groupsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.groupsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload>;
                };
                findMany: {
                    args: Prisma.groupsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload>[];
                };
                create: {
                    args: Prisma.groupsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload>;
                };
                createMany: {
                    args: Prisma.groupsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.groupsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload>[];
                };
                delete: {
                    args: Prisma.groupsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload>;
                };
                update: {
                    args: Prisma.groupsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload>;
                };
                deleteMany: {
                    args: Prisma.groupsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.groupsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.groupsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload>[];
                };
                upsert: {
                    args: Prisma.groupsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$groupsPayload>;
                };
                aggregate: {
                    args: Prisma.GroupsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGroups>;
                };
                groupBy: {
                    args: Prisma.groupsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GroupsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.groupsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GroupsCountAggregateOutputType> | number;
                };
            };
        };
        job_batches: {
            payload: Prisma.$job_batchesPayload<ExtArgs>;
            fields: Prisma.job_batchesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.job_batchesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.job_batchesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload>;
                };
                findFirst: {
                    args: Prisma.job_batchesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.job_batchesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload>;
                };
                findMany: {
                    args: Prisma.job_batchesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload>[];
                };
                create: {
                    args: Prisma.job_batchesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload>;
                };
                createMany: {
                    args: Prisma.job_batchesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.job_batchesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload>[];
                };
                delete: {
                    args: Prisma.job_batchesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload>;
                };
                update: {
                    args: Prisma.job_batchesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload>;
                };
                deleteMany: {
                    args: Prisma.job_batchesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.job_batchesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.job_batchesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload>[];
                };
                upsert: {
                    args: Prisma.job_batchesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$job_batchesPayload>;
                };
                aggregate: {
                    args: Prisma.Job_batchesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJob_batches>;
                };
                groupBy: {
                    args: Prisma.job_batchesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Job_batchesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.job_batchesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Job_batchesCountAggregateOutputType> | number;
                };
            };
        };
        jobs: {
            payload: Prisma.$jobsPayload<ExtArgs>;
            fields: Prisma.jobsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.jobsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.jobsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload>;
                };
                findFirst: {
                    args: Prisma.jobsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.jobsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload>;
                };
                findMany: {
                    args: Prisma.jobsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload>[];
                };
                create: {
                    args: Prisma.jobsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload>;
                };
                createMany: {
                    args: Prisma.jobsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.jobsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload>[];
                };
                delete: {
                    args: Prisma.jobsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload>;
                };
                update: {
                    args: Prisma.jobsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload>;
                };
                deleteMany: {
                    args: Prisma.jobsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.jobsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.jobsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload>[];
                };
                upsert: {
                    args: Prisma.jobsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$jobsPayload>;
                };
                aggregate: {
                    args: Prisma.JobsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJobs>;
                };
                groupBy: {
                    args: Prisma.jobsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.jobsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobsCountAggregateOutputType> | number;
                };
            };
        };
        migrations: {
            payload: Prisma.$migrationsPayload<ExtArgs>;
            fields: Prisma.migrationsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.migrationsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.migrationsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload>;
                };
                findFirst: {
                    args: Prisma.migrationsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.migrationsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload>;
                };
                findMany: {
                    args: Prisma.migrationsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload>[];
                };
                create: {
                    args: Prisma.migrationsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload>;
                };
                createMany: {
                    args: Prisma.migrationsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.migrationsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload>[];
                };
                delete: {
                    args: Prisma.migrationsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload>;
                };
                update: {
                    args: Prisma.migrationsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload>;
                };
                deleteMany: {
                    args: Prisma.migrationsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.migrationsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.migrationsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload>[];
                };
                upsert: {
                    args: Prisma.migrationsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$migrationsPayload>;
                };
                aggregate: {
                    args: Prisma.MigrationsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMigrations>;
                };
                groupBy: {
                    args: Prisma.migrationsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MigrationsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.migrationsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MigrationsCountAggregateOutputType> | number;
                };
            };
        };
        password_reset_tokens: {
            payload: Prisma.$password_reset_tokensPayload<ExtArgs>;
            fields: Prisma.password_reset_tokensFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.password_reset_tokensFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.password_reset_tokensFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload>;
                };
                findFirst: {
                    args: Prisma.password_reset_tokensFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.password_reset_tokensFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload>;
                };
                findMany: {
                    args: Prisma.password_reset_tokensFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload>[];
                };
                create: {
                    args: Prisma.password_reset_tokensCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload>;
                };
                createMany: {
                    args: Prisma.password_reset_tokensCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.password_reset_tokensCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload>[];
                };
                delete: {
                    args: Prisma.password_reset_tokensDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload>;
                };
                update: {
                    args: Prisma.password_reset_tokensUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload>;
                };
                deleteMany: {
                    args: Prisma.password_reset_tokensDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.password_reset_tokensUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.password_reset_tokensUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload>[];
                };
                upsert: {
                    args: Prisma.password_reset_tokensUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$password_reset_tokensPayload>;
                };
                aggregate: {
                    args: Prisma.Password_reset_tokensAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePassword_reset_tokens>;
                };
                groupBy: {
                    args: Prisma.password_reset_tokensGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Password_reset_tokensGroupByOutputType>[];
                };
                count: {
                    args: Prisma.password_reset_tokensCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Password_reset_tokensCountAggregateOutputType> | number;
                };
            };
        };
        personal_access_tokens: {
            payload: Prisma.$personal_access_tokensPayload<ExtArgs>;
            fields: Prisma.personal_access_tokensFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.personal_access_tokensFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.personal_access_tokensFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload>;
                };
                findFirst: {
                    args: Prisma.personal_access_tokensFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.personal_access_tokensFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload>;
                };
                findMany: {
                    args: Prisma.personal_access_tokensFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload>[];
                };
                create: {
                    args: Prisma.personal_access_tokensCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload>;
                };
                createMany: {
                    args: Prisma.personal_access_tokensCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.personal_access_tokensCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload>[];
                };
                delete: {
                    args: Prisma.personal_access_tokensDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload>;
                };
                update: {
                    args: Prisma.personal_access_tokensUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload>;
                };
                deleteMany: {
                    args: Prisma.personal_access_tokensDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.personal_access_tokensUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.personal_access_tokensUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload>[];
                };
                upsert: {
                    args: Prisma.personal_access_tokensUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$personal_access_tokensPayload>;
                };
                aggregate: {
                    args: Prisma.Personal_access_tokensAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePersonal_access_tokens>;
                };
                groupBy: {
                    args: Prisma.personal_access_tokensGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Personal_access_tokensGroupByOutputType>[];
                };
                count: {
                    args: Prisma.personal_access_tokensCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Personal_access_tokensCountAggregateOutputType> | number;
                };
            };
        };
        push_subscriptions: {
            payload: Prisma.$push_subscriptionsPayload<ExtArgs>;
            fields: Prisma.push_subscriptionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.push_subscriptionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.push_subscriptionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload>;
                };
                findFirst: {
                    args: Prisma.push_subscriptionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.push_subscriptionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload>;
                };
                findMany: {
                    args: Prisma.push_subscriptionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload>[];
                };
                create: {
                    args: Prisma.push_subscriptionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload>;
                };
                createMany: {
                    args: Prisma.push_subscriptionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.push_subscriptionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload>[];
                };
                delete: {
                    args: Prisma.push_subscriptionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload>;
                };
                update: {
                    args: Prisma.push_subscriptionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload>;
                };
                deleteMany: {
                    args: Prisma.push_subscriptionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.push_subscriptionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.push_subscriptionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload>[];
                };
                upsert: {
                    args: Prisma.push_subscriptionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$push_subscriptionsPayload>;
                };
                aggregate: {
                    args: Prisma.Push_subscriptionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePush_subscriptions>;
                };
                groupBy: {
                    args: Prisma.push_subscriptionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Push_subscriptionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.push_subscriptionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Push_subscriptionsCountAggregateOutputType> | number;
                };
            };
        };
        savings_goals: {
            payload: Prisma.$savings_goalsPayload<ExtArgs>;
            fields: Prisma.savings_goalsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.savings_goalsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.savings_goalsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload>;
                };
                findFirst: {
                    args: Prisma.savings_goalsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.savings_goalsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload>;
                };
                findMany: {
                    args: Prisma.savings_goalsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload>[];
                };
                create: {
                    args: Prisma.savings_goalsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload>;
                };
                createMany: {
                    args: Prisma.savings_goalsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.savings_goalsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload>[];
                };
                delete: {
                    args: Prisma.savings_goalsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload>;
                };
                update: {
                    args: Prisma.savings_goalsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload>;
                };
                deleteMany: {
                    args: Prisma.savings_goalsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.savings_goalsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.savings_goalsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload>[];
                };
                upsert: {
                    args: Prisma.savings_goalsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$savings_goalsPayload>;
                };
                aggregate: {
                    args: Prisma.Savings_goalsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSavings_goals>;
                };
                groupBy: {
                    args: Prisma.savings_goalsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Savings_goalsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.savings_goalsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Savings_goalsCountAggregateOutputType> | number;
                };
            };
        };
        sessions: {
            payload: Prisma.$sessionsPayload<ExtArgs>;
            fields: Prisma.sessionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.sessionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.sessionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload>;
                };
                findFirst: {
                    args: Prisma.sessionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.sessionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload>;
                };
                findMany: {
                    args: Prisma.sessionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload>[];
                };
                create: {
                    args: Prisma.sessionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload>;
                };
                createMany: {
                    args: Prisma.sessionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.sessionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload>[];
                };
                delete: {
                    args: Prisma.sessionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload>;
                };
                update: {
                    args: Prisma.sessionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload>;
                };
                deleteMany: {
                    args: Prisma.sessionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.sessionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.sessionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload>[];
                };
                upsert: {
                    args: Prisma.sessionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sessionsPayload>;
                };
                aggregate: {
                    args: Prisma.SessionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSessions>;
                };
                groupBy: {
                    args: Prisma.sessionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.sessionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionsCountAggregateOutputType> | number;
                };
            };
        };
        shared_debt_splits: {
            payload: Prisma.$shared_debt_splitsPayload<ExtArgs>;
            fields: Prisma.shared_debt_splitsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.shared_debt_splitsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.shared_debt_splitsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload>;
                };
                findFirst: {
                    args: Prisma.shared_debt_splitsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.shared_debt_splitsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload>;
                };
                findMany: {
                    args: Prisma.shared_debt_splitsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload>[];
                };
                create: {
                    args: Prisma.shared_debt_splitsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload>;
                };
                createMany: {
                    args: Prisma.shared_debt_splitsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.shared_debt_splitsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload>[];
                };
                delete: {
                    args: Prisma.shared_debt_splitsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload>;
                };
                update: {
                    args: Prisma.shared_debt_splitsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload>;
                };
                deleteMany: {
                    args: Prisma.shared_debt_splitsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.shared_debt_splitsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.shared_debt_splitsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload>[];
                };
                upsert: {
                    args: Prisma.shared_debt_splitsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debt_splitsPayload>;
                };
                aggregate: {
                    args: Prisma.Shared_debt_splitsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateShared_debt_splits>;
                };
                groupBy: {
                    args: Prisma.shared_debt_splitsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Shared_debt_splitsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.shared_debt_splitsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Shared_debt_splitsCountAggregateOutputType> | number;
                };
            };
        };
        shared_debts: {
            payload: Prisma.$shared_debtsPayload<ExtArgs>;
            fields: Prisma.shared_debtsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.shared_debtsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.shared_debtsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload>;
                };
                findFirst: {
                    args: Prisma.shared_debtsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.shared_debtsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload>;
                };
                findMany: {
                    args: Prisma.shared_debtsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload>[];
                };
                create: {
                    args: Prisma.shared_debtsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload>;
                };
                createMany: {
                    args: Prisma.shared_debtsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.shared_debtsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload>[];
                };
                delete: {
                    args: Prisma.shared_debtsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload>;
                };
                update: {
                    args: Prisma.shared_debtsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload>;
                };
                deleteMany: {
                    args: Prisma.shared_debtsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.shared_debtsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.shared_debtsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload>[];
                };
                upsert: {
                    args: Prisma.shared_debtsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$shared_debtsPayload>;
                };
                aggregate: {
                    args: Prisma.Shared_debtsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateShared_debts>;
                };
                groupBy: {
                    args: Prisma.shared_debtsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Shared_debtsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.shared_debtsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Shared_debtsCountAggregateOutputType> | number;
                };
            };
        };
        transaction_logs: {
            payload: Prisma.$transaction_logsPayload<ExtArgs>;
            fields: Prisma.transaction_logsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.transaction_logsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.transaction_logsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload>;
                };
                findFirst: {
                    args: Prisma.transaction_logsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.transaction_logsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload>;
                };
                findMany: {
                    args: Prisma.transaction_logsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload>[];
                };
                create: {
                    args: Prisma.transaction_logsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload>;
                };
                createMany: {
                    args: Prisma.transaction_logsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.transaction_logsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload>[];
                };
                delete: {
                    args: Prisma.transaction_logsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload>;
                };
                update: {
                    args: Prisma.transaction_logsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload>;
                };
                deleteMany: {
                    args: Prisma.transaction_logsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.transaction_logsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.transaction_logsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload>[];
                };
                upsert: {
                    args: Prisma.transaction_logsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transaction_logsPayload>;
                };
                aggregate: {
                    args: Prisma.Transaction_logsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTransaction_logs>;
                };
                groupBy: {
                    args: Prisma.transaction_logsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Transaction_logsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.transaction_logsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Transaction_logsCountAggregateOutputType> | number;
                };
            };
        };
        transactions: {
            payload: Prisma.$transactionsPayload<ExtArgs>;
            fields: Prisma.transactionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.transactionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.transactionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload>;
                };
                findFirst: {
                    args: Prisma.transactionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.transactionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload>;
                };
                findMany: {
                    args: Prisma.transactionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload>[];
                };
                create: {
                    args: Prisma.transactionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload>;
                };
                createMany: {
                    args: Prisma.transactionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.transactionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload>[];
                };
                delete: {
                    args: Prisma.transactionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload>;
                };
                update: {
                    args: Prisma.transactionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload>;
                };
                deleteMany: {
                    args: Prisma.transactionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.transactionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.transactionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload>[];
                };
                upsert: {
                    args: Prisma.transactionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$transactionsPayload>;
                };
                aggregate: {
                    args: Prisma.TransactionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTransactions>;
                };
                groupBy: {
                    args: Prisma.transactionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TransactionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.transactionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TransactionsCountAggregateOutputType> | number;
                };
            };
        };
        user_accounts: {
            payload: Prisma.$user_accountsPayload<ExtArgs>;
            fields: Prisma.user_accountsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.user_accountsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.user_accountsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload>;
                };
                findFirst: {
                    args: Prisma.user_accountsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.user_accountsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload>;
                };
                findMany: {
                    args: Prisma.user_accountsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload>[];
                };
                create: {
                    args: Prisma.user_accountsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload>;
                };
                createMany: {
                    args: Prisma.user_accountsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.user_accountsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload>[];
                };
                delete: {
                    args: Prisma.user_accountsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload>;
                };
                update: {
                    args: Prisma.user_accountsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload>;
                };
                deleteMany: {
                    args: Prisma.user_accountsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.user_accountsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.user_accountsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload>[];
                };
                upsert: {
                    args: Prisma.user_accountsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_accountsPayload>;
                };
                aggregate: {
                    args: Prisma.User_accountsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser_accounts>;
                };
                groupBy: {
                    args: Prisma.user_accountsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.User_accountsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.user_accountsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.User_accountsCountAggregateOutputType> | number;
                };
            };
        };
        users: {
            payload: Prisma.$usersPayload<ExtArgs>;
            fields: Prisma.usersFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.usersFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                findFirst: {
                    args: Prisma.usersFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                findMany: {
                    args: Prisma.usersFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>[];
                };
                create: {
                    args: Prisma.usersCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                createMany: {
                    args: Prisma.usersCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>[];
                };
                delete: {
                    args: Prisma.usersDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                update: {
                    args: Prisma.usersUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                deleteMany: {
                    args: Prisma.usersDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.usersUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>[];
                };
                upsert: {
                    args: Prisma.usersUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                aggregate: {
                    args: Prisma.UsersAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUsers>;
                };
                groupBy: {
                    args: Prisma.usersGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsersGroupByOutputType>[];
                };
                count: {
                    args: Prisma.usersCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsersCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;
export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
};
export type GlobalOmitConfig = {
    account_types?: Prisma.account_typesOmit;
    banks?: Prisma.banksOmit;
    budgets?: Prisma.budgetsOmit;
    cache?: Prisma.cacheOmit;
    cache_locks?: Prisma.cache_locksOmit;
    categories?: Prisma.categoriesOmit;
    failed_jobs?: Prisma.failed_jobsOmit;
    group_user?: Prisma.group_userOmit;
    groups?: Prisma.groupsOmit;
    job_batches?: Prisma.job_batchesOmit;
    jobs?: Prisma.jobsOmit;
    migrations?: Prisma.migrationsOmit;
    password_reset_tokens?: Prisma.password_reset_tokensOmit;
    personal_access_tokens?: Prisma.personal_access_tokensOmit;
    push_subscriptions?: Prisma.push_subscriptionsOmit;
    savings_goals?: Prisma.savings_goalsOmit;
    sessions?: Prisma.sessionsOmit;
    shared_debt_splits?: Prisma.shared_debt_splitsOmit;
    shared_debts?: Prisma.shared_debtsOmit;
    transaction_logs?: Prisma.transaction_logsOmit;
    transactions?: Prisma.transactionsOmit;
    user_accounts?: Prisma.user_accountsOmit;
    users?: Prisma.usersOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
