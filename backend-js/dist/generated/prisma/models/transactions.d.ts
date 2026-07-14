import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type transactionsModel = runtime.Types.Result.DefaultSelection<Prisma.$transactionsPayload>;
export type AggregateTransactions = {
    _count: TransactionsCountAggregateOutputType | null;
    _avg: TransactionsAvgAggregateOutputType | null;
    _sum: TransactionsSumAggregateOutputType | null;
    _min: TransactionsMinAggregateOutputType | null;
    _max: TransactionsMaxAggregateOutputType | null;
};
export type TransactionsAvgAggregateOutputType = {
    user_id: number | null;
    amount: runtime.Decimal | null;
};
export type TransactionsSumAggregateOutputType = {
    user_id: bigint | null;
    amount: runtime.Decimal | null;
};
export type TransactionsMinAggregateOutputType = {
    id: string | null;
    user_id: bigint | null;
    user_account_id: string | null;
    category_id: string | null;
    amount: runtime.Decimal | null;
    description: string | null;
    date: Date | null;
    type: string | null;
    is_shared: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type TransactionsMaxAggregateOutputType = {
    id: string | null;
    user_id: bigint | null;
    user_account_id: string | null;
    category_id: string | null;
    amount: runtime.Decimal | null;
    description: string | null;
    date: Date | null;
    type: string | null;
    is_shared: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type TransactionsCountAggregateOutputType = {
    id: number;
    user_id: number;
    user_account_id: number;
    category_id: number;
    amount: number;
    description: number;
    date: number;
    type: number;
    is_shared: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type TransactionsAvgAggregateInputType = {
    user_id?: true;
    amount?: true;
};
export type TransactionsSumAggregateInputType = {
    user_id?: true;
    amount?: true;
};
export type TransactionsMinAggregateInputType = {
    id?: true;
    user_id?: true;
    user_account_id?: true;
    category_id?: true;
    amount?: true;
    description?: true;
    date?: true;
    type?: true;
    is_shared?: true;
    created_at?: true;
    updated_at?: true;
};
export type TransactionsMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    user_account_id?: true;
    category_id?: true;
    amount?: true;
    description?: true;
    date?: true;
    type?: true;
    is_shared?: true;
    created_at?: true;
    updated_at?: true;
};
export type TransactionsCountAggregateInputType = {
    id?: true;
    user_id?: true;
    user_account_id?: true;
    category_id?: true;
    amount?: true;
    description?: true;
    date?: true;
    type?: true;
    is_shared?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type TransactionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transactionsWhereInput;
    orderBy?: Prisma.transactionsOrderByWithRelationInput | Prisma.transactionsOrderByWithRelationInput[];
    cursor?: Prisma.transactionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TransactionsCountAggregateInputType;
    _avg?: TransactionsAvgAggregateInputType;
    _sum?: TransactionsSumAggregateInputType;
    _min?: TransactionsMinAggregateInputType;
    _max?: TransactionsMaxAggregateInputType;
};
export type GetTransactionsAggregateType<T extends TransactionsAggregateArgs> = {
    [P in keyof T & keyof AggregateTransactions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTransactions[P]> : Prisma.GetScalarType<T[P], AggregateTransactions[P]>;
};
export type transactionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transactionsWhereInput;
    orderBy?: Prisma.transactionsOrderByWithAggregationInput | Prisma.transactionsOrderByWithAggregationInput[];
    by: Prisma.TransactionsScalarFieldEnum[] | Prisma.TransactionsScalarFieldEnum;
    having?: Prisma.transactionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TransactionsCountAggregateInputType | true;
    _avg?: TransactionsAvgAggregateInputType;
    _sum?: TransactionsSumAggregateInputType;
    _min?: TransactionsMinAggregateInputType;
    _max?: TransactionsMaxAggregateInputType;
};
export type TransactionsGroupByOutputType = {
    id: string;
    user_id: bigint;
    user_account_id: string;
    category_id: string;
    amount: runtime.Decimal;
    description: string | null;
    date: Date;
    type: string;
    is_shared: boolean;
    created_at: Date | null;
    updated_at: Date | null;
    _count: TransactionsCountAggregateOutputType | null;
    _avg: TransactionsAvgAggregateOutputType | null;
    _sum: TransactionsSumAggregateOutputType | null;
    _min: TransactionsMinAggregateOutputType | null;
    _max: TransactionsMaxAggregateOutputType | null;
};
export type GetTransactionsGroupByPayload<T extends transactionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TransactionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TransactionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TransactionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TransactionsGroupByOutputType[P]>;
}>>;
export type transactionsWhereInput = {
    AND?: Prisma.transactionsWhereInput | Prisma.transactionsWhereInput[];
    OR?: Prisma.transactionsWhereInput[];
    NOT?: Prisma.transactionsWhereInput | Prisma.transactionsWhereInput[];
    id?: Prisma.UuidFilter<"transactions"> | string;
    user_id?: Prisma.BigIntFilter<"transactions"> | bigint | number;
    user_account_id?: Prisma.UuidFilter<"transactions"> | string;
    category_id?: Prisma.UuidFilter<"transactions"> | string;
    amount?: Prisma.DecimalFilter<"transactions"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.StringNullableFilter<"transactions"> | string | null;
    date?: Prisma.DateTimeFilter<"transactions"> | Date | string;
    type?: Prisma.StringFilter<"transactions"> | string;
    is_shared?: Prisma.BoolFilter<"transactions"> | boolean;
    created_at?: Prisma.DateTimeNullableFilter<"transactions"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"transactions"> | Date | string | null;
    transaction_logs?: Prisma.Transaction_logsListRelationFilter;
    categories?: Prisma.XOR<Prisma.CategoriesScalarRelationFilter, Prisma.categoriesWhereInput>;
    user_accounts?: Prisma.XOR<Prisma.User_accountsScalarRelationFilter, Prisma.user_accountsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type transactionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    user_account_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    date?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    is_shared?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    transaction_logs?: Prisma.transaction_logsOrderByRelationAggregateInput;
    categories?: Prisma.categoriesOrderByWithRelationInput;
    user_accounts?: Prisma.user_accountsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type transactionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.transactionsWhereInput | Prisma.transactionsWhereInput[];
    OR?: Prisma.transactionsWhereInput[];
    NOT?: Prisma.transactionsWhereInput | Prisma.transactionsWhereInput[];
    user_id?: Prisma.BigIntFilter<"transactions"> | bigint | number;
    user_account_id?: Prisma.UuidFilter<"transactions"> | string;
    category_id?: Prisma.UuidFilter<"transactions"> | string;
    amount?: Prisma.DecimalFilter<"transactions"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.StringNullableFilter<"transactions"> | string | null;
    date?: Prisma.DateTimeFilter<"transactions"> | Date | string;
    type?: Prisma.StringFilter<"transactions"> | string;
    is_shared?: Prisma.BoolFilter<"transactions"> | boolean;
    created_at?: Prisma.DateTimeNullableFilter<"transactions"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"transactions"> | Date | string | null;
    transaction_logs?: Prisma.Transaction_logsListRelationFilter;
    categories?: Prisma.XOR<Prisma.CategoriesScalarRelationFilter, Prisma.categoriesWhereInput>;
    user_accounts?: Prisma.XOR<Prisma.User_accountsScalarRelationFilter, Prisma.user_accountsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type transactionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    user_account_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    date?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    is_shared?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.transactionsCountOrderByAggregateInput;
    _avg?: Prisma.transactionsAvgOrderByAggregateInput;
    _max?: Prisma.transactionsMaxOrderByAggregateInput;
    _min?: Prisma.transactionsMinOrderByAggregateInput;
    _sum?: Prisma.transactionsSumOrderByAggregateInput;
};
export type transactionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.transactionsScalarWhereWithAggregatesInput | Prisma.transactionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.transactionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.transactionsScalarWhereWithAggregatesInput | Prisma.transactionsScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"transactions"> | string;
    user_id?: Prisma.BigIntWithAggregatesFilter<"transactions"> | bigint | number;
    user_account_id?: Prisma.UuidWithAggregatesFilter<"transactions"> | string;
    category_id?: Prisma.UuidWithAggregatesFilter<"transactions"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"transactions"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"transactions"> | string | null;
    date?: Prisma.DateTimeWithAggregatesFilter<"transactions"> | Date | string;
    type?: Prisma.StringWithAggregatesFilter<"transactions"> | string;
    is_shared?: Prisma.BoolWithAggregatesFilter<"transactions"> | boolean;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"transactions"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"transactions"> | Date | string | null;
};
export type transactionsCreateInput = {
    id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutTransactionsInput;
    categories: Prisma.categoriesCreateNestedOneWithoutTransactionsInput;
    user_accounts: Prisma.user_accountsCreateNestedOneWithoutTransactionsInput;
    users: Prisma.usersCreateNestedOneWithoutTransactionsInput;
};
export type transactionsUncheckedCreateInput = {
    id: string;
    user_id: bigint | number;
    user_account_id: string;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutTransactionsInput;
};
export type transactionsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutTransactionsNestedInput;
    categories?: Prisma.categoriesUpdateOneRequiredWithoutTransactionsNestedInput;
    user_accounts?: Prisma.user_accountsUpdateOneRequiredWithoutTransactionsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type transactionsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_account_id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutTransactionsNestedInput;
};
export type transactionsCreateManyInput = {
    id: string;
    user_id: bigint | number;
    user_account_id: string;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type transactionsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type transactionsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_account_id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TransactionsListRelationFilter = {
    every?: Prisma.transactionsWhereInput;
    some?: Prisma.transactionsWhereInput;
    none?: Prisma.transactionsWhereInput;
};
export type transactionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TransactionsScalarRelationFilter = {
    is?: Prisma.transactionsWhereInput;
    isNot?: Prisma.transactionsWhereInput;
};
export type transactionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    user_account_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    is_shared?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type transactionsAvgOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type transactionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    user_account_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    is_shared?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type transactionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    user_account_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    is_shared?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type transactionsSumOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type transactionsCreateNestedManyWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutCategoriesInput, Prisma.transactionsUncheckedCreateWithoutCategoriesInput> | Prisma.transactionsCreateWithoutCategoriesInput[] | Prisma.transactionsUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutCategoriesInput | Prisma.transactionsCreateOrConnectWithoutCategoriesInput[];
    createMany?: Prisma.transactionsCreateManyCategoriesInputEnvelope;
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
};
export type transactionsUncheckedCreateNestedManyWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutCategoriesInput, Prisma.transactionsUncheckedCreateWithoutCategoriesInput> | Prisma.transactionsCreateWithoutCategoriesInput[] | Prisma.transactionsUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutCategoriesInput | Prisma.transactionsCreateOrConnectWithoutCategoriesInput[];
    createMany?: Prisma.transactionsCreateManyCategoriesInputEnvelope;
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
};
export type transactionsUpdateManyWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutCategoriesInput, Prisma.transactionsUncheckedCreateWithoutCategoriesInput> | Prisma.transactionsCreateWithoutCategoriesInput[] | Prisma.transactionsUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutCategoriesInput | Prisma.transactionsCreateOrConnectWithoutCategoriesInput[];
    upsert?: Prisma.transactionsUpsertWithWhereUniqueWithoutCategoriesInput | Prisma.transactionsUpsertWithWhereUniqueWithoutCategoriesInput[];
    createMany?: Prisma.transactionsCreateManyCategoriesInputEnvelope;
    set?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    disconnect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    delete?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    update?: Prisma.transactionsUpdateWithWhereUniqueWithoutCategoriesInput | Prisma.transactionsUpdateWithWhereUniqueWithoutCategoriesInput[];
    updateMany?: Prisma.transactionsUpdateManyWithWhereWithoutCategoriesInput | Prisma.transactionsUpdateManyWithWhereWithoutCategoriesInput[];
    deleteMany?: Prisma.transactionsScalarWhereInput | Prisma.transactionsScalarWhereInput[];
};
export type transactionsUncheckedUpdateManyWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutCategoriesInput, Prisma.transactionsUncheckedCreateWithoutCategoriesInput> | Prisma.transactionsCreateWithoutCategoriesInput[] | Prisma.transactionsUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutCategoriesInput | Prisma.transactionsCreateOrConnectWithoutCategoriesInput[];
    upsert?: Prisma.transactionsUpsertWithWhereUniqueWithoutCategoriesInput | Prisma.transactionsUpsertWithWhereUniqueWithoutCategoriesInput[];
    createMany?: Prisma.transactionsCreateManyCategoriesInputEnvelope;
    set?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    disconnect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    delete?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    update?: Prisma.transactionsUpdateWithWhereUniqueWithoutCategoriesInput | Prisma.transactionsUpdateWithWhereUniqueWithoutCategoriesInput[];
    updateMany?: Prisma.transactionsUpdateManyWithWhereWithoutCategoriesInput | Prisma.transactionsUpdateManyWithWhereWithoutCategoriesInput[];
    deleteMany?: Prisma.transactionsScalarWhereInput | Prisma.transactionsScalarWhereInput[];
};
export type transactionsCreateNestedOneWithoutTransaction_logsInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutTransaction_logsInput, Prisma.transactionsUncheckedCreateWithoutTransaction_logsInput>;
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutTransaction_logsInput;
    connect?: Prisma.transactionsWhereUniqueInput;
};
export type transactionsUpdateOneRequiredWithoutTransaction_logsNestedInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutTransaction_logsInput, Prisma.transactionsUncheckedCreateWithoutTransaction_logsInput>;
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutTransaction_logsInput;
    upsert?: Prisma.transactionsUpsertWithoutTransaction_logsInput;
    connect?: Prisma.transactionsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.transactionsUpdateToOneWithWhereWithoutTransaction_logsInput, Prisma.transactionsUpdateWithoutTransaction_logsInput>, Prisma.transactionsUncheckedUpdateWithoutTransaction_logsInput>;
};
export type transactionsCreateNestedManyWithoutUser_accountsInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutUser_accountsInput, Prisma.transactionsUncheckedCreateWithoutUser_accountsInput> | Prisma.transactionsCreateWithoutUser_accountsInput[] | Prisma.transactionsUncheckedCreateWithoutUser_accountsInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutUser_accountsInput | Prisma.transactionsCreateOrConnectWithoutUser_accountsInput[];
    createMany?: Prisma.transactionsCreateManyUser_accountsInputEnvelope;
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
};
export type transactionsUncheckedCreateNestedManyWithoutUser_accountsInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutUser_accountsInput, Prisma.transactionsUncheckedCreateWithoutUser_accountsInput> | Prisma.transactionsCreateWithoutUser_accountsInput[] | Prisma.transactionsUncheckedCreateWithoutUser_accountsInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutUser_accountsInput | Prisma.transactionsCreateOrConnectWithoutUser_accountsInput[];
    createMany?: Prisma.transactionsCreateManyUser_accountsInputEnvelope;
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
};
export type transactionsUpdateManyWithoutUser_accountsNestedInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutUser_accountsInput, Prisma.transactionsUncheckedCreateWithoutUser_accountsInput> | Prisma.transactionsCreateWithoutUser_accountsInput[] | Prisma.transactionsUncheckedCreateWithoutUser_accountsInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutUser_accountsInput | Prisma.transactionsCreateOrConnectWithoutUser_accountsInput[];
    upsert?: Prisma.transactionsUpsertWithWhereUniqueWithoutUser_accountsInput | Prisma.transactionsUpsertWithWhereUniqueWithoutUser_accountsInput[];
    createMany?: Prisma.transactionsCreateManyUser_accountsInputEnvelope;
    set?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    disconnect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    delete?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    update?: Prisma.transactionsUpdateWithWhereUniqueWithoutUser_accountsInput | Prisma.transactionsUpdateWithWhereUniqueWithoutUser_accountsInput[];
    updateMany?: Prisma.transactionsUpdateManyWithWhereWithoutUser_accountsInput | Prisma.transactionsUpdateManyWithWhereWithoutUser_accountsInput[];
    deleteMany?: Prisma.transactionsScalarWhereInput | Prisma.transactionsScalarWhereInput[];
};
export type transactionsUncheckedUpdateManyWithoutUser_accountsNestedInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutUser_accountsInput, Prisma.transactionsUncheckedCreateWithoutUser_accountsInput> | Prisma.transactionsCreateWithoutUser_accountsInput[] | Prisma.transactionsUncheckedCreateWithoutUser_accountsInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutUser_accountsInput | Prisma.transactionsCreateOrConnectWithoutUser_accountsInput[];
    upsert?: Prisma.transactionsUpsertWithWhereUniqueWithoutUser_accountsInput | Prisma.transactionsUpsertWithWhereUniqueWithoutUser_accountsInput[];
    createMany?: Prisma.transactionsCreateManyUser_accountsInputEnvelope;
    set?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    disconnect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    delete?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    update?: Prisma.transactionsUpdateWithWhereUniqueWithoutUser_accountsInput | Prisma.transactionsUpdateWithWhereUniqueWithoutUser_accountsInput[];
    updateMany?: Prisma.transactionsUpdateManyWithWhereWithoutUser_accountsInput | Prisma.transactionsUpdateManyWithWhereWithoutUser_accountsInput[];
    deleteMany?: Prisma.transactionsScalarWhereInput | Prisma.transactionsScalarWhereInput[];
};
export type transactionsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutUsersInput, Prisma.transactionsUncheckedCreateWithoutUsersInput> | Prisma.transactionsCreateWithoutUsersInput[] | Prisma.transactionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutUsersInput | Prisma.transactionsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.transactionsCreateManyUsersInputEnvelope;
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
};
export type transactionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutUsersInput, Prisma.transactionsUncheckedCreateWithoutUsersInput> | Prisma.transactionsCreateWithoutUsersInput[] | Prisma.transactionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutUsersInput | Prisma.transactionsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.transactionsCreateManyUsersInputEnvelope;
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
};
export type transactionsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutUsersInput, Prisma.transactionsUncheckedCreateWithoutUsersInput> | Prisma.transactionsCreateWithoutUsersInput[] | Prisma.transactionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutUsersInput | Prisma.transactionsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.transactionsUpsertWithWhereUniqueWithoutUsersInput | Prisma.transactionsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.transactionsCreateManyUsersInputEnvelope;
    set?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    disconnect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    delete?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    update?: Prisma.transactionsUpdateWithWhereUniqueWithoutUsersInput | Prisma.transactionsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.transactionsUpdateManyWithWhereWithoutUsersInput | Prisma.transactionsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.transactionsScalarWhereInput | Prisma.transactionsScalarWhereInput[];
};
export type transactionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.transactionsCreateWithoutUsersInput, Prisma.transactionsUncheckedCreateWithoutUsersInput> | Prisma.transactionsCreateWithoutUsersInput[] | Prisma.transactionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.transactionsCreateOrConnectWithoutUsersInput | Prisma.transactionsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.transactionsUpsertWithWhereUniqueWithoutUsersInput | Prisma.transactionsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.transactionsCreateManyUsersInputEnvelope;
    set?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    disconnect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    delete?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    connect?: Prisma.transactionsWhereUniqueInput | Prisma.transactionsWhereUniqueInput[];
    update?: Prisma.transactionsUpdateWithWhereUniqueWithoutUsersInput | Prisma.transactionsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.transactionsUpdateManyWithWhereWithoutUsersInput | Prisma.transactionsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.transactionsScalarWhereInput | Prisma.transactionsScalarWhereInput[];
};
export type transactionsCreateWithoutCategoriesInput = {
    id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutTransactionsInput;
    user_accounts: Prisma.user_accountsCreateNestedOneWithoutTransactionsInput;
    users: Prisma.usersCreateNestedOneWithoutTransactionsInput;
};
export type transactionsUncheckedCreateWithoutCategoriesInput = {
    id: string;
    user_id: bigint | number;
    user_account_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutTransactionsInput;
};
export type transactionsCreateOrConnectWithoutCategoriesInput = {
    where: Prisma.transactionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.transactionsCreateWithoutCategoriesInput, Prisma.transactionsUncheckedCreateWithoutCategoriesInput>;
};
export type transactionsCreateManyCategoriesInputEnvelope = {
    data: Prisma.transactionsCreateManyCategoriesInput | Prisma.transactionsCreateManyCategoriesInput[];
    skipDuplicates?: boolean;
};
export type transactionsUpsertWithWhereUniqueWithoutCategoriesInput = {
    where: Prisma.transactionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.transactionsUpdateWithoutCategoriesInput, Prisma.transactionsUncheckedUpdateWithoutCategoriesInput>;
    create: Prisma.XOR<Prisma.transactionsCreateWithoutCategoriesInput, Prisma.transactionsUncheckedCreateWithoutCategoriesInput>;
};
export type transactionsUpdateWithWhereUniqueWithoutCategoriesInput = {
    where: Prisma.transactionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.transactionsUpdateWithoutCategoriesInput, Prisma.transactionsUncheckedUpdateWithoutCategoriesInput>;
};
export type transactionsUpdateManyWithWhereWithoutCategoriesInput = {
    where: Prisma.transactionsScalarWhereInput;
    data: Prisma.XOR<Prisma.transactionsUpdateManyMutationInput, Prisma.transactionsUncheckedUpdateManyWithoutCategoriesInput>;
};
export type transactionsScalarWhereInput = {
    AND?: Prisma.transactionsScalarWhereInput | Prisma.transactionsScalarWhereInput[];
    OR?: Prisma.transactionsScalarWhereInput[];
    NOT?: Prisma.transactionsScalarWhereInput | Prisma.transactionsScalarWhereInput[];
    id?: Prisma.UuidFilter<"transactions"> | string;
    user_id?: Prisma.BigIntFilter<"transactions"> | bigint | number;
    user_account_id?: Prisma.UuidFilter<"transactions"> | string;
    category_id?: Prisma.UuidFilter<"transactions"> | string;
    amount?: Prisma.DecimalFilter<"transactions"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.StringNullableFilter<"transactions"> | string | null;
    date?: Prisma.DateTimeFilter<"transactions"> | Date | string;
    type?: Prisma.StringFilter<"transactions"> | string;
    is_shared?: Prisma.BoolFilter<"transactions"> | boolean;
    created_at?: Prisma.DateTimeNullableFilter<"transactions"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"transactions"> | Date | string | null;
};
export type transactionsCreateWithoutTransaction_logsInput = {
    id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    categories: Prisma.categoriesCreateNestedOneWithoutTransactionsInput;
    user_accounts: Prisma.user_accountsCreateNestedOneWithoutTransactionsInput;
    users: Prisma.usersCreateNestedOneWithoutTransactionsInput;
};
export type transactionsUncheckedCreateWithoutTransaction_logsInput = {
    id: string;
    user_id: bigint | number;
    user_account_id: string;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type transactionsCreateOrConnectWithoutTransaction_logsInput = {
    where: Prisma.transactionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.transactionsCreateWithoutTransaction_logsInput, Prisma.transactionsUncheckedCreateWithoutTransaction_logsInput>;
};
export type transactionsUpsertWithoutTransaction_logsInput = {
    update: Prisma.XOR<Prisma.transactionsUpdateWithoutTransaction_logsInput, Prisma.transactionsUncheckedUpdateWithoutTransaction_logsInput>;
    create: Prisma.XOR<Prisma.transactionsCreateWithoutTransaction_logsInput, Prisma.transactionsUncheckedCreateWithoutTransaction_logsInput>;
    where?: Prisma.transactionsWhereInput;
};
export type transactionsUpdateToOneWithWhereWithoutTransaction_logsInput = {
    where?: Prisma.transactionsWhereInput;
    data: Prisma.XOR<Prisma.transactionsUpdateWithoutTransaction_logsInput, Prisma.transactionsUncheckedUpdateWithoutTransaction_logsInput>;
};
export type transactionsUpdateWithoutTransaction_logsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    categories?: Prisma.categoriesUpdateOneRequiredWithoutTransactionsNestedInput;
    user_accounts?: Prisma.user_accountsUpdateOneRequiredWithoutTransactionsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type transactionsUncheckedUpdateWithoutTransaction_logsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_account_id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type transactionsCreateWithoutUser_accountsInput = {
    id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutTransactionsInput;
    categories: Prisma.categoriesCreateNestedOneWithoutTransactionsInput;
    users: Prisma.usersCreateNestedOneWithoutTransactionsInput;
};
export type transactionsUncheckedCreateWithoutUser_accountsInput = {
    id: string;
    user_id: bigint | number;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutTransactionsInput;
};
export type transactionsCreateOrConnectWithoutUser_accountsInput = {
    where: Prisma.transactionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.transactionsCreateWithoutUser_accountsInput, Prisma.transactionsUncheckedCreateWithoutUser_accountsInput>;
};
export type transactionsCreateManyUser_accountsInputEnvelope = {
    data: Prisma.transactionsCreateManyUser_accountsInput | Prisma.transactionsCreateManyUser_accountsInput[];
    skipDuplicates?: boolean;
};
export type transactionsUpsertWithWhereUniqueWithoutUser_accountsInput = {
    where: Prisma.transactionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.transactionsUpdateWithoutUser_accountsInput, Prisma.transactionsUncheckedUpdateWithoutUser_accountsInput>;
    create: Prisma.XOR<Prisma.transactionsCreateWithoutUser_accountsInput, Prisma.transactionsUncheckedCreateWithoutUser_accountsInput>;
};
export type transactionsUpdateWithWhereUniqueWithoutUser_accountsInput = {
    where: Prisma.transactionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.transactionsUpdateWithoutUser_accountsInput, Prisma.transactionsUncheckedUpdateWithoutUser_accountsInput>;
};
export type transactionsUpdateManyWithWhereWithoutUser_accountsInput = {
    where: Prisma.transactionsScalarWhereInput;
    data: Prisma.XOR<Prisma.transactionsUpdateManyMutationInput, Prisma.transactionsUncheckedUpdateManyWithoutUser_accountsInput>;
};
export type transactionsCreateWithoutUsersInput = {
    id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutTransactionsInput;
    categories: Prisma.categoriesCreateNestedOneWithoutTransactionsInput;
    user_accounts: Prisma.user_accountsCreateNestedOneWithoutTransactionsInput;
};
export type transactionsUncheckedCreateWithoutUsersInput = {
    id: string;
    user_account_id: string;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutTransactionsInput;
};
export type transactionsCreateOrConnectWithoutUsersInput = {
    where: Prisma.transactionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.transactionsCreateWithoutUsersInput, Prisma.transactionsUncheckedCreateWithoutUsersInput>;
};
export type transactionsCreateManyUsersInputEnvelope = {
    data: Prisma.transactionsCreateManyUsersInput | Prisma.transactionsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type transactionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.transactionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.transactionsUpdateWithoutUsersInput, Prisma.transactionsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.transactionsCreateWithoutUsersInput, Prisma.transactionsUncheckedCreateWithoutUsersInput>;
};
export type transactionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.transactionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.transactionsUpdateWithoutUsersInput, Prisma.transactionsUncheckedUpdateWithoutUsersInput>;
};
export type transactionsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.transactionsScalarWhereInput;
    data: Prisma.XOR<Prisma.transactionsUpdateManyMutationInput, Prisma.transactionsUncheckedUpdateManyWithoutUsersInput>;
};
export type transactionsCreateManyCategoriesInput = {
    id: string;
    user_id: bigint | number;
    user_account_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type transactionsUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutTransactionsNestedInput;
    user_accounts?: Prisma.user_accountsUpdateOneRequiredWithoutTransactionsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type transactionsUncheckedUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_account_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutTransactionsNestedInput;
};
export type transactionsUncheckedUpdateManyWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_account_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type transactionsCreateManyUser_accountsInput = {
    id: string;
    user_id: bigint | number;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type transactionsUpdateWithoutUser_accountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutTransactionsNestedInput;
    categories?: Prisma.categoriesUpdateOneRequiredWithoutTransactionsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type transactionsUncheckedUpdateWithoutUser_accountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutTransactionsNestedInput;
};
export type transactionsUncheckedUpdateManyWithoutUser_accountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type transactionsCreateManyUsersInput = {
    id: string;
    user_account_id: string;
    category_id: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    date: Date | string;
    type: string;
    is_shared?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type transactionsUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutTransactionsNestedInput;
    categories?: Prisma.categoriesUpdateOneRequiredWithoutTransactionsNestedInput;
    user_accounts?: Prisma.user_accountsUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type transactionsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_account_id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutTransactionsNestedInput;
};
export type transactionsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_account_id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    is_shared?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TransactionsCountOutputType = {
    transaction_logs: number;
};
export type TransactionsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transaction_logs?: boolean | TransactionsCountOutputTypeCountTransaction_logsArgs;
};
export type TransactionsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionsCountOutputTypeSelect<ExtArgs> | null;
};
export type TransactionsCountOutputTypeCountTransaction_logsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transaction_logsWhereInput;
};
export type transactionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    user_account_id?: boolean;
    category_id?: boolean;
    amount?: boolean;
    description?: boolean;
    date?: boolean;
    type?: boolean;
    is_shared?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    transaction_logs?: boolean | Prisma.transactions$transaction_logsArgs<ExtArgs>;
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    user_accounts?: boolean | Prisma.user_accountsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.TransactionsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transactions"]>;
export type transactionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    user_account_id?: boolean;
    category_id?: boolean;
    amount?: boolean;
    description?: boolean;
    date?: boolean;
    type?: boolean;
    is_shared?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    user_accounts?: boolean | Prisma.user_accountsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transactions"]>;
export type transactionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    user_account_id?: boolean;
    category_id?: boolean;
    amount?: boolean;
    description?: boolean;
    date?: boolean;
    type?: boolean;
    is_shared?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    user_accounts?: boolean | Prisma.user_accountsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transactions"]>;
export type transactionsSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    user_account_id?: boolean;
    category_id?: boolean;
    amount?: boolean;
    description?: boolean;
    date?: boolean;
    type?: boolean;
    is_shared?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type transactionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "user_account_id" | "category_id" | "amount" | "description" | "date" | "type" | "is_shared" | "created_at" | "updated_at", ExtArgs["result"]["transactions"]>;
export type transactionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transaction_logs?: boolean | Prisma.transactions$transaction_logsArgs<ExtArgs>;
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    user_accounts?: boolean | Prisma.user_accountsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.TransactionsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type transactionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    user_accounts?: boolean | Prisma.user_accountsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type transactionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | Prisma.categoriesDefaultArgs<ExtArgs>;
    user_accounts?: boolean | Prisma.user_accountsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $transactionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "transactions";
    objects: {
        transaction_logs: Prisma.$transaction_logsPayload<ExtArgs>[];
        categories: Prisma.$categoriesPayload<ExtArgs>;
        user_accounts: Prisma.$user_accountsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        user_id: bigint;
        user_account_id: string;
        category_id: string;
        amount: runtime.Decimal;
        description: string | null;
        date: Date;
        type: string;
        is_shared: boolean;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["transactions"]>;
    composites: {};
};
export type transactionsGetPayload<S extends boolean | null | undefined | transactionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$transactionsPayload, S>;
export type transactionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<transactionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TransactionsCountAggregateInputType | true;
};
export interface transactionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['transactions'];
        meta: {
            name: 'transactions';
        };
    };
    findUnique<T extends transactionsFindUniqueArgs>(args: Prisma.SelectSubset<T, transactionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends transactionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, transactionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends transactionsFindFirstArgs>(args?: Prisma.SelectSubset<T, transactionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends transactionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, transactionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends transactionsFindManyArgs>(args?: Prisma.SelectSubset<T, transactionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends transactionsCreateArgs>(args: Prisma.SelectSubset<T, transactionsCreateArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends transactionsCreateManyArgs>(args?: Prisma.SelectSubset<T, transactionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends transactionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, transactionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends transactionsDeleteArgs>(args: Prisma.SelectSubset<T, transactionsDeleteArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends transactionsUpdateArgs>(args: Prisma.SelectSubset<T, transactionsUpdateArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends transactionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, transactionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends transactionsUpdateManyArgs>(args: Prisma.SelectSubset<T, transactionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends transactionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, transactionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends transactionsUpsertArgs>(args: Prisma.SelectSubset<T, transactionsUpsertArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends transactionsCountArgs>(args?: Prisma.Subset<T, transactionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TransactionsCountAggregateOutputType> : number>;
    aggregate<T extends TransactionsAggregateArgs>(args: Prisma.Subset<T, TransactionsAggregateArgs>): Prisma.PrismaPromise<GetTransactionsAggregateType<T>>;
    groupBy<T extends transactionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: transactionsGroupByArgs['orderBy'];
    } : {
        orderBy?: transactionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, transactionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: transactionsFieldRefs;
}
export interface Prisma__transactionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    transaction_logs<T extends Prisma.transactions$transaction_logsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.transactions$transaction_logsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    categories<T extends Prisma.categoriesDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.categoriesDefaultArgs<ExtArgs>>): Prisma.Prisma__categoriesClient<runtime.Types.Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user_accounts<T extends Prisma.user_accountsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.user_accountsDefaultArgs<ExtArgs>>): Prisma.Prisma__user_accountsClient<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface transactionsFieldRefs {
    readonly id: Prisma.FieldRef<"transactions", 'String'>;
    readonly user_id: Prisma.FieldRef<"transactions", 'BigInt'>;
    readonly user_account_id: Prisma.FieldRef<"transactions", 'String'>;
    readonly category_id: Prisma.FieldRef<"transactions", 'String'>;
    readonly amount: Prisma.FieldRef<"transactions", 'Decimal'>;
    readonly description: Prisma.FieldRef<"transactions", 'String'>;
    readonly date: Prisma.FieldRef<"transactions", 'DateTime'>;
    readonly type: Prisma.FieldRef<"transactions", 'String'>;
    readonly is_shared: Prisma.FieldRef<"transactions", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"transactions", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"transactions", 'DateTime'>;
}
export type transactionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    include?: Prisma.transactionsInclude<ExtArgs> | null;
    where: Prisma.transactionsWhereUniqueInput;
};
export type transactionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    include?: Prisma.transactionsInclude<ExtArgs> | null;
    where: Prisma.transactionsWhereUniqueInput;
};
export type transactionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type transactionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type transactionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type transactionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    include?: Prisma.transactionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.transactionsCreateInput, Prisma.transactionsUncheckedCreateInput>;
};
export type transactionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.transactionsCreateManyInput | Prisma.transactionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type transactionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    data: Prisma.transactionsCreateManyInput | Prisma.transactionsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.transactionsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type transactionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    include?: Prisma.transactionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.transactionsUpdateInput, Prisma.transactionsUncheckedUpdateInput>;
    where: Prisma.transactionsWhereUniqueInput;
};
export type transactionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.transactionsUpdateManyMutationInput, Prisma.transactionsUncheckedUpdateManyInput>;
    where?: Prisma.transactionsWhereInput;
    limit?: number;
};
export type transactionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.transactionsUpdateManyMutationInput, Prisma.transactionsUncheckedUpdateManyInput>;
    where?: Prisma.transactionsWhereInput;
    limit?: number;
    include?: Prisma.transactionsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type transactionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    include?: Prisma.transactionsInclude<ExtArgs> | null;
    where: Prisma.transactionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.transactionsCreateInput, Prisma.transactionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.transactionsUpdateInput, Prisma.transactionsUncheckedUpdateInput>;
};
export type transactionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    include?: Prisma.transactionsInclude<ExtArgs> | null;
    where: Prisma.transactionsWhereUniqueInput;
};
export type transactionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transactionsWhereInput;
    limit?: number;
};
export type transactions$transaction_logsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transaction_logsSelect<ExtArgs> | null;
    omit?: Prisma.transaction_logsOmit<ExtArgs> | null;
    include?: Prisma.transaction_logsInclude<ExtArgs> | null;
    where?: Prisma.transaction_logsWhereInput;
    orderBy?: Prisma.transaction_logsOrderByWithRelationInput | Prisma.transaction_logsOrderByWithRelationInput[];
    cursor?: Prisma.transaction_logsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Transaction_logsScalarFieldEnum | Prisma.Transaction_logsScalarFieldEnum[];
};
export type transactionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    include?: Prisma.transactionsInclude<ExtArgs> | null;
};
