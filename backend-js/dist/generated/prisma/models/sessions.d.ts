import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type sessionsModel = runtime.Types.Result.DefaultSelection<Prisma.$sessionsPayload>;
export type AggregateSessions = {
    _count: SessionsCountAggregateOutputType | null;
    _avg: SessionsAvgAggregateOutputType | null;
    _sum: SessionsSumAggregateOutputType | null;
    _min: SessionsMinAggregateOutputType | null;
    _max: SessionsMaxAggregateOutputType | null;
};
export type SessionsAvgAggregateOutputType = {
    user_id: number | null;
    last_activity: number | null;
};
export type SessionsSumAggregateOutputType = {
    user_id: bigint | null;
    last_activity: number | null;
};
export type SessionsMinAggregateOutputType = {
    id: string | null;
    user_id: bigint | null;
    ip_address: string | null;
    user_agent: string | null;
    payload: string | null;
    last_activity: number | null;
};
export type SessionsMaxAggregateOutputType = {
    id: string | null;
    user_id: bigint | null;
    ip_address: string | null;
    user_agent: string | null;
    payload: string | null;
    last_activity: number | null;
};
export type SessionsCountAggregateOutputType = {
    id: number;
    user_id: number;
    ip_address: number;
    user_agent: number;
    payload: number;
    last_activity: number;
    _all: number;
};
export type SessionsAvgAggregateInputType = {
    user_id?: true;
    last_activity?: true;
};
export type SessionsSumAggregateInputType = {
    user_id?: true;
    last_activity?: true;
};
export type SessionsMinAggregateInputType = {
    id?: true;
    user_id?: true;
    ip_address?: true;
    user_agent?: true;
    payload?: true;
    last_activity?: true;
};
export type SessionsMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    ip_address?: true;
    user_agent?: true;
    payload?: true;
    last_activity?: true;
};
export type SessionsCountAggregateInputType = {
    id?: true;
    user_id?: true;
    ip_address?: true;
    user_agent?: true;
    payload?: true;
    last_activity?: true;
    _all?: true;
};
export type SessionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.sessionsWhereInput;
    orderBy?: Prisma.sessionsOrderByWithRelationInput | Prisma.sessionsOrderByWithRelationInput[];
    cursor?: Prisma.sessionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SessionsCountAggregateInputType;
    _avg?: SessionsAvgAggregateInputType;
    _sum?: SessionsSumAggregateInputType;
    _min?: SessionsMinAggregateInputType;
    _max?: SessionsMaxAggregateInputType;
};
export type GetSessionsAggregateType<T extends SessionsAggregateArgs> = {
    [P in keyof T & keyof AggregateSessions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSessions[P]> : Prisma.GetScalarType<T[P], AggregateSessions[P]>;
};
export type sessionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.sessionsWhereInput;
    orderBy?: Prisma.sessionsOrderByWithAggregationInput | Prisma.sessionsOrderByWithAggregationInput[];
    by: Prisma.SessionsScalarFieldEnum[] | Prisma.SessionsScalarFieldEnum;
    having?: Prisma.sessionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionsCountAggregateInputType | true;
    _avg?: SessionsAvgAggregateInputType;
    _sum?: SessionsSumAggregateInputType;
    _min?: SessionsMinAggregateInputType;
    _max?: SessionsMaxAggregateInputType;
};
export type SessionsGroupByOutputType = {
    id: string;
    user_id: bigint | null;
    ip_address: string | null;
    user_agent: string | null;
    payload: string;
    last_activity: number;
    _count: SessionsCountAggregateOutputType | null;
    _avg: SessionsAvgAggregateOutputType | null;
    _sum: SessionsSumAggregateOutputType | null;
    _min: SessionsMinAggregateOutputType | null;
    _max: SessionsMaxAggregateOutputType | null;
};
export type GetSessionsGroupByPayload<T extends sessionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SessionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SessionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SessionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SessionsGroupByOutputType[P]>;
}>>;
export type sessionsWhereInput = {
    AND?: Prisma.sessionsWhereInput | Prisma.sessionsWhereInput[];
    OR?: Prisma.sessionsWhereInput[];
    NOT?: Prisma.sessionsWhereInput | Prisma.sessionsWhereInput[];
    id?: Prisma.StringFilter<"sessions"> | string;
    user_id?: Prisma.BigIntNullableFilter<"sessions"> | bigint | number | null;
    ip_address?: Prisma.StringNullableFilter<"sessions"> | string | null;
    user_agent?: Prisma.StringNullableFilter<"sessions"> | string | null;
    payload?: Prisma.StringFilter<"sessions"> | string;
    last_activity?: Prisma.IntFilter<"sessions"> | number;
};
export type sessionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    ip_address?: Prisma.SortOrderInput | Prisma.SortOrder;
    user_agent?: Prisma.SortOrderInput | Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    last_activity?: Prisma.SortOrder;
};
export type sessionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.sessionsWhereInput | Prisma.sessionsWhereInput[];
    OR?: Prisma.sessionsWhereInput[];
    NOT?: Prisma.sessionsWhereInput | Prisma.sessionsWhereInput[];
    user_id?: Prisma.BigIntNullableFilter<"sessions"> | bigint | number | null;
    ip_address?: Prisma.StringNullableFilter<"sessions"> | string | null;
    user_agent?: Prisma.StringNullableFilter<"sessions"> | string | null;
    payload?: Prisma.StringFilter<"sessions"> | string;
    last_activity?: Prisma.IntFilter<"sessions"> | number;
}, "id">;
export type sessionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    ip_address?: Prisma.SortOrderInput | Prisma.SortOrder;
    user_agent?: Prisma.SortOrderInput | Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    last_activity?: Prisma.SortOrder;
    _count?: Prisma.sessionsCountOrderByAggregateInput;
    _avg?: Prisma.sessionsAvgOrderByAggregateInput;
    _max?: Prisma.sessionsMaxOrderByAggregateInput;
    _min?: Prisma.sessionsMinOrderByAggregateInput;
    _sum?: Prisma.sessionsSumOrderByAggregateInput;
};
export type sessionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.sessionsScalarWhereWithAggregatesInput | Prisma.sessionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.sessionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.sessionsScalarWhereWithAggregatesInput | Prisma.sessionsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"sessions"> | string;
    user_id?: Prisma.BigIntNullableWithAggregatesFilter<"sessions"> | bigint | number | null;
    ip_address?: Prisma.StringNullableWithAggregatesFilter<"sessions"> | string | null;
    user_agent?: Prisma.StringNullableWithAggregatesFilter<"sessions"> | string | null;
    payload?: Prisma.StringWithAggregatesFilter<"sessions"> | string;
    last_activity?: Prisma.IntWithAggregatesFilter<"sessions"> | number;
};
export type sessionsCreateInput = {
    id: string;
    user_id?: bigint | number | null;
    ip_address?: string | null;
    user_agent?: string | null;
    payload: string;
    last_activity: number;
};
export type sessionsUncheckedCreateInput = {
    id: string;
    user_id?: bigint | number | null;
    ip_address?: string | null;
    user_agent?: string | null;
    payload: string;
    last_activity: number;
};
export type sessionsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    last_activity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type sessionsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    last_activity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type sessionsCreateManyInput = {
    id: string;
    user_id?: bigint | number | null;
    ip_address?: string | null;
    user_agent?: string | null;
    payload: string;
    last_activity: number;
};
export type sessionsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    last_activity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type sessionsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    last_activity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type sessionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    ip_address?: Prisma.SortOrder;
    user_agent?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    last_activity?: Prisma.SortOrder;
};
export type sessionsAvgOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    last_activity?: Prisma.SortOrder;
};
export type sessionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    ip_address?: Prisma.SortOrder;
    user_agent?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    last_activity?: Prisma.SortOrder;
};
export type sessionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    ip_address?: Prisma.SortOrder;
    user_agent?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    last_activity?: Prisma.SortOrder;
};
export type sessionsSumOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    last_activity?: Prisma.SortOrder;
};
export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type sessionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    ip_address?: boolean;
    user_agent?: boolean;
    payload?: boolean;
    last_activity?: boolean;
}, ExtArgs["result"]["sessions"]>;
export type sessionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    ip_address?: boolean;
    user_agent?: boolean;
    payload?: boolean;
    last_activity?: boolean;
}, ExtArgs["result"]["sessions"]>;
export type sessionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    ip_address?: boolean;
    user_agent?: boolean;
    payload?: boolean;
    last_activity?: boolean;
}, ExtArgs["result"]["sessions"]>;
export type sessionsSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    ip_address?: boolean;
    user_agent?: boolean;
    payload?: boolean;
    last_activity?: boolean;
};
export type sessionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "ip_address" | "user_agent" | "payload" | "last_activity", ExtArgs["result"]["sessions"]>;
export type $sessionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "sessions";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        user_id: bigint | null;
        ip_address: string | null;
        user_agent: string | null;
        payload: string;
        last_activity: number;
    }, ExtArgs["result"]["sessions"]>;
    composites: {};
};
export type sessionsGetPayload<S extends boolean | null | undefined | sessionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$sessionsPayload, S>;
export type sessionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<sessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SessionsCountAggregateInputType | true;
};
export interface sessionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['sessions'];
        meta: {
            name: 'sessions';
        };
    };
    findUnique<T extends sessionsFindUniqueArgs>(args: Prisma.SelectSubset<T, sessionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__sessionsClient<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends sessionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, sessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__sessionsClient<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends sessionsFindFirstArgs>(args?: Prisma.SelectSubset<T, sessionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__sessionsClient<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends sessionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, sessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__sessionsClient<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends sessionsFindManyArgs>(args?: Prisma.SelectSubset<T, sessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends sessionsCreateArgs>(args: Prisma.SelectSubset<T, sessionsCreateArgs<ExtArgs>>): Prisma.Prisma__sessionsClient<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends sessionsCreateManyArgs>(args?: Prisma.SelectSubset<T, sessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends sessionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, sessionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends sessionsDeleteArgs>(args: Prisma.SelectSubset<T, sessionsDeleteArgs<ExtArgs>>): Prisma.Prisma__sessionsClient<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends sessionsUpdateArgs>(args: Prisma.SelectSubset<T, sessionsUpdateArgs<ExtArgs>>): Prisma.Prisma__sessionsClient<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends sessionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, sessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends sessionsUpdateManyArgs>(args: Prisma.SelectSubset<T, sessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends sessionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, sessionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends sessionsUpsertArgs>(args: Prisma.SelectSubset<T, sessionsUpsertArgs<ExtArgs>>): Prisma.Prisma__sessionsClient<runtime.Types.Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends sessionsCountArgs>(args?: Prisma.Subset<T, sessionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SessionsCountAggregateOutputType> : number>;
    aggregate<T extends SessionsAggregateArgs>(args: Prisma.Subset<T, SessionsAggregateArgs>): Prisma.PrismaPromise<GetSessionsAggregateType<T>>;
    groupBy<T extends sessionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: sessionsGroupByArgs['orderBy'];
    } : {
        orderBy?: sessionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, sessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: sessionsFieldRefs;
}
export interface Prisma__sessionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface sessionsFieldRefs {
    readonly id: Prisma.FieldRef<"sessions", 'String'>;
    readonly user_id: Prisma.FieldRef<"sessions", 'BigInt'>;
    readonly ip_address: Prisma.FieldRef<"sessions", 'String'>;
    readonly user_agent: Prisma.FieldRef<"sessions", 'String'>;
    readonly payload: Prisma.FieldRef<"sessions", 'String'>;
    readonly last_activity: Prisma.FieldRef<"sessions", 'Int'>;
}
export type sessionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelect<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    where: Prisma.sessionsWhereUniqueInput;
};
export type sessionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelect<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    where: Prisma.sessionsWhereUniqueInput;
};
export type sessionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelect<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    where?: Prisma.sessionsWhereInput;
    orderBy?: Prisma.sessionsOrderByWithRelationInput | Prisma.sessionsOrderByWithRelationInput[];
    cursor?: Prisma.sessionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionsScalarFieldEnum | Prisma.SessionsScalarFieldEnum[];
};
export type sessionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelect<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    where?: Prisma.sessionsWhereInput;
    orderBy?: Prisma.sessionsOrderByWithRelationInput | Prisma.sessionsOrderByWithRelationInput[];
    cursor?: Prisma.sessionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionsScalarFieldEnum | Prisma.SessionsScalarFieldEnum[];
};
export type sessionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelect<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    where?: Prisma.sessionsWhereInput;
    orderBy?: Prisma.sessionsOrderByWithRelationInput | Prisma.sessionsOrderByWithRelationInput[];
    cursor?: Prisma.sessionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionsScalarFieldEnum | Prisma.SessionsScalarFieldEnum[];
};
export type sessionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelect<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.sessionsCreateInput, Prisma.sessionsUncheckedCreateInput>;
};
export type sessionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.sessionsCreateManyInput | Prisma.sessionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type sessionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    data: Prisma.sessionsCreateManyInput | Prisma.sessionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type sessionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelect<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.sessionsUpdateInput, Prisma.sessionsUncheckedUpdateInput>;
    where: Prisma.sessionsWhereUniqueInput;
};
export type sessionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.sessionsUpdateManyMutationInput, Prisma.sessionsUncheckedUpdateManyInput>;
    where?: Prisma.sessionsWhereInput;
    limit?: number;
};
export type sessionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.sessionsUpdateManyMutationInput, Prisma.sessionsUncheckedUpdateManyInput>;
    where?: Prisma.sessionsWhereInput;
    limit?: number;
};
export type sessionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelect<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    where: Prisma.sessionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.sessionsCreateInput, Prisma.sessionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.sessionsUpdateInput, Prisma.sessionsUncheckedUpdateInput>;
};
export type sessionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelect<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
    where: Prisma.sessionsWhereUniqueInput;
};
export type sessionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.sessionsWhereInput;
    limit?: number;
};
export type sessionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sessionsSelect<ExtArgs> | null;
    omit?: Prisma.sessionsOmit<ExtArgs> | null;
};
