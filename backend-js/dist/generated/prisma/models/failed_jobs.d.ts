import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type failed_jobsModel = runtime.Types.Result.DefaultSelection<Prisma.$failed_jobsPayload>;
export type AggregateFailed_jobs = {
    _count: Failed_jobsCountAggregateOutputType | null;
    _avg: Failed_jobsAvgAggregateOutputType | null;
    _sum: Failed_jobsSumAggregateOutputType | null;
    _min: Failed_jobsMinAggregateOutputType | null;
    _max: Failed_jobsMaxAggregateOutputType | null;
};
export type Failed_jobsAvgAggregateOutputType = {
    id: number | null;
};
export type Failed_jobsSumAggregateOutputType = {
    id: bigint | null;
};
export type Failed_jobsMinAggregateOutputType = {
    id: bigint | null;
    uuid: string | null;
    connection: string | null;
    queue: string | null;
    payload: string | null;
    exception: string | null;
    failed_at: Date | null;
};
export type Failed_jobsMaxAggregateOutputType = {
    id: bigint | null;
    uuid: string | null;
    connection: string | null;
    queue: string | null;
    payload: string | null;
    exception: string | null;
    failed_at: Date | null;
};
export type Failed_jobsCountAggregateOutputType = {
    id: number;
    uuid: number;
    connection: number;
    queue: number;
    payload: number;
    exception: number;
    failed_at: number;
    _all: number;
};
export type Failed_jobsAvgAggregateInputType = {
    id?: true;
};
export type Failed_jobsSumAggregateInputType = {
    id?: true;
};
export type Failed_jobsMinAggregateInputType = {
    id?: true;
    uuid?: true;
    connection?: true;
    queue?: true;
    payload?: true;
    exception?: true;
    failed_at?: true;
};
export type Failed_jobsMaxAggregateInputType = {
    id?: true;
    uuid?: true;
    connection?: true;
    queue?: true;
    payload?: true;
    exception?: true;
    failed_at?: true;
};
export type Failed_jobsCountAggregateInputType = {
    id?: true;
    uuid?: true;
    connection?: true;
    queue?: true;
    payload?: true;
    exception?: true;
    failed_at?: true;
    _all?: true;
};
export type Failed_jobsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.failed_jobsWhereInput;
    orderBy?: Prisma.failed_jobsOrderByWithRelationInput | Prisma.failed_jobsOrderByWithRelationInput[];
    cursor?: Prisma.failed_jobsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Failed_jobsCountAggregateInputType;
    _avg?: Failed_jobsAvgAggregateInputType;
    _sum?: Failed_jobsSumAggregateInputType;
    _min?: Failed_jobsMinAggregateInputType;
    _max?: Failed_jobsMaxAggregateInputType;
};
export type GetFailed_jobsAggregateType<T extends Failed_jobsAggregateArgs> = {
    [P in keyof T & keyof AggregateFailed_jobs]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFailed_jobs[P]> : Prisma.GetScalarType<T[P], AggregateFailed_jobs[P]>;
};
export type failed_jobsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.failed_jobsWhereInput;
    orderBy?: Prisma.failed_jobsOrderByWithAggregationInput | Prisma.failed_jobsOrderByWithAggregationInput[];
    by: Prisma.Failed_jobsScalarFieldEnum[] | Prisma.Failed_jobsScalarFieldEnum;
    having?: Prisma.failed_jobsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Failed_jobsCountAggregateInputType | true;
    _avg?: Failed_jobsAvgAggregateInputType;
    _sum?: Failed_jobsSumAggregateInputType;
    _min?: Failed_jobsMinAggregateInputType;
    _max?: Failed_jobsMaxAggregateInputType;
};
export type Failed_jobsGroupByOutputType = {
    id: bigint;
    uuid: string;
    connection: string;
    queue: string;
    payload: string;
    exception: string;
    failed_at: Date;
    _count: Failed_jobsCountAggregateOutputType | null;
    _avg: Failed_jobsAvgAggregateOutputType | null;
    _sum: Failed_jobsSumAggregateOutputType | null;
    _min: Failed_jobsMinAggregateOutputType | null;
    _max: Failed_jobsMaxAggregateOutputType | null;
};
export type GetFailed_jobsGroupByPayload<T extends failed_jobsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Failed_jobsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Failed_jobsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Failed_jobsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Failed_jobsGroupByOutputType[P]>;
}>>;
export type failed_jobsWhereInput = {
    AND?: Prisma.failed_jobsWhereInput | Prisma.failed_jobsWhereInput[];
    OR?: Prisma.failed_jobsWhereInput[];
    NOT?: Prisma.failed_jobsWhereInput | Prisma.failed_jobsWhereInput[];
    id?: Prisma.BigIntFilter<"failed_jobs"> | bigint | number;
    uuid?: Prisma.StringFilter<"failed_jobs"> | string;
    connection?: Prisma.StringFilter<"failed_jobs"> | string;
    queue?: Prisma.StringFilter<"failed_jobs"> | string;
    payload?: Prisma.StringFilter<"failed_jobs"> | string;
    exception?: Prisma.StringFilter<"failed_jobs"> | string;
    failed_at?: Prisma.DateTimeFilter<"failed_jobs"> | Date | string;
};
export type failed_jobsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    uuid?: Prisma.SortOrder;
    connection?: Prisma.SortOrder;
    queue?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    exception?: Prisma.SortOrder;
    failed_at?: Prisma.SortOrder;
};
export type failed_jobsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    uuid?: string;
    AND?: Prisma.failed_jobsWhereInput | Prisma.failed_jobsWhereInput[];
    OR?: Prisma.failed_jobsWhereInput[];
    NOT?: Prisma.failed_jobsWhereInput | Prisma.failed_jobsWhereInput[];
    connection?: Prisma.StringFilter<"failed_jobs"> | string;
    queue?: Prisma.StringFilter<"failed_jobs"> | string;
    payload?: Prisma.StringFilter<"failed_jobs"> | string;
    exception?: Prisma.StringFilter<"failed_jobs"> | string;
    failed_at?: Prisma.DateTimeFilter<"failed_jobs"> | Date | string;
}, "id" | "uuid">;
export type failed_jobsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    uuid?: Prisma.SortOrder;
    connection?: Prisma.SortOrder;
    queue?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    exception?: Prisma.SortOrder;
    failed_at?: Prisma.SortOrder;
    _count?: Prisma.failed_jobsCountOrderByAggregateInput;
    _avg?: Prisma.failed_jobsAvgOrderByAggregateInput;
    _max?: Prisma.failed_jobsMaxOrderByAggregateInput;
    _min?: Prisma.failed_jobsMinOrderByAggregateInput;
    _sum?: Prisma.failed_jobsSumOrderByAggregateInput;
};
export type failed_jobsScalarWhereWithAggregatesInput = {
    AND?: Prisma.failed_jobsScalarWhereWithAggregatesInput | Prisma.failed_jobsScalarWhereWithAggregatesInput[];
    OR?: Prisma.failed_jobsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.failed_jobsScalarWhereWithAggregatesInput | Prisma.failed_jobsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"failed_jobs"> | bigint | number;
    uuid?: Prisma.StringWithAggregatesFilter<"failed_jobs"> | string;
    connection?: Prisma.StringWithAggregatesFilter<"failed_jobs"> | string;
    queue?: Prisma.StringWithAggregatesFilter<"failed_jobs"> | string;
    payload?: Prisma.StringWithAggregatesFilter<"failed_jobs"> | string;
    exception?: Prisma.StringWithAggregatesFilter<"failed_jobs"> | string;
    failed_at?: Prisma.DateTimeWithAggregatesFilter<"failed_jobs"> | Date | string;
};
export type failed_jobsCreateInput = {
    id?: bigint | number;
    uuid: string;
    connection: string;
    queue: string;
    payload: string;
    exception: string;
    failed_at?: Date | string;
};
export type failed_jobsUncheckedCreateInput = {
    id?: bigint | number;
    uuid: string;
    connection: string;
    queue: string;
    payload: string;
    exception: string;
    failed_at?: Date | string;
};
export type failed_jobsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    uuid?: Prisma.StringFieldUpdateOperationsInput | string;
    connection?: Prisma.StringFieldUpdateOperationsInput | string;
    queue?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    exception?: Prisma.StringFieldUpdateOperationsInput | string;
    failed_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type failed_jobsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    uuid?: Prisma.StringFieldUpdateOperationsInput | string;
    connection?: Prisma.StringFieldUpdateOperationsInput | string;
    queue?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    exception?: Prisma.StringFieldUpdateOperationsInput | string;
    failed_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type failed_jobsCreateManyInput = {
    id?: bigint | number;
    uuid: string;
    connection: string;
    queue: string;
    payload: string;
    exception: string;
    failed_at?: Date | string;
};
export type failed_jobsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    uuid?: Prisma.StringFieldUpdateOperationsInput | string;
    connection?: Prisma.StringFieldUpdateOperationsInput | string;
    queue?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    exception?: Prisma.StringFieldUpdateOperationsInput | string;
    failed_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type failed_jobsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    uuid?: Prisma.StringFieldUpdateOperationsInput | string;
    connection?: Prisma.StringFieldUpdateOperationsInput | string;
    queue?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    exception?: Prisma.StringFieldUpdateOperationsInput | string;
    failed_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type failed_jobsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uuid?: Prisma.SortOrder;
    connection?: Prisma.SortOrder;
    queue?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    exception?: Prisma.SortOrder;
    failed_at?: Prisma.SortOrder;
};
export type failed_jobsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type failed_jobsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uuid?: Prisma.SortOrder;
    connection?: Prisma.SortOrder;
    queue?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    exception?: Prisma.SortOrder;
    failed_at?: Prisma.SortOrder;
};
export type failed_jobsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uuid?: Prisma.SortOrder;
    connection?: Prisma.SortOrder;
    queue?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    exception?: Prisma.SortOrder;
    failed_at?: Prisma.SortOrder;
};
export type failed_jobsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type failed_jobsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    uuid?: boolean;
    connection?: boolean;
    queue?: boolean;
    payload?: boolean;
    exception?: boolean;
    failed_at?: boolean;
}, ExtArgs["result"]["failed_jobs"]>;
export type failed_jobsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    uuid?: boolean;
    connection?: boolean;
    queue?: boolean;
    payload?: boolean;
    exception?: boolean;
    failed_at?: boolean;
}, ExtArgs["result"]["failed_jobs"]>;
export type failed_jobsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    uuid?: boolean;
    connection?: boolean;
    queue?: boolean;
    payload?: boolean;
    exception?: boolean;
    failed_at?: boolean;
}, ExtArgs["result"]["failed_jobs"]>;
export type failed_jobsSelectScalar = {
    id?: boolean;
    uuid?: boolean;
    connection?: boolean;
    queue?: boolean;
    payload?: boolean;
    exception?: boolean;
    failed_at?: boolean;
};
export type failed_jobsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "uuid" | "connection" | "queue" | "payload" | "exception" | "failed_at", ExtArgs["result"]["failed_jobs"]>;
export type $failed_jobsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "failed_jobs";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        uuid: string;
        connection: string;
        queue: string;
        payload: string;
        exception: string;
        failed_at: Date;
    }, ExtArgs["result"]["failed_jobs"]>;
    composites: {};
};
export type failed_jobsGetPayload<S extends boolean | null | undefined | failed_jobsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload, S>;
export type failed_jobsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<failed_jobsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Failed_jobsCountAggregateInputType | true;
};
export interface failed_jobsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['failed_jobs'];
        meta: {
            name: 'failed_jobs';
        };
    };
    findUnique<T extends failed_jobsFindUniqueArgs>(args: Prisma.SelectSubset<T, failed_jobsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__failed_jobsClient<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends failed_jobsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, failed_jobsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__failed_jobsClient<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends failed_jobsFindFirstArgs>(args?: Prisma.SelectSubset<T, failed_jobsFindFirstArgs<ExtArgs>>): Prisma.Prisma__failed_jobsClient<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends failed_jobsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, failed_jobsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__failed_jobsClient<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends failed_jobsFindManyArgs>(args?: Prisma.SelectSubset<T, failed_jobsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends failed_jobsCreateArgs>(args: Prisma.SelectSubset<T, failed_jobsCreateArgs<ExtArgs>>): Prisma.Prisma__failed_jobsClient<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends failed_jobsCreateManyArgs>(args?: Prisma.SelectSubset<T, failed_jobsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends failed_jobsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, failed_jobsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends failed_jobsDeleteArgs>(args: Prisma.SelectSubset<T, failed_jobsDeleteArgs<ExtArgs>>): Prisma.Prisma__failed_jobsClient<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends failed_jobsUpdateArgs>(args: Prisma.SelectSubset<T, failed_jobsUpdateArgs<ExtArgs>>): Prisma.Prisma__failed_jobsClient<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends failed_jobsDeleteManyArgs>(args?: Prisma.SelectSubset<T, failed_jobsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends failed_jobsUpdateManyArgs>(args: Prisma.SelectSubset<T, failed_jobsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends failed_jobsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, failed_jobsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends failed_jobsUpsertArgs>(args: Prisma.SelectSubset<T, failed_jobsUpsertArgs<ExtArgs>>): Prisma.Prisma__failed_jobsClient<runtime.Types.Result.GetResult<Prisma.$failed_jobsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends failed_jobsCountArgs>(args?: Prisma.Subset<T, failed_jobsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Failed_jobsCountAggregateOutputType> : number>;
    aggregate<T extends Failed_jobsAggregateArgs>(args: Prisma.Subset<T, Failed_jobsAggregateArgs>): Prisma.PrismaPromise<GetFailed_jobsAggregateType<T>>;
    groupBy<T extends failed_jobsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: failed_jobsGroupByArgs['orderBy'];
    } : {
        orderBy?: failed_jobsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, failed_jobsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFailed_jobsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: failed_jobsFieldRefs;
}
export interface Prisma__failed_jobsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface failed_jobsFieldRefs {
    readonly id: Prisma.FieldRef<"failed_jobs", 'BigInt'>;
    readonly uuid: Prisma.FieldRef<"failed_jobs", 'String'>;
    readonly connection: Prisma.FieldRef<"failed_jobs", 'String'>;
    readonly queue: Prisma.FieldRef<"failed_jobs", 'String'>;
    readonly payload: Prisma.FieldRef<"failed_jobs", 'String'>;
    readonly exception: Prisma.FieldRef<"failed_jobs", 'String'>;
    readonly failed_at: Prisma.FieldRef<"failed_jobs", 'DateTime'>;
}
export type failed_jobsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelect<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    where: Prisma.failed_jobsWhereUniqueInput;
};
export type failed_jobsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelect<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    where: Prisma.failed_jobsWhereUniqueInput;
};
export type failed_jobsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelect<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    where?: Prisma.failed_jobsWhereInput;
    orderBy?: Prisma.failed_jobsOrderByWithRelationInput | Prisma.failed_jobsOrderByWithRelationInput[];
    cursor?: Prisma.failed_jobsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Failed_jobsScalarFieldEnum | Prisma.Failed_jobsScalarFieldEnum[];
};
export type failed_jobsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelect<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    where?: Prisma.failed_jobsWhereInput;
    orderBy?: Prisma.failed_jobsOrderByWithRelationInput | Prisma.failed_jobsOrderByWithRelationInput[];
    cursor?: Prisma.failed_jobsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Failed_jobsScalarFieldEnum | Prisma.Failed_jobsScalarFieldEnum[];
};
export type failed_jobsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelect<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    where?: Prisma.failed_jobsWhereInput;
    orderBy?: Prisma.failed_jobsOrderByWithRelationInput | Prisma.failed_jobsOrderByWithRelationInput[];
    cursor?: Prisma.failed_jobsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Failed_jobsScalarFieldEnum | Prisma.Failed_jobsScalarFieldEnum[];
};
export type failed_jobsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelect<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.failed_jobsCreateInput, Prisma.failed_jobsUncheckedCreateInput>;
};
export type failed_jobsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.failed_jobsCreateManyInput | Prisma.failed_jobsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type failed_jobsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    data: Prisma.failed_jobsCreateManyInput | Prisma.failed_jobsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type failed_jobsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelect<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.failed_jobsUpdateInput, Prisma.failed_jobsUncheckedUpdateInput>;
    where: Prisma.failed_jobsWhereUniqueInput;
};
export type failed_jobsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.failed_jobsUpdateManyMutationInput, Prisma.failed_jobsUncheckedUpdateManyInput>;
    where?: Prisma.failed_jobsWhereInput;
    limit?: number;
};
export type failed_jobsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.failed_jobsUpdateManyMutationInput, Prisma.failed_jobsUncheckedUpdateManyInput>;
    where?: Prisma.failed_jobsWhereInput;
    limit?: number;
};
export type failed_jobsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelect<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    where: Prisma.failed_jobsWhereUniqueInput;
    create: Prisma.XOR<Prisma.failed_jobsCreateInput, Prisma.failed_jobsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.failed_jobsUpdateInput, Prisma.failed_jobsUncheckedUpdateInput>;
};
export type failed_jobsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelect<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
    where: Prisma.failed_jobsWhereUniqueInput;
};
export type failed_jobsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.failed_jobsWhereInput;
    limit?: number;
};
export type failed_jobsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.failed_jobsSelect<ExtArgs> | null;
    omit?: Prisma.failed_jobsOmit<ExtArgs> | null;
};
