import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type usersModel = runtime.Types.Result.DefaultSelection<Prisma.$usersPayload>;
export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null;
    _avg: UsersAvgAggregateOutputType | null;
    _sum: UsersSumAggregateOutputType | null;
    _min: UsersMinAggregateOutputType | null;
    _max: UsersMaxAggregateOutputType | null;
};
export type UsersAvgAggregateOutputType = {
    id: number | null;
};
export type UsersSumAggregateOutputType = {
    id: bigint | null;
};
export type UsersMinAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    email: string | null;
    email_verified_at: Date | null;
    password: string | null;
    remember_token: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type UsersMaxAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    email: string | null;
    email_verified_at: Date | null;
    password: string | null;
    remember_token: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type UsersCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    email_verified_at: number;
    password: number;
    remember_token: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type UsersAvgAggregateInputType = {
    id?: true;
};
export type UsersSumAggregateInputType = {
    id?: true;
};
export type UsersMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    email_verified_at?: true;
    password?: true;
    remember_token?: true;
    created_at?: true;
    updated_at?: true;
};
export type UsersMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    email_verified_at?: true;
    password?: true;
    remember_token?: true;
    created_at?: true;
    updated_at?: true;
};
export type UsersCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    email_verified_at?: true;
    password?: true;
    remember_token?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type UsersAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput | Prisma.usersOrderByWithRelationInput[];
    cursor?: Prisma.usersWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UsersCountAggregateInputType;
    _avg?: UsersAvgAggregateInputType;
    _sum?: UsersSumAggregateInputType;
    _min?: UsersMinAggregateInputType;
    _max?: UsersMaxAggregateInputType;
};
export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
    [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUsers[P]> : Prisma.GetScalarType<T[P], AggregateUsers[P]>;
};
export type usersGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithAggregationInput | Prisma.usersOrderByWithAggregationInput[];
    by: Prisma.UsersScalarFieldEnum[] | Prisma.UsersScalarFieldEnum;
    having?: Prisma.usersScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UsersCountAggregateInputType | true;
    _avg?: UsersAvgAggregateInputType;
    _sum?: UsersSumAggregateInputType;
    _min?: UsersMinAggregateInputType;
    _max?: UsersMaxAggregateInputType;
};
export type UsersGroupByOutputType = {
    id: bigint;
    name: string;
    email: string;
    email_verified_at: Date | null;
    password: string;
    remember_token: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: UsersCountAggregateOutputType | null;
    _avg: UsersAvgAggregateOutputType | null;
    _sum: UsersSumAggregateOutputType | null;
    _min: UsersMinAggregateOutputType | null;
    _max: UsersMaxAggregateOutputType | null;
};
export type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UsersGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UsersGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UsersGroupByOutputType[P]>;
}>>;
export type usersWhereInput = {
    AND?: Prisma.usersWhereInput | Prisma.usersWhereInput[];
    OR?: Prisma.usersWhereInput[];
    NOT?: Prisma.usersWhereInput | Prisma.usersWhereInput[];
    id?: Prisma.BigIntFilter<"users"> | bigint | number;
    name?: Prisma.StringFilter<"users"> | string;
    email?: Prisma.StringFilter<"users"> | string;
    email_verified_at?: Prisma.DateTimeNullableFilter<"users"> | Date | string | null;
    password?: Prisma.StringFilter<"users"> | string;
    remember_token?: Prisma.StringNullableFilter<"users"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"users"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"users"> | Date | string | null;
    budgets?: Prisma.BudgetsListRelationFilter;
    group_user?: Prisma.Group_userListRelationFilter;
    groups?: Prisma.GroupsListRelationFilter;
    savings_goals?: Prisma.Savings_goalsListRelationFilter;
    shared_debt_splits?: Prisma.Shared_debt_splitsListRelationFilter;
    shared_debts?: Prisma.Shared_debtsListRelationFilter;
    transaction_logs?: Prisma.Transaction_logsListRelationFilter;
    transactions?: Prisma.TransactionsListRelationFilter;
    user_accounts?: Prisma.User_accountsListRelationFilter;
};
export type usersOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    email_verified_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    password?: Prisma.SortOrder;
    remember_token?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    budgets?: Prisma.budgetsOrderByRelationAggregateInput;
    group_user?: Prisma.group_userOrderByRelationAggregateInput;
    groups?: Prisma.groupsOrderByRelationAggregateInput;
    savings_goals?: Prisma.savings_goalsOrderByRelationAggregateInput;
    shared_debt_splits?: Prisma.shared_debt_splitsOrderByRelationAggregateInput;
    shared_debts?: Prisma.shared_debtsOrderByRelationAggregateInput;
    transaction_logs?: Prisma.transaction_logsOrderByRelationAggregateInput;
    transactions?: Prisma.transactionsOrderByRelationAggregateInput;
    user_accounts?: Prisma.user_accountsOrderByRelationAggregateInput;
};
export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    email?: string;
    AND?: Prisma.usersWhereInput | Prisma.usersWhereInput[];
    OR?: Prisma.usersWhereInput[];
    NOT?: Prisma.usersWhereInput | Prisma.usersWhereInput[];
    name?: Prisma.StringFilter<"users"> | string;
    email_verified_at?: Prisma.DateTimeNullableFilter<"users"> | Date | string | null;
    password?: Prisma.StringFilter<"users"> | string;
    remember_token?: Prisma.StringNullableFilter<"users"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"users"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"users"> | Date | string | null;
    budgets?: Prisma.BudgetsListRelationFilter;
    group_user?: Prisma.Group_userListRelationFilter;
    groups?: Prisma.GroupsListRelationFilter;
    savings_goals?: Prisma.Savings_goalsListRelationFilter;
    shared_debt_splits?: Prisma.Shared_debt_splitsListRelationFilter;
    shared_debts?: Prisma.Shared_debtsListRelationFilter;
    transaction_logs?: Prisma.Transaction_logsListRelationFilter;
    transactions?: Prisma.TransactionsListRelationFilter;
    user_accounts?: Prisma.User_accountsListRelationFilter;
}, "id" | "email">;
export type usersOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    email_verified_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    password?: Prisma.SortOrder;
    remember_token?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.usersCountOrderByAggregateInput;
    _avg?: Prisma.usersAvgOrderByAggregateInput;
    _max?: Prisma.usersMaxOrderByAggregateInput;
    _min?: Prisma.usersMinOrderByAggregateInput;
    _sum?: Prisma.usersSumOrderByAggregateInput;
};
export type usersScalarWhereWithAggregatesInput = {
    AND?: Prisma.usersScalarWhereWithAggregatesInput | Prisma.usersScalarWhereWithAggregatesInput[];
    OR?: Prisma.usersScalarWhereWithAggregatesInput[];
    NOT?: Prisma.usersScalarWhereWithAggregatesInput | Prisma.usersScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"users"> | bigint | number;
    name?: Prisma.StringWithAggregatesFilter<"users"> | string;
    email?: Prisma.StringWithAggregatesFilter<"users"> | string;
    email_verified_at?: Prisma.DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null;
    password?: Prisma.StringWithAggregatesFilter<"users"> | string;
    remember_token?: Prisma.StringNullableWithAggregatesFilter<"users"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null;
};
export type usersCreateInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsUncheckedCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUncheckedUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateManyInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type usersUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type usersUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UsersScalarRelationFilter = {
    is?: Prisma.usersWhereInput;
    isNot?: Prisma.usersWhereInput;
};
export type usersCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    email_verified_at?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    remember_token?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type usersAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type usersMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    email_verified_at?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    remember_token?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type usersMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    email_verified_at?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    remember_token?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type usersSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type usersCreateNestedOneWithoutBudgetsInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutBudgetsInput, Prisma.usersUncheckedCreateWithoutBudgetsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutBudgetsInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutBudgetsInput, Prisma.usersUncheckedCreateWithoutBudgetsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutBudgetsInput;
    upsert?: Prisma.usersUpsertWithoutBudgetsInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutBudgetsInput, Prisma.usersUpdateWithoutBudgetsInput>, Prisma.usersUncheckedUpdateWithoutBudgetsInput>;
};
export type usersCreateNestedOneWithoutGroup_userInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutGroup_userInput, Prisma.usersUncheckedCreateWithoutGroup_userInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutGroup_userInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutGroup_userNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutGroup_userInput, Prisma.usersUncheckedCreateWithoutGroup_userInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutGroup_userInput;
    upsert?: Prisma.usersUpsertWithoutGroup_userInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutGroup_userInput, Prisma.usersUpdateWithoutGroup_userInput>, Prisma.usersUncheckedUpdateWithoutGroup_userInput>;
};
export type usersCreateNestedOneWithoutGroupsInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutGroupsInput, Prisma.usersUncheckedCreateWithoutGroupsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutGroupsInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutGroupsNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutGroupsInput, Prisma.usersUncheckedCreateWithoutGroupsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutGroupsInput;
    upsert?: Prisma.usersUpsertWithoutGroupsInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutGroupsInput, Prisma.usersUpdateWithoutGroupsInput>, Prisma.usersUncheckedUpdateWithoutGroupsInput>;
};
export type usersCreateNestedOneWithoutSavings_goalsInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutSavings_goalsInput, Prisma.usersUncheckedCreateWithoutSavings_goalsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutSavings_goalsInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutSavings_goalsNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutSavings_goalsInput, Prisma.usersUncheckedCreateWithoutSavings_goalsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutSavings_goalsInput;
    upsert?: Prisma.usersUpsertWithoutSavings_goalsInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutSavings_goalsInput, Prisma.usersUpdateWithoutSavings_goalsInput>, Prisma.usersUncheckedUpdateWithoutSavings_goalsInput>;
};
export type usersCreateNestedOneWithoutShared_debt_splitsInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutShared_debt_splitsInput, Prisma.usersUncheckedCreateWithoutShared_debt_splitsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutShared_debt_splitsInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutShared_debt_splitsNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutShared_debt_splitsInput, Prisma.usersUncheckedCreateWithoutShared_debt_splitsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutShared_debt_splitsInput;
    upsert?: Prisma.usersUpsertWithoutShared_debt_splitsInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutShared_debt_splitsInput, Prisma.usersUpdateWithoutShared_debt_splitsInput>, Prisma.usersUncheckedUpdateWithoutShared_debt_splitsInput>;
};
export type usersCreateNestedOneWithoutShared_debtsInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutShared_debtsInput, Prisma.usersUncheckedCreateWithoutShared_debtsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutShared_debtsInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutShared_debtsNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutShared_debtsInput, Prisma.usersUncheckedCreateWithoutShared_debtsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutShared_debtsInput;
    upsert?: Prisma.usersUpsertWithoutShared_debtsInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutShared_debtsInput, Prisma.usersUpdateWithoutShared_debtsInput>, Prisma.usersUncheckedUpdateWithoutShared_debtsInput>;
};
export type usersCreateNestedOneWithoutTransaction_logsInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutTransaction_logsInput, Prisma.usersUncheckedCreateWithoutTransaction_logsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutTransaction_logsInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutTransaction_logsNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutTransaction_logsInput, Prisma.usersUncheckedCreateWithoutTransaction_logsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutTransaction_logsInput;
    upsert?: Prisma.usersUpsertWithoutTransaction_logsInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutTransaction_logsInput, Prisma.usersUpdateWithoutTransaction_logsInput>, Prisma.usersUncheckedUpdateWithoutTransaction_logsInput>;
};
export type usersCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutTransactionsInput, Prisma.usersUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutTransactionsInput, Prisma.usersUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.usersUpsertWithoutTransactionsInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutTransactionsInput, Prisma.usersUpdateWithoutTransactionsInput>, Prisma.usersUncheckedUpdateWithoutTransactionsInput>;
};
export type usersCreateNestedOneWithoutUser_accountsInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutUser_accountsInput, Prisma.usersUncheckedCreateWithoutUser_accountsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutUser_accountsInput;
    connect?: Prisma.usersWhereUniqueInput;
};
export type usersUpdateOneRequiredWithoutUser_accountsNestedInput = {
    create?: Prisma.XOR<Prisma.usersCreateWithoutUser_accountsInput, Prisma.usersUncheckedCreateWithoutUser_accountsInput>;
    connectOrCreate?: Prisma.usersCreateOrConnectWithoutUser_accountsInput;
    upsert?: Prisma.usersUpsertWithoutUser_accountsInput;
    connect?: Prisma.usersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usersUpdateToOneWithWhereWithoutUser_accountsInput, Prisma.usersUpdateWithoutUser_accountsInput>, Prisma.usersUncheckedUpdateWithoutUser_accountsInput>;
};
export type usersCreateWithoutBudgetsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    group_user?: Prisma.group_userCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutBudgetsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsUncheckedCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutBudgetsInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutBudgetsInput, Prisma.usersUncheckedCreateWithoutBudgetsInput>;
};
export type usersUpsertWithoutBudgetsInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutBudgetsInput, Prisma.usersUncheckedUpdateWithoutBudgetsInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutBudgetsInput, Prisma.usersUncheckedCreateWithoutBudgetsInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutBudgetsInput, Prisma.usersUncheckedUpdateWithoutBudgetsInput>;
};
export type usersUpdateWithoutBudgetsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    group_user?: Prisma.group_userUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutBudgetsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUncheckedUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutGroup_userInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutGroup_userInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsUncheckedCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutGroup_userInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutGroup_userInput, Prisma.usersUncheckedCreateWithoutGroup_userInput>;
};
export type usersUpsertWithoutGroup_userInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutGroup_userInput, Prisma.usersUncheckedUpdateWithoutGroup_userInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutGroup_userInput, Prisma.usersUncheckedCreateWithoutGroup_userInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutGroup_userInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutGroup_userInput, Prisma.usersUncheckedUpdateWithoutGroup_userInput>;
};
export type usersUpdateWithoutGroup_userInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutGroup_userInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUncheckedUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutGroupsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutGroupsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutGroupsInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutGroupsInput, Prisma.usersUncheckedCreateWithoutGroupsInput>;
};
export type usersUpsertWithoutGroupsInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutGroupsInput, Prisma.usersUncheckedUpdateWithoutGroupsInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutGroupsInput, Prisma.usersUncheckedCreateWithoutGroupsInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutGroupsInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutGroupsInput, Prisma.usersUncheckedUpdateWithoutGroupsInput>;
};
export type usersUpdateWithoutGroupsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutGroupsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutSavings_goalsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutSavings_goalsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutSavings_goalsInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutSavings_goalsInput, Prisma.usersUncheckedCreateWithoutSavings_goalsInput>;
};
export type usersUpsertWithoutSavings_goalsInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutSavings_goalsInput, Prisma.usersUncheckedUpdateWithoutSavings_goalsInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutSavings_goalsInput, Prisma.usersUncheckedCreateWithoutSavings_goalsInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutSavings_goalsInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutSavings_goalsInput, Prisma.usersUncheckedUpdateWithoutSavings_goalsInput>;
};
export type usersUpdateWithoutSavings_goalsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutSavings_goalsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutShared_debt_splitsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutShared_debt_splitsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsUncheckedCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutShared_debt_splitsInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutShared_debt_splitsInput, Prisma.usersUncheckedCreateWithoutShared_debt_splitsInput>;
};
export type usersUpsertWithoutShared_debt_splitsInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutShared_debt_splitsInput, Prisma.usersUncheckedUpdateWithoutShared_debt_splitsInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutShared_debt_splitsInput, Prisma.usersUncheckedCreateWithoutShared_debt_splitsInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutShared_debt_splitsInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutShared_debt_splitsInput, Prisma.usersUncheckedUpdateWithoutShared_debt_splitsInput>;
};
export type usersUpdateWithoutShared_debt_splitsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutShared_debt_splitsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUncheckedUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutShared_debtsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutShared_debtsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsUncheckedCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutShared_debtsInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutShared_debtsInput, Prisma.usersUncheckedCreateWithoutShared_debtsInput>;
};
export type usersUpsertWithoutShared_debtsInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutShared_debtsInput, Prisma.usersUncheckedUpdateWithoutShared_debtsInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutShared_debtsInput, Prisma.usersUncheckedCreateWithoutShared_debtsInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutShared_debtsInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutShared_debtsInput, Prisma.usersUncheckedUpdateWithoutShared_debtsInput>;
};
export type usersUpdateWithoutShared_debtsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutShared_debtsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUncheckedUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutTransaction_logsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutTransaction_logsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsUncheckedCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutTransaction_logsInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutTransaction_logsInput, Prisma.usersUncheckedCreateWithoutTransaction_logsInput>;
};
export type usersUpsertWithoutTransaction_logsInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutTransaction_logsInput, Prisma.usersUncheckedUpdateWithoutTransaction_logsInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutTransaction_logsInput, Prisma.usersUncheckedCreateWithoutTransaction_logsInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutTransaction_logsInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutTransaction_logsInput, Prisma.usersUncheckedUpdateWithoutTransaction_logsInput>;
};
export type usersUpdateWithoutTransaction_logsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutTransaction_logsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUncheckedUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutTransactionsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutTransactionsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsUncheckedCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutUsersInput;
    user_accounts?: Prisma.user_accountsUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutTransactionsInput, Prisma.usersUncheckedCreateWithoutTransactionsInput>;
};
export type usersUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutTransactionsInput, Prisma.usersUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutTransactionsInput, Prisma.usersUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutTransactionsInput, Prisma.usersUncheckedUpdateWithoutTransactionsInput>;
};
export type usersUpdateWithoutTransactionsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUncheckedUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutUsersNestedInput;
    user_accounts?: Prisma.user_accountsUncheckedUpdateManyWithoutUsersNestedInput;
};
export type usersCreateWithoutUser_accountsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUsersInput;
};
export type usersUncheckedCreateWithoutUser_accountsInput = {
    id?: bigint | number;
    name: string;
    email: string;
    email_verified_at?: Date | string | null;
    password: string;
    remember_token?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    budgets?: Prisma.budgetsUncheckedCreateNestedManyWithoutUsersInput;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutUsersInput;
    groups?: Prisma.groupsUncheckedCreateNestedManyWithoutUsersInput;
    savings_goals?: Prisma.savings_goalsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutUsersInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutUsersInput;
    transaction_logs?: Prisma.transaction_logsUncheckedCreateNestedManyWithoutUsersInput;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUsersInput;
};
export type usersCreateOrConnectWithoutUser_accountsInput = {
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateWithoutUser_accountsInput, Prisma.usersUncheckedCreateWithoutUser_accountsInput>;
};
export type usersUpsertWithoutUser_accountsInput = {
    update: Prisma.XOR<Prisma.usersUpdateWithoutUser_accountsInput, Prisma.usersUncheckedUpdateWithoutUser_accountsInput>;
    create: Prisma.XOR<Prisma.usersCreateWithoutUser_accountsInput, Prisma.usersUncheckedCreateWithoutUser_accountsInput>;
    where?: Prisma.usersWhereInput;
};
export type usersUpdateToOneWithWhereWithoutUser_accountsInput = {
    where?: Prisma.usersWhereInput;
    data: Prisma.XOR<Prisma.usersUpdateWithoutUser_accountsInput, Prisma.usersUncheckedUpdateWithoutUser_accountsInput>;
};
export type usersUpdateWithoutUser_accountsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUpdateManyWithoutUsersNestedInput;
};
export type usersUncheckedUpdateWithoutUser_accountsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    email_verified_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    remember_token?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgets?: Prisma.budgetsUncheckedUpdateManyWithoutUsersNestedInput;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutUsersNestedInput;
    groups?: Prisma.groupsUncheckedUpdateManyWithoutUsersNestedInput;
    savings_goals?: Prisma.savings_goalsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutUsersNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutUsersNestedInput;
    transaction_logs?: Prisma.transaction_logsUncheckedUpdateManyWithoutUsersNestedInput;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUsersNestedInput;
};
export type UsersCountOutputType = {
    budgets: number;
    group_user: number;
    groups: number;
    savings_goals: number;
    shared_debt_splits: number;
    shared_debts: number;
    transaction_logs: number;
    transactions: number;
    user_accounts: number;
};
export type UsersCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    budgets?: boolean | UsersCountOutputTypeCountBudgetsArgs;
    group_user?: boolean | UsersCountOutputTypeCountGroup_userArgs;
    groups?: boolean | UsersCountOutputTypeCountGroupsArgs;
    savings_goals?: boolean | UsersCountOutputTypeCountSavings_goalsArgs;
    shared_debt_splits?: boolean | UsersCountOutputTypeCountShared_debt_splitsArgs;
    shared_debts?: boolean | UsersCountOutputTypeCountShared_debtsArgs;
    transaction_logs?: boolean | UsersCountOutputTypeCountTransaction_logsArgs;
    transactions?: boolean | UsersCountOutputTypeCountTransactionsArgs;
    user_accounts?: boolean | UsersCountOutputTypeCountUser_accountsArgs;
};
export type UsersCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsersCountOutputTypeSelect<ExtArgs> | null;
};
export type UsersCountOutputTypeCountBudgetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.budgetsWhereInput;
};
export type UsersCountOutputTypeCountGroup_userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.group_userWhereInput;
};
export type UsersCountOutputTypeCountGroupsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.groupsWhereInput;
};
export type UsersCountOutputTypeCountSavings_goalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.savings_goalsWhereInput;
};
export type UsersCountOutputTypeCountShared_debt_splitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.shared_debt_splitsWhereInput;
};
export type UsersCountOutputTypeCountShared_debtsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.shared_debtsWhereInput;
};
export type UsersCountOutputTypeCountTransaction_logsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transaction_logsWhereInput;
};
export type UsersCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transactionsWhereInput;
};
export type UsersCountOutputTypeCountUser_accountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_accountsWhereInput;
};
export type usersSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    email_verified_at?: boolean;
    password?: boolean;
    remember_token?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    budgets?: boolean | Prisma.users$budgetsArgs<ExtArgs>;
    group_user?: boolean | Prisma.users$group_userArgs<ExtArgs>;
    groups?: boolean | Prisma.users$groupsArgs<ExtArgs>;
    savings_goals?: boolean | Prisma.users$savings_goalsArgs<ExtArgs>;
    shared_debt_splits?: boolean | Prisma.users$shared_debt_splitsArgs<ExtArgs>;
    shared_debts?: boolean | Prisma.users$shared_debtsArgs<ExtArgs>;
    transaction_logs?: boolean | Prisma.users$transaction_logsArgs<ExtArgs>;
    transactions?: boolean | Prisma.users$transactionsArgs<ExtArgs>;
    user_accounts?: boolean | Prisma.users$user_accountsArgs<ExtArgs>;
    _count?: boolean | Prisma.UsersCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["users"]>;
export type usersSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    email_verified_at?: boolean;
    password?: boolean;
    remember_token?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["users"]>;
export type usersSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    email_verified_at?: boolean;
    password?: boolean;
    remember_token?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["users"]>;
export type usersSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    email_verified_at?: boolean;
    password?: boolean;
    remember_token?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type usersOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "email_verified_at" | "password" | "remember_token" | "created_at" | "updated_at", ExtArgs["result"]["users"]>;
export type usersInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    budgets?: boolean | Prisma.users$budgetsArgs<ExtArgs>;
    group_user?: boolean | Prisma.users$group_userArgs<ExtArgs>;
    groups?: boolean | Prisma.users$groupsArgs<ExtArgs>;
    savings_goals?: boolean | Prisma.users$savings_goalsArgs<ExtArgs>;
    shared_debt_splits?: boolean | Prisma.users$shared_debt_splitsArgs<ExtArgs>;
    shared_debts?: boolean | Prisma.users$shared_debtsArgs<ExtArgs>;
    transaction_logs?: boolean | Prisma.users$transaction_logsArgs<ExtArgs>;
    transactions?: boolean | Prisma.users$transactionsArgs<ExtArgs>;
    user_accounts?: boolean | Prisma.users$user_accountsArgs<ExtArgs>;
    _count?: boolean | Prisma.UsersCountOutputTypeDefaultArgs<ExtArgs>;
};
export type usersIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type usersIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $usersPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "users";
    objects: {
        budgets: Prisma.$budgetsPayload<ExtArgs>[];
        group_user: Prisma.$group_userPayload<ExtArgs>[];
        groups: Prisma.$groupsPayload<ExtArgs>[];
        savings_goals: Prisma.$savings_goalsPayload<ExtArgs>[];
        shared_debt_splits: Prisma.$shared_debt_splitsPayload<ExtArgs>[];
        shared_debts: Prisma.$shared_debtsPayload<ExtArgs>[];
        transaction_logs: Prisma.$transaction_logsPayload<ExtArgs>[];
        transactions: Prisma.$transactionsPayload<ExtArgs>[];
        user_accounts: Prisma.$user_accountsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        name: string;
        email: string;
        email_verified_at: Date | null;
        password: string;
        remember_token: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["users"]>;
    composites: {};
};
export type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$usersPayload, S>;
export type usersCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UsersCountAggregateInputType | true;
};
export interface usersDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['users'];
        meta: {
            name: 'users';
        };
    };
    findUnique<T extends usersFindUniqueArgs>(args: Prisma.SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends usersFindFirstArgs>(args?: Prisma.SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends usersFindManyArgs>(args?: Prisma.SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends usersCreateArgs>(args: Prisma.SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends usersCreateManyArgs>(args?: Prisma.SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends usersDeleteArgs>(args: Prisma.SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends usersUpdateArgs>(args: Prisma.SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends usersDeleteManyArgs>(args?: Prisma.SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends usersUpdateManyArgs>(args: Prisma.SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends usersUpsertArgs>(args: Prisma.SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends usersCountArgs>(args?: Prisma.Subset<T, usersCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UsersCountAggregateOutputType> : number>;
    aggregate<T extends UsersAggregateArgs>(args: Prisma.Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>;
    groupBy<T extends usersGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: usersGroupByArgs['orderBy'];
    } : {
        orderBy?: usersGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: usersFieldRefs;
}
export interface Prisma__usersClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    budgets<T extends Prisma.users$budgetsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    group_user<T extends Prisma.users$group_userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$group_userArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    groups<T extends Prisma.users$groupsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    savings_goals<T extends Prisma.users$savings_goalsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$savings_goalsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    shared_debt_splits<T extends Prisma.users$shared_debt_splitsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$shared_debt_splitsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    shared_debts<T extends Prisma.users$shared_debtsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$shared_debtsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    transaction_logs<T extends Prisma.users$transaction_logsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$transaction_logsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    transactions<T extends Prisma.users$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    user_accounts<T extends Prisma.users$user_accountsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.users$user_accountsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface usersFieldRefs {
    readonly id: Prisma.FieldRef<"users", 'BigInt'>;
    readonly name: Prisma.FieldRef<"users", 'String'>;
    readonly email: Prisma.FieldRef<"users", 'String'>;
    readonly email_verified_at: Prisma.FieldRef<"users", 'DateTime'>;
    readonly password: Prisma.FieldRef<"users", 'String'>;
    readonly remember_token: Prisma.FieldRef<"users", 'String'>;
    readonly created_at: Prisma.FieldRef<"users", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"users", 'DateTime'>;
}
export type usersFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where: Prisma.usersWhereUniqueInput;
};
export type usersFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where: Prisma.usersWhereUniqueInput;
};
export type usersFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput | Prisma.usersOrderByWithRelationInput[];
    cursor?: Prisma.usersWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsersScalarFieldEnum | Prisma.UsersScalarFieldEnum[];
};
export type usersFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput | Prisma.usersOrderByWithRelationInput[];
    cursor?: Prisma.usersWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsersScalarFieldEnum | Prisma.UsersScalarFieldEnum[];
};
export type usersFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput | Prisma.usersOrderByWithRelationInput[];
    cursor?: Prisma.usersWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsersScalarFieldEnum | Prisma.UsersScalarFieldEnum[];
};
export type usersCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usersCreateInput, Prisma.usersUncheckedCreateInput>;
};
export type usersCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.usersCreateManyInput | Prisma.usersCreateManyInput[];
    skipDuplicates?: boolean;
};
export type usersCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    data: Prisma.usersCreateManyInput | Prisma.usersCreateManyInput[];
    skipDuplicates?: boolean;
};
export type usersUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usersUpdateInput, Prisma.usersUncheckedUpdateInput>;
    where: Prisma.usersWhereUniqueInput;
};
export type usersUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.usersUpdateManyMutationInput, Prisma.usersUncheckedUpdateManyInput>;
    where?: Prisma.usersWhereInput;
    limit?: number;
};
export type usersUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usersUpdateManyMutationInput, Prisma.usersUncheckedUpdateManyInput>;
    where?: Prisma.usersWhereInput;
    limit?: number;
};
export type usersUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where: Prisma.usersWhereUniqueInput;
    create: Prisma.XOR<Prisma.usersCreateInput, Prisma.usersUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.usersUpdateInput, Prisma.usersUncheckedUpdateInput>;
};
export type usersDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where: Prisma.usersWhereUniqueInput;
};
export type usersDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usersWhereInput;
    limit?: number;
};
export type users$budgetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type users$group_userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.group_userSelect<ExtArgs> | null;
    omit?: Prisma.group_userOmit<ExtArgs> | null;
    include?: Prisma.group_userInclude<ExtArgs> | null;
    where?: Prisma.group_userWhereInput;
    orderBy?: Prisma.group_userOrderByWithRelationInput | Prisma.group_userOrderByWithRelationInput[];
    cursor?: Prisma.group_userWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Group_userScalarFieldEnum | Prisma.Group_userScalarFieldEnum[];
};
export type users$groupsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.groupsSelect<ExtArgs> | null;
    omit?: Prisma.groupsOmit<ExtArgs> | null;
    include?: Prisma.groupsInclude<ExtArgs> | null;
    where?: Prisma.groupsWhereInput;
    orderBy?: Prisma.groupsOrderByWithRelationInput | Prisma.groupsOrderByWithRelationInput[];
    cursor?: Prisma.groupsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GroupsScalarFieldEnum | Prisma.GroupsScalarFieldEnum[];
};
export type users$savings_goalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.savings_goalsSelect<ExtArgs> | null;
    omit?: Prisma.savings_goalsOmit<ExtArgs> | null;
    include?: Prisma.savings_goalsInclude<ExtArgs> | null;
    where?: Prisma.savings_goalsWhereInput;
    orderBy?: Prisma.savings_goalsOrderByWithRelationInput | Prisma.savings_goalsOrderByWithRelationInput[];
    cursor?: Prisma.savings_goalsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Savings_goalsScalarFieldEnum | Prisma.Savings_goalsScalarFieldEnum[];
};
export type users$shared_debt_splitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debt_splitsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debt_splitsOmit<ExtArgs> | null;
    include?: Prisma.shared_debt_splitsInclude<ExtArgs> | null;
    where?: Prisma.shared_debt_splitsWhereInput;
    orderBy?: Prisma.shared_debt_splitsOrderByWithRelationInput | Prisma.shared_debt_splitsOrderByWithRelationInput[];
    cursor?: Prisma.shared_debt_splitsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Shared_debt_splitsScalarFieldEnum | Prisma.Shared_debt_splitsScalarFieldEnum[];
};
export type users$shared_debtsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debtsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debtsOmit<ExtArgs> | null;
    include?: Prisma.shared_debtsInclude<ExtArgs> | null;
    where?: Prisma.shared_debtsWhereInput;
    orderBy?: Prisma.shared_debtsOrderByWithRelationInput | Prisma.shared_debtsOrderByWithRelationInput[];
    cursor?: Prisma.shared_debtsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Shared_debtsScalarFieldEnum | Prisma.Shared_debtsScalarFieldEnum[];
};
export type users$transaction_logsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type users$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type users$user_accountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type usersDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
};
