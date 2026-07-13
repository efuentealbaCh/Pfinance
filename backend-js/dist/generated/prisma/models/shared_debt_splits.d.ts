import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type shared_debt_splitsModel = runtime.Types.Result.DefaultSelection<Prisma.$shared_debt_splitsPayload>;
export type AggregateShared_debt_splits = {
    _count: Shared_debt_splitsCountAggregateOutputType | null;
    _avg: Shared_debt_splitsAvgAggregateOutputType | null;
    _sum: Shared_debt_splitsSumAggregateOutputType | null;
    _min: Shared_debt_splitsMinAggregateOutputType | null;
    _max: Shared_debt_splitsMaxAggregateOutputType | null;
};
export type Shared_debt_splitsAvgAggregateOutputType = {
    id: number | null;
    shared_debt_id: number | null;
    user_id: number | null;
    percentage: runtime.Decimal | null;
    amount_owed: runtime.Decimal | null;
};
export type Shared_debt_splitsSumAggregateOutputType = {
    id: bigint | null;
    shared_debt_id: bigint | null;
    user_id: bigint | null;
    percentage: runtime.Decimal | null;
    amount_owed: runtime.Decimal | null;
};
export type Shared_debt_splitsMinAggregateOutputType = {
    id: bigint | null;
    shared_debt_id: bigint | null;
    user_id: bigint | null;
    percentage: runtime.Decimal | null;
    amount_owed: runtime.Decimal | null;
    is_paid: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Shared_debt_splitsMaxAggregateOutputType = {
    id: bigint | null;
    shared_debt_id: bigint | null;
    user_id: bigint | null;
    percentage: runtime.Decimal | null;
    amount_owed: runtime.Decimal | null;
    is_paid: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Shared_debt_splitsCountAggregateOutputType = {
    id: number;
    shared_debt_id: number;
    user_id: number;
    percentage: number;
    amount_owed: number;
    is_paid: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Shared_debt_splitsAvgAggregateInputType = {
    id?: true;
    shared_debt_id?: true;
    user_id?: true;
    percentage?: true;
    amount_owed?: true;
};
export type Shared_debt_splitsSumAggregateInputType = {
    id?: true;
    shared_debt_id?: true;
    user_id?: true;
    percentage?: true;
    amount_owed?: true;
};
export type Shared_debt_splitsMinAggregateInputType = {
    id?: true;
    shared_debt_id?: true;
    user_id?: true;
    percentage?: true;
    amount_owed?: true;
    is_paid?: true;
    created_at?: true;
    updated_at?: true;
};
export type Shared_debt_splitsMaxAggregateInputType = {
    id?: true;
    shared_debt_id?: true;
    user_id?: true;
    percentage?: true;
    amount_owed?: true;
    is_paid?: true;
    created_at?: true;
    updated_at?: true;
};
export type Shared_debt_splitsCountAggregateInputType = {
    id?: true;
    shared_debt_id?: true;
    user_id?: true;
    percentage?: true;
    amount_owed?: true;
    is_paid?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Shared_debt_splitsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.shared_debt_splitsWhereInput;
    orderBy?: Prisma.shared_debt_splitsOrderByWithRelationInput | Prisma.shared_debt_splitsOrderByWithRelationInput[];
    cursor?: Prisma.shared_debt_splitsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Shared_debt_splitsCountAggregateInputType;
    _avg?: Shared_debt_splitsAvgAggregateInputType;
    _sum?: Shared_debt_splitsSumAggregateInputType;
    _min?: Shared_debt_splitsMinAggregateInputType;
    _max?: Shared_debt_splitsMaxAggregateInputType;
};
export type GetShared_debt_splitsAggregateType<T extends Shared_debt_splitsAggregateArgs> = {
    [P in keyof T & keyof AggregateShared_debt_splits]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShared_debt_splits[P]> : Prisma.GetScalarType<T[P], AggregateShared_debt_splits[P]>;
};
export type shared_debt_splitsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.shared_debt_splitsWhereInput;
    orderBy?: Prisma.shared_debt_splitsOrderByWithAggregationInput | Prisma.shared_debt_splitsOrderByWithAggregationInput[];
    by: Prisma.Shared_debt_splitsScalarFieldEnum[] | Prisma.Shared_debt_splitsScalarFieldEnum;
    having?: Prisma.shared_debt_splitsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Shared_debt_splitsCountAggregateInputType | true;
    _avg?: Shared_debt_splitsAvgAggregateInputType;
    _sum?: Shared_debt_splitsSumAggregateInputType;
    _min?: Shared_debt_splitsMinAggregateInputType;
    _max?: Shared_debt_splitsMaxAggregateInputType;
};
export type Shared_debt_splitsGroupByOutputType = {
    id: bigint;
    shared_debt_id: bigint;
    user_id: bigint;
    percentage: runtime.Decimal;
    amount_owed: runtime.Decimal;
    is_paid: boolean;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Shared_debt_splitsCountAggregateOutputType | null;
    _avg: Shared_debt_splitsAvgAggregateOutputType | null;
    _sum: Shared_debt_splitsSumAggregateOutputType | null;
    _min: Shared_debt_splitsMinAggregateOutputType | null;
    _max: Shared_debt_splitsMaxAggregateOutputType | null;
};
export type GetShared_debt_splitsGroupByPayload<T extends shared_debt_splitsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Shared_debt_splitsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Shared_debt_splitsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Shared_debt_splitsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Shared_debt_splitsGroupByOutputType[P]>;
}>>;
export type shared_debt_splitsWhereInput = {
    AND?: Prisma.shared_debt_splitsWhereInput | Prisma.shared_debt_splitsWhereInput[];
    OR?: Prisma.shared_debt_splitsWhereInput[];
    NOT?: Prisma.shared_debt_splitsWhereInput | Prisma.shared_debt_splitsWhereInput[];
    id?: Prisma.BigIntFilter<"shared_debt_splits"> | bigint | number;
    shared_debt_id?: Prisma.BigIntFilter<"shared_debt_splits"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"shared_debt_splits"> | bigint | number;
    percentage?: Prisma.DecimalFilter<"shared_debt_splits"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFilter<"shared_debt_splits"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFilter<"shared_debt_splits"> | boolean;
    created_at?: Prisma.DateTimeNullableFilter<"shared_debt_splits"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"shared_debt_splits"> | Date | string | null;
    shared_debts?: Prisma.XOR<Prisma.Shared_debtsScalarRelationFilter, Prisma.shared_debtsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type shared_debt_splitsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shared_debt_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount_owed?: Prisma.SortOrder;
    is_paid?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    shared_debts?: Prisma.shared_debtsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type shared_debt_splitsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.shared_debt_splitsWhereInput | Prisma.shared_debt_splitsWhereInput[];
    OR?: Prisma.shared_debt_splitsWhereInput[];
    NOT?: Prisma.shared_debt_splitsWhereInput | Prisma.shared_debt_splitsWhereInput[];
    shared_debt_id?: Prisma.BigIntFilter<"shared_debt_splits"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"shared_debt_splits"> | bigint | number;
    percentage?: Prisma.DecimalFilter<"shared_debt_splits"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFilter<"shared_debt_splits"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFilter<"shared_debt_splits"> | boolean;
    created_at?: Prisma.DateTimeNullableFilter<"shared_debt_splits"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"shared_debt_splits"> | Date | string | null;
    shared_debts?: Prisma.XOR<Prisma.Shared_debtsScalarRelationFilter, Prisma.shared_debtsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type shared_debt_splitsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shared_debt_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount_owed?: Prisma.SortOrder;
    is_paid?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.shared_debt_splitsCountOrderByAggregateInput;
    _avg?: Prisma.shared_debt_splitsAvgOrderByAggregateInput;
    _max?: Prisma.shared_debt_splitsMaxOrderByAggregateInput;
    _min?: Prisma.shared_debt_splitsMinOrderByAggregateInput;
    _sum?: Prisma.shared_debt_splitsSumOrderByAggregateInput;
};
export type shared_debt_splitsScalarWhereWithAggregatesInput = {
    AND?: Prisma.shared_debt_splitsScalarWhereWithAggregatesInput | Prisma.shared_debt_splitsScalarWhereWithAggregatesInput[];
    OR?: Prisma.shared_debt_splitsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.shared_debt_splitsScalarWhereWithAggregatesInput | Prisma.shared_debt_splitsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"shared_debt_splits"> | bigint | number;
    shared_debt_id?: Prisma.BigIntWithAggregatesFilter<"shared_debt_splits"> | bigint | number;
    user_id?: Prisma.BigIntWithAggregatesFilter<"shared_debt_splits"> | bigint | number;
    percentage?: Prisma.DecimalWithAggregatesFilter<"shared_debt_splits"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalWithAggregatesFilter<"shared_debt_splits"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolWithAggregatesFilter<"shared_debt_splits"> | boolean;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"shared_debt_splits"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"shared_debt_splits"> | Date | string | null;
};
export type shared_debt_splitsCreateInput = {
    id?: bigint | number;
    percentage: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    shared_debts: Prisma.shared_debtsCreateNestedOneWithoutShared_debt_splitsInput;
    users: Prisma.usersCreateNestedOneWithoutShared_debt_splitsInput;
};
export type shared_debt_splitsUncheckedCreateInput = {
    id?: bigint | number;
    shared_debt_id: bigint | number;
    user_id: bigint | number;
    percentage: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type shared_debt_splitsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    percentage?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shared_debts?: Prisma.shared_debtsUpdateOneRequiredWithoutShared_debt_splitsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutShared_debt_splitsNestedInput;
};
export type shared_debt_splitsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    shared_debt_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    percentage?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type shared_debt_splitsCreateManyInput = {
    id?: bigint | number;
    shared_debt_id: bigint | number;
    user_id: bigint | number;
    percentage: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type shared_debt_splitsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    percentage?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type shared_debt_splitsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    shared_debt_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    percentage?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type shared_debt_splitsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shared_debt_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount_owed?: Prisma.SortOrder;
    is_paid?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type shared_debt_splitsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shared_debt_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount_owed?: Prisma.SortOrder;
};
export type shared_debt_splitsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shared_debt_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount_owed?: Prisma.SortOrder;
    is_paid?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type shared_debt_splitsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shared_debt_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount_owed?: Prisma.SortOrder;
    is_paid?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type shared_debt_splitsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shared_debt_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount_owed?: Prisma.SortOrder;
};
export type Shared_debt_splitsListRelationFilter = {
    every?: Prisma.shared_debt_splitsWhereInput;
    some?: Prisma.shared_debt_splitsWhereInput;
    none?: Prisma.shared_debt_splitsWhereInput;
};
export type shared_debt_splitsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type shared_debt_splitsCreateNestedManyWithoutShared_debtsInput = {
    create?: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutShared_debtsInput, Prisma.shared_debt_splitsUncheckedCreateWithoutShared_debtsInput> | Prisma.shared_debt_splitsCreateWithoutShared_debtsInput[] | Prisma.shared_debt_splitsUncheckedCreateWithoutShared_debtsInput[];
    connectOrCreate?: Prisma.shared_debt_splitsCreateOrConnectWithoutShared_debtsInput | Prisma.shared_debt_splitsCreateOrConnectWithoutShared_debtsInput[];
    createMany?: Prisma.shared_debt_splitsCreateManyShared_debtsInputEnvelope;
    connect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
};
export type shared_debt_splitsUncheckedCreateNestedManyWithoutShared_debtsInput = {
    create?: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutShared_debtsInput, Prisma.shared_debt_splitsUncheckedCreateWithoutShared_debtsInput> | Prisma.shared_debt_splitsCreateWithoutShared_debtsInput[] | Prisma.shared_debt_splitsUncheckedCreateWithoutShared_debtsInput[];
    connectOrCreate?: Prisma.shared_debt_splitsCreateOrConnectWithoutShared_debtsInput | Prisma.shared_debt_splitsCreateOrConnectWithoutShared_debtsInput[];
    createMany?: Prisma.shared_debt_splitsCreateManyShared_debtsInputEnvelope;
    connect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
};
export type shared_debt_splitsUpdateManyWithoutShared_debtsNestedInput = {
    create?: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutShared_debtsInput, Prisma.shared_debt_splitsUncheckedCreateWithoutShared_debtsInput> | Prisma.shared_debt_splitsCreateWithoutShared_debtsInput[] | Prisma.shared_debt_splitsUncheckedCreateWithoutShared_debtsInput[];
    connectOrCreate?: Prisma.shared_debt_splitsCreateOrConnectWithoutShared_debtsInput | Prisma.shared_debt_splitsCreateOrConnectWithoutShared_debtsInput[];
    upsert?: Prisma.shared_debt_splitsUpsertWithWhereUniqueWithoutShared_debtsInput | Prisma.shared_debt_splitsUpsertWithWhereUniqueWithoutShared_debtsInput[];
    createMany?: Prisma.shared_debt_splitsCreateManyShared_debtsInputEnvelope;
    set?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    disconnect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    delete?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    connect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    update?: Prisma.shared_debt_splitsUpdateWithWhereUniqueWithoutShared_debtsInput | Prisma.shared_debt_splitsUpdateWithWhereUniqueWithoutShared_debtsInput[];
    updateMany?: Prisma.shared_debt_splitsUpdateManyWithWhereWithoutShared_debtsInput | Prisma.shared_debt_splitsUpdateManyWithWhereWithoutShared_debtsInput[];
    deleteMany?: Prisma.shared_debt_splitsScalarWhereInput | Prisma.shared_debt_splitsScalarWhereInput[];
};
export type shared_debt_splitsUncheckedUpdateManyWithoutShared_debtsNestedInput = {
    create?: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutShared_debtsInput, Prisma.shared_debt_splitsUncheckedCreateWithoutShared_debtsInput> | Prisma.shared_debt_splitsCreateWithoutShared_debtsInput[] | Prisma.shared_debt_splitsUncheckedCreateWithoutShared_debtsInput[];
    connectOrCreate?: Prisma.shared_debt_splitsCreateOrConnectWithoutShared_debtsInput | Prisma.shared_debt_splitsCreateOrConnectWithoutShared_debtsInput[];
    upsert?: Prisma.shared_debt_splitsUpsertWithWhereUniqueWithoutShared_debtsInput | Prisma.shared_debt_splitsUpsertWithWhereUniqueWithoutShared_debtsInput[];
    createMany?: Prisma.shared_debt_splitsCreateManyShared_debtsInputEnvelope;
    set?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    disconnect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    delete?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    connect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    update?: Prisma.shared_debt_splitsUpdateWithWhereUniqueWithoutShared_debtsInput | Prisma.shared_debt_splitsUpdateWithWhereUniqueWithoutShared_debtsInput[];
    updateMany?: Prisma.shared_debt_splitsUpdateManyWithWhereWithoutShared_debtsInput | Prisma.shared_debt_splitsUpdateManyWithWhereWithoutShared_debtsInput[];
    deleteMany?: Prisma.shared_debt_splitsScalarWhereInput | Prisma.shared_debt_splitsScalarWhereInput[];
};
export type shared_debt_splitsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutUsersInput, Prisma.shared_debt_splitsUncheckedCreateWithoutUsersInput> | Prisma.shared_debt_splitsCreateWithoutUsersInput[] | Prisma.shared_debt_splitsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.shared_debt_splitsCreateOrConnectWithoutUsersInput | Prisma.shared_debt_splitsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.shared_debt_splitsCreateManyUsersInputEnvelope;
    connect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
};
export type shared_debt_splitsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutUsersInput, Prisma.shared_debt_splitsUncheckedCreateWithoutUsersInput> | Prisma.shared_debt_splitsCreateWithoutUsersInput[] | Prisma.shared_debt_splitsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.shared_debt_splitsCreateOrConnectWithoutUsersInput | Prisma.shared_debt_splitsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.shared_debt_splitsCreateManyUsersInputEnvelope;
    connect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
};
export type shared_debt_splitsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutUsersInput, Prisma.shared_debt_splitsUncheckedCreateWithoutUsersInput> | Prisma.shared_debt_splitsCreateWithoutUsersInput[] | Prisma.shared_debt_splitsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.shared_debt_splitsCreateOrConnectWithoutUsersInput | Prisma.shared_debt_splitsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.shared_debt_splitsUpsertWithWhereUniqueWithoutUsersInput | Prisma.shared_debt_splitsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.shared_debt_splitsCreateManyUsersInputEnvelope;
    set?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    disconnect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    delete?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    connect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    update?: Prisma.shared_debt_splitsUpdateWithWhereUniqueWithoutUsersInput | Prisma.shared_debt_splitsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.shared_debt_splitsUpdateManyWithWhereWithoutUsersInput | Prisma.shared_debt_splitsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.shared_debt_splitsScalarWhereInput | Prisma.shared_debt_splitsScalarWhereInput[];
};
export type shared_debt_splitsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutUsersInput, Prisma.shared_debt_splitsUncheckedCreateWithoutUsersInput> | Prisma.shared_debt_splitsCreateWithoutUsersInput[] | Prisma.shared_debt_splitsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.shared_debt_splitsCreateOrConnectWithoutUsersInput | Prisma.shared_debt_splitsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.shared_debt_splitsUpsertWithWhereUniqueWithoutUsersInput | Prisma.shared_debt_splitsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.shared_debt_splitsCreateManyUsersInputEnvelope;
    set?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    disconnect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    delete?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    connect?: Prisma.shared_debt_splitsWhereUniqueInput | Prisma.shared_debt_splitsWhereUniqueInput[];
    update?: Prisma.shared_debt_splitsUpdateWithWhereUniqueWithoutUsersInput | Prisma.shared_debt_splitsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.shared_debt_splitsUpdateManyWithWhereWithoutUsersInput | Prisma.shared_debt_splitsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.shared_debt_splitsScalarWhereInput | Prisma.shared_debt_splitsScalarWhereInput[];
};
export type shared_debt_splitsCreateWithoutShared_debtsInput = {
    id?: bigint | number;
    percentage: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    users: Prisma.usersCreateNestedOneWithoutShared_debt_splitsInput;
};
export type shared_debt_splitsUncheckedCreateWithoutShared_debtsInput = {
    id?: bigint | number;
    user_id: bigint | number;
    percentage: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type shared_debt_splitsCreateOrConnectWithoutShared_debtsInput = {
    where: Prisma.shared_debt_splitsWhereUniqueInput;
    create: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutShared_debtsInput, Prisma.shared_debt_splitsUncheckedCreateWithoutShared_debtsInput>;
};
export type shared_debt_splitsCreateManyShared_debtsInputEnvelope = {
    data: Prisma.shared_debt_splitsCreateManyShared_debtsInput | Prisma.shared_debt_splitsCreateManyShared_debtsInput[];
    skipDuplicates?: boolean;
};
export type shared_debt_splitsUpsertWithWhereUniqueWithoutShared_debtsInput = {
    where: Prisma.shared_debt_splitsWhereUniqueInput;
    update: Prisma.XOR<Prisma.shared_debt_splitsUpdateWithoutShared_debtsInput, Prisma.shared_debt_splitsUncheckedUpdateWithoutShared_debtsInput>;
    create: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutShared_debtsInput, Prisma.shared_debt_splitsUncheckedCreateWithoutShared_debtsInput>;
};
export type shared_debt_splitsUpdateWithWhereUniqueWithoutShared_debtsInput = {
    where: Prisma.shared_debt_splitsWhereUniqueInput;
    data: Prisma.XOR<Prisma.shared_debt_splitsUpdateWithoutShared_debtsInput, Prisma.shared_debt_splitsUncheckedUpdateWithoutShared_debtsInput>;
};
export type shared_debt_splitsUpdateManyWithWhereWithoutShared_debtsInput = {
    where: Prisma.shared_debt_splitsScalarWhereInput;
    data: Prisma.XOR<Prisma.shared_debt_splitsUpdateManyMutationInput, Prisma.shared_debt_splitsUncheckedUpdateManyWithoutShared_debtsInput>;
};
export type shared_debt_splitsScalarWhereInput = {
    AND?: Prisma.shared_debt_splitsScalarWhereInput | Prisma.shared_debt_splitsScalarWhereInput[];
    OR?: Prisma.shared_debt_splitsScalarWhereInput[];
    NOT?: Prisma.shared_debt_splitsScalarWhereInput | Prisma.shared_debt_splitsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"shared_debt_splits"> | bigint | number;
    shared_debt_id?: Prisma.BigIntFilter<"shared_debt_splits"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"shared_debt_splits"> | bigint | number;
    percentage?: Prisma.DecimalFilter<"shared_debt_splits"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFilter<"shared_debt_splits"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFilter<"shared_debt_splits"> | boolean;
    created_at?: Prisma.DateTimeNullableFilter<"shared_debt_splits"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"shared_debt_splits"> | Date | string | null;
};
export type shared_debt_splitsCreateWithoutUsersInput = {
    id?: bigint | number;
    percentage: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    shared_debts: Prisma.shared_debtsCreateNestedOneWithoutShared_debt_splitsInput;
};
export type shared_debt_splitsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    shared_debt_id: bigint | number;
    percentage: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type shared_debt_splitsCreateOrConnectWithoutUsersInput = {
    where: Prisma.shared_debt_splitsWhereUniqueInput;
    create: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutUsersInput, Prisma.shared_debt_splitsUncheckedCreateWithoutUsersInput>;
};
export type shared_debt_splitsCreateManyUsersInputEnvelope = {
    data: Prisma.shared_debt_splitsCreateManyUsersInput | Prisma.shared_debt_splitsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type shared_debt_splitsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.shared_debt_splitsWhereUniqueInput;
    update: Prisma.XOR<Prisma.shared_debt_splitsUpdateWithoutUsersInput, Prisma.shared_debt_splitsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.shared_debt_splitsCreateWithoutUsersInput, Prisma.shared_debt_splitsUncheckedCreateWithoutUsersInput>;
};
export type shared_debt_splitsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.shared_debt_splitsWhereUniqueInput;
    data: Prisma.XOR<Prisma.shared_debt_splitsUpdateWithoutUsersInput, Prisma.shared_debt_splitsUncheckedUpdateWithoutUsersInput>;
};
export type shared_debt_splitsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.shared_debt_splitsScalarWhereInput;
    data: Prisma.XOR<Prisma.shared_debt_splitsUpdateManyMutationInput, Prisma.shared_debt_splitsUncheckedUpdateManyWithoutUsersInput>;
};
export type shared_debt_splitsCreateManyShared_debtsInput = {
    id?: bigint | number;
    user_id: bigint | number;
    percentage: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type shared_debt_splitsUpdateWithoutShared_debtsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    percentage?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneRequiredWithoutShared_debt_splitsNestedInput;
};
export type shared_debt_splitsUncheckedUpdateWithoutShared_debtsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    percentage?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type shared_debt_splitsUncheckedUpdateManyWithoutShared_debtsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    percentage?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type shared_debt_splitsCreateManyUsersInput = {
    id?: bigint | number;
    shared_debt_id: bigint | number;
    percentage: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: boolean;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type shared_debt_splitsUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    percentage?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shared_debts?: Prisma.shared_debtsUpdateOneRequiredWithoutShared_debt_splitsNestedInput;
};
export type shared_debt_splitsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    shared_debt_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    percentage?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type shared_debt_splitsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    shared_debt_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    percentage?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount_owed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    is_paid?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type shared_debt_splitsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shared_debt_id?: boolean;
    user_id?: boolean;
    percentage?: boolean;
    amount_owed?: boolean;
    is_paid?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    shared_debts?: boolean | Prisma.shared_debtsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shared_debt_splits"]>;
export type shared_debt_splitsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shared_debt_id?: boolean;
    user_id?: boolean;
    percentage?: boolean;
    amount_owed?: boolean;
    is_paid?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    shared_debts?: boolean | Prisma.shared_debtsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shared_debt_splits"]>;
export type shared_debt_splitsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shared_debt_id?: boolean;
    user_id?: boolean;
    percentage?: boolean;
    amount_owed?: boolean;
    is_paid?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    shared_debts?: boolean | Prisma.shared_debtsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shared_debt_splits"]>;
export type shared_debt_splitsSelectScalar = {
    id?: boolean;
    shared_debt_id?: boolean;
    user_id?: boolean;
    percentage?: boolean;
    amount_owed?: boolean;
    is_paid?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type shared_debt_splitsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shared_debt_id" | "user_id" | "percentage" | "amount_owed" | "is_paid" | "created_at" | "updated_at", ExtArgs["result"]["shared_debt_splits"]>;
export type shared_debt_splitsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shared_debts?: boolean | Prisma.shared_debtsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type shared_debt_splitsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shared_debts?: boolean | Prisma.shared_debtsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type shared_debt_splitsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shared_debts?: boolean | Prisma.shared_debtsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $shared_debt_splitsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "shared_debt_splits";
    objects: {
        shared_debts: Prisma.$shared_debtsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        shared_debt_id: bigint;
        user_id: bigint;
        percentage: runtime.Decimal;
        amount_owed: runtime.Decimal;
        is_paid: boolean;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["shared_debt_splits"]>;
    composites: {};
};
export type shared_debt_splitsGetPayload<S extends boolean | null | undefined | shared_debt_splitsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload, S>;
export type shared_debt_splitsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<shared_debt_splitsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Shared_debt_splitsCountAggregateInputType | true;
};
export interface shared_debt_splitsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['shared_debt_splits'];
        meta: {
            name: 'shared_debt_splits';
        };
    };
    findUnique<T extends shared_debt_splitsFindUniqueArgs>(args: Prisma.SelectSubset<T, shared_debt_splitsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__shared_debt_splitsClient<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends shared_debt_splitsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, shared_debt_splitsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__shared_debt_splitsClient<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends shared_debt_splitsFindFirstArgs>(args?: Prisma.SelectSubset<T, shared_debt_splitsFindFirstArgs<ExtArgs>>): Prisma.Prisma__shared_debt_splitsClient<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends shared_debt_splitsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, shared_debt_splitsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__shared_debt_splitsClient<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends shared_debt_splitsFindManyArgs>(args?: Prisma.SelectSubset<T, shared_debt_splitsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends shared_debt_splitsCreateArgs>(args: Prisma.SelectSubset<T, shared_debt_splitsCreateArgs<ExtArgs>>): Prisma.Prisma__shared_debt_splitsClient<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends shared_debt_splitsCreateManyArgs>(args?: Prisma.SelectSubset<T, shared_debt_splitsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends shared_debt_splitsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, shared_debt_splitsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends shared_debt_splitsDeleteArgs>(args: Prisma.SelectSubset<T, shared_debt_splitsDeleteArgs<ExtArgs>>): Prisma.Prisma__shared_debt_splitsClient<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends shared_debt_splitsUpdateArgs>(args: Prisma.SelectSubset<T, shared_debt_splitsUpdateArgs<ExtArgs>>): Prisma.Prisma__shared_debt_splitsClient<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends shared_debt_splitsDeleteManyArgs>(args?: Prisma.SelectSubset<T, shared_debt_splitsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends shared_debt_splitsUpdateManyArgs>(args: Prisma.SelectSubset<T, shared_debt_splitsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends shared_debt_splitsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, shared_debt_splitsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends shared_debt_splitsUpsertArgs>(args: Prisma.SelectSubset<T, shared_debt_splitsUpsertArgs<ExtArgs>>): Prisma.Prisma__shared_debt_splitsClient<runtime.Types.Result.GetResult<Prisma.$shared_debt_splitsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends shared_debt_splitsCountArgs>(args?: Prisma.Subset<T, shared_debt_splitsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Shared_debt_splitsCountAggregateOutputType> : number>;
    aggregate<T extends Shared_debt_splitsAggregateArgs>(args: Prisma.Subset<T, Shared_debt_splitsAggregateArgs>): Prisma.PrismaPromise<GetShared_debt_splitsAggregateType<T>>;
    groupBy<T extends shared_debt_splitsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: shared_debt_splitsGroupByArgs['orderBy'];
    } : {
        orderBy?: shared_debt_splitsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, shared_debt_splitsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShared_debt_splitsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: shared_debt_splitsFieldRefs;
}
export interface Prisma__shared_debt_splitsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shared_debts<T extends Prisma.shared_debtsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.shared_debtsDefaultArgs<ExtArgs>>): Prisma.Prisma__shared_debtsClient<runtime.Types.Result.GetResult<Prisma.$shared_debtsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface shared_debt_splitsFieldRefs {
    readonly id: Prisma.FieldRef<"shared_debt_splits", 'BigInt'>;
    readonly shared_debt_id: Prisma.FieldRef<"shared_debt_splits", 'BigInt'>;
    readonly user_id: Prisma.FieldRef<"shared_debt_splits", 'BigInt'>;
    readonly percentage: Prisma.FieldRef<"shared_debt_splits", 'Decimal'>;
    readonly amount_owed: Prisma.FieldRef<"shared_debt_splits", 'Decimal'>;
    readonly is_paid: Prisma.FieldRef<"shared_debt_splits", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"shared_debt_splits", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"shared_debt_splits", 'DateTime'>;
}
export type shared_debt_splitsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debt_splitsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debt_splitsOmit<ExtArgs> | null;
    include?: Prisma.shared_debt_splitsInclude<ExtArgs> | null;
    where: Prisma.shared_debt_splitsWhereUniqueInput;
};
export type shared_debt_splitsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debt_splitsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debt_splitsOmit<ExtArgs> | null;
    include?: Prisma.shared_debt_splitsInclude<ExtArgs> | null;
    where: Prisma.shared_debt_splitsWhereUniqueInput;
};
export type shared_debt_splitsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type shared_debt_splitsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type shared_debt_splitsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type shared_debt_splitsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debt_splitsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debt_splitsOmit<ExtArgs> | null;
    include?: Prisma.shared_debt_splitsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.shared_debt_splitsCreateInput, Prisma.shared_debt_splitsUncheckedCreateInput>;
};
export type shared_debt_splitsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.shared_debt_splitsCreateManyInput | Prisma.shared_debt_splitsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type shared_debt_splitsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debt_splitsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.shared_debt_splitsOmit<ExtArgs> | null;
    data: Prisma.shared_debt_splitsCreateManyInput | Prisma.shared_debt_splitsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.shared_debt_splitsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type shared_debt_splitsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debt_splitsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debt_splitsOmit<ExtArgs> | null;
    include?: Prisma.shared_debt_splitsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.shared_debt_splitsUpdateInput, Prisma.shared_debt_splitsUncheckedUpdateInput>;
    where: Prisma.shared_debt_splitsWhereUniqueInput;
};
export type shared_debt_splitsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.shared_debt_splitsUpdateManyMutationInput, Prisma.shared_debt_splitsUncheckedUpdateManyInput>;
    where?: Prisma.shared_debt_splitsWhereInput;
    limit?: number;
};
export type shared_debt_splitsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debt_splitsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.shared_debt_splitsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.shared_debt_splitsUpdateManyMutationInput, Prisma.shared_debt_splitsUncheckedUpdateManyInput>;
    where?: Prisma.shared_debt_splitsWhereInput;
    limit?: number;
    include?: Prisma.shared_debt_splitsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type shared_debt_splitsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debt_splitsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debt_splitsOmit<ExtArgs> | null;
    include?: Prisma.shared_debt_splitsInclude<ExtArgs> | null;
    where: Prisma.shared_debt_splitsWhereUniqueInput;
    create: Prisma.XOR<Prisma.shared_debt_splitsCreateInput, Prisma.shared_debt_splitsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.shared_debt_splitsUpdateInput, Prisma.shared_debt_splitsUncheckedUpdateInput>;
};
export type shared_debt_splitsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debt_splitsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debt_splitsOmit<ExtArgs> | null;
    include?: Prisma.shared_debt_splitsInclude<ExtArgs> | null;
    where: Prisma.shared_debt_splitsWhereUniqueInput;
};
export type shared_debt_splitsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.shared_debt_splitsWhereInput;
    limit?: number;
};
export type shared_debt_splitsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.shared_debt_splitsSelect<ExtArgs> | null;
    omit?: Prisma.shared_debt_splitsOmit<ExtArgs> | null;
    include?: Prisma.shared_debt_splitsInclude<ExtArgs> | null;
};
