import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type cacheModel = runtime.Types.Result.DefaultSelection<Prisma.$cachePayload>;
export type AggregateCache = {
    _count: CacheCountAggregateOutputType | null;
    _avg: CacheAvgAggregateOutputType | null;
    _sum: CacheSumAggregateOutputType | null;
    _min: CacheMinAggregateOutputType | null;
    _max: CacheMaxAggregateOutputType | null;
};
export type CacheAvgAggregateOutputType = {
    expiration: number | null;
};
export type CacheSumAggregateOutputType = {
    expiration: number | null;
};
export type CacheMinAggregateOutputType = {
    key: string | null;
    value: string | null;
    expiration: number | null;
};
export type CacheMaxAggregateOutputType = {
    key: string | null;
    value: string | null;
    expiration: number | null;
};
export type CacheCountAggregateOutputType = {
    key: number;
    value: number;
    expiration: number;
    _all: number;
};
export type CacheAvgAggregateInputType = {
    expiration?: true;
};
export type CacheSumAggregateInputType = {
    expiration?: true;
};
export type CacheMinAggregateInputType = {
    key?: true;
    value?: true;
    expiration?: true;
};
export type CacheMaxAggregateInputType = {
    key?: true;
    value?: true;
    expiration?: true;
};
export type CacheCountAggregateInputType = {
    key?: true;
    value?: true;
    expiration?: true;
    _all?: true;
};
export type CacheAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.cacheWhereInput;
    orderBy?: Prisma.cacheOrderByWithRelationInput | Prisma.cacheOrderByWithRelationInput[];
    cursor?: Prisma.cacheWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CacheCountAggregateInputType;
    _avg?: CacheAvgAggregateInputType;
    _sum?: CacheSumAggregateInputType;
    _min?: CacheMinAggregateInputType;
    _max?: CacheMaxAggregateInputType;
};
export type GetCacheAggregateType<T extends CacheAggregateArgs> = {
    [P in keyof T & keyof AggregateCache]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCache[P]> : Prisma.GetScalarType<T[P], AggregateCache[P]>;
};
export type cacheGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.cacheWhereInput;
    orderBy?: Prisma.cacheOrderByWithAggregationInput | Prisma.cacheOrderByWithAggregationInput[];
    by: Prisma.CacheScalarFieldEnum[] | Prisma.CacheScalarFieldEnum;
    having?: Prisma.cacheScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CacheCountAggregateInputType | true;
    _avg?: CacheAvgAggregateInputType;
    _sum?: CacheSumAggregateInputType;
    _min?: CacheMinAggregateInputType;
    _max?: CacheMaxAggregateInputType;
};
export type CacheGroupByOutputType = {
    key: string;
    value: string;
    expiration: number;
    _count: CacheCountAggregateOutputType | null;
    _avg: CacheAvgAggregateOutputType | null;
    _sum: CacheSumAggregateOutputType | null;
    _min: CacheMinAggregateOutputType | null;
    _max: CacheMaxAggregateOutputType | null;
};
export type GetCacheGroupByPayload<T extends cacheGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CacheGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CacheGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CacheGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CacheGroupByOutputType[P]>;
}>>;
export type cacheWhereInput = {
    AND?: Prisma.cacheWhereInput | Prisma.cacheWhereInput[];
    OR?: Prisma.cacheWhereInput[];
    NOT?: Prisma.cacheWhereInput | Prisma.cacheWhereInput[];
    key?: Prisma.StringFilter<"cache"> | string;
    value?: Prisma.StringFilter<"cache"> | string;
    expiration?: Prisma.IntFilter<"cache"> | number;
};
export type cacheOrderByWithRelationInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    expiration?: Prisma.SortOrder;
};
export type cacheWhereUniqueInput = Prisma.AtLeast<{
    key?: string;
    AND?: Prisma.cacheWhereInput | Prisma.cacheWhereInput[];
    OR?: Prisma.cacheWhereInput[];
    NOT?: Prisma.cacheWhereInput | Prisma.cacheWhereInput[];
    value?: Prisma.StringFilter<"cache"> | string;
    expiration?: Prisma.IntFilter<"cache"> | number;
}, "key">;
export type cacheOrderByWithAggregationInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    expiration?: Prisma.SortOrder;
    _count?: Prisma.cacheCountOrderByAggregateInput;
    _avg?: Prisma.cacheAvgOrderByAggregateInput;
    _max?: Prisma.cacheMaxOrderByAggregateInput;
    _min?: Prisma.cacheMinOrderByAggregateInput;
    _sum?: Prisma.cacheSumOrderByAggregateInput;
};
export type cacheScalarWhereWithAggregatesInput = {
    AND?: Prisma.cacheScalarWhereWithAggregatesInput | Prisma.cacheScalarWhereWithAggregatesInput[];
    OR?: Prisma.cacheScalarWhereWithAggregatesInput[];
    NOT?: Prisma.cacheScalarWhereWithAggregatesInput | Prisma.cacheScalarWhereWithAggregatesInput[];
    key?: Prisma.StringWithAggregatesFilter<"cache"> | string;
    value?: Prisma.StringWithAggregatesFilter<"cache"> | string;
    expiration?: Prisma.IntWithAggregatesFilter<"cache"> | number;
};
export type cacheCreateInput = {
    key: string;
    value: string;
    expiration: number;
};
export type cacheUncheckedCreateInput = {
    key: string;
    value: string;
    expiration: number;
};
export type cacheUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    expiration?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type cacheUncheckedUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    expiration?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type cacheCreateManyInput = {
    key: string;
    value: string;
    expiration: number;
};
export type cacheUpdateManyMutationInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    expiration?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type cacheUncheckedUpdateManyInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    expiration?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type cacheCountOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    expiration?: Prisma.SortOrder;
};
export type cacheAvgOrderByAggregateInput = {
    expiration?: Prisma.SortOrder;
};
export type cacheMaxOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    expiration?: Prisma.SortOrder;
};
export type cacheMinOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    expiration?: Prisma.SortOrder;
};
export type cacheSumOrderByAggregateInput = {
    expiration?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type cacheSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    expiration?: boolean;
}, ExtArgs["result"]["cache"]>;
export type cacheSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    expiration?: boolean;
}, ExtArgs["result"]["cache"]>;
export type cacheSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    expiration?: boolean;
}, ExtArgs["result"]["cache"]>;
export type cacheSelectScalar = {
    key?: boolean;
    value?: boolean;
    expiration?: boolean;
};
export type cacheOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"key" | "value" | "expiration", ExtArgs["result"]["cache"]>;
export type $cachePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "cache";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        key: string;
        value: string;
        expiration: number;
    }, ExtArgs["result"]["cache"]>;
    composites: {};
};
export type cacheGetPayload<S extends boolean | null | undefined | cacheDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$cachePayload, S>;
export type cacheCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<cacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CacheCountAggregateInputType | true;
};
export interface cacheDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['cache'];
        meta: {
            name: 'cache';
        };
    };
    findUnique<T extends cacheFindUniqueArgs>(args: Prisma.SelectSubset<T, cacheFindUniqueArgs<ExtArgs>>): Prisma.Prisma__cacheClient<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends cacheFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, cacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__cacheClient<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends cacheFindFirstArgs>(args?: Prisma.SelectSubset<T, cacheFindFirstArgs<ExtArgs>>): Prisma.Prisma__cacheClient<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends cacheFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, cacheFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__cacheClient<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends cacheFindManyArgs>(args?: Prisma.SelectSubset<T, cacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends cacheCreateArgs>(args: Prisma.SelectSubset<T, cacheCreateArgs<ExtArgs>>): Prisma.Prisma__cacheClient<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends cacheCreateManyArgs>(args?: Prisma.SelectSubset<T, cacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends cacheCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, cacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends cacheDeleteArgs>(args: Prisma.SelectSubset<T, cacheDeleteArgs<ExtArgs>>): Prisma.Prisma__cacheClient<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends cacheUpdateArgs>(args: Prisma.SelectSubset<T, cacheUpdateArgs<ExtArgs>>): Prisma.Prisma__cacheClient<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends cacheDeleteManyArgs>(args?: Prisma.SelectSubset<T, cacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends cacheUpdateManyArgs>(args: Prisma.SelectSubset<T, cacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends cacheUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, cacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends cacheUpsertArgs>(args: Prisma.SelectSubset<T, cacheUpsertArgs<ExtArgs>>): Prisma.Prisma__cacheClient<runtime.Types.Result.GetResult<Prisma.$cachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends cacheCountArgs>(args?: Prisma.Subset<T, cacheCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CacheCountAggregateOutputType> : number>;
    aggregate<T extends CacheAggregateArgs>(args: Prisma.Subset<T, CacheAggregateArgs>): Prisma.PrismaPromise<GetCacheAggregateType<T>>;
    groupBy<T extends cacheGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: cacheGroupByArgs['orderBy'];
    } : {
        orderBy?: cacheGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, cacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: cacheFieldRefs;
}
export interface Prisma__cacheClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface cacheFieldRefs {
    readonly key: Prisma.FieldRef<"cache", 'String'>;
    readonly value: Prisma.FieldRef<"cache", 'String'>;
    readonly expiration: Prisma.FieldRef<"cache", 'Int'>;
}
export type cacheFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelect<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    where: Prisma.cacheWhereUniqueInput;
};
export type cacheFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelect<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    where: Prisma.cacheWhereUniqueInput;
};
export type cacheFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelect<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    where?: Prisma.cacheWhereInput;
    orderBy?: Prisma.cacheOrderByWithRelationInput | Prisma.cacheOrderByWithRelationInput[];
    cursor?: Prisma.cacheWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CacheScalarFieldEnum | Prisma.CacheScalarFieldEnum[];
};
export type cacheFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelect<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    where?: Prisma.cacheWhereInput;
    orderBy?: Prisma.cacheOrderByWithRelationInput | Prisma.cacheOrderByWithRelationInput[];
    cursor?: Prisma.cacheWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CacheScalarFieldEnum | Prisma.CacheScalarFieldEnum[];
};
export type cacheFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelect<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    where?: Prisma.cacheWhereInput;
    orderBy?: Prisma.cacheOrderByWithRelationInput | Prisma.cacheOrderByWithRelationInput[];
    cursor?: Prisma.cacheWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CacheScalarFieldEnum | Prisma.CacheScalarFieldEnum[];
};
export type cacheCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelect<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.cacheCreateInput, Prisma.cacheUncheckedCreateInput>;
};
export type cacheCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.cacheCreateManyInput | Prisma.cacheCreateManyInput[];
    skipDuplicates?: boolean;
};
export type cacheCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    data: Prisma.cacheCreateManyInput | Prisma.cacheCreateManyInput[];
    skipDuplicates?: boolean;
};
export type cacheUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelect<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.cacheUpdateInput, Prisma.cacheUncheckedUpdateInput>;
    where: Prisma.cacheWhereUniqueInput;
};
export type cacheUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.cacheUpdateManyMutationInput, Prisma.cacheUncheckedUpdateManyInput>;
    where?: Prisma.cacheWhereInput;
    limit?: number;
};
export type cacheUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.cacheUpdateManyMutationInput, Prisma.cacheUncheckedUpdateManyInput>;
    where?: Prisma.cacheWhereInput;
    limit?: number;
};
export type cacheUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelect<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    where: Prisma.cacheWhereUniqueInput;
    create: Prisma.XOR<Prisma.cacheCreateInput, Prisma.cacheUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.cacheUpdateInput, Prisma.cacheUncheckedUpdateInput>;
};
export type cacheDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelect<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
    where: Prisma.cacheWhereUniqueInput;
};
export type cacheDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.cacheWhereInput;
    limit?: number;
};
export type cacheDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.cacheSelect<ExtArgs> | null;
    omit?: Prisma.cacheOmit<ExtArgs> | null;
};
