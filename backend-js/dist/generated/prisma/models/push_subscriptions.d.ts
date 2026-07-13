import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type push_subscriptionsModel = runtime.Types.Result.DefaultSelection<Prisma.$push_subscriptionsPayload>;
export type AggregatePush_subscriptions = {
    _count: Push_subscriptionsCountAggregateOutputType | null;
    _avg: Push_subscriptionsAvgAggregateOutputType | null;
    _sum: Push_subscriptionsSumAggregateOutputType | null;
    _min: Push_subscriptionsMinAggregateOutputType | null;
    _max: Push_subscriptionsMaxAggregateOutputType | null;
};
export type Push_subscriptionsAvgAggregateOutputType = {
    id: number | null;
    subscribable_id: number | null;
};
export type Push_subscriptionsSumAggregateOutputType = {
    id: bigint | null;
    subscribable_id: bigint | null;
};
export type Push_subscriptionsMinAggregateOutputType = {
    id: bigint | null;
    subscribable_type: string | null;
    subscribable_id: bigint | null;
    endpoint: string | null;
    public_key: string | null;
    auth_token: string | null;
    content_encoding: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Push_subscriptionsMaxAggregateOutputType = {
    id: bigint | null;
    subscribable_type: string | null;
    subscribable_id: bigint | null;
    endpoint: string | null;
    public_key: string | null;
    auth_token: string | null;
    content_encoding: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Push_subscriptionsCountAggregateOutputType = {
    id: number;
    subscribable_type: number;
    subscribable_id: number;
    endpoint: number;
    public_key: number;
    auth_token: number;
    content_encoding: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Push_subscriptionsAvgAggregateInputType = {
    id?: true;
    subscribable_id?: true;
};
export type Push_subscriptionsSumAggregateInputType = {
    id?: true;
    subscribable_id?: true;
};
export type Push_subscriptionsMinAggregateInputType = {
    id?: true;
    subscribable_type?: true;
    subscribable_id?: true;
    endpoint?: true;
    public_key?: true;
    auth_token?: true;
    content_encoding?: true;
    created_at?: true;
    updated_at?: true;
};
export type Push_subscriptionsMaxAggregateInputType = {
    id?: true;
    subscribable_type?: true;
    subscribable_id?: true;
    endpoint?: true;
    public_key?: true;
    auth_token?: true;
    content_encoding?: true;
    created_at?: true;
    updated_at?: true;
};
export type Push_subscriptionsCountAggregateInputType = {
    id?: true;
    subscribable_type?: true;
    subscribable_id?: true;
    endpoint?: true;
    public_key?: true;
    auth_token?: true;
    content_encoding?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Push_subscriptionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.push_subscriptionsWhereInput;
    orderBy?: Prisma.push_subscriptionsOrderByWithRelationInput | Prisma.push_subscriptionsOrderByWithRelationInput[];
    cursor?: Prisma.push_subscriptionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Push_subscriptionsCountAggregateInputType;
    _avg?: Push_subscriptionsAvgAggregateInputType;
    _sum?: Push_subscriptionsSumAggregateInputType;
    _min?: Push_subscriptionsMinAggregateInputType;
    _max?: Push_subscriptionsMaxAggregateInputType;
};
export type GetPush_subscriptionsAggregateType<T extends Push_subscriptionsAggregateArgs> = {
    [P in keyof T & keyof AggregatePush_subscriptions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePush_subscriptions[P]> : Prisma.GetScalarType<T[P], AggregatePush_subscriptions[P]>;
};
export type push_subscriptionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.push_subscriptionsWhereInput;
    orderBy?: Prisma.push_subscriptionsOrderByWithAggregationInput | Prisma.push_subscriptionsOrderByWithAggregationInput[];
    by: Prisma.Push_subscriptionsScalarFieldEnum[] | Prisma.Push_subscriptionsScalarFieldEnum;
    having?: Prisma.push_subscriptionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Push_subscriptionsCountAggregateInputType | true;
    _avg?: Push_subscriptionsAvgAggregateInputType;
    _sum?: Push_subscriptionsSumAggregateInputType;
    _min?: Push_subscriptionsMinAggregateInputType;
    _max?: Push_subscriptionsMaxAggregateInputType;
};
export type Push_subscriptionsGroupByOutputType = {
    id: bigint;
    subscribable_type: string;
    subscribable_id: bigint;
    endpoint: string;
    public_key: string | null;
    auth_token: string | null;
    content_encoding: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Push_subscriptionsCountAggregateOutputType | null;
    _avg: Push_subscriptionsAvgAggregateOutputType | null;
    _sum: Push_subscriptionsSumAggregateOutputType | null;
    _min: Push_subscriptionsMinAggregateOutputType | null;
    _max: Push_subscriptionsMaxAggregateOutputType | null;
};
export type GetPush_subscriptionsGroupByPayload<T extends push_subscriptionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Push_subscriptionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Push_subscriptionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Push_subscriptionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Push_subscriptionsGroupByOutputType[P]>;
}>>;
export type push_subscriptionsWhereInput = {
    AND?: Prisma.push_subscriptionsWhereInput | Prisma.push_subscriptionsWhereInput[];
    OR?: Prisma.push_subscriptionsWhereInput[];
    NOT?: Prisma.push_subscriptionsWhereInput | Prisma.push_subscriptionsWhereInput[];
    id?: Prisma.BigIntFilter<"push_subscriptions"> | bigint | number;
    subscribable_type?: Prisma.StringFilter<"push_subscriptions"> | string;
    subscribable_id?: Prisma.BigIntFilter<"push_subscriptions"> | bigint | number;
    endpoint?: Prisma.StringFilter<"push_subscriptions"> | string;
    public_key?: Prisma.StringNullableFilter<"push_subscriptions"> | string | null;
    auth_token?: Prisma.StringNullableFilter<"push_subscriptions"> | string | null;
    content_encoding?: Prisma.StringNullableFilter<"push_subscriptions"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"push_subscriptions"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"push_subscriptions"> | Date | string | null;
};
export type push_subscriptionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    subscribable_type?: Prisma.SortOrder;
    subscribable_id?: Prisma.SortOrder;
    endpoint?: Prisma.SortOrder;
    public_key?: Prisma.SortOrderInput | Prisma.SortOrder;
    auth_token?: Prisma.SortOrderInput | Prisma.SortOrder;
    content_encoding?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type push_subscriptionsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    endpoint?: string;
    AND?: Prisma.push_subscriptionsWhereInput | Prisma.push_subscriptionsWhereInput[];
    OR?: Prisma.push_subscriptionsWhereInput[];
    NOT?: Prisma.push_subscriptionsWhereInput | Prisma.push_subscriptionsWhereInput[];
    subscribable_type?: Prisma.StringFilter<"push_subscriptions"> | string;
    subscribable_id?: Prisma.BigIntFilter<"push_subscriptions"> | bigint | number;
    public_key?: Prisma.StringNullableFilter<"push_subscriptions"> | string | null;
    auth_token?: Prisma.StringNullableFilter<"push_subscriptions"> | string | null;
    content_encoding?: Prisma.StringNullableFilter<"push_subscriptions"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"push_subscriptions"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"push_subscriptions"> | Date | string | null;
}, "id" | "endpoint">;
export type push_subscriptionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    subscribable_type?: Prisma.SortOrder;
    subscribable_id?: Prisma.SortOrder;
    endpoint?: Prisma.SortOrder;
    public_key?: Prisma.SortOrderInput | Prisma.SortOrder;
    auth_token?: Prisma.SortOrderInput | Prisma.SortOrder;
    content_encoding?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.push_subscriptionsCountOrderByAggregateInput;
    _avg?: Prisma.push_subscriptionsAvgOrderByAggregateInput;
    _max?: Prisma.push_subscriptionsMaxOrderByAggregateInput;
    _min?: Prisma.push_subscriptionsMinOrderByAggregateInput;
    _sum?: Prisma.push_subscriptionsSumOrderByAggregateInput;
};
export type push_subscriptionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.push_subscriptionsScalarWhereWithAggregatesInput | Prisma.push_subscriptionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.push_subscriptionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.push_subscriptionsScalarWhereWithAggregatesInput | Prisma.push_subscriptionsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"push_subscriptions"> | bigint | number;
    subscribable_type?: Prisma.StringWithAggregatesFilter<"push_subscriptions"> | string;
    subscribable_id?: Prisma.BigIntWithAggregatesFilter<"push_subscriptions"> | bigint | number;
    endpoint?: Prisma.StringWithAggregatesFilter<"push_subscriptions"> | string;
    public_key?: Prisma.StringNullableWithAggregatesFilter<"push_subscriptions"> | string | null;
    auth_token?: Prisma.StringNullableWithAggregatesFilter<"push_subscriptions"> | string | null;
    content_encoding?: Prisma.StringNullableWithAggregatesFilter<"push_subscriptions"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"push_subscriptions"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"push_subscriptions"> | Date | string | null;
};
export type push_subscriptionsCreateInput = {
    id?: bigint | number;
    subscribable_type: string;
    subscribable_id: bigint | number;
    endpoint: string;
    public_key?: string | null;
    auth_token?: string | null;
    content_encoding?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type push_subscriptionsUncheckedCreateInput = {
    id?: bigint | number;
    subscribable_type: string;
    subscribable_id: bigint | number;
    endpoint: string;
    public_key?: string | null;
    auth_token?: string | null;
    content_encoding?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type push_subscriptionsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    subscribable_type?: Prisma.StringFieldUpdateOperationsInput | string;
    subscribable_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endpoint?: Prisma.StringFieldUpdateOperationsInput | string;
    public_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auth_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content_encoding?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type push_subscriptionsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    subscribable_type?: Prisma.StringFieldUpdateOperationsInput | string;
    subscribable_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endpoint?: Prisma.StringFieldUpdateOperationsInput | string;
    public_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auth_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content_encoding?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type push_subscriptionsCreateManyInput = {
    id?: bigint | number;
    subscribable_type: string;
    subscribable_id: bigint | number;
    endpoint: string;
    public_key?: string | null;
    auth_token?: string | null;
    content_encoding?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type push_subscriptionsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    subscribable_type?: Prisma.StringFieldUpdateOperationsInput | string;
    subscribable_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endpoint?: Prisma.StringFieldUpdateOperationsInput | string;
    public_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auth_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content_encoding?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type push_subscriptionsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    subscribable_type?: Prisma.StringFieldUpdateOperationsInput | string;
    subscribable_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endpoint?: Prisma.StringFieldUpdateOperationsInput | string;
    public_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auth_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content_encoding?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type push_subscriptionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscribable_type?: Prisma.SortOrder;
    subscribable_id?: Prisma.SortOrder;
    endpoint?: Prisma.SortOrder;
    public_key?: Prisma.SortOrder;
    auth_token?: Prisma.SortOrder;
    content_encoding?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type push_subscriptionsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscribable_id?: Prisma.SortOrder;
};
export type push_subscriptionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscribable_type?: Prisma.SortOrder;
    subscribable_id?: Prisma.SortOrder;
    endpoint?: Prisma.SortOrder;
    public_key?: Prisma.SortOrder;
    auth_token?: Prisma.SortOrder;
    content_encoding?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type push_subscriptionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscribable_type?: Prisma.SortOrder;
    subscribable_id?: Prisma.SortOrder;
    endpoint?: Prisma.SortOrder;
    public_key?: Prisma.SortOrder;
    auth_token?: Prisma.SortOrder;
    content_encoding?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type push_subscriptionsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscribable_id?: Prisma.SortOrder;
};
export type push_subscriptionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subscribable_type?: boolean;
    subscribable_id?: boolean;
    endpoint?: boolean;
    public_key?: boolean;
    auth_token?: boolean;
    content_encoding?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["push_subscriptions"]>;
export type push_subscriptionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subscribable_type?: boolean;
    subscribable_id?: boolean;
    endpoint?: boolean;
    public_key?: boolean;
    auth_token?: boolean;
    content_encoding?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["push_subscriptions"]>;
export type push_subscriptionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subscribable_type?: boolean;
    subscribable_id?: boolean;
    endpoint?: boolean;
    public_key?: boolean;
    auth_token?: boolean;
    content_encoding?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["push_subscriptions"]>;
export type push_subscriptionsSelectScalar = {
    id?: boolean;
    subscribable_type?: boolean;
    subscribable_id?: boolean;
    endpoint?: boolean;
    public_key?: boolean;
    auth_token?: boolean;
    content_encoding?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type push_subscriptionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "subscribable_type" | "subscribable_id" | "endpoint" | "public_key" | "auth_token" | "content_encoding" | "created_at" | "updated_at", ExtArgs["result"]["push_subscriptions"]>;
export type $push_subscriptionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "push_subscriptions";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        subscribable_type: string;
        subscribable_id: bigint;
        endpoint: string;
        public_key: string | null;
        auth_token: string | null;
        content_encoding: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["push_subscriptions"]>;
    composites: {};
};
export type push_subscriptionsGetPayload<S extends boolean | null | undefined | push_subscriptionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload, S>;
export type push_subscriptionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<push_subscriptionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Push_subscriptionsCountAggregateInputType | true;
};
export interface push_subscriptionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['push_subscriptions'];
        meta: {
            name: 'push_subscriptions';
        };
    };
    findUnique<T extends push_subscriptionsFindUniqueArgs>(args: Prisma.SelectSubset<T, push_subscriptionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends push_subscriptionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, push_subscriptionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends push_subscriptionsFindFirstArgs>(args?: Prisma.SelectSubset<T, push_subscriptionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends push_subscriptionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, push_subscriptionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends push_subscriptionsFindManyArgs>(args?: Prisma.SelectSubset<T, push_subscriptionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends push_subscriptionsCreateArgs>(args: Prisma.SelectSubset<T, push_subscriptionsCreateArgs<ExtArgs>>): Prisma.Prisma__push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends push_subscriptionsCreateManyArgs>(args?: Prisma.SelectSubset<T, push_subscriptionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends push_subscriptionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, push_subscriptionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends push_subscriptionsDeleteArgs>(args: Prisma.SelectSubset<T, push_subscriptionsDeleteArgs<ExtArgs>>): Prisma.Prisma__push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends push_subscriptionsUpdateArgs>(args: Prisma.SelectSubset<T, push_subscriptionsUpdateArgs<ExtArgs>>): Prisma.Prisma__push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends push_subscriptionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, push_subscriptionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends push_subscriptionsUpdateManyArgs>(args: Prisma.SelectSubset<T, push_subscriptionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends push_subscriptionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, push_subscriptionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends push_subscriptionsUpsertArgs>(args: Prisma.SelectSubset<T, push_subscriptionsUpsertArgs<ExtArgs>>): Prisma.Prisma__push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$push_subscriptionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends push_subscriptionsCountArgs>(args?: Prisma.Subset<T, push_subscriptionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Push_subscriptionsCountAggregateOutputType> : number>;
    aggregate<T extends Push_subscriptionsAggregateArgs>(args: Prisma.Subset<T, Push_subscriptionsAggregateArgs>): Prisma.PrismaPromise<GetPush_subscriptionsAggregateType<T>>;
    groupBy<T extends push_subscriptionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: push_subscriptionsGroupByArgs['orderBy'];
    } : {
        orderBy?: push_subscriptionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, push_subscriptionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPush_subscriptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: push_subscriptionsFieldRefs;
}
export interface Prisma__push_subscriptionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface push_subscriptionsFieldRefs {
    readonly id: Prisma.FieldRef<"push_subscriptions", 'BigInt'>;
    readonly subscribable_type: Prisma.FieldRef<"push_subscriptions", 'String'>;
    readonly subscribable_id: Prisma.FieldRef<"push_subscriptions", 'BigInt'>;
    readonly endpoint: Prisma.FieldRef<"push_subscriptions", 'String'>;
    readonly public_key: Prisma.FieldRef<"push_subscriptions", 'String'>;
    readonly auth_token: Prisma.FieldRef<"push_subscriptions", 'String'>;
    readonly content_encoding: Prisma.FieldRef<"push_subscriptions", 'String'>;
    readonly created_at: Prisma.FieldRef<"push_subscriptions", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"push_subscriptions", 'DateTime'>;
}
export type push_subscriptionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    where: Prisma.push_subscriptionsWhereUniqueInput;
};
export type push_subscriptionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    where: Prisma.push_subscriptionsWhereUniqueInput;
};
export type push_subscriptionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    where?: Prisma.push_subscriptionsWhereInput;
    orderBy?: Prisma.push_subscriptionsOrderByWithRelationInput | Prisma.push_subscriptionsOrderByWithRelationInput[];
    cursor?: Prisma.push_subscriptionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Push_subscriptionsScalarFieldEnum | Prisma.Push_subscriptionsScalarFieldEnum[];
};
export type push_subscriptionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    where?: Prisma.push_subscriptionsWhereInput;
    orderBy?: Prisma.push_subscriptionsOrderByWithRelationInput | Prisma.push_subscriptionsOrderByWithRelationInput[];
    cursor?: Prisma.push_subscriptionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Push_subscriptionsScalarFieldEnum | Prisma.Push_subscriptionsScalarFieldEnum[];
};
export type push_subscriptionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    where?: Prisma.push_subscriptionsWhereInput;
    orderBy?: Prisma.push_subscriptionsOrderByWithRelationInput | Prisma.push_subscriptionsOrderByWithRelationInput[];
    cursor?: Prisma.push_subscriptionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Push_subscriptionsScalarFieldEnum | Prisma.Push_subscriptionsScalarFieldEnum[];
};
export type push_subscriptionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.push_subscriptionsCreateInput, Prisma.push_subscriptionsUncheckedCreateInput>;
};
export type push_subscriptionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.push_subscriptionsCreateManyInput | Prisma.push_subscriptionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type push_subscriptionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    data: Prisma.push_subscriptionsCreateManyInput | Prisma.push_subscriptionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type push_subscriptionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.push_subscriptionsUpdateInput, Prisma.push_subscriptionsUncheckedUpdateInput>;
    where: Prisma.push_subscriptionsWhereUniqueInput;
};
export type push_subscriptionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.push_subscriptionsUpdateManyMutationInput, Prisma.push_subscriptionsUncheckedUpdateManyInput>;
    where?: Prisma.push_subscriptionsWhereInput;
    limit?: number;
};
export type push_subscriptionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.push_subscriptionsUpdateManyMutationInput, Prisma.push_subscriptionsUncheckedUpdateManyInput>;
    where?: Prisma.push_subscriptionsWhereInput;
    limit?: number;
};
export type push_subscriptionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    where: Prisma.push_subscriptionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.push_subscriptionsCreateInput, Prisma.push_subscriptionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.push_subscriptionsUpdateInput, Prisma.push_subscriptionsUncheckedUpdateInput>;
};
export type push_subscriptionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
    where: Prisma.push_subscriptionsWhereUniqueInput;
};
export type push_subscriptionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.push_subscriptionsWhereInput;
    limit?: number;
};
export type push_subscriptionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.push_subscriptionsOmit<ExtArgs> | null;
};
