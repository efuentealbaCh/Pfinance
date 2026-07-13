import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type migrationsModel = runtime.Types.Result.DefaultSelection<Prisma.$migrationsPayload>;
export type AggregateMigrations = {
    _count: MigrationsCountAggregateOutputType | null;
    _avg: MigrationsAvgAggregateOutputType | null;
    _sum: MigrationsSumAggregateOutputType | null;
    _min: MigrationsMinAggregateOutputType | null;
    _max: MigrationsMaxAggregateOutputType | null;
};
export type MigrationsAvgAggregateOutputType = {
    id: number | null;
    batch: number | null;
};
export type MigrationsSumAggregateOutputType = {
    id: number | null;
    batch: number | null;
};
export type MigrationsMinAggregateOutputType = {
    id: number | null;
    migration: string | null;
    batch: number | null;
};
export type MigrationsMaxAggregateOutputType = {
    id: number | null;
    migration: string | null;
    batch: number | null;
};
export type MigrationsCountAggregateOutputType = {
    id: number;
    migration: number;
    batch: number;
    _all: number;
};
export type MigrationsAvgAggregateInputType = {
    id?: true;
    batch?: true;
};
export type MigrationsSumAggregateInputType = {
    id?: true;
    batch?: true;
};
export type MigrationsMinAggregateInputType = {
    id?: true;
    migration?: true;
    batch?: true;
};
export type MigrationsMaxAggregateInputType = {
    id?: true;
    migration?: true;
    batch?: true;
};
export type MigrationsCountAggregateInputType = {
    id?: true;
    migration?: true;
    batch?: true;
    _all?: true;
};
export type MigrationsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.migrationsWhereInput;
    orderBy?: Prisma.migrationsOrderByWithRelationInput | Prisma.migrationsOrderByWithRelationInput[];
    cursor?: Prisma.migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MigrationsCountAggregateInputType;
    _avg?: MigrationsAvgAggregateInputType;
    _sum?: MigrationsSumAggregateInputType;
    _min?: MigrationsMinAggregateInputType;
    _max?: MigrationsMaxAggregateInputType;
};
export type GetMigrationsAggregateType<T extends MigrationsAggregateArgs> = {
    [P in keyof T & keyof AggregateMigrations]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMigrations[P]> : Prisma.GetScalarType<T[P], AggregateMigrations[P]>;
};
export type migrationsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.migrationsWhereInput;
    orderBy?: Prisma.migrationsOrderByWithAggregationInput | Prisma.migrationsOrderByWithAggregationInput[];
    by: Prisma.MigrationsScalarFieldEnum[] | Prisma.MigrationsScalarFieldEnum;
    having?: Prisma.migrationsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MigrationsCountAggregateInputType | true;
    _avg?: MigrationsAvgAggregateInputType;
    _sum?: MigrationsSumAggregateInputType;
    _min?: MigrationsMinAggregateInputType;
    _max?: MigrationsMaxAggregateInputType;
};
export type MigrationsGroupByOutputType = {
    id: number;
    migration: string;
    batch: number;
    _count: MigrationsCountAggregateOutputType | null;
    _avg: MigrationsAvgAggregateOutputType | null;
    _sum: MigrationsSumAggregateOutputType | null;
    _min: MigrationsMinAggregateOutputType | null;
    _max: MigrationsMaxAggregateOutputType | null;
};
export type GetMigrationsGroupByPayload<T extends migrationsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MigrationsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MigrationsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MigrationsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MigrationsGroupByOutputType[P]>;
}>>;
export type migrationsWhereInput = {
    AND?: Prisma.migrationsWhereInput | Prisma.migrationsWhereInput[];
    OR?: Prisma.migrationsWhereInput[];
    NOT?: Prisma.migrationsWhereInput | Prisma.migrationsWhereInput[];
    id?: Prisma.IntFilter<"migrations"> | number;
    migration?: Prisma.StringFilter<"migrations"> | string;
    batch?: Prisma.IntFilter<"migrations"> | number;
};
export type migrationsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    migration?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
};
export type migrationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.migrationsWhereInput | Prisma.migrationsWhereInput[];
    OR?: Prisma.migrationsWhereInput[];
    NOT?: Prisma.migrationsWhereInput | Prisma.migrationsWhereInput[];
    migration?: Prisma.StringFilter<"migrations"> | string;
    batch?: Prisma.IntFilter<"migrations"> | number;
}, "id">;
export type migrationsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    migration?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
    _count?: Prisma.migrationsCountOrderByAggregateInput;
    _avg?: Prisma.migrationsAvgOrderByAggregateInput;
    _max?: Prisma.migrationsMaxOrderByAggregateInput;
    _min?: Prisma.migrationsMinOrderByAggregateInput;
    _sum?: Prisma.migrationsSumOrderByAggregateInput;
};
export type migrationsScalarWhereWithAggregatesInput = {
    AND?: Prisma.migrationsScalarWhereWithAggregatesInput | Prisma.migrationsScalarWhereWithAggregatesInput[];
    OR?: Prisma.migrationsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.migrationsScalarWhereWithAggregatesInput | Prisma.migrationsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"migrations"> | number;
    migration?: Prisma.StringWithAggregatesFilter<"migrations"> | string;
    batch?: Prisma.IntWithAggregatesFilter<"migrations"> | number;
};
export type migrationsCreateInput = {
    migration: string;
    batch: number;
};
export type migrationsUncheckedCreateInput = {
    id?: number;
    migration: string;
    batch: number;
};
export type migrationsUpdateInput = {
    migration?: Prisma.StringFieldUpdateOperationsInput | string;
    batch?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type migrationsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    migration?: Prisma.StringFieldUpdateOperationsInput | string;
    batch?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type migrationsCreateManyInput = {
    id?: number;
    migration: string;
    batch: number;
};
export type migrationsUpdateManyMutationInput = {
    migration?: Prisma.StringFieldUpdateOperationsInput | string;
    batch?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type migrationsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    migration?: Prisma.StringFieldUpdateOperationsInput | string;
    batch?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type migrationsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    migration?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
};
export type migrationsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
};
export type migrationsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    migration?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
};
export type migrationsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    migration?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
};
export type migrationsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
};
export type migrationsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    migration?: boolean;
    batch?: boolean;
}, ExtArgs["result"]["migrations"]>;
export type migrationsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    migration?: boolean;
    batch?: boolean;
}, ExtArgs["result"]["migrations"]>;
export type migrationsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    migration?: boolean;
    batch?: boolean;
}, ExtArgs["result"]["migrations"]>;
export type migrationsSelectScalar = {
    id?: boolean;
    migration?: boolean;
    batch?: boolean;
};
export type migrationsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "migration" | "batch", ExtArgs["result"]["migrations"]>;
export type $migrationsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "migrations";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        migration: string;
        batch: number;
    }, ExtArgs["result"]["migrations"]>;
    composites: {};
};
export type migrationsGetPayload<S extends boolean | null | undefined | migrationsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$migrationsPayload, S>;
export type migrationsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<migrationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MigrationsCountAggregateInputType | true;
};
export interface migrationsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['migrations'];
        meta: {
            name: 'migrations';
        };
    };
    findUnique<T extends migrationsFindUniqueArgs>(args: Prisma.SelectSubset<T, migrationsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__migrationsClient<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends migrationsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, migrationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__migrationsClient<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends migrationsFindFirstArgs>(args?: Prisma.SelectSubset<T, migrationsFindFirstArgs<ExtArgs>>): Prisma.Prisma__migrationsClient<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends migrationsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, migrationsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__migrationsClient<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends migrationsFindManyArgs>(args?: Prisma.SelectSubset<T, migrationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends migrationsCreateArgs>(args: Prisma.SelectSubset<T, migrationsCreateArgs<ExtArgs>>): Prisma.Prisma__migrationsClient<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends migrationsCreateManyArgs>(args?: Prisma.SelectSubset<T, migrationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends migrationsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, migrationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends migrationsDeleteArgs>(args: Prisma.SelectSubset<T, migrationsDeleteArgs<ExtArgs>>): Prisma.Prisma__migrationsClient<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends migrationsUpdateArgs>(args: Prisma.SelectSubset<T, migrationsUpdateArgs<ExtArgs>>): Prisma.Prisma__migrationsClient<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends migrationsDeleteManyArgs>(args?: Prisma.SelectSubset<T, migrationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends migrationsUpdateManyArgs>(args: Prisma.SelectSubset<T, migrationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends migrationsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, migrationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends migrationsUpsertArgs>(args: Prisma.SelectSubset<T, migrationsUpsertArgs<ExtArgs>>): Prisma.Prisma__migrationsClient<runtime.Types.Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends migrationsCountArgs>(args?: Prisma.Subset<T, migrationsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MigrationsCountAggregateOutputType> : number>;
    aggregate<T extends MigrationsAggregateArgs>(args: Prisma.Subset<T, MigrationsAggregateArgs>): Prisma.PrismaPromise<GetMigrationsAggregateType<T>>;
    groupBy<T extends migrationsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: migrationsGroupByArgs['orderBy'];
    } : {
        orderBy?: migrationsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, migrationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMigrationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: migrationsFieldRefs;
}
export interface Prisma__migrationsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface migrationsFieldRefs {
    readonly id: Prisma.FieldRef<"migrations", 'Int'>;
    readonly migration: Prisma.FieldRef<"migrations", 'String'>;
    readonly batch: Prisma.FieldRef<"migrations", 'Int'>;
}
export type migrationsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelect<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    where: Prisma.migrationsWhereUniqueInput;
};
export type migrationsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelect<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    where: Prisma.migrationsWhereUniqueInput;
};
export type migrationsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelect<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    where?: Prisma.migrationsWhereInput;
    orderBy?: Prisma.migrationsOrderByWithRelationInput | Prisma.migrationsOrderByWithRelationInput[];
    cursor?: Prisma.migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MigrationsScalarFieldEnum | Prisma.MigrationsScalarFieldEnum[];
};
export type migrationsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelect<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    where?: Prisma.migrationsWhereInput;
    orderBy?: Prisma.migrationsOrderByWithRelationInput | Prisma.migrationsOrderByWithRelationInput[];
    cursor?: Prisma.migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MigrationsScalarFieldEnum | Prisma.MigrationsScalarFieldEnum[];
};
export type migrationsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelect<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    where?: Prisma.migrationsWhereInput;
    orderBy?: Prisma.migrationsOrderByWithRelationInput | Prisma.migrationsOrderByWithRelationInput[];
    cursor?: Prisma.migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MigrationsScalarFieldEnum | Prisma.MigrationsScalarFieldEnum[];
};
export type migrationsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelect<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.migrationsCreateInput, Prisma.migrationsUncheckedCreateInput>;
};
export type migrationsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.migrationsCreateManyInput | Prisma.migrationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type migrationsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    data: Prisma.migrationsCreateManyInput | Prisma.migrationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type migrationsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelect<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.migrationsUpdateInput, Prisma.migrationsUncheckedUpdateInput>;
    where: Prisma.migrationsWhereUniqueInput;
};
export type migrationsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.migrationsUpdateManyMutationInput, Prisma.migrationsUncheckedUpdateManyInput>;
    where?: Prisma.migrationsWhereInput;
    limit?: number;
};
export type migrationsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.migrationsUpdateManyMutationInput, Prisma.migrationsUncheckedUpdateManyInput>;
    where?: Prisma.migrationsWhereInput;
    limit?: number;
};
export type migrationsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelect<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    where: Prisma.migrationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.migrationsCreateInput, Prisma.migrationsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.migrationsUpdateInput, Prisma.migrationsUncheckedUpdateInput>;
};
export type migrationsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelect<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
    where: Prisma.migrationsWhereUniqueInput;
};
export type migrationsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.migrationsWhereInput;
    limit?: number;
};
export type migrationsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.migrationsSelect<ExtArgs> | null;
    omit?: Prisma.migrationsOmit<ExtArgs> | null;
};
