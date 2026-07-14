import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type group_userModel = runtime.Types.Result.DefaultSelection<Prisma.$group_userPayload>;
export type AggregateGroup_user = {
    _count: Group_userCountAggregateOutputType | null;
    _avg: Group_userAvgAggregateOutputType | null;
    _sum: Group_userSumAggregateOutputType | null;
    _min: Group_userMinAggregateOutputType | null;
    _max: Group_userMaxAggregateOutputType | null;
};
export type Group_userAvgAggregateOutputType = {
    id: number | null;
    group_id: number | null;
    user_id: number | null;
};
export type Group_userSumAggregateOutputType = {
    id: bigint | null;
    group_id: bigint | null;
    user_id: bigint | null;
};
export type Group_userMinAggregateOutputType = {
    id: bigint | null;
    group_id: bigint | null;
    user_id: bigint | null;
    status: string | null;
    role: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Group_userMaxAggregateOutputType = {
    id: bigint | null;
    group_id: bigint | null;
    user_id: bigint | null;
    status: string | null;
    role: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Group_userCountAggregateOutputType = {
    id: number;
    group_id: number;
    user_id: number;
    status: number;
    role: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Group_userAvgAggregateInputType = {
    id?: true;
    group_id?: true;
    user_id?: true;
};
export type Group_userSumAggregateInputType = {
    id?: true;
    group_id?: true;
    user_id?: true;
};
export type Group_userMinAggregateInputType = {
    id?: true;
    group_id?: true;
    user_id?: true;
    status?: true;
    role?: true;
    created_at?: true;
    updated_at?: true;
};
export type Group_userMaxAggregateInputType = {
    id?: true;
    group_id?: true;
    user_id?: true;
    status?: true;
    role?: true;
    created_at?: true;
    updated_at?: true;
};
export type Group_userCountAggregateInputType = {
    id?: true;
    group_id?: true;
    user_id?: true;
    status?: true;
    role?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Group_userAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.group_userWhereInput;
    orderBy?: Prisma.group_userOrderByWithRelationInput | Prisma.group_userOrderByWithRelationInput[];
    cursor?: Prisma.group_userWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Group_userCountAggregateInputType;
    _avg?: Group_userAvgAggregateInputType;
    _sum?: Group_userSumAggregateInputType;
    _min?: Group_userMinAggregateInputType;
    _max?: Group_userMaxAggregateInputType;
};
export type GetGroup_userAggregateType<T extends Group_userAggregateArgs> = {
    [P in keyof T & keyof AggregateGroup_user]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGroup_user[P]> : Prisma.GetScalarType<T[P], AggregateGroup_user[P]>;
};
export type group_userGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.group_userWhereInput;
    orderBy?: Prisma.group_userOrderByWithAggregationInput | Prisma.group_userOrderByWithAggregationInput[];
    by: Prisma.Group_userScalarFieldEnum[] | Prisma.Group_userScalarFieldEnum;
    having?: Prisma.group_userScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Group_userCountAggregateInputType | true;
    _avg?: Group_userAvgAggregateInputType;
    _sum?: Group_userSumAggregateInputType;
    _min?: Group_userMinAggregateInputType;
    _max?: Group_userMaxAggregateInputType;
};
export type Group_userGroupByOutputType = {
    id: bigint;
    group_id: bigint;
    user_id: bigint;
    status: string;
    role: string;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Group_userCountAggregateOutputType | null;
    _avg: Group_userAvgAggregateOutputType | null;
    _sum: Group_userSumAggregateOutputType | null;
    _min: Group_userMinAggregateOutputType | null;
    _max: Group_userMaxAggregateOutputType | null;
};
export type GetGroup_userGroupByPayload<T extends group_userGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Group_userGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Group_userGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Group_userGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Group_userGroupByOutputType[P]>;
}>>;
export type group_userWhereInput = {
    AND?: Prisma.group_userWhereInput | Prisma.group_userWhereInput[];
    OR?: Prisma.group_userWhereInput[];
    NOT?: Prisma.group_userWhereInput | Prisma.group_userWhereInput[];
    id?: Prisma.BigIntFilter<"group_user"> | bigint | number;
    group_id?: Prisma.BigIntFilter<"group_user"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"group_user"> | bigint | number;
    status?: Prisma.StringFilter<"group_user"> | string;
    role?: Prisma.StringFilter<"group_user"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"group_user"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"group_user"> | Date | string | null;
    groups?: Prisma.XOR<Prisma.GroupsScalarRelationFilter, Prisma.groupsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type group_userOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    groups?: Prisma.groupsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type group_userWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.group_userWhereInput | Prisma.group_userWhereInput[];
    OR?: Prisma.group_userWhereInput[];
    NOT?: Prisma.group_userWhereInput | Prisma.group_userWhereInput[];
    group_id?: Prisma.BigIntFilter<"group_user"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"group_user"> | bigint | number;
    status?: Prisma.StringFilter<"group_user"> | string;
    role?: Prisma.StringFilter<"group_user"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"group_user"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"group_user"> | Date | string | null;
    groups?: Prisma.XOR<Prisma.GroupsScalarRelationFilter, Prisma.groupsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type group_userOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.group_userCountOrderByAggregateInput;
    _avg?: Prisma.group_userAvgOrderByAggregateInput;
    _max?: Prisma.group_userMaxOrderByAggregateInput;
    _min?: Prisma.group_userMinOrderByAggregateInput;
    _sum?: Prisma.group_userSumOrderByAggregateInput;
};
export type group_userScalarWhereWithAggregatesInput = {
    AND?: Prisma.group_userScalarWhereWithAggregatesInput | Prisma.group_userScalarWhereWithAggregatesInput[];
    OR?: Prisma.group_userScalarWhereWithAggregatesInput[];
    NOT?: Prisma.group_userScalarWhereWithAggregatesInput | Prisma.group_userScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"group_user"> | bigint | number;
    group_id?: Prisma.BigIntWithAggregatesFilter<"group_user"> | bigint | number;
    user_id?: Prisma.BigIntWithAggregatesFilter<"group_user"> | bigint | number;
    status?: Prisma.StringWithAggregatesFilter<"group_user"> | string;
    role?: Prisma.StringWithAggregatesFilter<"group_user"> | string;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"group_user"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"group_user"> | Date | string | null;
};
export type group_userCreateInput = {
    id?: bigint | number;
    status?: string;
    role?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    groups: Prisma.groupsCreateNestedOneWithoutGroup_userInput;
    users: Prisma.usersCreateNestedOneWithoutGroup_userInput;
};
export type group_userUncheckedCreateInput = {
    id?: bigint | number;
    group_id: bigint | number;
    user_id: bigint | number;
    status?: string;
    role?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type group_userUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    groups?: Prisma.groupsUpdateOneRequiredWithoutGroup_userNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutGroup_userNestedInput;
};
export type group_userUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    group_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type group_userCreateManyInput = {
    id?: bigint | number;
    group_id: bigint | number;
    user_id: bigint | number;
    status?: string;
    role?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type group_userUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type group_userUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    group_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type group_userCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type group_userAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type group_userMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type group_userMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type group_userSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type Group_userListRelationFilter = {
    every?: Prisma.group_userWhereInput;
    some?: Prisma.group_userWhereInput;
    none?: Prisma.group_userWhereInput;
};
export type group_userOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type group_userCreateNestedManyWithoutGroupsInput = {
    create?: Prisma.XOR<Prisma.group_userCreateWithoutGroupsInput, Prisma.group_userUncheckedCreateWithoutGroupsInput> | Prisma.group_userCreateWithoutGroupsInput[] | Prisma.group_userUncheckedCreateWithoutGroupsInput[];
    connectOrCreate?: Prisma.group_userCreateOrConnectWithoutGroupsInput | Prisma.group_userCreateOrConnectWithoutGroupsInput[];
    createMany?: Prisma.group_userCreateManyGroupsInputEnvelope;
    connect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
};
export type group_userUncheckedCreateNestedManyWithoutGroupsInput = {
    create?: Prisma.XOR<Prisma.group_userCreateWithoutGroupsInput, Prisma.group_userUncheckedCreateWithoutGroupsInput> | Prisma.group_userCreateWithoutGroupsInput[] | Prisma.group_userUncheckedCreateWithoutGroupsInput[];
    connectOrCreate?: Prisma.group_userCreateOrConnectWithoutGroupsInput | Prisma.group_userCreateOrConnectWithoutGroupsInput[];
    createMany?: Prisma.group_userCreateManyGroupsInputEnvelope;
    connect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
};
export type group_userUpdateManyWithoutGroupsNestedInput = {
    create?: Prisma.XOR<Prisma.group_userCreateWithoutGroupsInput, Prisma.group_userUncheckedCreateWithoutGroupsInput> | Prisma.group_userCreateWithoutGroupsInput[] | Prisma.group_userUncheckedCreateWithoutGroupsInput[];
    connectOrCreate?: Prisma.group_userCreateOrConnectWithoutGroupsInput | Prisma.group_userCreateOrConnectWithoutGroupsInput[];
    upsert?: Prisma.group_userUpsertWithWhereUniqueWithoutGroupsInput | Prisma.group_userUpsertWithWhereUniqueWithoutGroupsInput[];
    createMany?: Prisma.group_userCreateManyGroupsInputEnvelope;
    set?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    disconnect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    delete?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    connect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    update?: Prisma.group_userUpdateWithWhereUniqueWithoutGroupsInput | Prisma.group_userUpdateWithWhereUniqueWithoutGroupsInput[];
    updateMany?: Prisma.group_userUpdateManyWithWhereWithoutGroupsInput | Prisma.group_userUpdateManyWithWhereWithoutGroupsInput[];
    deleteMany?: Prisma.group_userScalarWhereInput | Prisma.group_userScalarWhereInput[];
};
export type group_userUncheckedUpdateManyWithoutGroupsNestedInput = {
    create?: Prisma.XOR<Prisma.group_userCreateWithoutGroupsInput, Prisma.group_userUncheckedCreateWithoutGroupsInput> | Prisma.group_userCreateWithoutGroupsInput[] | Prisma.group_userUncheckedCreateWithoutGroupsInput[];
    connectOrCreate?: Prisma.group_userCreateOrConnectWithoutGroupsInput | Prisma.group_userCreateOrConnectWithoutGroupsInput[];
    upsert?: Prisma.group_userUpsertWithWhereUniqueWithoutGroupsInput | Prisma.group_userUpsertWithWhereUniqueWithoutGroupsInput[];
    createMany?: Prisma.group_userCreateManyGroupsInputEnvelope;
    set?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    disconnect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    delete?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    connect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    update?: Prisma.group_userUpdateWithWhereUniqueWithoutGroupsInput | Prisma.group_userUpdateWithWhereUniqueWithoutGroupsInput[];
    updateMany?: Prisma.group_userUpdateManyWithWhereWithoutGroupsInput | Prisma.group_userUpdateManyWithWhereWithoutGroupsInput[];
    deleteMany?: Prisma.group_userScalarWhereInput | Prisma.group_userScalarWhereInput[];
};
export type group_userCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.group_userCreateWithoutUsersInput, Prisma.group_userUncheckedCreateWithoutUsersInput> | Prisma.group_userCreateWithoutUsersInput[] | Prisma.group_userUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.group_userCreateOrConnectWithoutUsersInput | Prisma.group_userCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.group_userCreateManyUsersInputEnvelope;
    connect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
};
export type group_userUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.group_userCreateWithoutUsersInput, Prisma.group_userUncheckedCreateWithoutUsersInput> | Prisma.group_userCreateWithoutUsersInput[] | Prisma.group_userUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.group_userCreateOrConnectWithoutUsersInput | Prisma.group_userCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.group_userCreateManyUsersInputEnvelope;
    connect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
};
export type group_userUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.group_userCreateWithoutUsersInput, Prisma.group_userUncheckedCreateWithoutUsersInput> | Prisma.group_userCreateWithoutUsersInput[] | Prisma.group_userUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.group_userCreateOrConnectWithoutUsersInput | Prisma.group_userCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.group_userUpsertWithWhereUniqueWithoutUsersInput | Prisma.group_userUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.group_userCreateManyUsersInputEnvelope;
    set?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    disconnect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    delete?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    connect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    update?: Prisma.group_userUpdateWithWhereUniqueWithoutUsersInput | Prisma.group_userUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.group_userUpdateManyWithWhereWithoutUsersInput | Prisma.group_userUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.group_userScalarWhereInput | Prisma.group_userScalarWhereInput[];
};
export type group_userUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.group_userCreateWithoutUsersInput, Prisma.group_userUncheckedCreateWithoutUsersInput> | Prisma.group_userCreateWithoutUsersInput[] | Prisma.group_userUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.group_userCreateOrConnectWithoutUsersInput | Prisma.group_userCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.group_userUpsertWithWhereUniqueWithoutUsersInput | Prisma.group_userUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.group_userCreateManyUsersInputEnvelope;
    set?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    disconnect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    delete?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    connect?: Prisma.group_userWhereUniqueInput | Prisma.group_userWhereUniqueInput[];
    update?: Prisma.group_userUpdateWithWhereUniqueWithoutUsersInput | Prisma.group_userUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.group_userUpdateManyWithWhereWithoutUsersInput | Prisma.group_userUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.group_userScalarWhereInput | Prisma.group_userScalarWhereInput[];
};
export type group_userCreateWithoutGroupsInput = {
    id?: bigint | number;
    status?: string;
    role?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    users: Prisma.usersCreateNestedOneWithoutGroup_userInput;
};
export type group_userUncheckedCreateWithoutGroupsInput = {
    id?: bigint | number;
    user_id: bigint | number;
    status?: string;
    role?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type group_userCreateOrConnectWithoutGroupsInput = {
    where: Prisma.group_userWhereUniqueInput;
    create: Prisma.XOR<Prisma.group_userCreateWithoutGroupsInput, Prisma.group_userUncheckedCreateWithoutGroupsInput>;
};
export type group_userCreateManyGroupsInputEnvelope = {
    data: Prisma.group_userCreateManyGroupsInput | Prisma.group_userCreateManyGroupsInput[];
    skipDuplicates?: boolean;
};
export type group_userUpsertWithWhereUniqueWithoutGroupsInput = {
    where: Prisma.group_userWhereUniqueInput;
    update: Prisma.XOR<Prisma.group_userUpdateWithoutGroupsInput, Prisma.group_userUncheckedUpdateWithoutGroupsInput>;
    create: Prisma.XOR<Prisma.group_userCreateWithoutGroupsInput, Prisma.group_userUncheckedCreateWithoutGroupsInput>;
};
export type group_userUpdateWithWhereUniqueWithoutGroupsInput = {
    where: Prisma.group_userWhereUniqueInput;
    data: Prisma.XOR<Prisma.group_userUpdateWithoutGroupsInput, Prisma.group_userUncheckedUpdateWithoutGroupsInput>;
};
export type group_userUpdateManyWithWhereWithoutGroupsInput = {
    where: Prisma.group_userScalarWhereInput;
    data: Prisma.XOR<Prisma.group_userUpdateManyMutationInput, Prisma.group_userUncheckedUpdateManyWithoutGroupsInput>;
};
export type group_userScalarWhereInput = {
    AND?: Prisma.group_userScalarWhereInput | Prisma.group_userScalarWhereInput[];
    OR?: Prisma.group_userScalarWhereInput[];
    NOT?: Prisma.group_userScalarWhereInput | Prisma.group_userScalarWhereInput[];
    id?: Prisma.BigIntFilter<"group_user"> | bigint | number;
    group_id?: Prisma.BigIntFilter<"group_user"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"group_user"> | bigint | number;
    status?: Prisma.StringFilter<"group_user"> | string;
    role?: Prisma.StringFilter<"group_user"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"group_user"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"group_user"> | Date | string | null;
};
export type group_userCreateWithoutUsersInput = {
    id?: bigint | number;
    status?: string;
    role?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    groups: Prisma.groupsCreateNestedOneWithoutGroup_userInput;
};
export type group_userUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    group_id: bigint | number;
    status?: string;
    role?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type group_userCreateOrConnectWithoutUsersInput = {
    where: Prisma.group_userWhereUniqueInput;
    create: Prisma.XOR<Prisma.group_userCreateWithoutUsersInput, Prisma.group_userUncheckedCreateWithoutUsersInput>;
};
export type group_userCreateManyUsersInputEnvelope = {
    data: Prisma.group_userCreateManyUsersInput | Prisma.group_userCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type group_userUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.group_userWhereUniqueInput;
    update: Prisma.XOR<Prisma.group_userUpdateWithoutUsersInput, Prisma.group_userUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.group_userCreateWithoutUsersInput, Prisma.group_userUncheckedCreateWithoutUsersInput>;
};
export type group_userUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.group_userWhereUniqueInput;
    data: Prisma.XOR<Prisma.group_userUpdateWithoutUsersInput, Prisma.group_userUncheckedUpdateWithoutUsersInput>;
};
export type group_userUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.group_userScalarWhereInput;
    data: Prisma.XOR<Prisma.group_userUpdateManyMutationInput, Prisma.group_userUncheckedUpdateManyWithoutUsersInput>;
};
export type group_userCreateManyGroupsInput = {
    id?: bigint | number;
    user_id: bigint | number;
    status?: string;
    role?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type group_userUpdateWithoutGroupsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneRequiredWithoutGroup_userNestedInput;
};
export type group_userUncheckedUpdateWithoutGroupsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type group_userUncheckedUpdateManyWithoutGroupsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type group_userCreateManyUsersInput = {
    id?: bigint | number;
    group_id: bigint | number;
    status?: string;
    role?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type group_userUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    groups?: Prisma.groupsUpdateOneRequiredWithoutGroup_userNestedInput;
};
export type group_userUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    group_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type group_userUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    group_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type group_userSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    group_id?: boolean;
    user_id?: boolean;
    status?: boolean;
    role?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["group_user"]>;
export type group_userSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    group_id?: boolean;
    user_id?: boolean;
    status?: boolean;
    role?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["group_user"]>;
export type group_userSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    group_id?: boolean;
    user_id?: boolean;
    status?: boolean;
    role?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["group_user"]>;
export type group_userSelectScalar = {
    id?: boolean;
    group_id?: boolean;
    user_id?: boolean;
    status?: boolean;
    role?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type group_userOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "group_id" | "user_id" | "status" | "role" | "created_at" | "updated_at", ExtArgs["result"]["group_user"]>;
export type group_userInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type group_userIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type group_userIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $group_userPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "group_user";
    objects: {
        groups: Prisma.$groupsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        group_id: bigint;
        user_id: bigint;
        status: string;
        role: string;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["group_user"]>;
    composites: {};
};
export type group_userGetPayload<S extends boolean | null | undefined | group_userDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$group_userPayload, S>;
export type group_userCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<group_userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Group_userCountAggregateInputType | true;
};
export interface group_userDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['group_user'];
        meta: {
            name: 'group_user';
        };
    };
    findUnique<T extends group_userFindUniqueArgs>(args: Prisma.SelectSubset<T, group_userFindUniqueArgs<ExtArgs>>): Prisma.Prisma__group_userClient<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends group_userFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, group_userFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__group_userClient<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends group_userFindFirstArgs>(args?: Prisma.SelectSubset<T, group_userFindFirstArgs<ExtArgs>>): Prisma.Prisma__group_userClient<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends group_userFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, group_userFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__group_userClient<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends group_userFindManyArgs>(args?: Prisma.SelectSubset<T, group_userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends group_userCreateArgs>(args: Prisma.SelectSubset<T, group_userCreateArgs<ExtArgs>>): Prisma.Prisma__group_userClient<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends group_userCreateManyArgs>(args?: Prisma.SelectSubset<T, group_userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends group_userCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, group_userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends group_userDeleteArgs>(args: Prisma.SelectSubset<T, group_userDeleteArgs<ExtArgs>>): Prisma.Prisma__group_userClient<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends group_userUpdateArgs>(args: Prisma.SelectSubset<T, group_userUpdateArgs<ExtArgs>>): Prisma.Prisma__group_userClient<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends group_userDeleteManyArgs>(args?: Prisma.SelectSubset<T, group_userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends group_userUpdateManyArgs>(args: Prisma.SelectSubset<T, group_userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends group_userUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, group_userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends group_userUpsertArgs>(args: Prisma.SelectSubset<T, group_userUpsertArgs<ExtArgs>>): Prisma.Prisma__group_userClient<runtime.Types.Result.GetResult<Prisma.$group_userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends group_userCountArgs>(args?: Prisma.Subset<T, group_userCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Group_userCountAggregateOutputType> : number>;
    aggregate<T extends Group_userAggregateArgs>(args: Prisma.Subset<T, Group_userAggregateArgs>): Prisma.PrismaPromise<GetGroup_userAggregateType<T>>;
    groupBy<T extends group_userGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: group_userGroupByArgs['orderBy'];
    } : {
        orderBy?: group_userGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, group_userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroup_userGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: group_userFieldRefs;
}
export interface Prisma__group_userClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    groups<T extends Prisma.groupsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.groupsDefaultArgs<ExtArgs>>): Prisma.Prisma__groupsClient<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface group_userFieldRefs {
    readonly id: Prisma.FieldRef<"group_user", 'BigInt'>;
    readonly group_id: Prisma.FieldRef<"group_user", 'BigInt'>;
    readonly user_id: Prisma.FieldRef<"group_user", 'BigInt'>;
    readonly status: Prisma.FieldRef<"group_user", 'String'>;
    readonly role: Prisma.FieldRef<"group_user", 'String'>;
    readonly created_at: Prisma.FieldRef<"group_user", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"group_user", 'DateTime'>;
}
export type group_userFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.group_userSelect<ExtArgs> | null;
    omit?: Prisma.group_userOmit<ExtArgs> | null;
    include?: Prisma.group_userInclude<ExtArgs> | null;
    where: Prisma.group_userWhereUniqueInput;
};
export type group_userFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.group_userSelect<ExtArgs> | null;
    omit?: Prisma.group_userOmit<ExtArgs> | null;
    include?: Prisma.group_userInclude<ExtArgs> | null;
    where: Prisma.group_userWhereUniqueInput;
};
export type group_userFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type group_userFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type group_userFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type group_userCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.group_userSelect<ExtArgs> | null;
    omit?: Prisma.group_userOmit<ExtArgs> | null;
    include?: Prisma.group_userInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.group_userCreateInput, Prisma.group_userUncheckedCreateInput>;
};
export type group_userCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.group_userCreateManyInput | Prisma.group_userCreateManyInput[];
    skipDuplicates?: boolean;
};
export type group_userCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.group_userSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.group_userOmit<ExtArgs> | null;
    data: Prisma.group_userCreateManyInput | Prisma.group_userCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.group_userIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type group_userUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.group_userSelect<ExtArgs> | null;
    omit?: Prisma.group_userOmit<ExtArgs> | null;
    include?: Prisma.group_userInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.group_userUpdateInput, Prisma.group_userUncheckedUpdateInput>;
    where: Prisma.group_userWhereUniqueInput;
};
export type group_userUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.group_userUpdateManyMutationInput, Prisma.group_userUncheckedUpdateManyInput>;
    where?: Prisma.group_userWhereInput;
    limit?: number;
};
export type group_userUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.group_userSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.group_userOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.group_userUpdateManyMutationInput, Prisma.group_userUncheckedUpdateManyInput>;
    where?: Prisma.group_userWhereInput;
    limit?: number;
    include?: Prisma.group_userIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type group_userUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.group_userSelect<ExtArgs> | null;
    omit?: Prisma.group_userOmit<ExtArgs> | null;
    include?: Prisma.group_userInclude<ExtArgs> | null;
    where: Prisma.group_userWhereUniqueInput;
    create: Prisma.XOR<Prisma.group_userCreateInput, Prisma.group_userUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.group_userUpdateInput, Prisma.group_userUncheckedUpdateInput>;
};
export type group_userDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.group_userSelect<ExtArgs> | null;
    omit?: Prisma.group_userOmit<ExtArgs> | null;
    include?: Prisma.group_userInclude<ExtArgs> | null;
    where: Prisma.group_userWhereUniqueInput;
};
export type group_userDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.group_userWhereInput;
    limit?: number;
};
export type group_userDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.group_userSelect<ExtArgs> | null;
    omit?: Prisma.group_userOmit<ExtArgs> | null;
    include?: Prisma.group_userInclude<ExtArgs> | null;
};
