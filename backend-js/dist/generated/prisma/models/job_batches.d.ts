import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type job_batchesModel = runtime.Types.Result.DefaultSelection<Prisma.$job_batchesPayload>;
export type AggregateJob_batches = {
    _count: Job_batchesCountAggregateOutputType | null;
    _avg: Job_batchesAvgAggregateOutputType | null;
    _sum: Job_batchesSumAggregateOutputType | null;
    _min: Job_batchesMinAggregateOutputType | null;
    _max: Job_batchesMaxAggregateOutputType | null;
};
export type Job_batchesAvgAggregateOutputType = {
    total_jobs: number | null;
    pending_jobs: number | null;
    failed_jobs: number | null;
    cancelled_at: number | null;
    created_at: number | null;
    finished_at: number | null;
};
export type Job_batchesSumAggregateOutputType = {
    total_jobs: number | null;
    pending_jobs: number | null;
    failed_jobs: number | null;
    cancelled_at: number | null;
    created_at: number | null;
    finished_at: number | null;
};
export type Job_batchesMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    total_jobs: number | null;
    pending_jobs: number | null;
    failed_jobs: number | null;
    failed_job_ids: string | null;
    options: string | null;
    cancelled_at: number | null;
    created_at: number | null;
    finished_at: number | null;
};
export type Job_batchesMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    total_jobs: number | null;
    pending_jobs: number | null;
    failed_jobs: number | null;
    failed_job_ids: string | null;
    options: string | null;
    cancelled_at: number | null;
    created_at: number | null;
    finished_at: number | null;
};
export type Job_batchesCountAggregateOutputType = {
    id: number;
    name: number;
    total_jobs: number;
    pending_jobs: number;
    failed_jobs: number;
    failed_job_ids: number;
    options: number;
    cancelled_at: number;
    created_at: number;
    finished_at: number;
    _all: number;
};
export type Job_batchesAvgAggregateInputType = {
    total_jobs?: true;
    pending_jobs?: true;
    failed_jobs?: true;
    cancelled_at?: true;
    created_at?: true;
    finished_at?: true;
};
export type Job_batchesSumAggregateInputType = {
    total_jobs?: true;
    pending_jobs?: true;
    failed_jobs?: true;
    cancelled_at?: true;
    created_at?: true;
    finished_at?: true;
};
export type Job_batchesMinAggregateInputType = {
    id?: true;
    name?: true;
    total_jobs?: true;
    pending_jobs?: true;
    failed_jobs?: true;
    failed_job_ids?: true;
    options?: true;
    cancelled_at?: true;
    created_at?: true;
    finished_at?: true;
};
export type Job_batchesMaxAggregateInputType = {
    id?: true;
    name?: true;
    total_jobs?: true;
    pending_jobs?: true;
    failed_jobs?: true;
    failed_job_ids?: true;
    options?: true;
    cancelled_at?: true;
    created_at?: true;
    finished_at?: true;
};
export type Job_batchesCountAggregateInputType = {
    id?: true;
    name?: true;
    total_jobs?: true;
    pending_jobs?: true;
    failed_jobs?: true;
    failed_job_ids?: true;
    options?: true;
    cancelled_at?: true;
    created_at?: true;
    finished_at?: true;
    _all?: true;
};
export type Job_batchesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.job_batchesWhereInput;
    orderBy?: Prisma.job_batchesOrderByWithRelationInput | Prisma.job_batchesOrderByWithRelationInput[];
    cursor?: Prisma.job_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Job_batchesCountAggregateInputType;
    _avg?: Job_batchesAvgAggregateInputType;
    _sum?: Job_batchesSumAggregateInputType;
    _min?: Job_batchesMinAggregateInputType;
    _max?: Job_batchesMaxAggregateInputType;
};
export type GetJob_batchesAggregateType<T extends Job_batchesAggregateArgs> = {
    [P in keyof T & keyof AggregateJob_batches]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJob_batches[P]> : Prisma.GetScalarType<T[P], AggregateJob_batches[P]>;
};
export type job_batchesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.job_batchesWhereInput;
    orderBy?: Prisma.job_batchesOrderByWithAggregationInput | Prisma.job_batchesOrderByWithAggregationInput[];
    by: Prisma.Job_batchesScalarFieldEnum[] | Prisma.Job_batchesScalarFieldEnum;
    having?: Prisma.job_batchesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Job_batchesCountAggregateInputType | true;
    _avg?: Job_batchesAvgAggregateInputType;
    _sum?: Job_batchesSumAggregateInputType;
    _min?: Job_batchesMinAggregateInputType;
    _max?: Job_batchesMaxAggregateInputType;
};
export type Job_batchesGroupByOutputType = {
    id: string;
    name: string;
    total_jobs: number;
    pending_jobs: number;
    failed_jobs: number;
    failed_job_ids: string;
    options: string | null;
    cancelled_at: number | null;
    created_at: number;
    finished_at: number | null;
    _count: Job_batchesCountAggregateOutputType | null;
    _avg: Job_batchesAvgAggregateOutputType | null;
    _sum: Job_batchesSumAggregateOutputType | null;
    _min: Job_batchesMinAggregateOutputType | null;
    _max: Job_batchesMaxAggregateOutputType | null;
};
export type GetJob_batchesGroupByPayload<T extends job_batchesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Job_batchesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Job_batchesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Job_batchesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Job_batchesGroupByOutputType[P]>;
}>>;
export type job_batchesWhereInput = {
    AND?: Prisma.job_batchesWhereInput | Prisma.job_batchesWhereInput[];
    OR?: Prisma.job_batchesWhereInput[];
    NOT?: Prisma.job_batchesWhereInput | Prisma.job_batchesWhereInput[];
    id?: Prisma.StringFilter<"job_batches"> | string;
    name?: Prisma.StringFilter<"job_batches"> | string;
    total_jobs?: Prisma.IntFilter<"job_batches"> | number;
    pending_jobs?: Prisma.IntFilter<"job_batches"> | number;
    failed_jobs?: Prisma.IntFilter<"job_batches"> | number;
    failed_job_ids?: Prisma.StringFilter<"job_batches"> | string;
    options?: Prisma.StringNullableFilter<"job_batches"> | string | null;
    cancelled_at?: Prisma.IntNullableFilter<"job_batches"> | number | null;
    created_at?: Prisma.IntFilter<"job_batches"> | number;
    finished_at?: Prisma.IntNullableFilter<"job_batches"> | number | null;
};
export type job_batchesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    total_jobs?: Prisma.SortOrder;
    pending_jobs?: Prisma.SortOrder;
    failed_jobs?: Prisma.SortOrder;
    failed_job_ids?: Prisma.SortOrder;
    options?: Prisma.SortOrderInput | Prisma.SortOrder;
    cancelled_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    finished_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type job_batchesWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.job_batchesWhereInput | Prisma.job_batchesWhereInput[];
    OR?: Prisma.job_batchesWhereInput[];
    NOT?: Prisma.job_batchesWhereInput | Prisma.job_batchesWhereInput[];
    name?: Prisma.StringFilter<"job_batches"> | string;
    total_jobs?: Prisma.IntFilter<"job_batches"> | number;
    pending_jobs?: Prisma.IntFilter<"job_batches"> | number;
    failed_jobs?: Prisma.IntFilter<"job_batches"> | number;
    failed_job_ids?: Prisma.StringFilter<"job_batches"> | string;
    options?: Prisma.StringNullableFilter<"job_batches"> | string | null;
    cancelled_at?: Prisma.IntNullableFilter<"job_batches"> | number | null;
    created_at?: Prisma.IntFilter<"job_batches"> | number;
    finished_at?: Prisma.IntNullableFilter<"job_batches"> | number | null;
}, "id">;
export type job_batchesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    total_jobs?: Prisma.SortOrder;
    pending_jobs?: Prisma.SortOrder;
    failed_jobs?: Prisma.SortOrder;
    failed_job_ids?: Prisma.SortOrder;
    options?: Prisma.SortOrderInput | Prisma.SortOrder;
    cancelled_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    finished_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.job_batchesCountOrderByAggregateInput;
    _avg?: Prisma.job_batchesAvgOrderByAggregateInput;
    _max?: Prisma.job_batchesMaxOrderByAggregateInput;
    _min?: Prisma.job_batchesMinOrderByAggregateInput;
    _sum?: Prisma.job_batchesSumOrderByAggregateInput;
};
export type job_batchesScalarWhereWithAggregatesInput = {
    AND?: Prisma.job_batchesScalarWhereWithAggregatesInput | Prisma.job_batchesScalarWhereWithAggregatesInput[];
    OR?: Prisma.job_batchesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.job_batchesScalarWhereWithAggregatesInput | Prisma.job_batchesScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"job_batches"> | string;
    name?: Prisma.StringWithAggregatesFilter<"job_batches"> | string;
    total_jobs?: Prisma.IntWithAggregatesFilter<"job_batches"> | number;
    pending_jobs?: Prisma.IntWithAggregatesFilter<"job_batches"> | number;
    failed_jobs?: Prisma.IntWithAggregatesFilter<"job_batches"> | number;
    failed_job_ids?: Prisma.StringWithAggregatesFilter<"job_batches"> | string;
    options?: Prisma.StringNullableWithAggregatesFilter<"job_batches"> | string | null;
    cancelled_at?: Prisma.IntNullableWithAggregatesFilter<"job_batches"> | number | null;
    created_at?: Prisma.IntWithAggregatesFilter<"job_batches"> | number;
    finished_at?: Prisma.IntNullableWithAggregatesFilter<"job_batches"> | number | null;
};
export type job_batchesCreateInput = {
    id: string;
    name: string;
    total_jobs: number;
    pending_jobs: number;
    failed_jobs: number;
    failed_job_ids: string;
    options?: string | null;
    cancelled_at?: number | null;
    created_at: number;
    finished_at?: number | null;
};
export type job_batchesUncheckedCreateInput = {
    id: string;
    name: string;
    total_jobs: number;
    pending_jobs: number;
    failed_jobs: number;
    failed_job_ids: string;
    options?: string | null;
    cancelled_at?: number | null;
    created_at: number;
    finished_at?: number | null;
};
export type job_batchesUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    total_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    pending_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    failed_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    failed_job_ids?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelled_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.IntFieldUpdateOperationsInput | number;
    finished_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type job_batchesUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    total_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    pending_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    failed_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    failed_job_ids?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelled_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.IntFieldUpdateOperationsInput | number;
    finished_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type job_batchesCreateManyInput = {
    id: string;
    name: string;
    total_jobs: number;
    pending_jobs: number;
    failed_jobs: number;
    failed_job_ids: string;
    options?: string | null;
    cancelled_at?: number | null;
    created_at: number;
    finished_at?: number | null;
};
export type job_batchesUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    total_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    pending_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    failed_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    failed_job_ids?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelled_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.IntFieldUpdateOperationsInput | number;
    finished_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type job_batchesUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    total_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    pending_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    failed_jobs?: Prisma.IntFieldUpdateOperationsInput | number;
    failed_job_ids?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelled_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.IntFieldUpdateOperationsInput | number;
    finished_at?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type job_batchesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    total_jobs?: Prisma.SortOrder;
    pending_jobs?: Prisma.SortOrder;
    failed_jobs?: Prisma.SortOrder;
    failed_job_ids?: Prisma.SortOrder;
    options?: Prisma.SortOrder;
    cancelled_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    finished_at?: Prisma.SortOrder;
};
export type job_batchesAvgOrderByAggregateInput = {
    total_jobs?: Prisma.SortOrder;
    pending_jobs?: Prisma.SortOrder;
    failed_jobs?: Prisma.SortOrder;
    cancelled_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    finished_at?: Prisma.SortOrder;
};
export type job_batchesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    total_jobs?: Prisma.SortOrder;
    pending_jobs?: Prisma.SortOrder;
    failed_jobs?: Prisma.SortOrder;
    failed_job_ids?: Prisma.SortOrder;
    options?: Prisma.SortOrder;
    cancelled_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    finished_at?: Prisma.SortOrder;
};
export type job_batchesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    total_jobs?: Prisma.SortOrder;
    pending_jobs?: Prisma.SortOrder;
    failed_jobs?: Prisma.SortOrder;
    failed_job_ids?: Prisma.SortOrder;
    options?: Prisma.SortOrder;
    cancelled_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    finished_at?: Prisma.SortOrder;
};
export type job_batchesSumOrderByAggregateInput = {
    total_jobs?: Prisma.SortOrder;
    pending_jobs?: Prisma.SortOrder;
    failed_jobs?: Prisma.SortOrder;
    cancelled_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    finished_at?: Prisma.SortOrder;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type job_batchesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    total_jobs?: boolean;
    pending_jobs?: boolean;
    failed_jobs?: boolean;
    failed_job_ids?: boolean;
    options?: boolean;
    cancelled_at?: boolean;
    created_at?: boolean;
    finished_at?: boolean;
}, ExtArgs["result"]["job_batches"]>;
export type job_batchesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    total_jobs?: boolean;
    pending_jobs?: boolean;
    failed_jobs?: boolean;
    failed_job_ids?: boolean;
    options?: boolean;
    cancelled_at?: boolean;
    created_at?: boolean;
    finished_at?: boolean;
}, ExtArgs["result"]["job_batches"]>;
export type job_batchesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    total_jobs?: boolean;
    pending_jobs?: boolean;
    failed_jobs?: boolean;
    failed_job_ids?: boolean;
    options?: boolean;
    cancelled_at?: boolean;
    created_at?: boolean;
    finished_at?: boolean;
}, ExtArgs["result"]["job_batches"]>;
export type job_batchesSelectScalar = {
    id?: boolean;
    name?: boolean;
    total_jobs?: boolean;
    pending_jobs?: boolean;
    failed_jobs?: boolean;
    failed_job_ids?: boolean;
    options?: boolean;
    cancelled_at?: boolean;
    created_at?: boolean;
    finished_at?: boolean;
};
export type job_batchesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "total_jobs" | "pending_jobs" | "failed_jobs" | "failed_job_ids" | "options" | "cancelled_at" | "created_at" | "finished_at", ExtArgs["result"]["job_batches"]>;
export type $job_batchesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "job_batches";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        total_jobs: number;
        pending_jobs: number;
        failed_jobs: number;
        failed_job_ids: string;
        options: string | null;
        cancelled_at: number | null;
        created_at: number;
        finished_at: number | null;
    }, ExtArgs["result"]["job_batches"]>;
    composites: {};
};
export type job_batchesGetPayload<S extends boolean | null | undefined | job_batchesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$job_batchesPayload, S>;
export type job_batchesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<job_batchesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Job_batchesCountAggregateInputType | true;
};
export interface job_batchesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['job_batches'];
        meta: {
            name: 'job_batches';
        };
    };
    findUnique<T extends job_batchesFindUniqueArgs>(args: Prisma.SelectSubset<T, job_batchesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__job_batchesClient<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends job_batchesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, job_batchesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__job_batchesClient<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends job_batchesFindFirstArgs>(args?: Prisma.SelectSubset<T, job_batchesFindFirstArgs<ExtArgs>>): Prisma.Prisma__job_batchesClient<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends job_batchesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, job_batchesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__job_batchesClient<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends job_batchesFindManyArgs>(args?: Prisma.SelectSubset<T, job_batchesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends job_batchesCreateArgs>(args: Prisma.SelectSubset<T, job_batchesCreateArgs<ExtArgs>>): Prisma.Prisma__job_batchesClient<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends job_batchesCreateManyArgs>(args?: Prisma.SelectSubset<T, job_batchesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends job_batchesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, job_batchesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends job_batchesDeleteArgs>(args: Prisma.SelectSubset<T, job_batchesDeleteArgs<ExtArgs>>): Prisma.Prisma__job_batchesClient<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends job_batchesUpdateArgs>(args: Prisma.SelectSubset<T, job_batchesUpdateArgs<ExtArgs>>): Prisma.Prisma__job_batchesClient<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends job_batchesDeleteManyArgs>(args?: Prisma.SelectSubset<T, job_batchesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends job_batchesUpdateManyArgs>(args: Prisma.SelectSubset<T, job_batchesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends job_batchesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, job_batchesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends job_batchesUpsertArgs>(args: Prisma.SelectSubset<T, job_batchesUpsertArgs<ExtArgs>>): Prisma.Prisma__job_batchesClient<runtime.Types.Result.GetResult<Prisma.$job_batchesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends job_batchesCountArgs>(args?: Prisma.Subset<T, job_batchesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Job_batchesCountAggregateOutputType> : number>;
    aggregate<T extends Job_batchesAggregateArgs>(args: Prisma.Subset<T, Job_batchesAggregateArgs>): Prisma.PrismaPromise<GetJob_batchesAggregateType<T>>;
    groupBy<T extends job_batchesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: job_batchesGroupByArgs['orderBy'];
    } : {
        orderBy?: job_batchesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, job_batchesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJob_batchesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: job_batchesFieldRefs;
}
export interface Prisma__job_batchesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface job_batchesFieldRefs {
    readonly id: Prisma.FieldRef<"job_batches", 'String'>;
    readonly name: Prisma.FieldRef<"job_batches", 'String'>;
    readonly total_jobs: Prisma.FieldRef<"job_batches", 'Int'>;
    readonly pending_jobs: Prisma.FieldRef<"job_batches", 'Int'>;
    readonly failed_jobs: Prisma.FieldRef<"job_batches", 'Int'>;
    readonly failed_job_ids: Prisma.FieldRef<"job_batches", 'String'>;
    readonly options: Prisma.FieldRef<"job_batches", 'String'>;
    readonly cancelled_at: Prisma.FieldRef<"job_batches", 'Int'>;
    readonly created_at: Prisma.FieldRef<"job_batches", 'Int'>;
    readonly finished_at: Prisma.FieldRef<"job_batches", 'Int'>;
}
export type job_batchesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelect<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    where: Prisma.job_batchesWhereUniqueInput;
};
export type job_batchesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelect<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    where: Prisma.job_batchesWhereUniqueInput;
};
export type job_batchesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelect<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    where?: Prisma.job_batchesWhereInput;
    orderBy?: Prisma.job_batchesOrderByWithRelationInput | Prisma.job_batchesOrderByWithRelationInput[];
    cursor?: Prisma.job_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Job_batchesScalarFieldEnum | Prisma.Job_batchesScalarFieldEnum[];
};
export type job_batchesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelect<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    where?: Prisma.job_batchesWhereInput;
    orderBy?: Prisma.job_batchesOrderByWithRelationInput | Prisma.job_batchesOrderByWithRelationInput[];
    cursor?: Prisma.job_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Job_batchesScalarFieldEnum | Prisma.Job_batchesScalarFieldEnum[];
};
export type job_batchesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelect<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    where?: Prisma.job_batchesWhereInput;
    orderBy?: Prisma.job_batchesOrderByWithRelationInput | Prisma.job_batchesOrderByWithRelationInput[];
    cursor?: Prisma.job_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Job_batchesScalarFieldEnum | Prisma.Job_batchesScalarFieldEnum[];
};
export type job_batchesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelect<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.job_batchesCreateInput, Prisma.job_batchesUncheckedCreateInput>;
};
export type job_batchesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.job_batchesCreateManyInput | Prisma.job_batchesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type job_batchesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    data: Prisma.job_batchesCreateManyInput | Prisma.job_batchesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type job_batchesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelect<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.job_batchesUpdateInput, Prisma.job_batchesUncheckedUpdateInput>;
    where: Prisma.job_batchesWhereUniqueInput;
};
export type job_batchesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.job_batchesUpdateManyMutationInput, Prisma.job_batchesUncheckedUpdateManyInput>;
    where?: Prisma.job_batchesWhereInput;
    limit?: number;
};
export type job_batchesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.job_batchesUpdateManyMutationInput, Prisma.job_batchesUncheckedUpdateManyInput>;
    where?: Prisma.job_batchesWhereInput;
    limit?: number;
};
export type job_batchesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelect<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    where: Prisma.job_batchesWhereUniqueInput;
    create: Prisma.XOR<Prisma.job_batchesCreateInput, Prisma.job_batchesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.job_batchesUpdateInput, Prisma.job_batchesUncheckedUpdateInput>;
};
export type job_batchesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelect<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
    where: Prisma.job_batchesWhereUniqueInput;
};
export type job_batchesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.job_batchesWhereInput;
    limit?: number;
};
export type job_batchesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.job_batchesSelect<ExtArgs> | null;
    omit?: Prisma.job_batchesOmit<ExtArgs> | null;
};
