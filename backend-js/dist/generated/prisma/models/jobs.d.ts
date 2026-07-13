import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type jobsModel = runtime.Types.Result.DefaultSelection<Prisma.$jobsPayload>;
export type AggregateJobs = {
    _count: JobsCountAggregateOutputType | null;
    _avg: JobsAvgAggregateOutputType | null;
    _sum: JobsSumAggregateOutputType | null;
    _min: JobsMinAggregateOutputType | null;
    _max: JobsMaxAggregateOutputType | null;
};
export type JobsAvgAggregateOutputType = {
    id: number | null;
    attempts: number | null;
    reserved_at: number | null;
    available_at: number | null;
    created_at: number | null;
};
export type JobsSumAggregateOutputType = {
    id: bigint | null;
    attempts: number | null;
    reserved_at: number | null;
    available_at: number | null;
    created_at: number | null;
};
export type JobsMinAggregateOutputType = {
    id: bigint | null;
    queue: string | null;
    payload: string | null;
    attempts: number | null;
    reserved_at: number | null;
    available_at: number | null;
    created_at: number | null;
};
export type JobsMaxAggregateOutputType = {
    id: bigint | null;
    queue: string | null;
    payload: string | null;
    attempts: number | null;
    reserved_at: number | null;
    available_at: number | null;
    created_at: number | null;
};
export type JobsCountAggregateOutputType = {
    id: number;
    queue: number;
    payload: number;
    attempts: number;
    reserved_at: number;
    available_at: number;
    created_at: number;
    _all: number;
};
export type JobsAvgAggregateInputType = {
    id?: true;
    attempts?: true;
    reserved_at?: true;
    available_at?: true;
    created_at?: true;
};
export type JobsSumAggregateInputType = {
    id?: true;
    attempts?: true;
    reserved_at?: true;
    available_at?: true;
    created_at?: true;
};
export type JobsMinAggregateInputType = {
    id?: true;
    queue?: true;
    payload?: true;
    attempts?: true;
    reserved_at?: true;
    available_at?: true;
    created_at?: true;
};
export type JobsMaxAggregateInputType = {
    id?: true;
    queue?: true;
    payload?: true;
    attempts?: true;
    reserved_at?: true;
    available_at?: true;
    created_at?: true;
};
export type JobsCountAggregateInputType = {
    id?: true;
    queue?: true;
    payload?: true;
    attempts?: true;
    reserved_at?: true;
    available_at?: true;
    created_at?: true;
    _all?: true;
};
export type JobsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.jobsWhereInput;
    orderBy?: Prisma.jobsOrderByWithRelationInput | Prisma.jobsOrderByWithRelationInput[];
    cursor?: Prisma.jobsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobsCountAggregateInputType;
    _avg?: JobsAvgAggregateInputType;
    _sum?: JobsSumAggregateInputType;
    _min?: JobsMinAggregateInputType;
    _max?: JobsMaxAggregateInputType;
};
export type GetJobsAggregateType<T extends JobsAggregateArgs> = {
    [P in keyof T & keyof AggregateJobs]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJobs[P]> : Prisma.GetScalarType<T[P], AggregateJobs[P]>;
};
export type jobsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.jobsWhereInput;
    orderBy?: Prisma.jobsOrderByWithAggregationInput | Prisma.jobsOrderByWithAggregationInput[];
    by: Prisma.JobsScalarFieldEnum[] | Prisma.JobsScalarFieldEnum;
    having?: Prisma.jobsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobsCountAggregateInputType | true;
    _avg?: JobsAvgAggregateInputType;
    _sum?: JobsSumAggregateInputType;
    _min?: JobsMinAggregateInputType;
    _max?: JobsMaxAggregateInputType;
};
export type JobsGroupByOutputType = {
    id: bigint;
    queue: string;
    payload: string;
    attempts: number;
    reserved_at: number | null;
    available_at: number;
    created_at: number;
    _count: JobsCountAggregateOutputType | null;
    _avg: JobsAvgAggregateOutputType | null;
    _sum: JobsSumAggregateOutputType | null;
    _min: JobsMinAggregateOutputType | null;
    _max: JobsMaxAggregateOutputType | null;
};
export type GetJobsGroupByPayload<T extends jobsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobsGroupByOutputType[P]>;
}>>;
export type jobsWhereInput = {
    AND?: Prisma.jobsWhereInput | Prisma.jobsWhereInput[];
    OR?: Prisma.jobsWhereInput[];
    NOT?: Prisma.jobsWhereInput | Prisma.jobsWhereInput[];
    id?: Prisma.BigIntFilter<"jobs"> | bigint | number;
    queue?: Prisma.StringFilter<"jobs"> | string;
    payload?: Prisma.StringFilter<"jobs"> | string;
    attempts?: Prisma.IntFilter<"jobs"> | number;
    reserved_at?: Prisma.IntNullableFilter<"jobs"> | number | null;
    available_at?: Prisma.IntFilter<"jobs"> | number;
    created_at?: Prisma.IntFilter<"jobs"> | number;
};
export type jobsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    queue?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    reserved_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    available_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type jobsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.jobsWhereInput | Prisma.jobsWhereInput[];
    OR?: Prisma.jobsWhereInput[];
    NOT?: Prisma.jobsWhereInput | Prisma.jobsWhereInput[];
    queue?: Prisma.StringFilter<"jobs"> | string;
    payload?: Prisma.StringFilter<"jobs"> | string;
    attempts?: Prisma.IntFilter<"jobs"> | number;
    reserved_at?: Prisma.IntNullableFilter<"jobs"> | number | null;
    available_at?: Prisma.IntFilter<"jobs"> | number;
    created_at?: Prisma.IntFilter<"jobs"> | number;
}, "id">;
export type jobsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    queue?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    reserved_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    available_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.jobsCountOrderByAggregateInput;
    _avg?: Prisma.jobsAvgOrderByAggregateInput;
    _max?: Prisma.jobsMaxOrderByAggregateInput;
    _min?: Prisma.jobsMinOrderByAggregateInput;
    _sum?: Prisma.jobsSumOrderByAggregateInput;
};
export type jobsScalarWhereWithAggregatesInput = {
    AND?: Prisma.jobsScalarWhereWithAggregatesInput | Prisma.jobsScalarWhereWithAggregatesInput[];
    OR?: Prisma.jobsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.jobsScalarWhereWithAggregatesInput | Prisma.jobsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"jobs"> | bigint | number;
    queue?: Prisma.StringWithAggregatesFilter<"jobs"> | string;
    payload?: Prisma.StringWithAggregatesFilter<"jobs"> | string;
    attempts?: Prisma.IntWithAggregatesFilter<"jobs"> | number;
    reserved_at?: Prisma.IntNullableWithAggregatesFilter<"jobs"> | number | null;
    available_at?: Prisma.IntWithAggregatesFilter<"jobs"> | number;
    created_at?: Prisma.IntWithAggregatesFilter<"jobs"> | number;
};
export type jobsCreateInput = {
    id?: bigint | number;
    queue: string;
    payload: string;
    attempts: number;
    reserved_at?: number | null;
    available_at: number;
    created_at: number;
};
export type jobsUncheckedCreateInput = {
    id?: bigint | number;
    queue: string;
    payload: string;
    attempts: number;
    reserved_at?: number | null;
    available_at: number;
    created_at: number;
};
export type jobsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    queue?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    reserved_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    available_at?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type jobsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    queue?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    reserved_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    available_at?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type jobsCreateManyInput = {
    id?: bigint | number;
    queue: string;
    payload: string;
    attempts: number;
    reserved_at?: number | null;
    available_at: number;
    created_at: number;
};
export type jobsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    queue?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    reserved_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    available_at?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type jobsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    queue?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    reserved_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    available_at?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type jobsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    queue?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    reserved_at?: Prisma.SortOrder;
    available_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type jobsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    reserved_at?: Prisma.SortOrder;
    available_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type jobsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    queue?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    reserved_at?: Prisma.SortOrder;
    available_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type jobsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    queue?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    reserved_at?: Prisma.SortOrder;
    available_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type jobsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    reserved_at?: Prisma.SortOrder;
    available_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type jobsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    queue?: boolean;
    payload?: boolean;
    attempts?: boolean;
    reserved_at?: boolean;
    available_at?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["jobs"]>;
export type jobsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    queue?: boolean;
    payload?: boolean;
    attempts?: boolean;
    reserved_at?: boolean;
    available_at?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["jobs"]>;
export type jobsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    queue?: boolean;
    payload?: boolean;
    attempts?: boolean;
    reserved_at?: boolean;
    available_at?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["jobs"]>;
export type jobsSelectScalar = {
    id?: boolean;
    queue?: boolean;
    payload?: boolean;
    attempts?: boolean;
    reserved_at?: boolean;
    available_at?: boolean;
    created_at?: boolean;
};
export type jobsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "queue" | "payload" | "attempts" | "reserved_at" | "available_at" | "created_at", ExtArgs["result"]["jobs"]>;
export type $jobsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "jobs";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        queue: string;
        payload: string;
        attempts: number;
        reserved_at: number | null;
        available_at: number;
        created_at: number;
    }, ExtArgs["result"]["jobs"]>;
    composites: {};
};
export type jobsGetPayload<S extends boolean | null | undefined | jobsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$jobsPayload, S>;
export type jobsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<jobsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobsCountAggregateInputType | true;
};
export interface jobsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['jobs'];
        meta: {
            name: 'jobs';
        };
    };
    findUnique<T extends jobsFindUniqueArgs>(args: Prisma.SelectSubset<T, jobsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends jobsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, jobsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends jobsFindFirstArgs>(args?: Prisma.SelectSubset<T, jobsFindFirstArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends jobsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, jobsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends jobsFindManyArgs>(args?: Prisma.SelectSubset<T, jobsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends jobsCreateArgs>(args: Prisma.SelectSubset<T, jobsCreateArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends jobsCreateManyArgs>(args?: Prisma.SelectSubset<T, jobsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends jobsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, jobsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends jobsDeleteArgs>(args: Prisma.SelectSubset<T, jobsDeleteArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends jobsUpdateArgs>(args: Prisma.SelectSubset<T, jobsUpdateArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends jobsDeleteManyArgs>(args?: Prisma.SelectSubset<T, jobsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends jobsUpdateManyArgs>(args: Prisma.SelectSubset<T, jobsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends jobsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, jobsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends jobsUpsertArgs>(args: Prisma.SelectSubset<T, jobsUpsertArgs<ExtArgs>>): Prisma.Prisma__jobsClient<runtime.Types.Result.GetResult<Prisma.$jobsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends jobsCountArgs>(args?: Prisma.Subset<T, jobsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobsCountAggregateOutputType> : number>;
    aggregate<T extends JobsAggregateArgs>(args: Prisma.Subset<T, JobsAggregateArgs>): Prisma.PrismaPromise<GetJobsAggregateType<T>>;
    groupBy<T extends jobsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: jobsGroupByArgs['orderBy'];
    } : {
        orderBy?: jobsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, jobsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: jobsFieldRefs;
}
export interface Prisma__jobsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface jobsFieldRefs {
    readonly id: Prisma.FieldRef<"jobs", 'BigInt'>;
    readonly queue: Prisma.FieldRef<"jobs", 'String'>;
    readonly payload: Prisma.FieldRef<"jobs", 'String'>;
    readonly attempts: Prisma.FieldRef<"jobs", 'Int'>;
    readonly reserved_at: Prisma.FieldRef<"jobs", 'Int'>;
    readonly available_at: Prisma.FieldRef<"jobs", 'Int'>;
    readonly created_at: Prisma.FieldRef<"jobs", 'Int'>;
}
export type jobsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    where: Prisma.jobsWhereUniqueInput;
};
export type jobsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    where: Prisma.jobsWhereUniqueInput;
};
export type jobsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    where?: Prisma.jobsWhereInput;
    orderBy?: Prisma.jobsOrderByWithRelationInput | Prisma.jobsOrderByWithRelationInput[];
    cursor?: Prisma.jobsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobsScalarFieldEnum | Prisma.JobsScalarFieldEnum[];
};
export type jobsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    where?: Prisma.jobsWhereInput;
    orderBy?: Prisma.jobsOrderByWithRelationInput | Prisma.jobsOrderByWithRelationInput[];
    cursor?: Prisma.jobsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobsScalarFieldEnum | Prisma.JobsScalarFieldEnum[];
};
export type jobsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    where?: Prisma.jobsWhereInput;
    orderBy?: Prisma.jobsOrderByWithRelationInput | Prisma.jobsOrderByWithRelationInput[];
    cursor?: Prisma.jobsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobsScalarFieldEnum | Prisma.JobsScalarFieldEnum[];
};
export type jobsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.jobsCreateInput, Prisma.jobsUncheckedCreateInput>;
};
export type jobsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.jobsCreateManyInput | Prisma.jobsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type jobsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    data: Prisma.jobsCreateManyInput | Prisma.jobsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type jobsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.jobsUpdateInput, Prisma.jobsUncheckedUpdateInput>;
    where: Prisma.jobsWhereUniqueInput;
};
export type jobsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.jobsUpdateManyMutationInput, Prisma.jobsUncheckedUpdateManyInput>;
    where?: Prisma.jobsWhereInput;
    limit?: number;
};
export type jobsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.jobsUpdateManyMutationInput, Prisma.jobsUncheckedUpdateManyInput>;
    where?: Prisma.jobsWhereInput;
    limit?: number;
};
export type jobsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    where: Prisma.jobsWhereUniqueInput;
    create: Prisma.XOR<Prisma.jobsCreateInput, Prisma.jobsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.jobsUpdateInput, Prisma.jobsUncheckedUpdateInput>;
};
export type jobsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
    where: Prisma.jobsWhereUniqueInput;
};
export type jobsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.jobsWhereInput;
    limit?: number;
};
export type jobsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.jobsSelect<ExtArgs> | null;
    omit?: Prisma.jobsOmit<ExtArgs> | null;
};
