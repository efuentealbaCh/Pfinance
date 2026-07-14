import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type categoriesModel = runtime.Types.Result.DefaultSelection<Prisma.$categoriesPayload>;
export type AggregateCategories = {
    _count: CategoriesCountAggregateOutputType | null;
    _min: CategoriesMinAggregateOutputType | null;
    _max: CategoriesMaxAggregateOutputType | null;
};
export type CategoriesMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    icon: string | null;
    color: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type CategoriesMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    icon: string | null;
    color: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type CategoriesCountAggregateOutputType = {
    id: number;
    name: number;
    icon: number;
    color: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type CategoriesMinAggregateInputType = {
    id?: true;
    name?: true;
    icon?: true;
    color?: true;
    created_at?: true;
    updated_at?: true;
};
export type CategoriesMaxAggregateInputType = {
    id?: true;
    name?: true;
    icon?: true;
    color?: true;
    created_at?: true;
    updated_at?: true;
};
export type CategoriesCountAggregateInputType = {
    id?: true;
    name?: true;
    icon?: true;
    color?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type CategoriesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.categoriesWhereInput;
    orderBy?: Prisma.categoriesOrderByWithRelationInput | Prisma.categoriesOrderByWithRelationInput[];
    cursor?: Prisma.categoriesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CategoriesCountAggregateInputType;
    _min?: CategoriesMinAggregateInputType;
    _max?: CategoriesMaxAggregateInputType;
};
export type GetCategoriesAggregateType<T extends CategoriesAggregateArgs> = {
    [P in keyof T & keyof AggregateCategories]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCategories[P]> : Prisma.GetScalarType<T[P], AggregateCategories[P]>;
};
export type categoriesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.categoriesWhereInput;
    orderBy?: Prisma.categoriesOrderByWithAggregationInput | Prisma.categoriesOrderByWithAggregationInput[];
    by: Prisma.CategoriesScalarFieldEnum[] | Prisma.CategoriesScalarFieldEnum;
    having?: Prisma.categoriesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CategoriesCountAggregateInputType | true;
    _min?: CategoriesMinAggregateInputType;
    _max?: CategoriesMaxAggregateInputType;
};
export type CategoriesGroupByOutputType = {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: CategoriesCountAggregateOutputType | null;
    _min: CategoriesMinAggregateOutputType | null;
    _max: CategoriesMaxAggregateOutputType | null;
};
export type GetCategoriesGroupByPayload<T extends categoriesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CategoriesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CategoriesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CategoriesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CategoriesGroupByOutputType[P]>;
}>>;
export type categoriesWhereInput = {
    AND?: Prisma.categoriesWhereInput | Prisma.categoriesWhereInput[];
    OR?: Prisma.categoriesWhereInput[];
    NOT?: Prisma.categoriesWhereInput | Prisma.categoriesWhereInput[];
    id?: Prisma.UuidFilter<"categories"> | string;
    name?: Prisma.StringFilter<"categories"> | string;
    icon?: Prisma.StringNullableFilter<"categories"> | string | null;
    color?: Prisma.StringNullableFilter<"categories"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"categories"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"categories"> | Date | string | null;
    budgets?: Prisma.BudgetsListRelationFilter;
    transactions?: Prisma.TransactionsListRelationFilter;
};
export type categoriesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    color?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    budgets?: Prisma.budgetsOrderByRelationAggregateInput;
    transactions?: Prisma.transactionsOrderByRelationAggregateInput;
};
export type categoriesWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.categoriesWhereInput | Prisma.categoriesWhereInput[];
    OR?: Prisma.categoriesWhereInput[];
    NOT?: Prisma.categoriesWhereInput | Prisma.categoriesWhereInput[];
    name?: Prisma.StringFilter<"categories"> | string;
    icon?: Prisma.StringNullableFilter<"categories"> | string | null;
    color?: Prisma.StringNullableFilter<"categories"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"categories"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"categories"> | Date | string | null;
    budgets?: Prisma.BudgetsListRelationFilter;
    transactions?: Prisma.TransactionsListRelationFilter;
}, "id">;
export type categoriesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    color?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.categoriesCountOrderByAggregateInput;
    _max?: Prisma.categoriesMaxOrderByAggregateInput;
    _min?: Prisma.categoriesMinOrderByAggregateInput;
};
export type categoriesScalarWhereWithAggregatesInput = {
    AND?: Prisma.categoriesScalarWhereWithAggregatesInput | Prisma.categoriesScalarWhereWithAggregatesInput[];
    OR?: Prisma.categoriesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.categoriesScalarWhereWithAggregatesInput | Prisma.categoriesScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"categories"> | string;
    name?: Prisma.StringWithAggregatesFilter<"categories"> | string;
    icon?: Prisma.StringNullableWithAggregatesFilter<"categories"> | string | null;
    color?: Prisma.StringNullableWithAggregatesFilter<"categories"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"categories"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"categories"> | Date | string | null;
};
export type categoriesCreateInput = {
    id: string;
    name: string;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutCategoriesInput;
    transactions?: Prisma.transactionsCreateNestedManyWithoutCategoriesInput;
};
export type categoriesUncheckedCreateInput = {
    id: string;
    name: string;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutCategoriesInput;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutCategoriesInput;
};
export type categoriesUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutCategoriesNestedInput;
    transactions?: Prisma.transactionsUpdateManyWithoutCategoriesNestedInput;
};
export type categoriesUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutCategoriesNestedInput;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutCategoriesNestedInput;
};
export type categoriesCreateManyInput = {
    id: string;
    name: string;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type categoriesUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type categoriesUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CategoriesScalarRelationFilter = {
    is?: Prisma.categoriesWhereInput;
    isNot?: Prisma.categoriesWhereInput;
};
export type categoriesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type categoriesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type categoriesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type categoriesCreateNestedOneWithoutBudgetsInput = {
    create?: Prisma.XOR<Prisma.categoriesCreateWithoutBudgetsInput, Prisma.categoriesUncheckedCreateWithoutBudgetsInput>;
    connectOrCreate?: Prisma.categoriesCreateOrConnectWithoutBudgetsInput;
    connect?: Prisma.categoriesWhereUniqueInput;
};
export type categoriesUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: Prisma.XOR<Prisma.categoriesCreateWithoutBudgetsInput, Prisma.categoriesUncheckedCreateWithoutBudgetsInput>;
    connectOrCreate?: Prisma.categoriesCreateOrConnectWithoutBudgetsInput;
    upsert?: Prisma.categoriesUpsertWithoutBudgetsInput;
    connect?: Prisma.categoriesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.categoriesUpdateToOneWithWhereWithoutBudgetsInput, Prisma.categoriesUpdateWithoutBudgetsInput>, Prisma.categoriesUncheckedUpdateWithoutBudgetsInput>;
};
export type categoriesCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.categoriesCreateWithoutTransactionsInput, Prisma.categoriesUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.categoriesCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.categoriesWhereUniqueInput;
};
export type categoriesUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.categoriesCreateWithoutTransactionsInput, Prisma.categoriesUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.categoriesCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.categoriesUpsertWithoutTransactionsInput;
    connect?: Prisma.categoriesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.categoriesUpdateToOneWithWhereWithoutTransactionsInput, Prisma.categoriesUpdateWithoutTransactionsInput>, Prisma.categoriesUncheckedUpdateWithoutTransactionsInput>;
};
export type categoriesCreateWithoutBudgetsInput = {
    id: string;
    name: string;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transactions?: Prisma.transactionsCreateNestedManyWithoutCategoriesInput;
};
export type categoriesUncheckedCreateWithoutBudgetsInput = {
    id: string;
    name: string;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutCategoriesInput;
};
export type categoriesCreateOrConnectWithoutBudgetsInput = {
    where: Prisma.categoriesWhereUniqueInput;
    create: Prisma.XOR<Prisma.categoriesCreateWithoutBudgetsInput, Prisma.categoriesUncheckedCreateWithoutBudgetsInput>;
};
export type categoriesUpsertWithoutBudgetsInput = {
    update: Prisma.XOR<Prisma.categoriesUpdateWithoutBudgetsInput, Prisma.categoriesUncheckedUpdateWithoutBudgetsInput>;
    create: Prisma.XOR<Prisma.categoriesCreateWithoutBudgetsInput, Prisma.categoriesUncheckedCreateWithoutBudgetsInput>;
    where?: Prisma.categoriesWhereInput;
};
export type categoriesUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: Prisma.categoriesWhereInput;
    data: Prisma.XOR<Prisma.categoriesUpdateWithoutBudgetsInput, Prisma.categoriesUncheckedUpdateWithoutBudgetsInput>;
};
export type categoriesUpdateWithoutBudgetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transactions?: Prisma.transactionsUpdateManyWithoutCategoriesNestedInput;
};
export type categoriesUncheckedUpdateWithoutBudgetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutCategoriesNestedInput;
};
export type categoriesCreateWithoutTransactionsInput = {
    id: string;
    name: string;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutCategoriesInput;
};
export type categoriesUncheckedCreateWithoutTransactionsInput = {
    id: string;
    name: string;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutCategoriesInput;
};
export type categoriesCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.categoriesWhereUniqueInput;
    create: Prisma.XOR<Prisma.categoriesCreateWithoutTransactionsInput, Prisma.categoriesUncheckedCreateWithoutTransactionsInput>;
};
export type categoriesUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.categoriesUpdateWithoutTransactionsInput, Prisma.categoriesUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.categoriesCreateWithoutTransactionsInput, Prisma.categoriesUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.categoriesWhereInput;
};
export type categoriesUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.categoriesWhereInput;
    data: Prisma.XOR<Prisma.categoriesUpdateWithoutTransactionsInput, Prisma.categoriesUncheckedUpdateWithoutTransactionsInput>;
};
export type categoriesUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutCategoriesNestedInput;
};
export type categoriesUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutCategoriesNestedInput;
};
export type CategoriesCountOutputType = {
    budgets: number;
    transactions: number;
};
export type CategoriesCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    budgets?: boolean | CategoriesCountOutputTypeCountBudgetsArgs;
    transactions?: boolean | CategoriesCountOutputTypeCountTransactionsArgs;
};
export type CategoriesCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoriesCountOutputTypeSelect<ExtArgs> | null;
};
export type CategoriesCountOutputTypeCountBudgetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.budgetsWhereInput;
};
export type CategoriesCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transactionsWhereInput;
};
export type categoriesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    budgets?: boolean | Prisma.categories$budgetsArgs<ExtArgs>;
    transactions?: boolean | Prisma.categories$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.CategoriesCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["categories"]>;
export type categoriesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["categories"]>;
export type categoriesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["categories"]>;
export type categoriesSelectScalar = {
    id?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type categoriesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "icon" | "color" | "created_at" | "updated_at", ExtArgs["result"]["categories"]>;
export type categoriesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    budgets?: boolean | Prisma.categories$budgetsArgs<ExtArgs>;
    transactions?: boolean | Prisma.categories$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.CategoriesCountOutputTypeDefaultArgs<ExtArgs>;
};
export type categoriesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type categoriesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $categoriesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "categories";
    objects: {
        budgets: Prisma.$budgetsPayload<ExtArgs>[];
        transactions: Prisma.$transactionsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        icon: string | null;
        color: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["categories"]>;
    composites: {};
};
export type categoriesGetPayload<S extends boolean | null | undefined | categoriesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$categoriesPayload, S>;
export type categoriesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<categoriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CategoriesCountAggregateInputType | true;
};
export interface categoriesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['categories'];
        meta: {
            name: 'categories';
        };
    };
    findUnique<T extends categoriesFindUniqueArgs>(args: Prisma.SelectSubset<T, categoriesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__categoriesClient<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends categoriesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, categoriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__categoriesClient<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends categoriesFindFirstArgs>(args?: Prisma.SelectSubset<T, categoriesFindFirstArgs<ExtArgs>>): Prisma.Prisma__categoriesClient<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends categoriesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, categoriesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__categoriesClient<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends categoriesFindManyArgs>(args?: Prisma.SelectSubset<T, categoriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends categoriesCreateArgs>(args: Prisma.SelectSubset<T, categoriesCreateArgs<ExtArgs>>): Prisma.Prisma__categoriesClient<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends categoriesCreateManyArgs>(args?: Prisma.SelectSubset<T, categoriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends categoriesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, categoriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends categoriesDeleteArgs>(args: Prisma.SelectSubset<T, categoriesDeleteArgs<ExtArgs>>): Prisma.Prisma__categoriesClient<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends categoriesUpdateArgs>(args: Prisma.SelectSubset<T, categoriesUpdateArgs<ExtArgs>>): Prisma.Prisma__categoriesClient<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends categoriesDeleteManyArgs>(args?: Prisma.SelectSubset<T, categoriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends categoriesUpdateManyArgs>(args: Prisma.SelectSubset<T, categoriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends categoriesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, categoriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends categoriesUpsertArgs>(args: Prisma.SelectSubset<T, categoriesUpsertArgs<ExtArgs>>): Prisma.Prisma__categoriesClient<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends categoriesCountArgs>(args?: Prisma.Subset<T, categoriesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CategoriesCountAggregateOutputType> : number>;
    aggregate<T extends CategoriesAggregateArgs>(args: Prisma.Subset<T, CategoriesAggregateArgs>): Prisma.PrismaPromise<GetCategoriesAggregateType<T>>;
    groupBy<T extends categoriesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: categoriesGroupByArgs['orderBy'];
    } : {
        orderBy?: categoriesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: categoriesFieldRefs;
}
export interface Prisma__categoriesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    budgets<T extends Prisma.categories$budgetsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.categories$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    transactions<T extends Prisma.categories$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.categories$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface categoriesFieldRefs {
    readonly id: Prisma.FieldRef<"categories", 'String'>;
    readonly name: Prisma.FieldRef<"categories", 'String'>;
    readonly icon: Prisma.FieldRef<"categories", 'String'>;
    readonly color: Prisma.FieldRef<"categories", 'String'>;
    readonly created_at: Prisma.FieldRef<"categories", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"categories", 'DateTime'>;
}
export type categoriesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelect<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    include?: Prisma.categoriesInclude<ExtArgs> | null;
    where: Prisma.categoriesWhereUniqueInput;
};
export type categoriesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelect<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    include?: Prisma.categoriesInclude<ExtArgs> | null;
    where: Prisma.categoriesWhereUniqueInput;
};
export type categoriesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelect<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    include?: Prisma.categoriesInclude<ExtArgs> | null;
    where?: Prisma.categoriesWhereInput;
    orderBy?: Prisma.categoriesOrderByWithRelationInput | Prisma.categoriesOrderByWithRelationInput[];
    cursor?: Prisma.categoriesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoriesScalarFieldEnum | Prisma.CategoriesScalarFieldEnum[];
};
export type categoriesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelect<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    include?: Prisma.categoriesInclude<ExtArgs> | null;
    where?: Prisma.categoriesWhereInput;
    orderBy?: Prisma.categoriesOrderByWithRelationInput | Prisma.categoriesOrderByWithRelationInput[];
    cursor?: Prisma.categoriesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoriesScalarFieldEnum | Prisma.CategoriesScalarFieldEnum[];
};
export type categoriesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelect<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    include?: Prisma.categoriesInclude<ExtArgs> | null;
    where?: Prisma.categoriesWhereInput;
    orderBy?: Prisma.categoriesOrderByWithRelationInput | Prisma.categoriesOrderByWithRelationInput[];
    cursor?: Prisma.categoriesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoriesScalarFieldEnum | Prisma.CategoriesScalarFieldEnum[];
};
export type categoriesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelect<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    include?: Prisma.categoriesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.categoriesCreateInput, Prisma.categoriesUncheckedCreateInput>;
};
export type categoriesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.categoriesCreateManyInput | Prisma.categoriesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type categoriesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    data: Prisma.categoriesCreateManyInput | Prisma.categoriesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type categoriesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelect<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    include?: Prisma.categoriesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.categoriesUpdateInput, Prisma.categoriesUncheckedUpdateInput>;
    where: Prisma.categoriesWhereUniqueInput;
};
export type categoriesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.categoriesUpdateManyMutationInput, Prisma.categoriesUncheckedUpdateManyInput>;
    where?: Prisma.categoriesWhereInput;
    limit?: number;
};
export type categoriesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.categoriesUpdateManyMutationInput, Prisma.categoriesUncheckedUpdateManyInput>;
    where?: Prisma.categoriesWhereInput;
    limit?: number;
};
export type categoriesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelect<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    include?: Prisma.categoriesInclude<ExtArgs> | null;
    where: Prisma.categoriesWhereUniqueInput;
    create: Prisma.XOR<Prisma.categoriesCreateInput, Prisma.categoriesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.categoriesUpdateInput, Prisma.categoriesUncheckedUpdateInput>;
};
export type categoriesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelect<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    include?: Prisma.categoriesInclude<ExtArgs> | null;
    where: Prisma.categoriesWhereUniqueInput;
};
export type categoriesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.categoriesWhereInput;
    limit?: number;
};
export type categories$budgetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.budgetsSelect<ExtArgs> | null;
    omit?: Prisma.budgetsOmit<ExtArgs> | null;
    include?: Prisma.budgetsInclude<ExtArgs> | null;
    where?: Prisma.budgetsWhereInput;
    orderBy?: Prisma.budgetsOrderByWithRelationInput | Prisma.budgetsOrderByWithRelationInput[];
    cursor?: Prisma.budgetsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BudgetsScalarFieldEnum | Prisma.BudgetsScalarFieldEnum[];
};
export type categories$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    include?: Prisma.transactionsInclude<ExtArgs> | null;
    where?: Prisma.transactionsWhereInput;
    orderBy?: Prisma.transactionsOrderByWithRelationInput | Prisma.transactionsOrderByWithRelationInput[];
    cursor?: Prisma.transactionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionsScalarFieldEnum | Prisma.TransactionsScalarFieldEnum[];
};
export type categoriesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.categoriesSelect<ExtArgs> | null;
    omit?: Prisma.categoriesOmit<ExtArgs> | null;
    include?: Prisma.categoriesInclude<ExtArgs> | null;
};
