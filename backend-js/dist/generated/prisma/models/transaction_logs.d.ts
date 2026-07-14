import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type transaction_logsModel = runtime.Types.Result.DefaultSelection<Prisma.$transaction_logsPayload>;
export type AggregateTransaction_logs = {
    _count: Transaction_logsCountAggregateOutputType | null;
    _avg: Transaction_logsAvgAggregateOutputType | null;
    _sum: Transaction_logsSumAggregateOutputType | null;
    _min: Transaction_logsMinAggregateOutputType | null;
    _max: Transaction_logsMaxAggregateOutputType | null;
};
export type Transaction_logsAvgAggregateOutputType = {
    user_id: number | null;
};
export type Transaction_logsSumAggregateOutputType = {
    user_id: bigint | null;
};
export type Transaction_logsMinAggregateOutputType = {
    id: string | null;
    transaction_id: string | null;
    user_id: bigint | null;
    action: string | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: Date | null;
};
export type Transaction_logsMaxAggregateOutputType = {
    id: string | null;
    transaction_id: string | null;
    user_id: bigint | null;
    action: string | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: Date | null;
};
export type Transaction_logsCountAggregateOutputType = {
    id: number;
    transaction_id: number;
    user_id: number;
    action: number;
    payload_before: number;
    payload_after: number;
    ip_address: number;
    user_agent: number;
    created_at: number;
    _all: number;
};
export type Transaction_logsAvgAggregateInputType = {
    user_id?: true;
};
export type Transaction_logsSumAggregateInputType = {
    user_id?: true;
};
export type Transaction_logsMinAggregateInputType = {
    id?: true;
    transaction_id?: true;
    user_id?: true;
    action?: true;
    ip_address?: true;
    user_agent?: true;
    created_at?: true;
};
export type Transaction_logsMaxAggregateInputType = {
    id?: true;
    transaction_id?: true;
    user_id?: true;
    action?: true;
    ip_address?: true;
    user_agent?: true;
    created_at?: true;
};
export type Transaction_logsCountAggregateInputType = {
    id?: true;
    transaction_id?: true;
    user_id?: true;
    action?: true;
    payload_before?: true;
    payload_after?: true;
    ip_address?: true;
    user_agent?: true;
    created_at?: true;
    _all?: true;
};
export type Transaction_logsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transaction_logsWhereInput;
    orderBy?: Prisma.transaction_logsOrderByWithRelationInput | Prisma.transaction_logsOrderByWithRelationInput[];
    cursor?: Prisma.transaction_logsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Transaction_logsCountAggregateInputType;
    _avg?: Transaction_logsAvgAggregateInputType;
    _sum?: Transaction_logsSumAggregateInputType;
    _min?: Transaction_logsMinAggregateInputType;
    _max?: Transaction_logsMaxAggregateInputType;
};
export type GetTransaction_logsAggregateType<T extends Transaction_logsAggregateArgs> = {
    [P in keyof T & keyof AggregateTransaction_logs]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTransaction_logs[P]> : Prisma.GetScalarType<T[P], AggregateTransaction_logs[P]>;
};
export type transaction_logsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transaction_logsWhereInput;
    orderBy?: Prisma.transaction_logsOrderByWithAggregationInput | Prisma.transaction_logsOrderByWithAggregationInput[];
    by: Prisma.Transaction_logsScalarFieldEnum[] | Prisma.Transaction_logsScalarFieldEnum;
    having?: Prisma.transaction_logsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Transaction_logsCountAggregateInputType | true;
    _avg?: Transaction_logsAvgAggregateInputType;
    _sum?: Transaction_logsSumAggregateInputType;
    _min?: Transaction_logsMinAggregateInputType;
    _max?: Transaction_logsMaxAggregateInputType;
};
export type Transaction_logsGroupByOutputType = {
    id: string;
    transaction_id: string;
    user_id: bigint;
    action: string;
    payload_before: runtime.JsonValue | null;
    payload_after: runtime.JsonValue | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: Date;
    _count: Transaction_logsCountAggregateOutputType | null;
    _avg: Transaction_logsAvgAggregateOutputType | null;
    _sum: Transaction_logsSumAggregateOutputType | null;
    _min: Transaction_logsMinAggregateOutputType | null;
    _max: Transaction_logsMaxAggregateOutputType | null;
};
export type GetTransaction_logsGroupByPayload<T extends transaction_logsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Transaction_logsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Transaction_logsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Transaction_logsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Transaction_logsGroupByOutputType[P]>;
}>>;
export type transaction_logsWhereInput = {
    AND?: Prisma.transaction_logsWhereInput | Prisma.transaction_logsWhereInput[];
    OR?: Prisma.transaction_logsWhereInput[];
    NOT?: Prisma.transaction_logsWhereInput | Prisma.transaction_logsWhereInput[];
    id?: Prisma.UuidFilter<"transaction_logs"> | string;
    transaction_id?: Prisma.UuidFilter<"transaction_logs"> | string;
    user_id?: Prisma.BigIntFilter<"transaction_logs"> | bigint | number;
    action?: Prisma.StringFilter<"transaction_logs"> | string;
    payload_before?: Prisma.JsonNullableFilter<"transaction_logs">;
    payload_after?: Prisma.JsonNullableFilter<"transaction_logs">;
    ip_address?: Prisma.StringNullableFilter<"transaction_logs"> | string | null;
    user_agent?: Prisma.StringNullableFilter<"transaction_logs"> | string | null;
    created_at?: Prisma.DateTimeFilter<"transaction_logs"> | Date | string;
    transactions?: Prisma.XOR<Prisma.TransactionsScalarRelationFilter, Prisma.transactionsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type transaction_logsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    transaction_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    payload_before?: Prisma.SortOrderInput | Prisma.SortOrder;
    payload_after?: Prisma.SortOrderInput | Prisma.SortOrder;
    ip_address?: Prisma.SortOrderInput | Prisma.SortOrder;
    user_agent?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    transactions?: Prisma.transactionsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type transaction_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.transaction_logsWhereInput | Prisma.transaction_logsWhereInput[];
    OR?: Prisma.transaction_logsWhereInput[];
    NOT?: Prisma.transaction_logsWhereInput | Prisma.transaction_logsWhereInput[];
    transaction_id?: Prisma.UuidFilter<"transaction_logs"> | string;
    user_id?: Prisma.BigIntFilter<"transaction_logs"> | bigint | number;
    action?: Prisma.StringFilter<"transaction_logs"> | string;
    payload_before?: Prisma.JsonNullableFilter<"transaction_logs">;
    payload_after?: Prisma.JsonNullableFilter<"transaction_logs">;
    ip_address?: Prisma.StringNullableFilter<"transaction_logs"> | string | null;
    user_agent?: Prisma.StringNullableFilter<"transaction_logs"> | string | null;
    created_at?: Prisma.DateTimeFilter<"transaction_logs"> | Date | string;
    transactions?: Prisma.XOR<Prisma.TransactionsScalarRelationFilter, Prisma.transactionsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type transaction_logsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    transaction_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    payload_before?: Prisma.SortOrderInput | Prisma.SortOrder;
    payload_after?: Prisma.SortOrderInput | Prisma.SortOrder;
    ip_address?: Prisma.SortOrderInput | Prisma.SortOrder;
    user_agent?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.transaction_logsCountOrderByAggregateInput;
    _avg?: Prisma.transaction_logsAvgOrderByAggregateInput;
    _max?: Prisma.transaction_logsMaxOrderByAggregateInput;
    _min?: Prisma.transaction_logsMinOrderByAggregateInput;
    _sum?: Prisma.transaction_logsSumOrderByAggregateInput;
};
export type transaction_logsScalarWhereWithAggregatesInput = {
    AND?: Prisma.transaction_logsScalarWhereWithAggregatesInput | Prisma.transaction_logsScalarWhereWithAggregatesInput[];
    OR?: Prisma.transaction_logsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.transaction_logsScalarWhereWithAggregatesInput | Prisma.transaction_logsScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"transaction_logs"> | string;
    transaction_id?: Prisma.UuidWithAggregatesFilter<"transaction_logs"> | string;
    user_id?: Prisma.BigIntWithAggregatesFilter<"transaction_logs"> | bigint | number;
    action?: Prisma.StringWithAggregatesFilter<"transaction_logs"> | string;
    payload_before?: Prisma.JsonNullableWithAggregatesFilter<"transaction_logs">;
    payload_after?: Prisma.JsonNullableWithAggregatesFilter<"transaction_logs">;
    ip_address?: Prisma.StringNullableWithAggregatesFilter<"transaction_logs"> | string | null;
    user_agent?: Prisma.StringNullableWithAggregatesFilter<"transaction_logs"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"transaction_logs"> | Date | string;
};
export type transaction_logsCreateInput = {
    id: string;
    action: string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: Date | string;
    transactions: Prisma.transactionsCreateNestedOneWithoutTransaction_logsInput;
    users: Prisma.usersCreateNestedOneWithoutTransaction_logsInput;
};
export type transaction_logsUncheckedCreateInput = {
    id: string;
    transaction_id: string;
    user_id: bigint | number;
    action: string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: Date | string;
};
export type transaction_logsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.transactionsUpdateOneRequiredWithoutTransaction_logsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTransaction_logsNestedInput;
};
export type transaction_logsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transaction_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type transaction_logsCreateManyInput = {
    id: string;
    transaction_id: string;
    user_id: bigint | number;
    action: string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: Date | string;
};
export type transaction_logsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type transaction_logsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transaction_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type transaction_logsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    transaction_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    payload_before?: Prisma.SortOrder;
    payload_after?: Prisma.SortOrder;
    ip_address?: Prisma.SortOrder;
    user_agent?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type transaction_logsAvgOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
};
export type transaction_logsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    transaction_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    ip_address?: Prisma.SortOrder;
    user_agent?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type transaction_logsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    transaction_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    ip_address?: Prisma.SortOrder;
    user_agent?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type transaction_logsSumOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
};
export type Transaction_logsListRelationFilter = {
    every?: Prisma.transaction_logsWhereInput;
    some?: Prisma.transaction_logsWhereInput;
    none?: Prisma.transaction_logsWhereInput;
};
export type transaction_logsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type transaction_logsCreateNestedManyWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.transaction_logsCreateWithoutTransactionsInput, Prisma.transaction_logsUncheckedCreateWithoutTransactionsInput> | Prisma.transaction_logsCreateWithoutTransactionsInput[] | Prisma.transaction_logsUncheckedCreateWithoutTransactionsInput[];
    connectOrCreate?: Prisma.transaction_logsCreateOrConnectWithoutTransactionsInput | Prisma.transaction_logsCreateOrConnectWithoutTransactionsInput[];
    createMany?: Prisma.transaction_logsCreateManyTransactionsInputEnvelope;
    connect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
};
export type transaction_logsUncheckedCreateNestedManyWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.transaction_logsCreateWithoutTransactionsInput, Prisma.transaction_logsUncheckedCreateWithoutTransactionsInput> | Prisma.transaction_logsCreateWithoutTransactionsInput[] | Prisma.transaction_logsUncheckedCreateWithoutTransactionsInput[];
    connectOrCreate?: Prisma.transaction_logsCreateOrConnectWithoutTransactionsInput | Prisma.transaction_logsCreateOrConnectWithoutTransactionsInput[];
    createMany?: Prisma.transaction_logsCreateManyTransactionsInputEnvelope;
    connect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
};
export type transaction_logsUpdateManyWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.transaction_logsCreateWithoutTransactionsInput, Prisma.transaction_logsUncheckedCreateWithoutTransactionsInput> | Prisma.transaction_logsCreateWithoutTransactionsInput[] | Prisma.transaction_logsUncheckedCreateWithoutTransactionsInput[];
    connectOrCreate?: Prisma.transaction_logsCreateOrConnectWithoutTransactionsInput | Prisma.transaction_logsCreateOrConnectWithoutTransactionsInput[];
    upsert?: Prisma.transaction_logsUpsertWithWhereUniqueWithoutTransactionsInput | Prisma.transaction_logsUpsertWithWhereUniqueWithoutTransactionsInput[];
    createMany?: Prisma.transaction_logsCreateManyTransactionsInputEnvelope;
    set?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    disconnect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    delete?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    connect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    update?: Prisma.transaction_logsUpdateWithWhereUniqueWithoutTransactionsInput | Prisma.transaction_logsUpdateWithWhereUniqueWithoutTransactionsInput[];
    updateMany?: Prisma.transaction_logsUpdateManyWithWhereWithoutTransactionsInput | Prisma.transaction_logsUpdateManyWithWhereWithoutTransactionsInput[];
    deleteMany?: Prisma.transaction_logsScalarWhereInput | Prisma.transaction_logsScalarWhereInput[];
};
export type transaction_logsUncheckedUpdateManyWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.transaction_logsCreateWithoutTransactionsInput, Prisma.transaction_logsUncheckedCreateWithoutTransactionsInput> | Prisma.transaction_logsCreateWithoutTransactionsInput[] | Prisma.transaction_logsUncheckedCreateWithoutTransactionsInput[];
    connectOrCreate?: Prisma.transaction_logsCreateOrConnectWithoutTransactionsInput | Prisma.transaction_logsCreateOrConnectWithoutTransactionsInput[];
    upsert?: Prisma.transaction_logsUpsertWithWhereUniqueWithoutTransactionsInput | Prisma.transaction_logsUpsertWithWhereUniqueWithoutTransactionsInput[];
    createMany?: Prisma.transaction_logsCreateManyTransactionsInputEnvelope;
    set?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    disconnect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    delete?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    connect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    update?: Prisma.transaction_logsUpdateWithWhereUniqueWithoutTransactionsInput | Prisma.transaction_logsUpdateWithWhereUniqueWithoutTransactionsInput[];
    updateMany?: Prisma.transaction_logsUpdateManyWithWhereWithoutTransactionsInput | Prisma.transaction_logsUpdateManyWithWhereWithoutTransactionsInput[];
    deleteMany?: Prisma.transaction_logsScalarWhereInput | Prisma.transaction_logsScalarWhereInput[];
};
export type transaction_logsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.transaction_logsCreateWithoutUsersInput, Prisma.transaction_logsUncheckedCreateWithoutUsersInput> | Prisma.transaction_logsCreateWithoutUsersInput[] | Prisma.transaction_logsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.transaction_logsCreateOrConnectWithoutUsersInput | Prisma.transaction_logsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.transaction_logsCreateManyUsersInputEnvelope;
    connect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
};
export type transaction_logsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.transaction_logsCreateWithoutUsersInput, Prisma.transaction_logsUncheckedCreateWithoutUsersInput> | Prisma.transaction_logsCreateWithoutUsersInput[] | Prisma.transaction_logsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.transaction_logsCreateOrConnectWithoutUsersInput | Prisma.transaction_logsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.transaction_logsCreateManyUsersInputEnvelope;
    connect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
};
export type transaction_logsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.transaction_logsCreateWithoutUsersInput, Prisma.transaction_logsUncheckedCreateWithoutUsersInput> | Prisma.transaction_logsCreateWithoutUsersInput[] | Prisma.transaction_logsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.transaction_logsCreateOrConnectWithoutUsersInput | Prisma.transaction_logsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.transaction_logsUpsertWithWhereUniqueWithoutUsersInput | Prisma.transaction_logsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.transaction_logsCreateManyUsersInputEnvelope;
    set?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    disconnect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    delete?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    connect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    update?: Prisma.transaction_logsUpdateWithWhereUniqueWithoutUsersInput | Prisma.transaction_logsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.transaction_logsUpdateManyWithWhereWithoutUsersInput | Prisma.transaction_logsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.transaction_logsScalarWhereInput | Prisma.transaction_logsScalarWhereInput[];
};
export type transaction_logsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.transaction_logsCreateWithoutUsersInput, Prisma.transaction_logsUncheckedCreateWithoutUsersInput> | Prisma.transaction_logsCreateWithoutUsersInput[] | Prisma.transaction_logsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.transaction_logsCreateOrConnectWithoutUsersInput | Prisma.transaction_logsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.transaction_logsUpsertWithWhereUniqueWithoutUsersInput | Prisma.transaction_logsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.transaction_logsCreateManyUsersInputEnvelope;
    set?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    disconnect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    delete?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    connect?: Prisma.transaction_logsWhereUniqueInput | Prisma.transaction_logsWhereUniqueInput[];
    update?: Prisma.transaction_logsUpdateWithWhereUniqueWithoutUsersInput | Prisma.transaction_logsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.transaction_logsUpdateManyWithWhereWithoutUsersInput | Prisma.transaction_logsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.transaction_logsScalarWhereInput | Prisma.transaction_logsScalarWhereInput[];
};
export type transaction_logsCreateWithoutTransactionsInput = {
    id: string;
    action: string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutTransaction_logsInput;
};
export type transaction_logsUncheckedCreateWithoutTransactionsInput = {
    id: string;
    user_id: bigint | number;
    action: string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: Date | string;
};
export type transaction_logsCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.transaction_logsWhereUniqueInput;
    create: Prisma.XOR<Prisma.transaction_logsCreateWithoutTransactionsInput, Prisma.transaction_logsUncheckedCreateWithoutTransactionsInput>;
};
export type transaction_logsCreateManyTransactionsInputEnvelope = {
    data: Prisma.transaction_logsCreateManyTransactionsInput | Prisma.transaction_logsCreateManyTransactionsInput[];
    skipDuplicates?: boolean;
};
export type transaction_logsUpsertWithWhereUniqueWithoutTransactionsInput = {
    where: Prisma.transaction_logsWhereUniqueInput;
    update: Prisma.XOR<Prisma.transaction_logsUpdateWithoutTransactionsInput, Prisma.transaction_logsUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.transaction_logsCreateWithoutTransactionsInput, Prisma.transaction_logsUncheckedCreateWithoutTransactionsInput>;
};
export type transaction_logsUpdateWithWhereUniqueWithoutTransactionsInput = {
    where: Prisma.transaction_logsWhereUniqueInput;
    data: Prisma.XOR<Prisma.transaction_logsUpdateWithoutTransactionsInput, Prisma.transaction_logsUncheckedUpdateWithoutTransactionsInput>;
};
export type transaction_logsUpdateManyWithWhereWithoutTransactionsInput = {
    where: Prisma.transaction_logsScalarWhereInput;
    data: Prisma.XOR<Prisma.transaction_logsUpdateManyMutationInput, Prisma.transaction_logsUncheckedUpdateManyWithoutTransactionsInput>;
};
export type transaction_logsScalarWhereInput = {
    AND?: Prisma.transaction_logsScalarWhereInput | Prisma.transaction_logsScalarWhereInput[];
    OR?: Prisma.transaction_logsScalarWhereInput[];
    NOT?: Prisma.transaction_logsScalarWhereInput | Prisma.transaction_logsScalarWhereInput[];
    id?: Prisma.UuidFilter<"transaction_logs"> | string;
    transaction_id?: Prisma.UuidFilter<"transaction_logs"> | string;
    user_id?: Prisma.BigIntFilter<"transaction_logs"> | bigint | number;
    action?: Prisma.StringFilter<"transaction_logs"> | string;
    payload_before?: Prisma.JsonNullableFilter<"transaction_logs">;
    payload_after?: Prisma.JsonNullableFilter<"transaction_logs">;
    ip_address?: Prisma.StringNullableFilter<"transaction_logs"> | string | null;
    user_agent?: Prisma.StringNullableFilter<"transaction_logs"> | string | null;
    created_at?: Prisma.DateTimeFilter<"transaction_logs"> | Date | string;
};
export type transaction_logsCreateWithoutUsersInput = {
    id: string;
    action: string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: Date | string;
    transactions: Prisma.transactionsCreateNestedOneWithoutTransaction_logsInput;
};
export type transaction_logsUncheckedCreateWithoutUsersInput = {
    id: string;
    transaction_id: string;
    action: string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: Date | string;
};
export type transaction_logsCreateOrConnectWithoutUsersInput = {
    where: Prisma.transaction_logsWhereUniqueInput;
    create: Prisma.XOR<Prisma.transaction_logsCreateWithoutUsersInput, Prisma.transaction_logsUncheckedCreateWithoutUsersInput>;
};
export type transaction_logsCreateManyUsersInputEnvelope = {
    data: Prisma.transaction_logsCreateManyUsersInput | Prisma.transaction_logsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type transaction_logsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.transaction_logsWhereUniqueInput;
    update: Prisma.XOR<Prisma.transaction_logsUpdateWithoutUsersInput, Prisma.transaction_logsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.transaction_logsCreateWithoutUsersInput, Prisma.transaction_logsUncheckedCreateWithoutUsersInput>;
};
export type transaction_logsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.transaction_logsWhereUniqueInput;
    data: Prisma.XOR<Prisma.transaction_logsUpdateWithoutUsersInput, Prisma.transaction_logsUncheckedUpdateWithoutUsersInput>;
};
export type transaction_logsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.transaction_logsScalarWhereInput;
    data: Prisma.XOR<Prisma.transaction_logsUpdateManyMutationInput, Prisma.transaction_logsUncheckedUpdateManyWithoutUsersInput>;
};
export type transaction_logsCreateManyTransactionsInput = {
    id: string;
    user_id: bigint | number;
    action: string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: Date | string;
};
export type transaction_logsUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutTransaction_logsNestedInput;
};
export type transaction_logsUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type transaction_logsUncheckedUpdateManyWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type transaction_logsCreateManyUsersInput = {
    id: string;
    transaction_id: string;
    action: string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: Date | string;
};
export type transaction_logsUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.transactionsUpdateOneRequiredWithoutTransaction_logsNestedInput;
};
export type transaction_logsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transaction_id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type transaction_logsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transaction_id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    payload_before?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    payload_after?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ip_address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_agent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type transaction_logsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    transaction_id?: boolean;
    user_id?: boolean;
    action?: boolean;
    payload_before?: boolean;
    payload_after?: boolean;
    ip_address?: boolean;
    user_agent?: boolean;
    created_at?: boolean;
    transactions?: boolean | Prisma.transactionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transaction_logs"]>;
export type transaction_logsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    transaction_id?: boolean;
    user_id?: boolean;
    action?: boolean;
    payload_before?: boolean;
    payload_after?: boolean;
    ip_address?: boolean;
    user_agent?: boolean;
    created_at?: boolean;
    transactions?: boolean | Prisma.transactionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transaction_logs"]>;
export type transaction_logsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    transaction_id?: boolean;
    user_id?: boolean;
    action?: boolean;
    payload_before?: boolean;
    payload_after?: boolean;
    ip_address?: boolean;
    user_agent?: boolean;
    created_at?: boolean;
    transactions?: boolean | Prisma.transactionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transaction_logs"]>;
export type transaction_logsSelectScalar = {
    id?: boolean;
    transaction_id?: boolean;
    user_id?: boolean;
    action?: boolean;
    payload_before?: boolean;
    payload_after?: boolean;
    ip_address?: boolean;
    user_agent?: boolean;
    created_at?: boolean;
};
export type transaction_logsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "transaction_id" | "user_id" | "action" | "payload_before" | "payload_after" | "ip_address" | "user_agent" | "created_at", ExtArgs["result"]["transaction_logs"]>;
export type transaction_logsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | Prisma.transactionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type transaction_logsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | Prisma.transactionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type transaction_logsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | Prisma.transactionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $transaction_logsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "transaction_logs";
    objects: {
        transactions: Prisma.$transactionsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        transaction_id: string;
        user_id: bigint;
        action: string;
        payload_before: runtime.JsonValue | null;
        payload_after: runtime.JsonValue | null;
        ip_address: string | null;
        user_agent: string | null;
        created_at: Date;
    }, ExtArgs["result"]["transaction_logs"]>;
    composites: {};
};
export type transaction_logsGetPayload<S extends boolean | null | undefined | transaction_logsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload, S>;
export type transaction_logsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<transaction_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Transaction_logsCountAggregateInputType | true;
};
export interface transaction_logsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['transaction_logs'];
        meta: {
            name: 'transaction_logs';
        };
    };
    findUnique<T extends transaction_logsFindUniqueArgs>(args: Prisma.SelectSubset<T, transaction_logsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__transaction_logsClient<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends transaction_logsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, transaction_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__transaction_logsClient<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends transaction_logsFindFirstArgs>(args?: Prisma.SelectSubset<T, transaction_logsFindFirstArgs<ExtArgs>>): Prisma.Prisma__transaction_logsClient<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends transaction_logsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, transaction_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__transaction_logsClient<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends transaction_logsFindManyArgs>(args?: Prisma.SelectSubset<T, transaction_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends transaction_logsCreateArgs>(args: Prisma.SelectSubset<T, transaction_logsCreateArgs<ExtArgs>>): Prisma.Prisma__transaction_logsClient<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends transaction_logsCreateManyArgs>(args?: Prisma.SelectSubset<T, transaction_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends transaction_logsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, transaction_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends transaction_logsDeleteArgs>(args: Prisma.SelectSubset<T, transaction_logsDeleteArgs<ExtArgs>>): Prisma.Prisma__transaction_logsClient<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends transaction_logsUpdateArgs>(args: Prisma.SelectSubset<T, transaction_logsUpdateArgs<ExtArgs>>): Prisma.Prisma__transaction_logsClient<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends transaction_logsDeleteManyArgs>(args?: Prisma.SelectSubset<T, transaction_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends transaction_logsUpdateManyArgs>(args: Prisma.SelectSubset<T, transaction_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends transaction_logsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, transaction_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends transaction_logsUpsertArgs>(args: Prisma.SelectSubset<T, transaction_logsUpsertArgs<ExtArgs>>): Prisma.Prisma__transaction_logsClient<runtime.Types.Result.GetResult<Prisma.$transaction_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends transaction_logsCountArgs>(args?: Prisma.Subset<T, transaction_logsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Transaction_logsCountAggregateOutputType> : number>;
    aggregate<T extends Transaction_logsAggregateArgs>(args: Prisma.Subset<T, Transaction_logsAggregateArgs>): Prisma.PrismaPromise<GetTransaction_logsAggregateType<T>>;
    groupBy<T extends transaction_logsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: transaction_logsGroupByArgs['orderBy'];
    } : {
        orderBy?: transaction_logsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, transaction_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransaction_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: transaction_logsFieldRefs;
}
export interface Prisma__transaction_logsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    transactions<T extends Prisma.transactionsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.transactionsDefaultArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface transaction_logsFieldRefs {
    readonly id: Prisma.FieldRef<"transaction_logs", 'String'>;
    readonly transaction_id: Prisma.FieldRef<"transaction_logs", 'String'>;
    readonly user_id: Prisma.FieldRef<"transaction_logs", 'BigInt'>;
    readonly action: Prisma.FieldRef<"transaction_logs", 'String'>;
    readonly payload_before: Prisma.FieldRef<"transaction_logs", 'Json'>;
    readonly payload_after: Prisma.FieldRef<"transaction_logs", 'Json'>;
    readonly ip_address: Prisma.FieldRef<"transaction_logs", 'String'>;
    readonly user_agent: Prisma.FieldRef<"transaction_logs", 'String'>;
    readonly created_at: Prisma.FieldRef<"transaction_logs", 'DateTime'>;
}
export type transaction_logsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transaction_logsSelect<ExtArgs> | null;
    omit?: Prisma.transaction_logsOmit<ExtArgs> | null;
    include?: Prisma.transaction_logsInclude<ExtArgs> | null;
    where: Prisma.transaction_logsWhereUniqueInput;
};
export type transaction_logsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transaction_logsSelect<ExtArgs> | null;
    omit?: Prisma.transaction_logsOmit<ExtArgs> | null;
    include?: Prisma.transaction_logsInclude<ExtArgs> | null;
    where: Prisma.transaction_logsWhereUniqueInput;
};
export type transaction_logsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type transaction_logsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type transaction_logsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type transaction_logsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transaction_logsSelect<ExtArgs> | null;
    omit?: Prisma.transaction_logsOmit<ExtArgs> | null;
    include?: Prisma.transaction_logsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.transaction_logsCreateInput, Prisma.transaction_logsUncheckedCreateInput>;
};
export type transaction_logsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.transaction_logsCreateManyInput | Prisma.transaction_logsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type transaction_logsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transaction_logsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.transaction_logsOmit<ExtArgs> | null;
    data: Prisma.transaction_logsCreateManyInput | Prisma.transaction_logsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.transaction_logsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type transaction_logsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transaction_logsSelect<ExtArgs> | null;
    omit?: Prisma.transaction_logsOmit<ExtArgs> | null;
    include?: Prisma.transaction_logsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.transaction_logsUpdateInput, Prisma.transaction_logsUncheckedUpdateInput>;
    where: Prisma.transaction_logsWhereUniqueInput;
};
export type transaction_logsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.transaction_logsUpdateManyMutationInput, Prisma.transaction_logsUncheckedUpdateManyInput>;
    where?: Prisma.transaction_logsWhereInput;
    limit?: number;
};
export type transaction_logsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transaction_logsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.transaction_logsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.transaction_logsUpdateManyMutationInput, Prisma.transaction_logsUncheckedUpdateManyInput>;
    where?: Prisma.transaction_logsWhereInput;
    limit?: number;
    include?: Prisma.transaction_logsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type transaction_logsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transaction_logsSelect<ExtArgs> | null;
    omit?: Prisma.transaction_logsOmit<ExtArgs> | null;
    include?: Prisma.transaction_logsInclude<ExtArgs> | null;
    where: Prisma.transaction_logsWhereUniqueInput;
    create: Prisma.XOR<Prisma.transaction_logsCreateInput, Prisma.transaction_logsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.transaction_logsUpdateInput, Prisma.transaction_logsUncheckedUpdateInput>;
};
export type transaction_logsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transaction_logsSelect<ExtArgs> | null;
    omit?: Prisma.transaction_logsOmit<ExtArgs> | null;
    include?: Prisma.transaction_logsInclude<ExtArgs> | null;
    where: Prisma.transaction_logsWhereUniqueInput;
};
export type transaction_logsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transaction_logsWhereInput;
    limit?: number;
};
export type transaction_logsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transaction_logsSelect<ExtArgs> | null;
    omit?: Prisma.transaction_logsOmit<ExtArgs> | null;
    include?: Prisma.transaction_logsInclude<ExtArgs> | null;
};
