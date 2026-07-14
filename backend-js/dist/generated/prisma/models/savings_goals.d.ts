import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type savings_goalsModel = runtime.Types.Result.DefaultSelection<Prisma.$savings_goalsPayload>;
export type AggregateSavings_goals = {
    _count: Savings_goalsCountAggregateOutputType | null;
    _avg: Savings_goalsAvgAggregateOutputType | null;
    _sum: Savings_goalsSumAggregateOutputType | null;
    _min: Savings_goalsMinAggregateOutputType | null;
    _max: Savings_goalsMaxAggregateOutputType | null;
};
export type Savings_goalsAvgAggregateOutputType = {
    user_id: number | null;
    target_amount: runtime.Decimal | null;
    current_amount: runtime.Decimal | null;
};
export type Savings_goalsSumAggregateOutputType = {
    user_id: bigint | null;
    target_amount: runtime.Decimal | null;
    current_amount: runtime.Decimal | null;
};
export type Savings_goalsMinAggregateOutputType = {
    id: string | null;
    user_id: bigint | null;
    name: string | null;
    target_amount: runtime.Decimal | null;
    current_amount: runtime.Decimal | null;
    deadline: Date | null;
    icon: string | null;
    color: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Savings_goalsMaxAggregateOutputType = {
    id: string | null;
    user_id: bigint | null;
    name: string | null;
    target_amount: runtime.Decimal | null;
    current_amount: runtime.Decimal | null;
    deadline: Date | null;
    icon: string | null;
    color: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Savings_goalsCountAggregateOutputType = {
    id: number;
    user_id: number;
    name: number;
    target_amount: number;
    current_amount: number;
    deadline: number;
    icon: number;
    color: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Savings_goalsAvgAggregateInputType = {
    user_id?: true;
    target_amount?: true;
    current_amount?: true;
};
export type Savings_goalsSumAggregateInputType = {
    user_id?: true;
    target_amount?: true;
    current_amount?: true;
};
export type Savings_goalsMinAggregateInputType = {
    id?: true;
    user_id?: true;
    name?: true;
    target_amount?: true;
    current_amount?: true;
    deadline?: true;
    icon?: true;
    color?: true;
    created_at?: true;
    updated_at?: true;
};
export type Savings_goalsMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    name?: true;
    target_amount?: true;
    current_amount?: true;
    deadline?: true;
    icon?: true;
    color?: true;
    created_at?: true;
    updated_at?: true;
};
export type Savings_goalsCountAggregateInputType = {
    id?: true;
    user_id?: true;
    name?: true;
    target_amount?: true;
    current_amount?: true;
    deadline?: true;
    icon?: true;
    color?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Savings_goalsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.savings_goalsWhereInput;
    orderBy?: Prisma.savings_goalsOrderByWithRelationInput | Prisma.savings_goalsOrderByWithRelationInput[];
    cursor?: Prisma.savings_goalsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Savings_goalsCountAggregateInputType;
    _avg?: Savings_goalsAvgAggregateInputType;
    _sum?: Savings_goalsSumAggregateInputType;
    _min?: Savings_goalsMinAggregateInputType;
    _max?: Savings_goalsMaxAggregateInputType;
};
export type GetSavings_goalsAggregateType<T extends Savings_goalsAggregateArgs> = {
    [P in keyof T & keyof AggregateSavings_goals]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSavings_goals[P]> : Prisma.GetScalarType<T[P], AggregateSavings_goals[P]>;
};
export type savings_goalsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.savings_goalsWhereInput;
    orderBy?: Prisma.savings_goalsOrderByWithAggregationInput | Prisma.savings_goalsOrderByWithAggregationInput[];
    by: Prisma.Savings_goalsScalarFieldEnum[] | Prisma.Savings_goalsScalarFieldEnum;
    having?: Prisma.savings_goalsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Savings_goalsCountAggregateInputType | true;
    _avg?: Savings_goalsAvgAggregateInputType;
    _sum?: Savings_goalsSumAggregateInputType;
    _min?: Savings_goalsMinAggregateInputType;
    _max?: Savings_goalsMaxAggregateInputType;
};
export type Savings_goalsGroupByOutputType = {
    id: string;
    user_id: bigint;
    name: string;
    target_amount: runtime.Decimal;
    current_amount: runtime.Decimal;
    deadline: Date | null;
    icon: string | null;
    color: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Savings_goalsCountAggregateOutputType | null;
    _avg: Savings_goalsAvgAggregateOutputType | null;
    _sum: Savings_goalsSumAggregateOutputType | null;
    _min: Savings_goalsMinAggregateOutputType | null;
    _max: Savings_goalsMaxAggregateOutputType | null;
};
export type GetSavings_goalsGroupByPayload<T extends savings_goalsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Savings_goalsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Savings_goalsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Savings_goalsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Savings_goalsGroupByOutputType[P]>;
}>>;
export type savings_goalsWhereInput = {
    AND?: Prisma.savings_goalsWhereInput | Prisma.savings_goalsWhereInput[];
    OR?: Prisma.savings_goalsWhereInput[];
    NOT?: Prisma.savings_goalsWhereInput | Prisma.savings_goalsWhereInput[];
    id?: Prisma.UuidFilter<"savings_goals"> | string;
    user_id?: Prisma.BigIntFilter<"savings_goals"> | bigint | number;
    name?: Prisma.StringFilter<"savings_goals"> | string;
    target_amount?: Prisma.DecimalFilter<"savings_goals"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalFilter<"savings_goals"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.DateTimeNullableFilter<"savings_goals"> | Date | string | null;
    icon?: Prisma.StringNullableFilter<"savings_goals"> | string | null;
    color?: Prisma.StringNullableFilter<"savings_goals"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"savings_goals"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"savings_goals"> | Date | string | null;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type savings_goalsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    target_amount?: Prisma.SortOrder;
    current_amount?: Prisma.SortOrder;
    deadline?: Prisma.SortOrderInput | Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    color?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type savings_goalsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.savings_goalsWhereInput | Prisma.savings_goalsWhereInput[];
    OR?: Prisma.savings_goalsWhereInput[];
    NOT?: Prisma.savings_goalsWhereInput | Prisma.savings_goalsWhereInput[];
    user_id?: Prisma.BigIntFilter<"savings_goals"> | bigint | number;
    name?: Prisma.StringFilter<"savings_goals"> | string;
    target_amount?: Prisma.DecimalFilter<"savings_goals"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalFilter<"savings_goals"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.DateTimeNullableFilter<"savings_goals"> | Date | string | null;
    icon?: Prisma.StringNullableFilter<"savings_goals"> | string | null;
    color?: Prisma.StringNullableFilter<"savings_goals"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"savings_goals"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"savings_goals"> | Date | string | null;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type savings_goalsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    target_amount?: Prisma.SortOrder;
    current_amount?: Prisma.SortOrder;
    deadline?: Prisma.SortOrderInput | Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    color?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.savings_goalsCountOrderByAggregateInput;
    _avg?: Prisma.savings_goalsAvgOrderByAggregateInput;
    _max?: Prisma.savings_goalsMaxOrderByAggregateInput;
    _min?: Prisma.savings_goalsMinOrderByAggregateInput;
    _sum?: Prisma.savings_goalsSumOrderByAggregateInput;
};
export type savings_goalsScalarWhereWithAggregatesInput = {
    AND?: Prisma.savings_goalsScalarWhereWithAggregatesInput | Prisma.savings_goalsScalarWhereWithAggregatesInput[];
    OR?: Prisma.savings_goalsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.savings_goalsScalarWhereWithAggregatesInput | Prisma.savings_goalsScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"savings_goals"> | string;
    user_id?: Prisma.BigIntWithAggregatesFilter<"savings_goals"> | bigint | number;
    name?: Prisma.StringWithAggregatesFilter<"savings_goals"> | string;
    target_amount?: Prisma.DecimalWithAggregatesFilter<"savings_goals"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalWithAggregatesFilter<"savings_goals"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.DateTimeNullableWithAggregatesFilter<"savings_goals"> | Date | string | null;
    icon?: Prisma.StringNullableWithAggregatesFilter<"savings_goals"> | string | null;
    color?: Prisma.StringNullableWithAggregatesFilter<"savings_goals"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"savings_goals"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"savings_goals"> | Date | string | null;
};
export type savings_goalsCreateInput = {
    id: string;
    name: string;
    target_amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Date | string | null;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    users: Prisma.usersCreateNestedOneWithoutSavings_goalsInput;
};
export type savings_goalsUncheckedCreateInput = {
    id: string;
    user_id: bigint | number;
    name: string;
    target_amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Date | string | null;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type savings_goalsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    target_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneRequiredWithoutSavings_goalsNestedInput;
};
export type savings_goalsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    target_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type savings_goalsCreateManyInput = {
    id: string;
    user_id: bigint | number;
    name: string;
    target_amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Date | string | null;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type savings_goalsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    target_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type savings_goalsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    target_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type savings_goalsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    target_amount?: Prisma.SortOrder;
    current_amount?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type savings_goalsAvgOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    target_amount?: Prisma.SortOrder;
    current_amount?: Prisma.SortOrder;
};
export type savings_goalsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    target_amount?: Prisma.SortOrder;
    current_amount?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type savings_goalsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    target_amount?: Prisma.SortOrder;
    current_amount?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type savings_goalsSumOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    target_amount?: Prisma.SortOrder;
    current_amount?: Prisma.SortOrder;
};
export type Savings_goalsListRelationFilter = {
    every?: Prisma.savings_goalsWhereInput;
    some?: Prisma.savings_goalsWhereInput;
    none?: Prisma.savings_goalsWhereInput;
};
export type savings_goalsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type savings_goalsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.savings_goalsCreateWithoutUsersInput, Prisma.savings_goalsUncheckedCreateWithoutUsersInput> | Prisma.savings_goalsCreateWithoutUsersInput[] | Prisma.savings_goalsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.savings_goalsCreateOrConnectWithoutUsersInput | Prisma.savings_goalsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.savings_goalsCreateManyUsersInputEnvelope;
    connect?: Prisma.savings_goalsWhereUniqueInput | Prisma.savings_goalsWhereUniqueInput[];
};
export type savings_goalsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.savings_goalsCreateWithoutUsersInput, Prisma.savings_goalsUncheckedCreateWithoutUsersInput> | Prisma.savings_goalsCreateWithoutUsersInput[] | Prisma.savings_goalsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.savings_goalsCreateOrConnectWithoutUsersInput | Prisma.savings_goalsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.savings_goalsCreateManyUsersInputEnvelope;
    connect?: Prisma.savings_goalsWhereUniqueInput | Prisma.savings_goalsWhereUniqueInput[];
};
export type savings_goalsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.savings_goalsCreateWithoutUsersInput, Prisma.savings_goalsUncheckedCreateWithoutUsersInput> | Prisma.savings_goalsCreateWithoutUsersInput[] | Prisma.savings_goalsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.savings_goalsCreateOrConnectWithoutUsersInput | Prisma.savings_goalsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.savings_goalsUpsertWithWhereUniqueWithoutUsersInput | Prisma.savings_goalsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.savings_goalsCreateManyUsersInputEnvelope;
    set?: Prisma.savings_goalsWhereUniqueInput | Prisma.savings_goalsWhereUniqueInput[];
    disconnect?: Prisma.savings_goalsWhereUniqueInput | Prisma.savings_goalsWhereUniqueInput[];
    delete?: Prisma.savings_goalsWhereUniqueInput | Prisma.savings_goalsWhereUniqueInput[];
    connect?: Prisma.savings_goalsWhereUniqueInput | Prisma.savings_goalsWhereUniqueInput[];
    update?: Prisma.savings_goalsUpdateWithWhereUniqueWithoutUsersInput | Prisma.savings_goalsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.savings_goalsUpdateManyWithWhereWithoutUsersInput | Prisma.savings_goalsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.savings_goalsScalarWhereInput | Prisma.savings_goalsScalarWhereInput[];
};
export type savings_goalsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.savings_goalsCreateWithoutUsersInput, Prisma.savings_goalsUncheckedCreateWithoutUsersInput> | Prisma.savings_goalsCreateWithoutUsersInput[] | Prisma.savings_goalsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.savings_goalsCreateOrConnectWithoutUsersInput | Prisma.savings_goalsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.savings_goalsUpsertWithWhereUniqueWithoutUsersInput | Prisma.savings_goalsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.savings_goalsCreateManyUsersInputEnvelope;
    set?: Prisma.savings_goalsWhereUniqueInput | Prisma.savings_goalsWhereUniqueInput[];
    disconnect?: Prisma.savings_goalsWhereUniqueInput | Prisma.savings_goalsWhereUniqueInput[];
    delete?: Prisma.savings_goalsWhereUniqueInput | Prisma.savings_goalsWhereUniqueInput[];
    connect?: Prisma.savings_goalsWhereUniqueInput | Prisma.savings_goalsWhereUniqueInput[];
    update?: Prisma.savings_goalsUpdateWithWhereUniqueWithoutUsersInput | Prisma.savings_goalsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.savings_goalsUpdateManyWithWhereWithoutUsersInput | Prisma.savings_goalsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.savings_goalsScalarWhereInput | Prisma.savings_goalsScalarWhereInput[];
};
export type savings_goalsCreateWithoutUsersInput = {
    id: string;
    name: string;
    target_amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Date | string | null;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type savings_goalsUncheckedCreateWithoutUsersInput = {
    id: string;
    name: string;
    target_amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Date | string | null;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type savings_goalsCreateOrConnectWithoutUsersInput = {
    where: Prisma.savings_goalsWhereUniqueInput;
    create: Prisma.XOR<Prisma.savings_goalsCreateWithoutUsersInput, Prisma.savings_goalsUncheckedCreateWithoutUsersInput>;
};
export type savings_goalsCreateManyUsersInputEnvelope = {
    data: Prisma.savings_goalsCreateManyUsersInput | Prisma.savings_goalsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type savings_goalsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.savings_goalsWhereUniqueInput;
    update: Prisma.XOR<Prisma.savings_goalsUpdateWithoutUsersInput, Prisma.savings_goalsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.savings_goalsCreateWithoutUsersInput, Prisma.savings_goalsUncheckedCreateWithoutUsersInput>;
};
export type savings_goalsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.savings_goalsWhereUniqueInput;
    data: Prisma.XOR<Prisma.savings_goalsUpdateWithoutUsersInput, Prisma.savings_goalsUncheckedUpdateWithoutUsersInput>;
};
export type savings_goalsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.savings_goalsScalarWhereInput;
    data: Prisma.XOR<Prisma.savings_goalsUpdateManyMutationInput, Prisma.savings_goalsUncheckedUpdateManyWithoutUsersInput>;
};
export type savings_goalsScalarWhereInput = {
    AND?: Prisma.savings_goalsScalarWhereInput | Prisma.savings_goalsScalarWhereInput[];
    OR?: Prisma.savings_goalsScalarWhereInput[];
    NOT?: Prisma.savings_goalsScalarWhereInput | Prisma.savings_goalsScalarWhereInput[];
    id?: Prisma.UuidFilter<"savings_goals"> | string;
    user_id?: Prisma.BigIntFilter<"savings_goals"> | bigint | number;
    name?: Prisma.StringFilter<"savings_goals"> | string;
    target_amount?: Prisma.DecimalFilter<"savings_goals"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalFilter<"savings_goals"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.DateTimeNullableFilter<"savings_goals"> | Date | string | null;
    icon?: Prisma.StringNullableFilter<"savings_goals"> | string | null;
    color?: Prisma.StringNullableFilter<"savings_goals"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"savings_goals"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"savings_goals"> | Date | string | null;
};
export type savings_goalsCreateManyUsersInput = {
    id: string;
    name: string;
    target_amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Date | string | null;
    icon?: string | null;
    color?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type savings_goalsUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    target_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type savings_goalsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    target_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type savings_goalsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    target_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    current_amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type savings_goalsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    name?: boolean;
    target_amount?: boolean;
    current_amount?: boolean;
    deadline?: boolean;
    icon?: boolean;
    color?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["savings_goals"]>;
export type savings_goalsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    name?: boolean;
    target_amount?: boolean;
    current_amount?: boolean;
    deadline?: boolean;
    icon?: boolean;
    color?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["savings_goals"]>;
export type savings_goalsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    name?: boolean;
    target_amount?: boolean;
    current_amount?: boolean;
    deadline?: boolean;
    icon?: boolean;
    color?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["savings_goals"]>;
export type savings_goalsSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    name?: boolean;
    target_amount?: boolean;
    current_amount?: boolean;
    deadline?: boolean;
    icon?: boolean;
    color?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type savings_goalsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "name" | "target_amount" | "current_amount" | "deadline" | "icon" | "color" | "created_at" | "updated_at", ExtArgs["result"]["savings_goals"]>;
export type savings_goalsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type savings_goalsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type savings_goalsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $savings_goalsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "savings_goals";
    objects: {
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        user_id: bigint;
        name: string;
        target_amount: runtime.Decimal;
        current_amount: runtime.Decimal;
        deadline: Date | null;
        icon: string | null;
        color: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["savings_goals"]>;
    composites: {};
};
export type savings_goalsGetPayload<S extends boolean | null | undefined | savings_goalsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload, S>;
export type savings_goalsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<savings_goalsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Savings_goalsCountAggregateInputType | true;
};
export interface savings_goalsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['savings_goals'];
        meta: {
            name: 'savings_goals';
        };
    };
    findUnique<T extends savings_goalsFindUniqueArgs>(args: Prisma.SelectSubset<T, savings_goalsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__savings_goalsClient<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends savings_goalsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, savings_goalsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__savings_goalsClient<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends savings_goalsFindFirstArgs>(args?: Prisma.SelectSubset<T, savings_goalsFindFirstArgs<ExtArgs>>): Prisma.Prisma__savings_goalsClient<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends savings_goalsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, savings_goalsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__savings_goalsClient<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends savings_goalsFindManyArgs>(args?: Prisma.SelectSubset<T, savings_goalsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends savings_goalsCreateArgs>(args: Prisma.SelectSubset<T, savings_goalsCreateArgs<ExtArgs>>): Prisma.Prisma__savings_goalsClient<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends savings_goalsCreateManyArgs>(args?: Prisma.SelectSubset<T, savings_goalsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends savings_goalsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, savings_goalsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends savings_goalsDeleteArgs>(args: Prisma.SelectSubset<T, savings_goalsDeleteArgs<ExtArgs>>): Prisma.Prisma__savings_goalsClient<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends savings_goalsUpdateArgs>(args: Prisma.SelectSubset<T, savings_goalsUpdateArgs<ExtArgs>>): Prisma.Prisma__savings_goalsClient<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends savings_goalsDeleteManyArgs>(args?: Prisma.SelectSubset<T, savings_goalsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends savings_goalsUpdateManyArgs>(args: Prisma.SelectSubset<T, savings_goalsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends savings_goalsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, savings_goalsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends savings_goalsUpsertArgs>(args: Prisma.SelectSubset<T, savings_goalsUpsertArgs<ExtArgs>>): Prisma.Prisma__savings_goalsClient<runtime.Types.Result.GetResult<Prisma.$savings_goalsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends savings_goalsCountArgs>(args?: Prisma.Subset<T, savings_goalsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Savings_goalsCountAggregateOutputType> : number>;
    aggregate<T extends Savings_goalsAggregateArgs>(args: Prisma.Subset<T, Savings_goalsAggregateArgs>): Prisma.PrismaPromise<GetSavings_goalsAggregateType<T>>;
    groupBy<T extends savings_goalsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: savings_goalsGroupByArgs['orderBy'];
    } : {
        orderBy?: savings_goalsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, savings_goalsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavings_goalsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: savings_goalsFieldRefs;
}
export interface Prisma__savings_goalsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface savings_goalsFieldRefs {
    readonly id: Prisma.FieldRef<"savings_goals", 'String'>;
    readonly user_id: Prisma.FieldRef<"savings_goals", 'BigInt'>;
    readonly name: Prisma.FieldRef<"savings_goals", 'String'>;
    readonly target_amount: Prisma.FieldRef<"savings_goals", 'Decimal'>;
    readonly current_amount: Prisma.FieldRef<"savings_goals", 'Decimal'>;
    readonly deadline: Prisma.FieldRef<"savings_goals", 'DateTime'>;
    readonly icon: Prisma.FieldRef<"savings_goals", 'String'>;
    readonly color: Prisma.FieldRef<"savings_goals", 'String'>;
    readonly created_at: Prisma.FieldRef<"savings_goals", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"savings_goals", 'DateTime'>;
}
export type savings_goalsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.savings_goalsSelect<ExtArgs> | null;
    omit?: Prisma.savings_goalsOmit<ExtArgs> | null;
    include?: Prisma.savings_goalsInclude<ExtArgs> | null;
    where: Prisma.savings_goalsWhereUniqueInput;
};
export type savings_goalsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.savings_goalsSelect<ExtArgs> | null;
    omit?: Prisma.savings_goalsOmit<ExtArgs> | null;
    include?: Prisma.savings_goalsInclude<ExtArgs> | null;
    where: Prisma.savings_goalsWhereUniqueInput;
};
export type savings_goalsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type savings_goalsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type savings_goalsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type savings_goalsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.savings_goalsSelect<ExtArgs> | null;
    omit?: Prisma.savings_goalsOmit<ExtArgs> | null;
    include?: Prisma.savings_goalsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.savings_goalsCreateInput, Prisma.savings_goalsUncheckedCreateInput>;
};
export type savings_goalsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.savings_goalsCreateManyInput | Prisma.savings_goalsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type savings_goalsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.savings_goalsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.savings_goalsOmit<ExtArgs> | null;
    data: Prisma.savings_goalsCreateManyInput | Prisma.savings_goalsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.savings_goalsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type savings_goalsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.savings_goalsSelect<ExtArgs> | null;
    omit?: Prisma.savings_goalsOmit<ExtArgs> | null;
    include?: Prisma.savings_goalsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.savings_goalsUpdateInput, Prisma.savings_goalsUncheckedUpdateInput>;
    where: Prisma.savings_goalsWhereUniqueInput;
};
export type savings_goalsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.savings_goalsUpdateManyMutationInput, Prisma.savings_goalsUncheckedUpdateManyInput>;
    where?: Prisma.savings_goalsWhereInput;
    limit?: number;
};
export type savings_goalsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.savings_goalsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.savings_goalsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.savings_goalsUpdateManyMutationInput, Prisma.savings_goalsUncheckedUpdateManyInput>;
    where?: Prisma.savings_goalsWhereInput;
    limit?: number;
    include?: Prisma.savings_goalsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type savings_goalsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.savings_goalsSelect<ExtArgs> | null;
    omit?: Prisma.savings_goalsOmit<ExtArgs> | null;
    include?: Prisma.savings_goalsInclude<ExtArgs> | null;
    where: Prisma.savings_goalsWhereUniqueInput;
    create: Prisma.XOR<Prisma.savings_goalsCreateInput, Prisma.savings_goalsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.savings_goalsUpdateInput, Prisma.savings_goalsUncheckedUpdateInput>;
};
export type savings_goalsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.savings_goalsSelect<ExtArgs> | null;
    omit?: Prisma.savings_goalsOmit<ExtArgs> | null;
    include?: Prisma.savings_goalsInclude<ExtArgs> | null;
    where: Prisma.savings_goalsWhereUniqueInput;
};
export type savings_goalsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.savings_goalsWhereInput;
    limit?: number;
};
export type savings_goalsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.savings_goalsSelect<ExtArgs> | null;
    omit?: Prisma.savings_goalsOmit<ExtArgs> | null;
    include?: Prisma.savings_goalsInclude<ExtArgs> | null;
};
