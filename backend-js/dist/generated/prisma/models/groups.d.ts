import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type groupsModel = runtime.Types.Result.DefaultSelection<Prisma.$groupsPayload>;
export type AggregateGroups = {
    _count: GroupsCountAggregateOutputType | null;
    _avg: GroupsAvgAggregateOutputType | null;
    _sum: GroupsSumAggregateOutputType | null;
    _min: GroupsMinAggregateOutputType | null;
    _max: GroupsMaxAggregateOutputType | null;
};
export type GroupsAvgAggregateOutputType = {
    id: number | null;
    created_by: number | null;
};
export type GroupsSumAggregateOutputType = {
    id: bigint | null;
    created_by: bigint | null;
};
export type GroupsMinAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    description: string | null;
    created_by: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type GroupsMaxAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    description: string | null;
    created_by: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type GroupsCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    created_by: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type GroupsAvgAggregateInputType = {
    id?: true;
    created_by?: true;
};
export type GroupsSumAggregateInputType = {
    id?: true;
    created_by?: true;
};
export type GroupsMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
};
export type GroupsMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
};
export type GroupsCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type GroupsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.groupsWhereInput;
    orderBy?: Prisma.groupsOrderByWithRelationInput | Prisma.groupsOrderByWithRelationInput[];
    cursor?: Prisma.groupsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GroupsCountAggregateInputType;
    _avg?: GroupsAvgAggregateInputType;
    _sum?: GroupsSumAggregateInputType;
    _min?: GroupsMinAggregateInputType;
    _max?: GroupsMaxAggregateInputType;
};
export type GetGroupsAggregateType<T extends GroupsAggregateArgs> = {
    [P in keyof T & keyof AggregateGroups]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGroups[P]> : Prisma.GetScalarType<T[P], AggregateGroups[P]>;
};
export type groupsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.groupsWhereInput;
    orderBy?: Prisma.groupsOrderByWithAggregationInput | Prisma.groupsOrderByWithAggregationInput[];
    by: Prisma.GroupsScalarFieldEnum[] | Prisma.GroupsScalarFieldEnum;
    having?: Prisma.groupsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GroupsCountAggregateInputType | true;
    _avg?: GroupsAvgAggregateInputType;
    _sum?: GroupsSumAggregateInputType;
    _min?: GroupsMinAggregateInputType;
    _max?: GroupsMaxAggregateInputType;
};
export type GroupsGroupByOutputType = {
    id: bigint;
    name: string;
    description: string | null;
    created_by: bigint;
    created_at: Date | null;
    updated_at: Date | null;
    _count: GroupsCountAggregateOutputType | null;
    _avg: GroupsAvgAggregateOutputType | null;
    _sum: GroupsSumAggregateOutputType | null;
    _min: GroupsMinAggregateOutputType | null;
    _max: GroupsMaxAggregateOutputType | null;
};
export type GetGroupsGroupByPayload<T extends groupsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GroupsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GroupsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GroupsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GroupsGroupByOutputType[P]>;
}>>;
export type groupsWhereInput = {
    AND?: Prisma.groupsWhereInput | Prisma.groupsWhereInput[];
    OR?: Prisma.groupsWhereInput[];
    NOT?: Prisma.groupsWhereInput | Prisma.groupsWhereInput[];
    id?: Prisma.BigIntFilter<"groups"> | bigint | number;
    name?: Prisma.StringFilter<"groups"> | string;
    description?: Prisma.StringNullableFilter<"groups"> | string | null;
    created_by?: Prisma.BigIntFilter<"groups"> | bigint | number;
    created_at?: Prisma.DateTimeNullableFilter<"groups"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"groups"> | Date | string | null;
    group_user?: Prisma.Group_userListRelationFilter;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    shared_debts?: Prisma.Shared_debtsListRelationFilter;
};
export type groupsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    group_user?: Prisma.group_userOrderByRelationAggregateInput;
    users?: Prisma.usersOrderByWithRelationInput;
    shared_debts?: Prisma.shared_debtsOrderByRelationAggregateInput;
};
export type groupsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.groupsWhereInput | Prisma.groupsWhereInput[];
    OR?: Prisma.groupsWhereInput[];
    NOT?: Prisma.groupsWhereInput | Prisma.groupsWhereInput[];
    name?: Prisma.StringFilter<"groups"> | string;
    description?: Prisma.StringNullableFilter<"groups"> | string | null;
    created_by?: Prisma.BigIntFilter<"groups"> | bigint | number;
    created_at?: Prisma.DateTimeNullableFilter<"groups"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"groups"> | Date | string | null;
    group_user?: Prisma.Group_userListRelationFilter;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    shared_debts?: Prisma.Shared_debtsListRelationFilter;
}, "id">;
export type groupsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.groupsCountOrderByAggregateInput;
    _avg?: Prisma.groupsAvgOrderByAggregateInput;
    _max?: Prisma.groupsMaxOrderByAggregateInput;
    _min?: Prisma.groupsMinOrderByAggregateInput;
    _sum?: Prisma.groupsSumOrderByAggregateInput;
};
export type groupsScalarWhereWithAggregatesInput = {
    AND?: Prisma.groupsScalarWhereWithAggregatesInput | Prisma.groupsScalarWhereWithAggregatesInput[];
    OR?: Prisma.groupsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.groupsScalarWhereWithAggregatesInput | Prisma.groupsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"groups"> | bigint | number;
    name?: Prisma.StringWithAggregatesFilter<"groups"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"groups"> | string | null;
    created_by?: Prisma.BigIntWithAggregatesFilter<"groups"> | bigint | number;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"groups"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"groups"> | Date | string | null;
};
export type groupsCreateInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    group_user?: Prisma.group_userCreateNestedManyWithoutGroupsInput;
    users: Prisma.usersCreateNestedOneWithoutGroupsInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutGroupsInput;
};
export type groupsUncheckedCreateInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    created_by: bigint | number;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutGroupsInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutGroupsInput;
};
export type groupsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    group_user?: Prisma.group_userUpdateManyWithoutGroupsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutGroupsNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutGroupsNestedInput;
};
export type groupsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutGroupsNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutGroupsNestedInput;
};
export type groupsCreateManyInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    created_by: bigint | number;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type groupsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type groupsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type GroupsScalarRelationFilter = {
    is?: Prisma.groupsWhereInput;
    isNot?: Prisma.groupsWhereInput;
};
export type groupsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type groupsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type groupsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type groupsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type groupsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type GroupsListRelationFilter = {
    every?: Prisma.groupsWhereInput;
    some?: Prisma.groupsWhereInput;
    none?: Prisma.groupsWhereInput;
};
export type groupsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type groupsCreateNestedOneWithoutGroup_userInput = {
    create?: Prisma.XOR<Prisma.groupsCreateWithoutGroup_userInput, Prisma.groupsUncheckedCreateWithoutGroup_userInput>;
    connectOrCreate?: Prisma.groupsCreateOrConnectWithoutGroup_userInput;
    connect?: Prisma.groupsWhereUniqueInput;
};
export type groupsUpdateOneRequiredWithoutGroup_userNestedInput = {
    create?: Prisma.XOR<Prisma.groupsCreateWithoutGroup_userInput, Prisma.groupsUncheckedCreateWithoutGroup_userInput>;
    connectOrCreate?: Prisma.groupsCreateOrConnectWithoutGroup_userInput;
    upsert?: Prisma.groupsUpsertWithoutGroup_userInput;
    connect?: Prisma.groupsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.groupsUpdateToOneWithWhereWithoutGroup_userInput, Prisma.groupsUpdateWithoutGroup_userInput>, Prisma.groupsUncheckedUpdateWithoutGroup_userInput>;
};
export type groupsCreateNestedOneWithoutShared_debtsInput = {
    create?: Prisma.XOR<Prisma.groupsCreateWithoutShared_debtsInput, Prisma.groupsUncheckedCreateWithoutShared_debtsInput>;
    connectOrCreate?: Prisma.groupsCreateOrConnectWithoutShared_debtsInput;
    connect?: Prisma.groupsWhereUniqueInput;
};
export type groupsUpdateOneRequiredWithoutShared_debtsNestedInput = {
    create?: Prisma.XOR<Prisma.groupsCreateWithoutShared_debtsInput, Prisma.groupsUncheckedCreateWithoutShared_debtsInput>;
    connectOrCreate?: Prisma.groupsCreateOrConnectWithoutShared_debtsInput;
    upsert?: Prisma.groupsUpsertWithoutShared_debtsInput;
    connect?: Prisma.groupsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.groupsUpdateToOneWithWhereWithoutShared_debtsInput, Prisma.groupsUpdateWithoutShared_debtsInput>, Prisma.groupsUncheckedUpdateWithoutShared_debtsInput>;
};
export type groupsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.groupsCreateWithoutUsersInput, Prisma.groupsUncheckedCreateWithoutUsersInput> | Prisma.groupsCreateWithoutUsersInput[] | Prisma.groupsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.groupsCreateOrConnectWithoutUsersInput | Prisma.groupsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.groupsCreateManyUsersInputEnvelope;
    connect?: Prisma.groupsWhereUniqueInput | Prisma.groupsWhereUniqueInput[];
};
export type groupsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.groupsCreateWithoutUsersInput, Prisma.groupsUncheckedCreateWithoutUsersInput> | Prisma.groupsCreateWithoutUsersInput[] | Prisma.groupsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.groupsCreateOrConnectWithoutUsersInput | Prisma.groupsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.groupsCreateManyUsersInputEnvelope;
    connect?: Prisma.groupsWhereUniqueInput | Prisma.groupsWhereUniqueInput[];
};
export type groupsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.groupsCreateWithoutUsersInput, Prisma.groupsUncheckedCreateWithoutUsersInput> | Prisma.groupsCreateWithoutUsersInput[] | Prisma.groupsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.groupsCreateOrConnectWithoutUsersInput | Prisma.groupsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.groupsUpsertWithWhereUniqueWithoutUsersInput | Prisma.groupsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.groupsCreateManyUsersInputEnvelope;
    set?: Prisma.groupsWhereUniqueInput | Prisma.groupsWhereUniqueInput[];
    disconnect?: Prisma.groupsWhereUniqueInput | Prisma.groupsWhereUniqueInput[];
    delete?: Prisma.groupsWhereUniqueInput | Prisma.groupsWhereUniqueInput[];
    connect?: Prisma.groupsWhereUniqueInput | Prisma.groupsWhereUniqueInput[];
    update?: Prisma.groupsUpdateWithWhereUniqueWithoutUsersInput | Prisma.groupsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.groupsUpdateManyWithWhereWithoutUsersInput | Prisma.groupsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.groupsScalarWhereInput | Prisma.groupsScalarWhereInput[];
};
export type groupsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.groupsCreateWithoutUsersInput, Prisma.groupsUncheckedCreateWithoutUsersInput> | Prisma.groupsCreateWithoutUsersInput[] | Prisma.groupsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.groupsCreateOrConnectWithoutUsersInput | Prisma.groupsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.groupsUpsertWithWhereUniqueWithoutUsersInput | Prisma.groupsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.groupsCreateManyUsersInputEnvelope;
    set?: Prisma.groupsWhereUniqueInput | Prisma.groupsWhereUniqueInput[];
    disconnect?: Prisma.groupsWhereUniqueInput | Prisma.groupsWhereUniqueInput[];
    delete?: Prisma.groupsWhereUniqueInput | Prisma.groupsWhereUniqueInput[];
    connect?: Prisma.groupsWhereUniqueInput | Prisma.groupsWhereUniqueInput[];
    update?: Prisma.groupsUpdateWithWhereUniqueWithoutUsersInput | Prisma.groupsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.groupsUpdateManyWithWhereWithoutUsersInput | Prisma.groupsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.groupsScalarWhereInput | Prisma.groupsScalarWhereInput[];
};
export type groupsCreateWithoutGroup_userInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    users: Prisma.usersCreateNestedOneWithoutGroupsInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutGroupsInput;
};
export type groupsUncheckedCreateWithoutGroup_userInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    created_by: bigint | number;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutGroupsInput;
};
export type groupsCreateOrConnectWithoutGroup_userInput = {
    where: Prisma.groupsWhereUniqueInput;
    create: Prisma.XOR<Prisma.groupsCreateWithoutGroup_userInput, Prisma.groupsUncheckedCreateWithoutGroup_userInput>;
};
export type groupsUpsertWithoutGroup_userInput = {
    update: Prisma.XOR<Prisma.groupsUpdateWithoutGroup_userInput, Prisma.groupsUncheckedUpdateWithoutGroup_userInput>;
    create: Prisma.XOR<Prisma.groupsCreateWithoutGroup_userInput, Prisma.groupsUncheckedCreateWithoutGroup_userInput>;
    where?: Prisma.groupsWhereInput;
};
export type groupsUpdateToOneWithWhereWithoutGroup_userInput = {
    where?: Prisma.groupsWhereInput;
    data: Prisma.XOR<Prisma.groupsUpdateWithoutGroup_userInput, Prisma.groupsUncheckedUpdateWithoutGroup_userInput>;
};
export type groupsUpdateWithoutGroup_userInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneRequiredWithoutGroupsNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutGroupsNestedInput;
};
export type groupsUncheckedUpdateWithoutGroup_userInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutGroupsNestedInput;
};
export type groupsCreateWithoutShared_debtsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    group_user?: Prisma.group_userCreateNestedManyWithoutGroupsInput;
    users: Prisma.usersCreateNestedOneWithoutGroupsInput;
};
export type groupsUncheckedCreateWithoutShared_debtsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    created_by: bigint | number;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutGroupsInput;
};
export type groupsCreateOrConnectWithoutShared_debtsInput = {
    where: Prisma.groupsWhereUniqueInput;
    create: Prisma.XOR<Prisma.groupsCreateWithoutShared_debtsInput, Prisma.groupsUncheckedCreateWithoutShared_debtsInput>;
};
export type groupsUpsertWithoutShared_debtsInput = {
    update: Prisma.XOR<Prisma.groupsUpdateWithoutShared_debtsInput, Prisma.groupsUncheckedUpdateWithoutShared_debtsInput>;
    create: Prisma.XOR<Prisma.groupsCreateWithoutShared_debtsInput, Prisma.groupsUncheckedCreateWithoutShared_debtsInput>;
    where?: Prisma.groupsWhereInput;
};
export type groupsUpdateToOneWithWhereWithoutShared_debtsInput = {
    where?: Prisma.groupsWhereInput;
    data: Prisma.XOR<Prisma.groupsUpdateWithoutShared_debtsInput, Prisma.groupsUncheckedUpdateWithoutShared_debtsInput>;
};
export type groupsUpdateWithoutShared_debtsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    group_user?: Prisma.group_userUpdateManyWithoutGroupsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutGroupsNestedInput;
};
export type groupsUncheckedUpdateWithoutShared_debtsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutGroupsNestedInput;
};
export type groupsCreateWithoutUsersInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    group_user?: Prisma.group_userCreateNestedManyWithoutGroupsInput;
    shared_debts?: Prisma.shared_debtsCreateNestedManyWithoutGroupsInput;
};
export type groupsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    group_user?: Prisma.group_userUncheckedCreateNestedManyWithoutGroupsInput;
    shared_debts?: Prisma.shared_debtsUncheckedCreateNestedManyWithoutGroupsInput;
};
export type groupsCreateOrConnectWithoutUsersInput = {
    where: Prisma.groupsWhereUniqueInput;
    create: Prisma.XOR<Prisma.groupsCreateWithoutUsersInput, Prisma.groupsUncheckedCreateWithoutUsersInput>;
};
export type groupsCreateManyUsersInputEnvelope = {
    data: Prisma.groupsCreateManyUsersInput | Prisma.groupsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type groupsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.groupsWhereUniqueInput;
    update: Prisma.XOR<Prisma.groupsUpdateWithoutUsersInput, Prisma.groupsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.groupsCreateWithoutUsersInput, Prisma.groupsUncheckedCreateWithoutUsersInput>;
};
export type groupsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.groupsWhereUniqueInput;
    data: Prisma.XOR<Prisma.groupsUpdateWithoutUsersInput, Prisma.groupsUncheckedUpdateWithoutUsersInput>;
};
export type groupsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.groupsScalarWhereInput;
    data: Prisma.XOR<Prisma.groupsUpdateManyMutationInput, Prisma.groupsUncheckedUpdateManyWithoutUsersInput>;
};
export type groupsScalarWhereInput = {
    AND?: Prisma.groupsScalarWhereInput | Prisma.groupsScalarWhereInput[];
    OR?: Prisma.groupsScalarWhereInput[];
    NOT?: Prisma.groupsScalarWhereInput | Prisma.groupsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"groups"> | bigint | number;
    name?: Prisma.StringFilter<"groups"> | string;
    description?: Prisma.StringNullableFilter<"groups"> | string | null;
    created_by?: Prisma.BigIntFilter<"groups"> | bigint | number;
    created_at?: Prisma.DateTimeNullableFilter<"groups"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"groups"> | Date | string | null;
};
export type groupsCreateManyUsersInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type groupsUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    group_user?: Prisma.group_userUpdateManyWithoutGroupsNestedInput;
    shared_debts?: Prisma.shared_debtsUpdateManyWithoutGroupsNestedInput;
};
export type groupsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    group_user?: Prisma.group_userUncheckedUpdateManyWithoutGroupsNestedInput;
    shared_debts?: Prisma.shared_debtsUncheckedUpdateManyWithoutGroupsNestedInput;
};
export type groupsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type GroupsCountOutputType = {
    group_user: number;
    shared_debts: number;
};
export type GroupsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    group_user?: boolean | GroupsCountOutputTypeCountGroup_userArgs;
    shared_debts?: boolean | GroupsCountOutputTypeCountShared_debtsArgs;
};
export type GroupsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupsCountOutputTypeSelect<ExtArgs> | null;
};
export type GroupsCountOutputTypeCountGroup_userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.group_userWhereInput;
};
export type GroupsCountOutputTypeCountShared_debtsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.shared_debtsWhereInput;
};
export type groupsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    group_user?: boolean | Prisma.groups$group_userArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    shared_debts?: boolean | Prisma.groups$shared_debtsArgs<ExtArgs>;
    _count?: boolean | Prisma.GroupsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["groups"]>;
export type groupsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["groups"]>;
export type groupsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["groups"]>;
export type groupsSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type groupsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "created_by" | "created_at" | "updated_at", ExtArgs["result"]["groups"]>;
export type groupsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    group_user?: boolean | Prisma.groups$group_userArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    shared_debts?: boolean | Prisma.groups$shared_debtsArgs<ExtArgs>;
    _count?: boolean | Prisma.GroupsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type groupsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type groupsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $groupsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "groups";
    objects: {
        group_user: Prisma.$group_userPayload<ExtArgs>[];
        users: Prisma.$usersPayload<ExtArgs>;
        shared_debts: Prisma.$shared_debtsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        name: string;
        description: string | null;
        created_by: bigint;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["groups"]>;
    composites: {};
};
export type groupsGetPayload<S extends boolean | null | undefined | groupsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$groupsPayload, S>;
export type groupsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<groupsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GroupsCountAggregateInputType | true;
};
export interface groupsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['groups'];
        meta: {
            name: 'groups';
        };
    };
    findUnique<T extends groupsFindUniqueArgs>(args: Prisma.SelectSubset<T, groupsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__groupsClient<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends groupsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, groupsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__groupsClient<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends groupsFindFirstArgs>(args?: Prisma.SelectSubset<T, groupsFindFirstArgs<ExtArgs>>): Prisma.Prisma__groupsClient<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends groupsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, groupsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__groupsClient<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends groupsFindManyArgs>(args?: Prisma.SelectSubset<T, groupsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends groupsCreateArgs>(args: Prisma.SelectSubset<T, groupsCreateArgs<ExtArgs>>): Prisma.Prisma__groupsClient<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends groupsCreateManyArgs>(args?: Prisma.SelectSubset<T, groupsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends groupsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, groupsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends groupsDeleteArgs>(args: Prisma.SelectSubset<T, groupsDeleteArgs<ExtArgs>>): Prisma.Prisma__groupsClient<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends groupsUpdateArgs>(args: Prisma.SelectSubset<T, groupsUpdateArgs<ExtArgs>>): Prisma.Prisma__groupsClient<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends groupsDeleteManyArgs>(args?: Prisma.SelectSubset<T, groupsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends groupsUpdateManyArgs>(args: Prisma.SelectSubset<T, groupsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends groupsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, groupsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends groupsUpsertArgs>(args: Prisma.SelectSubset<T, groupsUpsertArgs<ExtArgs>>): Prisma.Prisma__groupsClient<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends groupsCountArgs>(args?: Prisma.Subset<T, groupsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GroupsCountAggregateOutputType> : number>;
    aggregate<T extends GroupsAggregateArgs>(args: Prisma.Subset<T, GroupsAggregateArgs>): Prisma.PrismaPromise<GetGroupsAggregateType<T>>;
    groupBy<T extends groupsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: groupsGroupByArgs['orderBy'];
    } : {
        orderBy?: groupsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, groupsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: groupsFieldRefs;
}
export interface Prisma__groupsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    group_user<T extends Prisma.groups$group_userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.groups$group_userArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    shared_debts<T extends Prisma.groups$shared_debtsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.groups$shared_debtsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface groupsFieldRefs {
    readonly id: Prisma.FieldRef<"groups", 'BigInt'>;
    readonly name: Prisma.FieldRef<"groups", 'String'>;
    readonly description: Prisma.FieldRef<"groups", 'String'>;
    readonly created_by: Prisma.FieldRef<"groups", 'BigInt'>;
    readonly created_at: Prisma.FieldRef<"groups", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"groups", 'DateTime'>;
}
export type groupsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.groupsSelect<ExtArgs> | null;
    omit?: Prisma.groupsOmit<ExtArgs> | null;
    include?: Prisma.groupsInclude<ExtArgs> | null;
    where: Prisma.groupsWhereUniqueInput;
};
export type groupsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.groupsSelect<ExtArgs> | null;
    omit?: Prisma.groupsOmit<ExtArgs> | null;
    include?: Prisma.groupsInclude<ExtArgs> | null;
    where: Prisma.groupsWhereUniqueInput;
};
export type groupsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type groupsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type groupsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type groupsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.groupsSelect<ExtArgs> | null;
    omit?: Prisma.groupsOmit<ExtArgs> | null;
    include?: Prisma.groupsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.groupsCreateInput, Prisma.groupsUncheckedCreateInput>;
};
export type groupsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.groupsCreateManyInput | Prisma.groupsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type groupsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.groupsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.groupsOmit<ExtArgs> | null;
    data: Prisma.groupsCreateManyInput | Prisma.groupsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.groupsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type groupsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.groupsSelect<ExtArgs> | null;
    omit?: Prisma.groupsOmit<ExtArgs> | null;
    include?: Prisma.groupsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.groupsUpdateInput, Prisma.groupsUncheckedUpdateInput>;
    where: Prisma.groupsWhereUniqueInput;
};
export type groupsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.groupsUpdateManyMutationInput, Prisma.groupsUncheckedUpdateManyInput>;
    where?: Prisma.groupsWhereInput;
    limit?: number;
};
export type groupsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.groupsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.groupsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.groupsUpdateManyMutationInput, Prisma.groupsUncheckedUpdateManyInput>;
    where?: Prisma.groupsWhereInput;
    limit?: number;
    include?: Prisma.groupsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type groupsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.groupsSelect<ExtArgs> | null;
    omit?: Prisma.groupsOmit<ExtArgs> | null;
    include?: Prisma.groupsInclude<ExtArgs> | null;
    where: Prisma.groupsWhereUniqueInput;
    create: Prisma.XOR<Prisma.groupsCreateInput, Prisma.groupsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.groupsUpdateInput, Prisma.groupsUncheckedUpdateInput>;
};
export type groupsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.groupsSelect<ExtArgs> | null;
    omit?: Prisma.groupsOmit<ExtArgs> | null;
    include?: Prisma.groupsInclude<ExtArgs> | null;
    where: Prisma.groupsWhereUniqueInput;
};
export type groupsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.groupsWhereInput;
    limit?: number;
};
export type groups$group_userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type groups$shared_debtsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type groupsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.groupsSelect<ExtArgs> | null;
    omit?: Prisma.groupsOmit<ExtArgs> | null;
    include?: Prisma.groupsInclude<ExtArgs> | null;
};
