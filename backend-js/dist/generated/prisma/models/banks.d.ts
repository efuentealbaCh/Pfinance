import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type banksModel = runtime.Types.Result.DefaultSelection<Prisma.$banksPayload>;
export type AggregateBanks = {
    _count: BanksCountAggregateOutputType | null;
    _min: BanksMinAggregateOutputType | null;
    _max: BanksMaxAggregateOutputType | null;
};
export type BanksMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    logo: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type BanksMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    logo: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type BanksCountAggregateOutputType = {
    id: number;
    name: number;
    logo: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type BanksMinAggregateInputType = {
    id?: true;
    name?: true;
    logo?: true;
    created_at?: true;
    updated_at?: true;
};
export type BanksMaxAggregateInputType = {
    id?: true;
    name?: true;
    logo?: true;
    created_at?: true;
    updated_at?: true;
};
export type BanksCountAggregateInputType = {
    id?: true;
    name?: true;
    logo?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type BanksAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.banksWhereInput;
    orderBy?: Prisma.banksOrderByWithRelationInput | Prisma.banksOrderByWithRelationInput[];
    cursor?: Prisma.banksWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BanksCountAggregateInputType;
    _min?: BanksMinAggregateInputType;
    _max?: BanksMaxAggregateInputType;
};
export type GetBanksAggregateType<T extends BanksAggregateArgs> = {
    [P in keyof T & keyof AggregateBanks]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBanks[P]> : Prisma.GetScalarType<T[P], AggregateBanks[P]>;
};
export type banksGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.banksWhereInput;
    orderBy?: Prisma.banksOrderByWithAggregationInput | Prisma.banksOrderByWithAggregationInput[];
    by: Prisma.BanksScalarFieldEnum[] | Prisma.BanksScalarFieldEnum;
    having?: Prisma.banksScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BanksCountAggregateInputType | true;
    _min?: BanksMinAggregateInputType;
    _max?: BanksMaxAggregateInputType;
};
export type BanksGroupByOutputType = {
    id: string;
    name: string;
    logo: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: BanksCountAggregateOutputType | null;
    _min: BanksMinAggregateOutputType | null;
    _max: BanksMaxAggregateOutputType | null;
};
export type GetBanksGroupByPayload<T extends banksGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BanksGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BanksGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BanksGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BanksGroupByOutputType[P]>;
}>>;
export type banksWhereInput = {
    AND?: Prisma.banksWhereInput | Prisma.banksWhereInput[];
    OR?: Prisma.banksWhereInput[];
    NOT?: Prisma.banksWhereInput | Prisma.banksWhereInput[];
    id?: Prisma.UuidFilter<"banks"> | string;
    name?: Prisma.StringFilter<"banks"> | string;
    logo?: Prisma.StringNullableFilter<"banks"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"banks"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"banks"> | Date | string | null;
    user_accounts?: Prisma.User_accountsListRelationFilter;
};
export type banksOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    logo?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    user_accounts?: Prisma.user_accountsOrderByRelationAggregateInput;
};
export type banksWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.banksWhereInput | Prisma.banksWhereInput[];
    OR?: Prisma.banksWhereInput[];
    NOT?: Prisma.banksWhereInput | Prisma.banksWhereInput[];
    logo?: Prisma.StringNullableFilter<"banks"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"banks"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"banks"> | Date | string | null;
    user_accounts?: Prisma.User_accountsListRelationFilter;
}, "id" | "name">;
export type banksOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    logo?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.banksCountOrderByAggregateInput;
    _max?: Prisma.banksMaxOrderByAggregateInput;
    _min?: Prisma.banksMinOrderByAggregateInput;
};
export type banksScalarWhereWithAggregatesInput = {
    AND?: Prisma.banksScalarWhereWithAggregatesInput | Prisma.banksScalarWhereWithAggregatesInput[];
    OR?: Prisma.banksScalarWhereWithAggregatesInput[];
    NOT?: Prisma.banksScalarWhereWithAggregatesInput | Prisma.banksScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"banks"> | string;
    name?: Prisma.StringWithAggregatesFilter<"banks"> | string;
    logo?: Prisma.StringNullableWithAggregatesFilter<"banks"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"banks"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"banks"> | Date | string | null;
};
export type banksCreateInput = {
    id: string;
    name: string;
    logo?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutBanksInput;
};
export type banksUncheckedCreateInput = {
    id: string;
    name: string;
    logo?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutBanksInput;
};
export type banksUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutBanksNestedInput;
};
export type banksUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutBanksNestedInput;
};
export type banksCreateManyInput = {
    id: string;
    name: string;
    logo?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type banksUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type banksUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type banksCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type banksMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type banksMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type BanksScalarRelationFilter = {
    is?: Prisma.banksWhereInput;
    isNot?: Prisma.banksWhereInput;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type banksCreateNestedOneWithoutUser_accountsInput = {
    create?: Prisma.XOR<Prisma.banksCreateWithoutUser_accountsInput, Prisma.banksUncheckedCreateWithoutUser_accountsInput>;
    connectOrCreate?: Prisma.banksCreateOrConnectWithoutUser_accountsInput;
    connect?: Prisma.banksWhereUniqueInput;
};
export type banksUpdateOneRequiredWithoutUser_accountsNestedInput = {
    create?: Prisma.XOR<Prisma.banksCreateWithoutUser_accountsInput, Prisma.banksUncheckedCreateWithoutUser_accountsInput>;
    connectOrCreate?: Prisma.banksCreateOrConnectWithoutUser_accountsInput;
    upsert?: Prisma.banksUpsertWithoutUser_accountsInput;
    connect?: Prisma.banksWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.banksUpdateToOneWithWhereWithoutUser_accountsInput, Prisma.banksUpdateWithoutUser_accountsInput>, Prisma.banksUncheckedUpdateWithoutUser_accountsInput>;
};
export type banksCreateWithoutUser_accountsInput = {
    id: string;
    name: string;
    logo?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type banksUncheckedCreateWithoutUser_accountsInput = {
    id: string;
    name: string;
    logo?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type banksCreateOrConnectWithoutUser_accountsInput = {
    where: Prisma.banksWhereUniqueInput;
    create: Prisma.XOR<Prisma.banksCreateWithoutUser_accountsInput, Prisma.banksUncheckedCreateWithoutUser_accountsInput>;
};
export type banksUpsertWithoutUser_accountsInput = {
    update: Prisma.XOR<Prisma.banksUpdateWithoutUser_accountsInput, Prisma.banksUncheckedUpdateWithoutUser_accountsInput>;
    create: Prisma.XOR<Prisma.banksCreateWithoutUser_accountsInput, Prisma.banksUncheckedCreateWithoutUser_accountsInput>;
    where?: Prisma.banksWhereInput;
};
export type banksUpdateToOneWithWhereWithoutUser_accountsInput = {
    where?: Prisma.banksWhereInput;
    data: Prisma.XOR<Prisma.banksUpdateWithoutUser_accountsInput, Prisma.banksUncheckedUpdateWithoutUser_accountsInput>;
};
export type banksUpdateWithoutUser_accountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type banksUncheckedUpdateWithoutUser_accountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BanksCountOutputType = {
    user_accounts: number;
};
export type BanksCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user_accounts?: boolean | BanksCountOutputTypeCountUser_accountsArgs;
};
export type BanksCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BanksCountOutputTypeSelect<ExtArgs> | null;
};
export type BanksCountOutputTypeCountUser_accountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_accountsWhereInput;
};
export type banksSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    logo?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    user_accounts?: boolean | Prisma.banks$user_accountsArgs<ExtArgs>;
    _count?: boolean | Prisma.BanksCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["banks"]>;
export type banksSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    logo?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["banks"]>;
export type banksSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    logo?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["banks"]>;
export type banksSelectScalar = {
    id?: boolean;
    name?: boolean;
    logo?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type banksOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "logo" | "created_at" | "updated_at", ExtArgs["result"]["banks"]>;
export type banksInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user_accounts?: boolean | Prisma.banks$user_accountsArgs<ExtArgs>;
    _count?: boolean | Prisma.BanksCountOutputTypeDefaultArgs<ExtArgs>;
};
export type banksIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type banksIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $banksPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "banks";
    objects: {
        user_accounts: Prisma.$user_accountsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        logo: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["banks"]>;
    composites: {};
};
export type banksGetPayload<S extends boolean | null | undefined | banksDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$banksPayload, S>;
export type banksCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<banksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BanksCountAggregateInputType | true;
};
export interface banksDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['banks'];
        meta: {
            name: 'banks';
        };
    };
    findUnique<T extends banksFindUniqueArgs>(args: Prisma.SelectSubset<T, banksFindUniqueArgs<ExtArgs>>): Prisma.Prisma__banksClient<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends banksFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, banksFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__banksClient<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends banksFindFirstArgs>(args?: Prisma.SelectSubset<T, banksFindFirstArgs<ExtArgs>>): Prisma.Prisma__banksClient<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends banksFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, banksFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__banksClient<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends banksFindManyArgs>(args?: Prisma.SelectSubset<T, banksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends banksCreateArgs>(args: Prisma.SelectSubset<T, banksCreateArgs<ExtArgs>>): Prisma.Prisma__banksClient<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends banksCreateManyArgs>(args?: Prisma.SelectSubset<T, banksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends banksCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, banksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends banksDeleteArgs>(args: Prisma.SelectSubset<T, banksDeleteArgs<ExtArgs>>): Prisma.Prisma__banksClient<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends banksUpdateArgs>(args: Prisma.SelectSubset<T, banksUpdateArgs<ExtArgs>>): Prisma.Prisma__banksClient<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends banksDeleteManyArgs>(args?: Prisma.SelectSubset<T, banksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends banksUpdateManyArgs>(args: Prisma.SelectSubset<T, banksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends banksUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, banksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends banksUpsertArgs>(args: Prisma.SelectSubset<T, banksUpsertArgs<ExtArgs>>): Prisma.Prisma__banksClient<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends banksCountArgs>(args?: Prisma.Subset<T, banksCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BanksCountAggregateOutputType> : number>;
    aggregate<T extends BanksAggregateArgs>(args: Prisma.Subset<T, BanksAggregateArgs>): Prisma.PrismaPromise<GetBanksAggregateType<T>>;
    groupBy<T extends banksGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: banksGroupByArgs['orderBy'];
    } : {
        orderBy?: banksGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, banksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBanksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: banksFieldRefs;
}
export interface Prisma__banksClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user_accounts<T extends Prisma.banks$user_accountsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.banks$user_accountsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface banksFieldRefs {
    readonly id: Prisma.FieldRef<"banks", 'String'>;
    readonly name: Prisma.FieldRef<"banks", 'String'>;
    readonly logo: Prisma.FieldRef<"banks", 'String'>;
    readonly created_at: Prisma.FieldRef<"banks", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"banks", 'DateTime'>;
}
export type banksFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelect<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    include?: Prisma.banksInclude<ExtArgs> | null;
    where: Prisma.banksWhereUniqueInput;
};
export type banksFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelect<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    include?: Prisma.banksInclude<ExtArgs> | null;
    where: Prisma.banksWhereUniqueInput;
};
export type banksFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelect<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    include?: Prisma.banksInclude<ExtArgs> | null;
    where?: Prisma.banksWhereInput;
    orderBy?: Prisma.banksOrderByWithRelationInput | Prisma.banksOrderByWithRelationInput[];
    cursor?: Prisma.banksWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BanksScalarFieldEnum | Prisma.BanksScalarFieldEnum[];
};
export type banksFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelect<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    include?: Prisma.banksInclude<ExtArgs> | null;
    where?: Prisma.banksWhereInput;
    orderBy?: Prisma.banksOrderByWithRelationInput | Prisma.banksOrderByWithRelationInput[];
    cursor?: Prisma.banksWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BanksScalarFieldEnum | Prisma.BanksScalarFieldEnum[];
};
export type banksFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelect<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    include?: Prisma.banksInclude<ExtArgs> | null;
    where?: Prisma.banksWhereInput;
    orderBy?: Prisma.banksOrderByWithRelationInput | Prisma.banksOrderByWithRelationInput[];
    cursor?: Prisma.banksWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BanksScalarFieldEnum | Prisma.BanksScalarFieldEnum[];
};
export type banksCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelect<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    include?: Prisma.banksInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.banksCreateInput, Prisma.banksUncheckedCreateInput>;
};
export type banksCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.banksCreateManyInput | Prisma.banksCreateManyInput[];
    skipDuplicates?: boolean;
};
export type banksCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    data: Prisma.banksCreateManyInput | Prisma.banksCreateManyInput[];
    skipDuplicates?: boolean;
};
export type banksUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelect<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    include?: Prisma.banksInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.banksUpdateInput, Prisma.banksUncheckedUpdateInput>;
    where: Prisma.banksWhereUniqueInput;
};
export type banksUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.banksUpdateManyMutationInput, Prisma.banksUncheckedUpdateManyInput>;
    where?: Prisma.banksWhereInput;
    limit?: number;
};
export type banksUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.banksUpdateManyMutationInput, Prisma.banksUncheckedUpdateManyInput>;
    where?: Prisma.banksWhereInput;
    limit?: number;
};
export type banksUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelect<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    include?: Prisma.banksInclude<ExtArgs> | null;
    where: Prisma.banksWhereUniqueInput;
    create: Prisma.XOR<Prisma.banksCreateInput, Prisma.banksUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.banksUpdateInput, Prisma.banksUncheckedUpdateInput>;
};
export type banksDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelect<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    include?: Prisma.banksInclude<ExtArgs> | null;
    where: Prisma.banksWhereUniqueInput;
};
export type banksDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.banksWhereInput;
    limit?: number;
};
export type banks$user_accountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_accountsSelect<ExtArgs> | null;
    omit?: Prisma.user_accountsOmit<ExtArgs> | null;
    include?: Prisma.user_accountsInclude<ExtArgs> | null;
    where?: Prisma.user_accountsWhereInput;
    orderBy?: Prisma.user_accountsOrderByWithRelationInput | Prisma.user_accountsOrderByWithRelationInput[];
    cursor?: Prisma.user_accountsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.User_accountsScalarFieldEnum | Prisma.User_accountsScalarFieldEnum[];
};
export type banksDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.banksSelect<ExtArgs> | null;
    omit?: Prisma.banksOmit<ExtArgs> | null;
    include?: Prisma.banksInclude<ExtArgs> | null;
};
