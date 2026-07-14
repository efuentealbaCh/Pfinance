import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type account_typesModel = runtime.Types.Result.DefaultSelection<Prisma.$account_typesPayload>;
export type AggregateAccount_types = {
    _count: Account_typesCountAggregateOutputType | null;
    _min: Account_typesMinAggregateOutputType | null;
    _max: Account_typesMaxAggregateOutputType | null;
};
export type Account_typesMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Account_typesMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Account_typesCountAggregateOutputType = {
    id: number;
    name: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Account_typesMinAggregateInputType = {
    id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
};
export type Account_typesMaxAggregateInputType = {
    id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
};
export type Account_typesCountAggregateInputType = {
    id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Account_typesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.account_typesWhereInput;
    orderBy?: Prisma.account_typesOrderByWithRelationInput | Prisma.account_typesOrderByWithRelationInput[];
    cursor?: Prisma.account_typesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Account_typesCountAggregateInputType;
    _min?: Account_typesMinAggregateInputType;
    _max?: Account_typesMaxAggregateInputType;
};
export type GetAccount_typesAggregateType<T extends Account_typesAggregateArgs> = {
    [P in keyof T & keyof AggregateAccount_types]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAccount_types[P]> : Prisma.GetScalarType<T[P], AggregateAccount_types[P]>;
};
export type account_typesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.account_typesWhereInput;
    orderBy?: Prisma.account_typesOrderByWithAggregationInput | Prisma.account_typesOrderByWithAggregationInput[];
    by: Prisma.Account_typesScalarFieldEnum[] | Prisma.Account_typesScalarFieldEnum;
    having?: Prisma.account_typesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Account_typesCountAggregateInputType | true;
    _min?: Account_typesMinAggregateInputType;
    _max?: Account_typesMaxAggregateInputType;
};
export type Account_typesGroupByOutputType = {
    id: string;
    name: string;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Account_typesCountAggregateOutputType | null;
    _min: Account_typesMinAggregateOutputType | null;
    _max: Account_typesMaxAggregateOutputType | null;
};
export type GetAccount_typesGroupByPayload<T extends account_typesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Account_typesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Account_typesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Account_typesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Account_typesGroupByOutputType[P]>;
}>>;
export type account_typesWhereInput = {
    AND?: Prisma.account_typesWhereInput | Prisma.account_typesWhereInput[];
    OR?: Prisma.account_typesWhereInput[];
    NOT?: Prisma.account_typesWhereInput | Prisma.account_typesWhereInput[];
    id?: Prisma.UuidFilter<"account_types"> | string;
    name?: Prisma.StringFilter<"account_types"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"account_types"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"account_types"> | Date | string | null;
    user_accounts?: Prisma.User_accountsListRelationFilter;
};
export type account_typesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    user_accounts?: Prisma.user_accountsOrderByRelationAggregateInput;
};
export type account_typesWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.account_typesWhereInput | Prisma.account_typesWhereInput[];
    OR?: Prisma.account_typesWhereInput[];
    NOT?: Prisma.account_typesWhereInput | Prisma.account_typesWhereInput[];
    created_at?: Prisma.DateTimeNullableFilter<"account_types"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"account_types"> | Date | string | null;
    user_accounts?: Prisma.User_accountsListRelationFilter;
}, "id" | "name">;
export type account_typesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.account_typesCountOrderByAggregateInput;
    _max?: Prisma.account_typesMaxOrderByAggregateInput;
    _min?: Prisma.account_typesMinOrderByAggregateInput;
};
export type account_typesScalarWhereWithAggregatesInput = {
    AND?: Prisma.account_typesScalarWhereWithAggregatesInput | Prisma.account_typesScalarWhereWithAggregatesInput[];
    OR?: Prisma.account_typesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.account_typesScalarWhereWithAggregatesInput | Prisma.account_typesScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"account_types"> | string;
    name?: Prisma.StringWithAggregatesFilter<"account_types"> | string;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"account_types"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"account_types"> | Date | string | null;
};
export type account_typesCreateInput = {
    id: string;
    name: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutAccount_typesInput;
};
export type account_typesUncheckedCreateInput = {
    id: string;
    name: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutAccount_typesInput;
};
export type account_typesUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutAccount_typesNestedInput;
};
export type account_typesUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutAccount_typesNestedInput;
};
export type account_typesCreateManyInput = {
    id: string;
    name: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type account_typesUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type account_typesUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type account_typesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type account_typesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type account_typesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type Account_typesScalarRelationFilter = {
    is?: Prisma.account_typesWhereInput;
    isNot?: Prisma.account_typesWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type account_typesCreateNestedOneWithoutUser_accountsInput = {
    create?: Prisma.XOR<Prisma.account_typesCreateWithoutUser_accountsInput, Prisma.account_typesUncheckedCreateWithoutUser_accountsInput>;
    connectOrCreate?: Prisma.account_typesCreateOrConnectWithoutUser_accountsInput;
    connect?: Prisma.account_typesWhereUniqueInput;
};
export type account_typesUpdateOneRequiredWithoutUser_accountsNestedInput = {
    create?: Prisma.XOR<Prisma.account_typesCreateWithoutUser_accountsInput, Prisma.account_typesUncheckedCreateWithoutUser_accountsInput>;
    connectOrCreate?: Prisma.account_typesCreateOrConnectWithoutUser_accountsInput;
    upsert?: Prisma.account_typesUpsertWithoutUser_accountsInput;
    connect?: Prisma.account_typesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.account_typesUpdateToOneWithWhereWithoutUser_accountsInput, Prisma.account_typesUpdateWithoutUser_accountsInput>, Prisma.account_typesUncheckedUpdateWithoutUser_accountsInput>;
};
export type account_typesCreateWithoutUser_accountsInput = {
    id: string;
    name: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type account_typesUncheckedCreateWithoutUser_accountsInput = {
    id: string;
    name: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type account_typesCreateOrConnectWithoutUser_accountsInput = {
    where: Prisma.account_typesWhereUniqueInput;
    create: Prisma.XOR<Prisma.account_typesCreateWithoutUser_accountsInput, Prisma.account_typesUncheckedCreateWithoutUser_accountsInput>;
};
export type account_typesUpsertWithoutUser_accountsInput = {
    update: Prisma.XOR<Prisma.account_typesUpdateWithoutUser_accountsInput, Prisma.account_typesUncheckedUpdateWithoutUser_accountsInput>;
    create: Prisma.XOR<Prisma.account_typesCreateWithoutUser_accountsInput, Prisma.account_typesUncheckedCreateWithoutUser_accountsInput>;
    where?: Prisma.account_typesWhereInput;
};
export type account_typesUpdateToOneWithWhereWithoutUser_accountsInput = {
    where?: Prisma.account_typesWhereInput;
    data: Prisma.XOR<Prisma.account_typesUpdateWithoutUser_accountsInput, Prisma.account_typesUncheckedUpdateWithoutUser_accountsInput>;
};
export type account_typesUpdateWithoutUser_accountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type account_typesUncheckedUpdateWithoutUser_accountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Account_typesCountOutputType = {
    user_accounts: number;
};
export type Account_typesCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user_accounts?: boolean | Account_typesCountOutputTypeCountUser_accountsArgs;
};
export type Account_typesCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Account_typesCountOutputTypeSelect<ExtArgs> | null;
};
export type Account_typesCountOutputTypeCountUser_accountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_accountsWhereInput;
};
export type account_typesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    user_accounts?: boolean | Prisma.account_types$user_accountsArgs<ExtArgs>;
    _count?: boolean | Prisma.Account_typesCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["account_types"]>;
export type account_typesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["account_types"]>;
export type account_typesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["account_types"]>;
export type account_typesSelectScalar = {
    id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type account_typesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "created_at" | "updated_at", ExtArgs["result"]["account_types"]>;
export type account_typesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user_accounts?: boolean | Prisma.account_types$user_accountsArgs<ExtArgs>;
    _count?: boolean | Prisma.Account_typesCountOutputTypeDefaultArgs<ExtArgs>;
};
export type account_typesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type account_typesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $account_typesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "account_types";
    objects: {
        user_accounts: Prisma.$user_accountsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["account_types"]>;
    composites: {};
};
export type account_typesGetPayload<S extends boolean | null | undefined | account_typesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$account_typesPayload, S>;
export type account_typesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<account_typesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Account_typesCountAggregateInputType | true;
};
export interface account_typesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['account_types'];
        meta: {
            name: 'account_types';
        };
    };
    findUnique<T extends account_typesFindUniqueArgs>(args: Prisma.SelectSubset<T, account_typesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__account_typesClient<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends account_typesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, account_typesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__account_typesClient<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends account_typesFindFirstArgs>(args?: Prisma.SelectSubset<T, account_typesFindFirstArgs<ExtArgs>>): Prisma.Prisma__account_typesClient<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends account_typesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, account_typesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__account_typesClient<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends account_typesFindManyArgs>(args?: Prisma.SelectSubset<T, account_typesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends account_typesCreateArgs>(args: Prisma.SelectSubset<T, account_typesCreateArgs<ExtArgs>>): Prisma.Prisma__account_typesClient<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends account_typesCreateManyArgs>(args?: Prisma.SelectSubset<T, account_typesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends account_typesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, account_typesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends account_typesDeleteArgs>(args: Prisma.SelectSubset<T, account_typesDeleteArgs<ExtArgs>>): Prisma.Prisma__account_typesClient<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends account_typesUpdateArgs>(args: Prisma.SelectSubset<T, account_typesUpdateArgs<ExtArgs>>): Prisma.Prisma__account_typesClient<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends account_typesDeleteManyArgs>(args?: Prisma.SelectSubset<T, account_typesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends account_typesUpdateManyArgs>(args: Prisma.SelectSubset<T, account_typesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends account_typesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, account_typesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends account_typesUpsertArgs>(args: Prisma.SelectSubset<T, account_typesUpsertArgs<ExtArgs>>): Prisma.Prisma__account_typesClient<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends account_typesCountArgs>(args?: Prisma.Subset<T, account_typesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Account_typesCountAggregateOutputType> : number>;
    aggregate<T extends Account_typesAggregateArgs>(args: Prisma.Subset<T, Account_typesAggregateArgs>): Prisma.PrismaPromise<GetAccount_typesAggregateType<T>>;
    groupBy<T extends account_typesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: account_typesGroupByArgs['orderBy'];
    } : {
        orderBy?: account_typesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, account_typesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccount_typesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: account_typesFieldRefs;
}
export interface Prisma__account_typesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user_accounts<T extends Prisma.account_types$user_accountsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.account_types$user_accountsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface account_typesFieldRefs {
    readonly id: Prisma.FieldRef<"account_types", 'String'>;
    readonly name: Prisma.FieldRef<"account_types", 'String'>;
    readonly created_at: Prisma.FieldRef<"account_types", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"account_types", 'DateTime'>;
}
export type account_typesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelect<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    include?: Prisma.account_typesInclude<ExtArgs> | null;
    where: Prisma.account_typesWhereUniqueInput;
};
export type account_typesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelect<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    include?: Prisma.account_typesInclude<ExtArgs> | null;
    where: Prisma.account_typesWhereUniqueInput;
};
export type account_typesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelect<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    include?: Prisma.account_typesInclude<ExtArgs> | null;
    where?: Prisma.account_typesWhereInput;
    orderBy?: Prisma.account_typesOrderByWithRelationInput | Prisma.account_typesOrderByWithRelationInput[];
    cursor?: Prisma.account_typesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Account_typesScalarFieldEnum | Prisma.Account_typesScalarFieldEnum[];
};
export type account_typesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelect<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    include?: Prisma.account_typesInclude<ExtArgs> | null;
    where?: Prisma.account_typesWhereInput;
    orderBy?: Prisma.account_typesOrderByWithRelationInput | Prisma.account_typesOrderByWithRelationInput[];
    cursor?: Prisma.account_typesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Account_typesScalarFieldEnum | Prisma.Account_typesScalarFieldEnum[];
};
export type account_typesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelect<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    include?: Prisma.account_typesInclude<ExtArgs> | null;
    where?: Prisma.account_typesWhereInput;
    orderBy?: Prisma.account_typesOrderByWithRelationInput | Prisma.account_typesOrderByWithRelationInput[];
    cursor?: Prisma.account_typesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Account_typesScalarFieldEnum | Prisma.Account_typesScalarFieldEnum[];
};
export type account_typesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelect<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    include?: Prisma.account_typesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.account_typesCreateInput, Prisma.account_typesUncheckedCreateInput>;
};
export type account_typesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.account_typesCreateManyInput | Prisma.account_typesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type account_typesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    data: Prisma.account_typesCreateManyInput | Prisma.account_typesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type account_typesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelect<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    include?: Prisma.account_typesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.account_typesUpdateInput, Prisma.account_typesUncheckedUpdateInput>;
    where: Prisma.account_typesWhereUniqueInput;
};
export type account_typesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.account_typesUpdateManyMutationInput, Prisma.account_typesUncheckedUpdateManyInput>;
    where?: Prisma.account_typesWhereInput;
    limit?: number;
};
export type account_typesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.account_typesUpdateManyMutationInput, Prisma.account_typesUncheckedUpdateManyInput>;
    where?: Prisma.account_typesWhereInput;
    limit?: number;
};
export type account_typesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelect<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    include?: Prisma.account_typesInclude<ExtArgs> | null;
    where: Prisma.account_typesWhereUniqueInput;
    create: Prisma.XOR<Prisma.account_typesCreateInput, Prisma.account_typesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.account_typesUpdateInput, Prisma.account_typesUncheckedUpdateInput>;
};
export type account_typesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelect<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    include?: Prisma.account_typesInclude<ExtArgs> | null;
    where: Prisma.account_typesWhereUniqueInput;
};
export type account_typesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.account_typesWhereInput;
    limit?: number;
};
export type account_types$user_accountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type account_typesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.account_typesSelect<ExtArgs> | null;
    omit?: Prisma.account_typesOmit<ExtArgs> | null;
    include?: Prisma.account_typesInclude<ExtArgs> | null;
};
