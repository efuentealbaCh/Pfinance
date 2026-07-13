import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type shared_debtsModel = runtime.Types.Result.DefaultSelection<Prisma.$shared_debtsPayload>;
export type AggregateShared_debts = {
    _count: Shared_debtsCountAggregateOutputType | null;
    _avg: Shared_debtsAvgAggregateOutputType | null;
    _sum: Shared_debtsSumAggregateOutputType | null;
    _min: Shared_debtsMinAggregateOutputType | null;
    _max: Shared_debtsMaxAggregateOutputType | null;
};
export type Shared_debtsAvgAggregateOutputType = {
    id: number | null;
    group_id: number | null;
    created_by: number | null;
    amount: runtime.Decimal | null;
};
export type Shared_debtsSumAggregateOutputType = {
    id: bigint | null;
    group_id: bigint | null;
    created_by: bigint | null;
    amount: runtime.Decimal | null;
};
export type Shared_debtsMinAggregateOutputType = {
    id: bigint | null;
    group_id: bigint | null;
    created_by: bigint | null;
    title: string | null;
    amount: runtime.Decimal | null;
    date: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Shared_debtsMaxAggregateOutputType = {
    id: bigint | null;
    group_id: bigint | null;
    created_by: bigint | null;
    title: string | null;
    amount: runtime.Decimal | null;
    date: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Shared_debtsCountAggregateOutputType = {
    id: number;
    group_id: number;
    created_by: number;
    title: number;
    amount: number;
    date: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Shared_debtsAvgAggregateInputType = {
    id?: true;
    group_id?: true;
    created_by?: true;
    amount?: true;
};
export type Shared_debtsSumAggregateInputType = {
    id?: true;
    group_id?: true;
    created_by?: true;
    amount?: true;
};
export type Shared_debtsMinAggregateInputType = {
    id?: true;
    group_id?: true;
    created_by?: true;
    title?: true;
    amount?: true;
    date?: true;
    created_at?: true;
    updated_at?: true;
};
export type Shared_debtsMaxAggregateInputType = {
    id?: true;
    group_id?: true;
    created_by?: true;
    title?: true;
    amount?: true;
    date?: true;
    created_at?: true;
    updated_at?: true;
};
export type Shared_debtsCountAggregateInputType = {
    id?: true;
    group_id?: true;
    created_by?: true;
    title?: true;
    amount?: true;
    date?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Shared_debtsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.shared_debtsWhereInput;
    orderBy?: Prisma.shared_debtsOrderByWithRelationInput | Prisma.shared_debtsOrderByWithRelationInput[];
    cursor?: Prisma.shared_debtsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Shared_debtsCountAggregateInputType;
    _avg?: Shared_debtsAvgAggregateInputType;
    _sum?: Shared_debtsSumAggregateInputType;
    _min?: Shared_debtsMinAggregateInputType;
    _max?: Shared_debtsMaxAggregateInputType;
};
export type GetShared_debtsAggregateType<T extends Shared_debtsAggregateArgs> = {
    [P in keyof T & keyof AggregateShared_debts]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShared_debts[P]> : Prisma.GetScalarType<T[P], AggregateShared_debts[P]>;
};
export type shared_debtsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.shared_debtsWhereInput;
    orderBy?: Prisma.shared_debtsOrderByWithAggregationInput | Prisma.shared_debtsOrderByWithAggregationInput[];
    by: Prisma.Shared_debtsScalarFieldEnum[] | Prisma.Shared_debtsScalarFieldEnum;
    having?: Prisma.shared_debtsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Shared_debtsCountAggregateInputType | true;
    _avg?: Shared_debtsAvgAggregateInputType;
    _sum?: Shared_debtsSumAggregateInputType;
    _min?: Shared_debtsMinAggregateInputType;
    _max?: Shared_debtsMaxAggregateInputType;
};
export type Shared_debtsGroupByOutputType = {
    id: bigint;
    group_id: bigint;
    created_by: bigint;
    title: string;
    amount: runtime.Decimal;
    date: Date;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Shared_debtsCountAggregateOutputType | null;
    _avg: Shared_debtsAvgAggregateOutputType | null;
    _sum: Shared_debtsSumAggregateOutputType | null;
    _min: Shared_debtsMinAggregateOutputType | null;
    _max: Shared_debtsMaxAggregateOutputType | null;
};
export type GetShared_debtsGroupByPayload<T extends shared_debtsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Shared_debtsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Shared_debtsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Shared_debtsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Shared_debtsGroupByOutputType[P]>;
}>>;
export type shared_debtsWhereInput = {
    AND?: Prisma.shared_debtsWhereInput | Prisma.shared_debtsWhereInput[];
    OR?: Prisma.shared_debtsWhereInput[];
    NOT?: Prisma.shared_debtsWhereInput | Prisma.shared_debtsWhereInput[];
    id?: Prisma.BigIntFilter<"shared_debts"> | bigint | number;
    group_id?: Prisma.BigIntFilter<"shared_debts"> | bigint | number;
    created_by?: Prisma.BigIntFilter<"shared_debts"> | bigint | number;
    title?: Prisma.StringFilter<"shared_debts"> | string;
    amount?: Prisma.DecimalFilter<"shared_debts"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFilter<"shared_debts"> | Date | string;
    created_at?: Prisma.DateTimeNullableFilter<"shared_debts"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"shared_debts"> | Date | string | null;
    shared_debt_splits?: Prisma.Shared_debt_splitsListRelationFilter;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    groups?: Prisma.XOR<Prisma.GroupsScalarRelationFilter, Prisma.groupsWhereInput>;
};
export type shared_debtsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    shared_debt_splits?: Prisma.shared_debt_splitsOrderByRelationAggregateInput;
    users?: Prisma.usersOrderByWithRelationInput;
    groups?: Prisma.groupsOrderByWithRelationInput;
};
export type shared_debtsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.shared_debtsWhereInput | Prisma.shared_debtsWhereInput[];
    OR?: Prisma.shared_debtsWhereInput[];
    NOT?: Prisma.shared_debtsWhereInput | Prisma.shared_debtsWhereInput[];
    group_id?: Prisma.BigIntFilter<"shared_debts"> | bigint | number;
    created_by?: Prisma.BigIntFilter<"shared_debts"> | bigint | number;
    title?: Prisma.StringFilter<"shared_debts"> | string;
    amount?: Prisma.DecimalFilter<"shared_debts"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFilter<"shared_debts"> | Date | string;
    created_at?: Prisma.DateTimeNullableFilter<"shared_debts"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"shared_debts"> | Date | string | null;
    shared_debt_splits?: Prisma.Shared_debt_splitsListRelationFilter;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    groups?: Prisma.XOR<Prisma.GroupsScalarRelationFilter, Prisma.groupsWhereInput>;
}, "id">;
export type shared_debtsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.shared_debtsCountOrderByAggregateInput;
    _avg?: Prisma.shared_debtsAvgOrderByAggregateInput;
    _max?: Prisma.shared_debtsMaxOrderByAggregateInput;
    _min?: Prisma.shared_debtsMinOrderByAggregateInput;
    _sum?: Prisma.shared_debtsSumOrderByAggregateInput;
};
export type shared_debtsScalarWhereWithAggregatesInput = {
    AND?: Prisma.shared_debtsScalarWhereWithAggregatesInput | Prisma.shared_debtsScalarWhereWithAggregatesInput[];
    OR?: Prisma.shared_debtsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.shared_debtsScalarWhereWithAggregatesInput | Prisma.shared_debtsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"shared_debts"> | bigint | number;
    group_id?: Prisma.BigIntWithAggregatesFilter<"shared_debts"> | bigint | number;
    created_by?: Prisma.BigIntWithAggregatesFilter<"shared_debts"> | bigint | number;
    title?: Prisma.StringWithAggregatesFilter<"shared_debts"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"shared_debts"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"shared_debts"> | Date | string;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"shared_debts"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"shared_debts"> | Date | string | null;
};
export type shared_debtsCreateInput = {
    id?: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutShared_debtsInput;
    users: Prisma.usersCreateNestedOneWithoutShared_debtsInput;
    groups: Prisma.groupsCreateNestedOneWithoutShared_debtsInput;
};
export type shared_debtsUncheckedCreateInput = {
    id?: bigint | number;
    group_id: bigint | number;
    created_by: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutShared_debtsInput;
};
export type shared_debtsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutShared_debtsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutShared_debtsNestedInput;
    groups?: Prisma.groupsUpdateOneRequiredWithoutShared_debtsNestedInput;
};
export type shared_debtsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    group_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutShared_debtsNestedInput;
};
export type shared_debtsCreateManyInput = {
    id?: bigint | number;
    group_id: bigint | number;
    created_by: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type shared_debtsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type shared_debtsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    group_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Shared_debtsListRelationFilter = {
    every?: Prisma.shared_debtsWhereInput;
    some?: Prisma.shared_debtsWhereInput;
    none?: Prisma.shared_debtsWhereInput;
};
export type shared_debtsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type Shared_debtsScalarRelationFilter = {
    is?: Prisma.shared_debtsWhereInput;
    isNot?: Prisma.shared_debtsWhereInput;
};
export type shared_debtsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type shared_debtsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type shared_debtsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type shared_debtsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type shared_debtsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    group_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type shared_debtsCreateNestedManyWithoutGroupsInput = {
    create?: Prisma.XOR<Prisma.shared_debtsCreateWithoutGroupsInput, Prisma.shared_debtsUncheckedCreateWithoutGroupsInput> | Prisma.shared_debtsCreateWithoutGroupsInput[] | Prisma.shared_debtsUncheckedCreateWithoutGroupsInput[];
    connectOrCreate?: Prisma.shared_debtsCreateOrConnectWithoutGroupsInput | Prisma.shared_debtsCreateOrConnectWithoutGroupsInput[];
    createMany?: Prisma.shared_debtsCreateManyGroupsInputEnvelope;
    connect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
};
export type shared_debtsUncheckedCreateNestedManyWithoutGroupsInput = {
    create?: Prisma.XOR<Prisma.shared_debtsCreateWithoutGroupsInput, Prisma.shared_debtsUncheckedCreateWithoutGroupsInput> | Prisma.shared_debtsCreateWithoutGroupsInput[] | Prisma.shared_debtsUncheckedCreateWithoutGroupsInput[];
    connectOrCreate?: Prisma.shared_debtsCreateOrConnectWithoutGroupsInput | Prisma.shared_debtsCreateOrConnectWithoutGroupsInput[];
    createMany?: Prisma.shared_debtsCreateManyGroupsInputEnvelope;
    connect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
};
export type shared_debtsUpdateManyWithoutGroupsNestedInput = {
    create?: Prisma.XOR<Prisma.shared_debtsCreateWithoutGroupsInput, Prisma.shared_debtsUncheckedCreateWithoutGroupsInput> | Prisma.shared_debtsCreateWithoutGroupsInput[] | Prisma.shared_debtsUncheckedCreateWithoutGroupsInput[];
    connectOrCreate?: Prisma.shared_debtsCreateOrConnectWithoutGroupsInput | Prisma.shared_debtsCreateOrConnectWithoutGroupsInput[];
    upsert?: Prisma.shared_debtsUpsertWithWhereUniqueWithoutGroupsInput | Prisma.shared_debtsUpsertWithWhereUniqueWithoutGroupsInput[];
    createMany?: Prisma.shared_debtsCreateManyGroupsInputEnvelope;
    set?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    disconnect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    delete?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    connect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    update?: Prisma.shared_debtsUpdateWithWhereUniqueWithoutGroupsInput | Prisma.shared_debtsUpdateWithWhereUniqueWithoutGroupsInput[];
    updateMany?: Prisma.shared_debtsUpdateManyWithWhereWithoutGroupsInput | Prisma.shared_debtsUpdateManyWithWhereWithoutGroupsInput[];
    deleteMany?: Prisma.shared_debtsScalarWhereInput | Prisma.shared_debtsScalarWhereInput[];
};
export type shared_debtsUncheckedUpdateManyWithoutGroupsNestedInput = {
    create?: Prisma.XOR<Prisma.shared_debtsCreateWithoutGroupsInput, Prisma.shared_debtsUncheckedCreateWithoutGroupsInput> | Prisma.shared_debtsCreateWithoutGroupsInput[] | Prisma.shared_debtsUncheckedCreateWithoutGroupsInput[];
    connectOrCreate?: Prisma.shared_debtsCreateOrConnectWithoutGroupsInput | Prisma.shared_debtsCreateOrConnectWithoutGroupsInput[];
    upsert?: Prisma.shared_debtsUpsertWithWhereUniqueWithoutGroupsInput | Prisma.shared_debtsUpsertWithWhereUniqueWithoutGroupsInput[];
    createMany?: Prisma.shared_debtsCreateManyGroupsInputEnvelope;
    set?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    disconnect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    delete?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    connect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    update?: Prisma.shared_debtsUpdateWithWhereUniqueWithoutGroupsInput | Prisma.shared_debtsUpdateWithWhereUniqueWithoutGroupsInput[];
    updateMany?: Prisma.shared_debtsUpdateManyWithWhereWithoutGroupsInput | Prisma.shared_debtsUpdateManyWithWhereWithoutGroupsInput[];
    deleteMany?: Prisma.shared_debtsScalarWhereInput | Prisma.shared_debtsScalarWhereInput[];
};
export type shared_debtsCreateNestedOneWithoutShared_debt_splitsInput = {
    create?: Prisma.XOR<Prisma.shared_debtsCreateWithoutShared_debt_splitsInput, Prisma.shared_debtsUncheckedCreateWithoutShared_debt_splitsInput>;
    connectOrCreate?: Prisma.shared_debtsCreateOrConnectWithoutShared_debt_splitsInput;
    connect?: Prisma.shared_debtsWhereUniqueInput;
};
export type shared_debtsUpdateOneRequiredWithoutShared_debt_splitsNestedInput = {
    create?: Prisma.XOR<Prisma.shared_debtsCreateWithoutShared_debt_splitsInput, Prisma.shared_debtsUncheckedCreateWithoutShared_debt_splitsInput>;
    connectOrCreate?: Prisma.shared_debtsCreateOrConnectWithoutShared_debt_splitsInput;
    upsert?: Prisma.shared_debtsUpsertWithoutShared_debt_splitsInput;
    connect?: Prisma.shared_debtsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.shared_debtsUpdateToOneWithWhereWithoutShared_debt_splitsInput, Prisma.shared_debtsUpdateWithoutShared_debt_splitsInput>, Prisma.shared_debtsUncheckedUpdateWithoutShared_debt_splitsInput>;
};
export type shared_debtsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.shared_debtsCreateWithoutUsersInput, Prisma.shared_debtsUncheckedCreateWithoutUsersInput> | Prisma.shared_debtsCreateWithoutUsersInput[] | Prisma.shared_debtsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.shared_debtsCreateOrConnectWithoutUsersInput | Prisma.shared_debtsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.shared_debtsCreateManyUsersInputEnvelope;
    connect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
};
export type shared_debtsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.shared_debtsCreateWithoutUsersInput, Prisma.shared_debtsUncheckedCreateWithoutUsersInput> | Prisma.shared_debtsCreateWithoutUsersInput[] | Prisma.shared_debtsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.shared_debtsCreateOrConnectWithoutUsersInput | Prisma.shared_debtsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.shared_debtsCreateManyUsersInputEnvelope;
    connect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
};
export type shared_debtsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.shared_debtsCreateWithoutUsersInput, Prisma.shared_debtsUncheckedCreateWithoutUsersInput> | Prisma.shared_debtsCreateWithoutUsersInput[] | Prisma.shared_debtsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.shared_debtsCreateOrConnectWithoutUsersInput | Prisma.shared_debtsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.shared_debtsUpsertWithWhereUniqueWithoutUsersInput | Prisma.shared_debtsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.shared_debtsCreateManyUsersInputEnvelope;
    set?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    disconnect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    delete?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    connect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    update?: Prisma.shared_debtsUpdateWithWhereUniqueWithoutUsersInput | Prisma.shared_debtsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.shared_debtsUpdateManyWithWhereWithoutUsersInput | Prisma.shared_debtsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.shared_debtsScalarWhereInput | Prisma.shared_debtsScalarWhereInput[];
};
export type shared_debtsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.shared_debtsCreateWithoutUsersInput, Prisma.shared_debtsUncheckedCreateWithoutUsersInput> | Prisma.shared_debtsCreateWithoutUsersInput[] | Prisma.shared_debtsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.shared_debtsCreateOrConnectWithoutUsersInput | Prisma.shared_debtsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.shared_debtsUpsertWithWhereUniqueWithoutUsersInput | Prisma.shared_debtsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.shared_debtsCreateManyUsersInputEnvelope;
    set?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    disconnect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    delete?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    connect?: Prisma.shared_debtsWhereUniqueInput | Prisma.shared_debtsWhereUniqueInput[];
    update?: Prisma.shared_debtsUpdateWithWhereUniqueWithoutUsersInput | Prisma.shared_debtsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.shared_debtsUpdateManyWithWhereWithoutUsersInput | Prisma.shared_debtsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.shared_debtsScalarWhereInput | Prisma.shared_debtsScalarWhereInput[];
};
export type shared_debtsCreateWithoutGroupsInput = {
    id?: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutShared_debtsInput;
    users: Prisma.usersCreateNestedOneWithoutShared_debtsInput;
};
export type shared_debtsUncheckedCreateWithoutGroupsInput = {
    id?: bigint | number;
    created_by: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutShared_debtsInput;
};
export type shared_debtsCreateOrConnectWithoutGroupsInput = {
    where: Prisma.shared_debtsWhereUniqueInput;
    create: Prisma.XOR<Prisma.shared_debtsCreateWithoutGroupsInput, Prisma.shared_debtsUncheckedCreateWithoutGroupsInput>;
};
export type shared_debtsCreateManyGroupsInputEnvelope = {
    data: Prisma.shared_debtsCreateManyGroupsInput | Prisma.shared_debtsCreateManyGroupsInput[];
    skipDuplicates?: boolean;
};
export type shared_debtsUpsertWithWhereUniqueWithoutGroupsInput = {
    where: Prisma.shared_debtsWhereUniqueInput;
    update: Prisma.XOR<Prisma.shared_debtsUpdateWithoutGroupsInput, Prisma.shared_debtsUncheckedUpdateWithoutGroupsInput>;
    create: Prisma.XOR<Prisma.shared_debtsCreateWithoutGroupsInput, Prisma.shared_debtsUncheckedCreateWithoutGroupsInput>;
};
export type shared_debtsUpdateWithWhereUniqueWithoutGroupsInput = {
    where: Prisma.shared_debtsWhereUniqueInput;
    data: Prisma.XOR<Prisma.shared_debtsUpdateWithoutGroupsInput, Prisma.shared_debtsUncheckedUpdateWithoutGroupsInput>;
};
export type shared_debtsUpdateManyWithWhereWithoutGroupsInput = {
    where: Prisma.shared_debtsScalarWhereInput;
    data: Prisma.XOR<Prisma.shared_debtsUpdateManyMutationInput, Prisma.shared_debtsUncheckedUpdateManyWithoutGroupsInput>;
};
export type shared_debtsScalarWhereInput = {
    AND?: Prisma.shared_debtsScalarWhereInput | Prisma.shared_debtsScalarWhereInput[];
    OR?: Prisma.shared_debtsScalarWhereInput[];
    NOT?: Prisma.shared_debtsScalarWhereInput | Prisma.shared_debtsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"shared_debts"> | bigint | number;
    group_id?: Prisma.BigIntFilter<"shared_debts"> | bigint | number;
    created_by?: Prisma.BigIntFilter<"shared_debts"> | bigint | number;
    title?: Prisma.StringFilter<"shared_debts"> | string;
    amount?: Prisma.DecimalFilter<"shared_debts"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFilter<"shared_debts"> | Date | string;
    created_at?: Prisma.DateTimeNullableFilter<"shared_debts"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"shared_debts"> | Date | string | null;
};
export type shared_debtsCreateWithoutShared_debt_splitsInput = {
    id?: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    users: Prisma.usersCreateNestedOneWithoutShared_debtsInput;
    groups: Prisma.groupsCreateNestedOneWithoutShared_debtsInput;
};
export type shared_debtsUncheckedCreateWithoutShared_debt_splitsInput = {
    id?: bigint | number;
    group_id: bigint | number;
    created_by: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type shared_debtsCreateOrConnectWithoutShared_debt_splitsInput = {
    where: Prisma.shared_debtsWhereUniqueInput;
    create: Prisma.XOR<Prisma.shared_debtsCreateWithoutShared_debt_splitsInput, Prisma.shared_debtsUncheckedCreateWithoutShared_debt_splitsInput>;
};
export type shared_debtsUpsertWithoutShared_debt_splitsInput = {
    update: Prisma.XOR<Prisma.shared_debtsUpdateWithoutShared_debt_splitsInput, Prisma.shared_debtsUncheckedUpdateWithoutShared_debt_splitsInput>;
    create: Prisma.XOR<Prisma.shared_debtsCreateWithoutShared_debt_splitsInput, Prisma.shared_debtsUncheckedCreateWithoutShared_debt_splitsInput>;
    where?: Prisma.shared_debtsWhereInput;
};
export type shared_debtsUpdateToOneWithWhereWithoutShared_debt_splitsInput = {
    where?: Prisma.shared_debtsWhereInput;
    data: Prisma.XOR<Prisma.shared_debtsUpdateWithoutShared_debt_splitsInput, Prisma.shared_debtsUncheckedUpdateWithoutShared_debt_splitsInput>;
};
export type shared_debtsUpdateWithoutShared_debt_splitsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneRequiredWithoutShared_debtsNestedInput;
    groups?: Prisma.groupsUpdateOneRequiredWithoutShared_debtsNestedInput;
};
export type shared_debtsUncheckedUpdateWithoutShared_debt_splitsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    group_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type shared_debtsCreateWithoutUsersInput = {
    id?: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsCreateNestedManyWithoutShared_debtsInput;
    groups: Prisma.groupsCreateNestedOneWithoutShared_debtsInput;
};
export type shared_debtsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    group_id: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedCreateNestedManyWithoutShared_debtsInput;
};
export type shared_debtsCreateOrConnectWithoutUsersInput = {
    where: Prisma.shared_debtsWhereUniqueInput;
    create: Prisma.XOR<Prisma.shared_debtsCreateWithoutUsersInput, Prisma.shared_debtsUncheckedCreateWithoutUsersInput>;
};
export type shared_debtsCreateManyUsersInputEnvelope = {
    data: Prisma.shared_debtsCreateManyUsersInput | Prisma.shared_debtsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type shared_debtsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.shared_debtsWhereUniqueInput;
    update: Prisma.XOR<Prisma.shared_debtsUpdateWithoutUsersInput, Prisma.shared_debtsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.shared_debtsCreateWithoutUsersInput, Prisma.shared_debtsUncheckedCreateWithoutUsersInput>;
};
export type shared_debtsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.shared_debtsWhereUniqueInput;
    data: Prisma.XOR<Prisma.shared_debtsUpdateWithoutUsersInput, Prisma.shared_debtsUncheckedUpdateWithoutUsersInput>;
};
export type shared_debtsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.shared_debtsScalarWhereInput;
    data: Prisma.XOR<Prisma.shared_debtsUpdateManyMutationInput, Prisma.shared_debtsUncheckedUpdateManyWithoutUsersInput>;
};
export type shared_debtsCreateManyGroupsInput = {
    id?: bigint | number;
    created_by: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type shared_debtsUpdateWithoutGroupsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutShared_debtsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutShared_debtsNestedInput;
};
export type shared_debtsUncheckedUpdateWithoutGroupsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutShared_debtsNestedInput;
};
export type shared_debtsUncheckedUpdateManyWithoutGroupsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type shared_debtsCreateManyUsersInput = {
    id?: bigint | number;
    group_id: bigint | number;
    title: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type shared_debtsUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsUpdateManyWithoutShared_debtsNestedInput;
    groups?: Prisma.groupsUpdateOneRequiredWithoutShared_debtsNestedInput;
};
export type shared_debtsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    group_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shared_debt_splits?: Prisma.shared_debt_splitsUncheckedUpdateManyWithoutShared_debtsNestedInput;
};
export type shared_debtsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    group_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Shared_debtsCountOutputType = {
    shared_debt_splits: number;
};
export type Shared_debtsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shared_debt_splits?: boolean | Shared_debtsCountOutputTypeCountShared_debt_splitsArgs;
};
export type Shared_debtsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Shared_debtsCountOutputTypeSelect<ExtArgs> | null;
};
export type Shared_debtsCountOutputTypeCountShared_debt_splitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.shared_debt_splitsWhereInput;
};
export type shared_debtsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    group_id?: boolean;
    created_by?: boolean;
    title?: boolean;
    amount?: boolean;
    date?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    shared_debt_splits?: boolean | Prisma.shared_debts$shared_debt_splitsArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.Shared_debtsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shared_debts"]>;
export type shared_debtsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    group_id?: boolean;
    created_by?: boolean;
    title?: boolean;
    amount?: boolean;
    date?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shared_debts"]>;
export type shared_debtsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    group_id?: boolean;
    created_by?: boolean;
    title?: boolean;
    amount?: boolean;
    date?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shared_debts"]>;
export type shared_debtsSelectScalar = {
    id?: boolean;
    group_id?: boolean;
    created_by?: boolean;
    title?: boolean;
    amount?: boolean;
    date?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type shared_debtsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "group_id" | "created_by" | "title" | "amount" | "date" | "created_at" | "updated_at", ExtArgs["result"]["shared_debts"]>;
export type shared_debtsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shared_debt_splits?: boolean | Prisma.shared_debts$shared_debt_splitsArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.Shared_debtsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type shared_debtsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
};
export type shared_debtsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    groups?: boolean | Prisma.groupsDefaultArgs<ExtArgs>;
};
export type $shared_debtsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "shared_debts";
    objects: {
        shared_debt_splits: Prisma.$shared_debt_splitsPayload<ExtArgs>[];
        users: Prisma.$usersPayload<ExtArgs>;
        groups: Prisma.$groupsPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        group_id: bigint;
        created_by: bigint;
        title: string;
        amount: runtime.Decimal;
        date: Date;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["shared_debts"]>;
    composites: {};
};
export type shared_debtsGetPayload<S extends boolean | null | undefined | shared_debtsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload, S>;
export type shared_debtsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<shared_debtsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Shared_debtsCountAggregateInputType | true;
};
export interface shared_debtsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['shared_debts'];
        meta: {
            name: 'shared_debts';
        };
    };
    findUnique<T extends shared_debtsFindUniqueArgs>(args: Prisma.SelectSubset<T, shared_debtsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__shared_debtsClient<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends shared_debtsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, shared_debtsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__shared_debtsClient<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends shared_debtsFindFirstArgs>(args?: Prisma.SelectSubset<T, shared_debtsFindFirstArgs<ExtArgs>>): Prisma.Prisma__shared_debtsClient<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends shared_debtsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, shared_debtsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__shared_debtsClient<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends shared_debtsFindManyArgs>(args?: Prisma.SelectSubset<T, shared_debtsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends shared_debtsCreateArgs>(args: Prisma.SelectSubset<T, shared_debtsCreateArgs<ExtArgs>>): Prisma.Prisma__shared_debtsClient<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends shared_debtsCreateManyArgs>(args?: Prisma.SelectSubset<T, shared_debtsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends shared_debtsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, shared_debtsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends shared_debtsDeleteArgs>(args: Prisma.SelectSubset<T, shared_debtsDeleteArgs<ExtArgs>>): Prisma.Prisma__shared_debtsClient<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends shared_debtsUpdateArgs>(args: Prisma.SelectSubset<T, shared_debtsUpdateArgs<ExtArgs>>): Prisma.Prisma__shared_debtsClient<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends shared_debtsDeleteManyArgs>(args?: Prisma.SelectSubset<T, shared_debtsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends shared_debtsUpdateManyArgs>(args: Prisma.SelectSubset<T, shared_debtsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends shared_debtsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, shared_debtsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends shared_debtsUpsertArgs>(args: Prisma.SelectSubset<T, shared_debtsUpsertArgs<ExtArgs>>): Prisma.Prisma__shared_debtsClient<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends shared_debtsCountArgs>(args?: Prisma.Subset<T, shared_debtsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Shared_debtsCountAggregateOutputType> : number>;
    aggregate<T extends Shared_debtsAggregateArgs>(args: Prisma.Subset<T, Shared_debtsAggregateArgs>): Prisma.PrismaPromise<GetShared_debtsAggregateType<T>>;
    groupBy<T extends shared_debtsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: shared_debtsGroupByArgs['orderBy'];
    } : {
        orderBy?: shared_debtsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, shared_debtsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShared_debtsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: shared_debtsFieldRefs;
}
export interface Prisma__shared_debtsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shared_debt_splits<T extends Prisma.shared_debts$shared_debt_splitsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.shared_debts$shared_debt_splitsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    groups<T extends Prisma.groupsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.groupsDefaultArgs<ExtArgs>>): Prisma.Prisma__groupsClient<runtime.Types.Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface shared_debtsFieldRefs {
    readonly id: Prisma.FieldRef<"shared_debts", 'BigInt'>;
    readonly group_id: Prisma.FieldRef<"shared_debts", 'BigInt'>;
    readonly created_by: Prisma.FieldRef<"shared_debts", 'BigInt'>;
    readonly title: Prisma.FieldRef<"shared_debts", 'String'>;
    readonly amount: Prisma.FieldRef<"shared_debts", 'Decimal'>;
    readonly date: Prisma.FieldRef<"shared_debts", 'DateTime'>;
    readonly created_at: Prisma.FieldRef<"shared_debts", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"shared_debts", 'DateTime'>;
}
export type shared_debtsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debtsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debtsOmit<ExtArgs> | null;
    include?: Prisma.shared_debtsInclude<ExtArgs> | null;
    where: Prisma.shared_debtsWhereUniqueInput;
};
export type shared_debtsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debtsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debtsOmit<ExtArgs> | null;
    include?: Prisma.shared_debtsInclude<ExtArgs> | null;
    where: Prisma.shared_debtsWhereUniqueInput;
};
export type shared_debtsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type shared_debtsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type shared_debtsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type shared_debtsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debtsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debtsOmit<ExtArgs> | null;
    include?: Prisma.shared_debtsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.shared_debtsCreateInput, Prisma.shared_debtsUncheckedCreateInput>;
};
export type shared_debtsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.shared_debtsCreateManyInput | Prisma.shared_debtsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type shared_debtsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debtsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.shared_debtsOmit<ExtArgs> | null;
    data: Prisma.shared_debtsCreateManyInput | Prisma.shared_debtsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.shared_debtsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type shared_debtsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debtsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debtsOmit<ExtArgs> | null;
    include?: Prisma.shared_debtsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.shared_debtsUpdateInput, Prisma.shared_debtsUncheckedUpdateInput>;
    where: Prisma.shared_debtsWhereUniqueInput;
};
export type shared_debtsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.shared_debtsUpdateManyMutationInput, Prisma.shared_debtsUncheckedUpdateManyInput>;
    where?: Prisma.shared_debtsWhereInput;
    limit?: number;
};
export type shared_debtsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debtsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.shared_debtsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.shared_debtsUpdateManyMutationInput, Prisma.shared_debtsUncheckedUpdateManyInput>;
    where?: Prisma.shared_debtsWhereInput;
    limit?: number;
    include?: Prisma.shared_debtsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type shared_debtsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debtsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debtsOmit<ExtArgs> | null;
    include?: Prisma.shared_debtsInclude<ExtArgs> | null;
    where: Prisma.shared_debtsWhereUniqueInput;
    create: Prisma.XOR<Prisma.shared_debtsCreateInput, Prisma.shared_debtsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.shared_debtsUpdateInput, Prisma.shared_debtsUncheckedUpdateInput>;
};
export type shared_debtsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debtsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debtsOmit<ExtArgs> | null;
    include?: Prisma.shared_debtsInclude<ExtArgs> | null;
    where: Prisma.shared_debtsWhereUniqueInput;
};
export type shared_debtsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.shared_debtsWhereInput;
    limit?: number;
};
export type shared_debts$shared_debt_splitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type shared_debtsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debtsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debtsOmit<ExtArgs> | null;
    include?: Prisma.shared_debtsInclude<ExtArgs> | null;
};
