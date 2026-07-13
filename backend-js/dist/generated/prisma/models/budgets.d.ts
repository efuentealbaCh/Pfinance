import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type budgetsModel = runtime.Types.Result.DefaultSelection<Prisma.$budgetsPayload>;
export type AggregateBudgets = {
    _count: BudgetsCountAggregateOutputType | null;
    _avg: BudgetsAvgAggregateOutputType | null;
    _sum: BudgetsSumAggregateOutputType | null;
    _min: BudgetsMinAggregateOutputType | null;
    _max: BudgetsMaxAggregateOutputType | null;
};
export type BudgetsAvgAggregateOutputType = {
    user_id: number | null;
    amount: runtime.Decimal | null;
};
export type BudgetsSumAggregateOutputType = {
    user_id: bigint | null;
    amount: runtime.Decimal | null;
};
export type BudgetsMinAggregateOutputType = {
    id: string | null;
    user_id: bigint | null;
    category_id: string | null;
    amount: runtime.Decimal | null;
    period: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type BudgetsMaxAggregateOutputType = {
    id: string | null;
    user_id: bigint | null;
    category_id: string | null;
    amount: runtime.Decimal | null;
    period: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type BudgetsCountAggregateOutputType = {
    id: number;
    user_id: number;
    category_id: number;
    amount: number;
    period: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type BudgetsAvgAggregateInputType = {
    user_id?: true;
    amount?: true;
};
export type BudgetsSumAggregateInputType = {
    user_id?: true;
    amount?: true;
};
export type BudgetsMinAggregateInputType = {
    id?: true;
    user_id?: true;
    category_id?: true;
    amount?: true;
    period?: true;
    created_at?: true;
    updated_at?: true;
};
export type BudgetsMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    category_id?: true;
    amount?: true;
    period?: true;
    created_at?: true;
    updated_at?: true;
};
export type BudgetsCountAggregateInputType = {
    id?: true;
    user_id?: true;
    category_id?: true;
    amount?: true;
    period?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type BudgetsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.budgetsWhereInput;
    orderBy?: Prisma.budgetsOrderByWithRelationInput | Prisma.budgetsOrderByWithRelationInput[];
    cursor?: Prisma.budgetsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BudgetsCountAggregateInputType;
    _avg?: BudgetsAvgAggregateInputType;
    _sum?: BudgetsSumAggregateInputType;
    _min?: BudgetsMinAggregateInputType;
    _max?: BudgetsMaxAggregateInputType;
};
export type GetBudgetsAggregateType<T extends BudgetsAggregateArgs> = {
    [P in keyof T & keyof AggregateBudgets]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBudgets[P]> : Prisma.GetScalarType<T[P], AggregateBudgets[P]>;
};
export type budgetsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.budgetsWhereInput;
    orderBy?: Prisma.budgetsOrderByWithAggregationInput | Prisma.budgetsOrderByWithAggregationInput[];
    by: Prisma.BudgetsScalarFieldEnum[] | Prisma.BudgetsScalarFieldEnum;
    having?: Prisma.budgetsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BudgetsCountAggregateInputType | true;
    _avg?: BudgetsAvgAggregateInputType;
    _sum?: BudgetsSumAggregateInputType;
    _min?: BudgetsMinAggregateInputType;
    _max?: BudgetsMaxAggregateInputType;
};
export type BudgetsGroupByOutputType = {
    id: string;
    user_id: bigint;
    category_id: string;
    amount: runtime.Decimal;
    period: string;
    created_at: Date | null;
    updated_at: Date | null;
    _count: BudgetsCountAggregateOutputType | null;
    _avg: BudgetsAvgAggregateOutputType | null;
    _sum: BudgetsSumAggregateOutputType | null;
    _min: BudgetsMinAggregateOutputType | null;
    _max: BudgetsMaxAggregateOutputType | null;
};
export type GetBudgetsGroupByPayload<T extends budgetsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BudgetsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BudgetsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BudgetsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BudgetsGroupByOutputType[P]>;
}>>;
export type budgetsWhereInput = {
    AND?: Prisma.budgetsWhereInput | Prisma.budgetsWhereInput[];
    OR?: Prisma.budgetsWhereInput[];
    NOT?: Prisma.budgetsWhereInput | Prisma.budgetsWhereInput[];
    id?: Prisma.UuidFilter<"budgets"> | string;
    user_id?: Prisma.BigIntFilter<"budgets"> | bigint | number;
    category_id?: Prisma.UuidFilter<"budgets"> | string;
    amount?: Prisma.DecimalFilter<"budgets"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFilter<"budgets"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"budgets"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"budgets"> | Date | string | null;
    categories?: Prisma.XOR<Prisma.CategoriesScalarRelationFilter, Prisma.categoriesWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type budgetsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    categories?: Prisma.categoriesOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type budgetsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    user_id_category_id_period?: Prisma.budgetsUser_idCategory_idPeriodCompoundUniqueInput;
    AND?: Prisma.budgetsWhereInput | Prisma.budgetsWhereInput[];
    OR?: Prisma.budgetsWhereInput[];
    NOT?: Prisma.budgetsWhereInput | Prisma.budgetsWhereInput[];
    user_id?: Prisma.BigIntFilter<"budgets"> | bigint | number;
    category_id?: Prisma.UuidFilter<"budgets"> | string;
    amount?: Prisma.DecimalFilter<"budgets"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFilter<"budgets"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"budgets"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"budgets"> | Date | string | null;
    categories?: Prisma.XOR<Prisma.CategoriesScalarRelationFilter, Prisma.categoriesWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id" | "user_id_category_id_period">;
export type budgetsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.budgetsCountOrderByAggregateInput;
    _avg?: Prisma.budgetsAvgOrderByAggregateInput;
    _max?: Prisma.budgetsMaxOrderByAggregateInput;
    _min?: Prisma.budgetsMinOrderByAggregateInput;
    _sum?: Prisma.budgetsSumOrderByAggregateInput;
};
export type budgetsScalarWhereWithAggregatesInput = {
    AND?: Prisma.budgetsScalarWhereWithAggregatesInput | Prisma.budgetsScalarWhereWithAggregatesInput[];
    OR?: Prisma.budgetsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.budgetsScalarWhereWithAggregatesInput | Prisma.budgetsScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"budgets"> | string;
    user_id?: Prisma.BigIntWithAggregatesFilter<"budgets"> | bigint | number;
    category_id?: Prisma.UuidWithAggregatesFilter<"budgets"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"budgets"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringWithAggregatesFilter<"budgets"> | string;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"budgets"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"budgets"> | Date | string | null;
};
export type budgetsCreateInput = {
    id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    categories: Prisma.categoriesCreateNestedOneWithoutBudgetsInput;
    users: Prisma.usersCreateNestedOneWithoutBudgetsInput;
};
export type budgetsUncheckedCreateInput = {
    id: string;
    user_id: bigint | number;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type budgetsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    categories?: Prisma.categoriesUpdateOneRequiredWithoutBudgetsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutBudgetsNestedInput;
};
export type budgetsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type budgetsCreateManyInput = {
    id: string;
    user_id: bigint | number;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type budgetsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type budgetsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type budgetsUser_idCategory_idPeriodCompoundUniqueInput = {
    user_id: bigint | number;
    category_id: string;
    period: string;
};
export type budgetsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type budgetsAvgOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type budgetsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type budgetsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type budgetsSumOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type BudgetsListRelationFilter = {
    every?: Prisma.budgetsWhereInput;
    some?: Prisma.budgetsWhereInput;
    none?: Prisma.budgetsWhereInput;
};
export type budgetsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type budgetsCreateNestedManyWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.budgetsCreateWithoutCategoriesInput, Prisma.budgetsUncheckedCreateWithoutCategoriesInput> | Prisma.budgetsCreateWithoutCategoriesInput[] | Prisma.budgetsUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.budgetsCreateOrConnectWithoutCategoriesInput | Prisma.budgetsCreateOrConnectWithoutCategoriesInput[];
    createMany?: Prisma.budgetsCreateManyCategoriesInputEnvelope;
    connect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
};
export type budgetsUncheckedCreateNestedManyWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.budgetsCreateWithoutCategoriesInput, Prisma.budgetsUncheckedCreateWithoutCategoriesInput> | Prisma.budgetsCreateWithoutCategoriesInput[] | Prisma.budgetsUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.budgetsCreateOrConnectWithoutCategoriesInput | Prisma.budgetsCreateOrConnectWithoutCategoriesInput[];
    createMany?: Prisma.budgetsCreateManyCategoriesInputEnvelope;
    connect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
};
export type budgetsUpdateManyWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.budgetsCreateWithoutCategoriesInput, Prisma.budgetsUncheckedCreateWithoutCategoriesInput> | Prisma.budgetsCreateWithoutCategoriesInput[] | Prisma.budgetsUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.budgetsCreateOrConnectWithoutCategoriesInput | Prisma.budgetsCreateOrConnectWithoutCategoriesInput[];
    upsert?: Prisma.budgetsUpsertWithWhereUniqueWithoutCategoriesInput | Prisma.budgetsUpsertWithWhereUniqueWithoutCategoriesInput[];
    createMany?: Prisma.budgetsCreateManyCategoriesInputEnvelope;
    set?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    disconnect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    delete?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    connect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    update?: Prisma.budgetsUpdateWithWhereUniqueWithoutCategoriesInput | Prisma.budgetsUpdateWithWhereUniqueWithoutCategoriesInput[];
    updateMany?: Prisma.budgetsUpdateManyWithWhereWithoutCategoriesInput | Prisma.budgetsUpdateManyWithWhereWithoutCategoriesInput[];
    deleteMany?: Prisma.budgetsScalarWhereInput | Prisma.budgetsScalarWhereInput[];
};
export type budgetsUncheckedUpdateManyWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.budgetsCreateWithoutCategoriesInput, Prisma.budgetsUncheckedCreateWithoutCategoriesInput> | Prisma.budgetsCreateWithoutCategoriesInput[] | Prisma.budgetsUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.budgetsCreateOrConnectWithoutCategoriesInput | Prisma.budgetsCreateOrConnectWithoutCategoriesInput[];
    upsert?: Prisma.budgetsUpsertWithWhereUniqueWithoutCategoriesInput | Prisma.budgetsUpsertWithWhereUniqueWithoutCategoriesInput[];
    createMany?: Prisma.budgetsCreateManyCategoriesInputEnvelope;
    set?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    disconnect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    delete?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    connect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    update?: Prisma.budgetsUpdateWithWhereUniqueWithoutCategoriesInput | Prisma.budgetsUpdateWithWhereUniqueWithoutCategoriesInput[];
    updateMany?: Prisma.budgetsUpdateManyWithWhereWithoutCategoriesInput | Prisma.budgetsUpdateManyWithWhereWithoutCategoriesInput[];
    deleteMany?: Prisma.budgetsScalarWhereInput | Prisma.budgetsScalarWhereInput[];
};
export type budgetsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.budgetsCreateWithoutUsersInput, Prisma.budgetsUncheckedCreateWithoutUsersInput> | Prisma.budgetsCreateWithoutUsersInput[] | Prisma.budgetsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.budgetsCreateOrConnectWithoutUsersInput | Prisma.budgetsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.budgetsCreateManyUsersInputEnvelope;
    connect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
};
export type budgetsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.budgetsCreateWithoutUsersInput, Prisma.budgetsUncheckedCreateWithoutUsersInput> | Prisma.budgetsCreateWithoutUsersInput[] | Prisma.budgetsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.budgetsCreateOrConnectWithoutUsersInput | Prisma.budgetsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.budgetsCreateManyUsersInputEnvelope;
    connect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
};
export type budgetsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.budgetsCreateWithoutUsersInput, Prisma.budgetsUncheckedCreateWithoutUsersInput> | Prisma.budgetsCreateWithoutUsersInput[] | Prisma.budgetsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.budgetsCreateOrConnectWithoutUsersInput | Prisma.budgetsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.budgetsUpsertWithWhereUniqueWithoutUsersInput | Prisma.budgetsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.budgetsCreateManyUsersInputEnvelope;
    set?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    disconnect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    delete?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    connect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    update?: Prisma.budgetsUpdateWithWhereUniqueWithoutUsersInput | Prisma.budgetsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.budgetsUpdateManyWithWhereWithoutUsersInput | Prisma.budgetsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.budgetsScalarWhereInput | Prisma.budgetsScalarWhereInput[];
};
export type budgetsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.budgetsCreateWithoutUsersInput, Prisma.budgetsUncheckedCreateWithoutUsersInput> | Prisma.budgetsCreateWithoutUsersInput[] | Prisma.budgetsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.budgetsCreateOrConnectWithoutUsersInput | Prisma.budgetsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.budgetsUpsertWithWhereUniqueWithoutUsersInput | Prisma.budgetsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.budgetsCreateManyUsersInputEnvelope;
    set?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    disconnect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    delete?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    connect?: Prisma.budgetsWhereUniqueInput | Prisma.budgetsWhereUniqueInput[];
    update?: Prisma.budgetsUpdateWithWhereUniqueWithoutUsersInput | Prisma.budgetsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.budgetsUpdateManyWithWhereWithoutUsersInput | Prisma.budgetsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.budgetsScalarWhereInput | Prisma.budgetsScalarWhereInput[];
};
export type budgetsCreateWithoutCategoriesInput = {
    id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    users: Prisma.usersCreateNestedOneWithoutBudgetsInput;
};
export type budgetsUncheckedCreateWithoutCategoriesInput = {
    id: string;
    user_id: bigint | number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type budgetsCreateOrConnectWithoutCategoriesInput = {
    where: Prisma.budgetsWhereUniqueInput;
    create: Prisma.XOR<Prisma.budgetsCreateWithoutCategoriesInput, Prisma.budgetsUncheckedCreateWithoutCategoriesInput>;
};
export type budgetsCreateManyCategoriesInputEnvelope = {
    data: Prisma.budgetsCreateManyCategoriesInput | Prisma.budgetsCreateManyCategoriesInput[];
    skipDuplicates?: boolean;
};
export type budgetsUpsertWithWhereUniqueWithoutCategoriesInput = {
    where: Prisma.budgetsWhereUniqueInput;
    update: Prisma.XOR<Prisma.budgetsUpdateWithoutCategoriesInput, Prisma.budgetsUncheckedUpdateWithoutCategoriesInput>;
    create: Prisma.XOR<Prisma.budgetsCreateWithoutCategoriesInput, Prisma.budgetsUncheckedCreateWithoutCategoriesInput>;
};
export type budgetsUpdateWithWhereUniqueWithoutCategoriesInput = {
    where: Prisma.budgetsWhereUniqueInput;
    data: Prisma.XOR<Prisma.budgetsUpdateWithoutCategoriesInput, Prisma.budgetsUncheckedUpdateWithoutCategoriesInput>;
};
export type budgetsUpdateManyWithWhereWithoutCategoriesInput = {
    where: Prisma.budgetsScalarWhereInput;
    data: Prisma.XOR<Prisma.budgetsUpdateManyMutationInput, Prisma.budgetsUncheckedUpdateManyWithoutCategoriesInput>;
};
export type budgetsScalarWhereInput = {
    AND?: Prisma.budgetsScalarWhereInput | Prisma.budgetsScalarWhereInput[];
    OR?: Prisma.budgetsScalarWhereInput[];
    NOT?: Prisma.budgetsScalarWhereInput | Prisma.budgetsScalarWhereInput[];
    id?: Prisma.UuidFilter<"budgets"> | string;
    user_id?: Prisma.BigIntFilter<"budgets"> | bigint | number;
    category_id?: Prisma.UuidFilter<"budgets"> | string;
    amount?: Prisma.DecimalFilter<"budgets"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFilter<"budgets"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"budgets"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"budgets"> | Date | string | null;
};
export type budgetsCreateWithoutUsersInput = {
    id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    categories: Prisma.categoriesCreateNestedOneWithoutBudgetsInput;
};
export type budgetsUncheckedCreateWithoutUsersInput = {
    id: string;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type budgetsCreateOrConnectWithoutUsersInput = {
    where: Prisma.budgetsWhereUniqueInput;
    create: Prisma.XOR<Prisma.budgetsCreateWithoutUsersInput, Prisma.budgetsUncheckedCreateWithoutUsersInput>;
};
export type budgetsCreateManyUsersInputEnvelope = {
    data: Prisma.budgetsCreateManyUsersInput | Prisma.budgetsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type budgetsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.budgetsWhereUniqueInput;
    update: Prisma.XOR<Prisma.budgetsUpdateWithoutUsersInput, Prisma.budgetsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.budgetsCreateWithoutUsersInput, Prisma.budgetsUncheckedCreateWithoutUsersInput>;
};
export type budgetsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.budgetsWhereUniqueInput;
    data: Prisma.XOR<Prisma.budgetsUpdateWithoutUsersInput, Prisma.budgetsUncheckedUpdateWithoutUsersInput>;
};
export type budgetsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.budgetsScalarWhereInput;
    data: Prisma.XOR<Prisma.budgetsUpdateManyMutationInput, Prisma.budgetsUncheckedUpdateManyWithoutUsersInput>;
};
export type budgetsCreateManyCategoriesInput = {
    id: string;
    user_id: bigint | number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type budgetsUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneRequiredWithoutBudgetsNestedInput;
};
export type budgetsUncheckedUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type budgetsUncheckedUpdateManyWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type budgetsCreateManyUsersInput = {
    id: string;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type budgetsUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    categories?: Prisma.categoriesUpdateOneRequiredWithoutBudgetsNestedInput;
};
export type budgetsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type budgetsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type budgetsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    category_id?: boolean;
    amount?: boolean;
    period?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["budgets"]>;
export type budgetsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    category_id?: boolean;
    amount?: boolean;
    period?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["budgets"]>;
export type budgetsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    category_id?: boolean;
    amount?: boolean;
    period?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["budgets"]>;
export type budgetsSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    category_id?: boolean;
    amount?: boolean;
    period?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type budgetsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "category_id" | "amount" | "period" | "created_at" | "updated_at", ExtArgs["result"]["budgets"]>;
export type budgetsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type budgetsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type budgetsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $budgetsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "budgets";
    objects: {
        categories: Prisma.$categoriesPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        user_id: bigint;
        category_id: string;
        amount: runtime.Decimal;
        period: string;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["budgets"]>;
    composites: {};
};
export type budgetsGetPayload<S extends boolean | null | undefined | budgetsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$budgetsPayload, S>;
export type budgetsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<budgetsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BudgetsCountAggregateInputType | true;
};
export interface budgetsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['budgets'];
        meta: {
            name: 'budgets';
        };
    };
    findUnique<T extends budgetsFindUniqueArgs>(args: Prisma.SelectSubset<T, budgetsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__budgetsClient<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends budgetsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, budgetsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__budgetsClient<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends budgetsFindFirstArgs>(args?: Prisma.SelectSubset<T, budgetsFindFirstArgs<ExtArgs>>): Prisma.Prisma__budgetsClient<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends budgetsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, budgetsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__budgetsClient<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends budgetsFindManyArgs>(args?: Prisma.SelectSubset<T, budgetsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends budgetsCreateArgs>(args: Prisma.SelectSubset<T, budgetsCreateArgs<ExtArgs>>): Prisma.Prisma__budgetsClient<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends budgetsCreateManyArgs>(args?: Prisma.SelectSubset<T, budgetsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends budgetsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, budgetsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends budgetsDeleteArgs>(args: Prisma.SelectSubset<T, budgetsDeleteArgs<ExtArgs>>): Prisma.Prisma__budgetsClient<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends budgetsUpdateArgs>(args: Prisma.SelectSubset<T, budgetsUpdateArgs<ExtArgs>>): Prisma.Prisma__budgetsClient<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends budgetsDeleteManyArgs>(args?: Prisma.SelectSubset<T, budgetsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends budgetsUpdateManyArgs>(args: Prisma.SelectSubset<T, budgetsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends budgetsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, budgetsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends budgetsUpsertArgs>(args: Prisma.SelectSubset<T, budgetsUpsertArgs<ExtArgs>>): Prisma.Prisma__budgetsClient<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends budgetsCountArgs>(args?: Prisma.Subset<T, budgetsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BudgetsCountAggregateOutputType> : number>;
    aggregate<T extends BudgetsAggregateArgs>(args: Prisma.Subset<T, BudgetsAggregateArgs>): Prisma.PrismaPromise<GetBudgetsAggregateType<T>>;
    groupBy<T extends budgetsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: budgetsGroupByArgs['orderBy'];
    } : {
        orderBy?: budgetsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, budgetsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: budgetsFieldRefs;
}
export interface Prisma__budgetsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    categories<T extends Prisma.categoriesDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.categoriesDefaultArgs<ExtArgs>>): Prisma.Prisma__categoriesClient<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface budgetsFieldRefs {
    readonly id: Prisma.FieldRef<"budgets", 'String'>;
    readonly user_id: Prisma.FieldRef<"budgets", 'BigInt'>;
    readonly category_id: Prisma.FieldRef<"budgets", 'String'>;
    readonly amount: Prisma.FieldRef<"budgets", 'Decimal'>;
    readonly period: Prisma.FieldRef<"budgets", 'String'>;
    readonly created_at: Prisma.FieldRef<"budgets", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"budgets", 'DateTime'>;
}
export type budgetsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.budgetsSelect<ExtArgs> | null;
    omit?: Prisma.budgetsOmit<ExtArgs> | null;
    include?: Prisma.budgetsInclude<ExtArgs> | null;
    where: Prisma.budgetsWhereUniqueInput;
};
export type budgetsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.budgetsSelect<ExtArgs> | null;
    omit?: Prisma.budgetsOmit<ExtArgs> | null;
    include?: Prisma.budgetsInclude<ExtArgs> | null;
    where: Prisma.budgetsWhereUniqueInput;
};
export type budgetsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type budgetsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type budgetsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type budgetsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.budgetsSelect<ExtArgs> | null;
    omit?: Prisma.budgetsOmit<ExtArgs> | null;
    include?: Prisma.budgetsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.budgetsCreateInput, Prisma.budgetsUncheckedCreateInput>;
};
export type budgetsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.budgetsCreateManyInput | Prisma.budgetsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type budgetsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.budgetsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.budgetsOmit<ExtArgs> | null;
    data: Prisma.budgetsCreateManyInput | Prisma.budgetsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.budgetsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type budgetsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.budgetsSelect<ExtArgs> | null;
    omit?: Prisma.budgetsOmit<ExtArgs> | null;
    include?: Prisma.budgetsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.budgetsUpdateInput, Prisma.budgetsUncheckedUpdateInput>;
    where: Prisma.budgetsWhereUniqueInput;
};
export type budgetsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.budgetsUpdateManyMutationInput, Prisma.budgetsUncheckedUpdateManyInput>;
    where?: Prisma.budgetsWhereInput;
    limit?: number;
};
export type budgetsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.budgetsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.budgetsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.budgetsUpdateManyMutationInput, Prisma.budgetsUncheckedUpdateManyInput>;
    where?: Prisma.budgetsWhereInput;
    limit?: number;
    include?: Prisma.budgetsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type budgetsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.budgetsSelect<ExtArgs> | null;
    omit?: Prisma.budgetsOmit<ExtArgs> | null;
    include?: Prisma.budgetsInclude<ExtArgs> | null;
    where: Prisma.budgetsWhereUniqueInput;
    create: Prisma.XOR<Prisma.budgetsCreateInput, Prisma.budgetsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.budgetsUpdateInput, Prisma.budgetsUncheckedUpdateInput>;
};
export type budgetsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.budgetsSelect<ExtArgs> | null;
    omit?: Prisma.budgetsOmit<ExtArgs> | null;
    include?: Prisma.budgetsInclude<ExtArgs> | null;
    where: Prisma.budgetsWhereUniqueInput;
};
export type budgetsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.budgetsWhereInput;
    limit?: number;
};
export type budgetsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.budgetsSelect<ExtArgs> | null;
    omit?: Prisma.budgetsOmit<ExtArgs> | null;
    include?: Prisma.budgetsInclude<ExtArgs> | null;
};
