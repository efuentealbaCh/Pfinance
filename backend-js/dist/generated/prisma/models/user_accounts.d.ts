import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type user_accountsModel = runtime.Types.Result.DefaultSelection<Prisma.$user_accountsPayload>;
export type AggregateUser_accounts = {
    _count: User_accountsCountAggregateOutputType | null;
    _avg: User_accountsAvgAggregateOutputType | null;
    _sum: User_accountsSumAggregateOutputType | null;
    _min: User_accountsMinAggregateOutputType | null;
    _max: User_accountsMaxAggregateOutputType | null;
};
export type User_accountsAvgAggregateOutputType = {
    user_id: number | null;
    balance: runtime.Decimal | null;
};
export type User_accountsSumAggregateOutputType = {
    user_id: bigint | null;
    balance: runtime.Decimal | null;
};
export type User_accountsMinAggregateOutputType = {
    id: string | null;
    user_id: bigint | null;
    bank_id: string | null;
    account_type_id: string | null;
    identifier: string | null;
    balance: runtime.Decimal | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type User_accountsMaxAggregateOutputType = {
    id: string | null;
    user_id: bigint | null;
    bank_id: string | null;
    account_type_id: string | null;
    identifier: string | null;
    balance: runtime.Decimal | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type User_accountsCountAggregateOutputType = {
    id: number;
    user_id: number;
    bank_id: number;
    account_type_id: number;
    identifier: number;
    balance: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type User_accountsAvgAggregateInputType = {
    user_id?: true;
    balance?: true;
};
export type User_accountsSumAggregateInputType = {
    user_id?: true;
    balance?: true;
};
export type User_accountsMinAggregateInputType = {
    id?: true;
    user_id?: true;
    bank_id?: true;
    account_type_id?: true;
    identifier?: true;
    balance?: true;
    created_at?: true;
    updated_at?: true;
};
export type User_accountsMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    bank_id?: true;
    account_type_id?: true;
    identifier?: true;
    balance?: true;
    created_at?: true;
    updated_at?: true;
};
export type User_accountsCountAggregateInputType = {
    id?: true;
    user_id?: true;
    bank_id?: true;
    account_type_id?: true;
    identifier?: true;
    balance?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type User_accountsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_accountsWhereInput;
    orderBy?: Prisma.user_accountsOrderByWithRelationInput | Prisma.user_accountsOrderByWithRelationInput[];
    cursor?: Prisma.user_accountsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | User_accountsCountAggregateInputType;
    _avg?: User_accountsAvgAggregateInputType;
    _sum?: User_accountsSumAggregateInputType;
    _min?: User_accountsMinAggregateInputType;
    _max?: User_accountsMaxAggregateInputType;
};
export type GetUser_accountsAggregateType<T extends User_accountsAggregateArgs> = {
    [P in keyof T & keyof AggregateUser_accounts]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser_accounts[P]> : Prisma.GetScalarType<T[P], AggregateUser_accounts[P]>;
};
export type user_accountsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_accountsWhereInput;
    orderBy?: Prisma.user_accountsOrderByWithAggregationInput | Prisma.user_accountsOrderByWithAggregationInput[];
    by: Prisma.User_accountsScalarFieldEnum[] | Prisma.User_accountsScalarFieldEnum;
    having?: Prisma.user_accountsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: User_accountsCountAggregateInputType | true;
    _avg?: User_accountsAvgAggregateInputType;
    _sum?: User_accountsSumAggregateInputType;
    _min?: User_accountsMinAggregateInputType;
    _max?: User_accountsMaxAggregateInputType;
};
export type User_accountsGroupByOutputType = {
    id: string;
    user_id: bigint;
    bank_id: string;
    account_type_id: string;
    identifier: string | null;
    balance: runtime.Decimal;
    created_at: Date | null;
    updated_at: Date | null;
    _count: User_accountsCountAggregateOutputType | null;
    _avg: User_accountsAvgAggregateOutputType | null;
    _sum: User_accountsSumAggregateOutputType | null;
    _min: User_accountsMinAggregateOutputType | null;
    _max: User_accountsMaxAggregateOutputType | null;
};
export type GetUser_accountsGroupByPayload<T extends user_accountsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<User_accountsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof User_accountsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], User_accountsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], User_accountsGroupByOutputType[P]>;
}>>;
export type user_accountsWhereInput = {
    AND?: Prisma.user_accountsWhereInput | Prisma.user_accountsWhereInput[];
    OR?: Prisma.user_accountsWhereInput[];
    NOT?: Prisma.user_accountsWhereInput | Prisma.user_accountsWhereInput[];
    id?: Prisma.UuidFilter<"user_accounts"> | string;
    user_id?: Prisma.BigIntFilter<"user_accounts"> | bigint | number;
    bank_id?: Prisma.UuidFilter<"user_accounts"> | string;
    account_type_id?: Prisma.UuidFilter<"user_accounts"> | string;
    identifier?: Prisma.StringNullableFilter<"user_accounts"> | string | null;
    balance?: Prisma.DecimalFilter<"user_accounts"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeNullableFilter<"user_accounts"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"user_accounts"> | Date | string | null;
    transactions?: Prisma.TransactionsListRelationFilter;
    account_types?: Prisma.XOR<Prisma.Account_typesScalarRelationFilter, Prisma.account_typesWhereInput>;
    banks?: Prisma.XOR<Prisma.BanksScalarRelationFilter, Prisma.banksWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type user_accountsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    bank_id?: Prisma.SortOrder;
    account_type_id?: Prisma.SortOrder;
    identifier?: Prisma.SortOrderInput | Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    transactions?: Prisma.transactionsOrderByRelationAggregateInput;
    account_types?: Prisma.account_typesOrderByWithRelationInput;
    banks?: Prisma.banksOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type user_accountsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.user_accountsWhereInput | Prisma.user_accountsWhereInput[];
    OR?: Prisma.user_accountsWhereInput[];
    NOT?: Prisma.user_accountsWhereInput | Prisma.user_accountsWhereInput[];
    user_id?: Prisma.BigIntFilter<"user_accounts"> | bigint | number;
    bank_id?: Prisma.UuidFilter<"user_accounts"> | string;
    account_type_id?: Prisma.UuidFilter<"user_accounts"> | string;
    identifier?: Prisma.StringNullableFilter<"user_accounts"> | string | null;
    balance?: Prisma.DecimalFilter<"user_accounts"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeNullableFilter<"user_accounts"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"user_accounts"> | Date | string | null;
    transactions?: Prisma.TransactionsListRelationFilter;
    account_types?: Prisma.XOR<Prisma.Account_typesScalarRelationFilter, Prisma.account_typesWhereInput>;
    banks?: Prisma.XOR<Prisma.BanksScalarRelationFilter, Prisma.banksWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type user_accountsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    bank_id?: Prisma.SortOrder;
    account_type_id?: Prisma.SortOrder;
    identifier?: Prisma.SortOrderInput | Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.user_accountsCountOrderByAggregateInput;
    _avg?: Prisma.user_accountsAvgOrderByAggregateInput;
    _max?: Prisma.user_accountsMaxOrderByAggregateInput;
    _min?: Prisma.user_accountsMinOrderByAggregateInput;
    _sum?: Prisma.user_accountsSumOrderByAggregateInput;
};
export type user_accountsScalarWhereWithAggregatesInput = {
    AND?: Prisma.user_accountsScalarWhereWithAggregatesInput | Prisma.user_accountsScalarWhereWithAggregatesInput[];
    OR?: Prisma.user_accountsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.user_accountsScalarWhereWithAggregatesInput | Prisma.user_accountsScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"user_accounts"> | string;
    user_id?: Prisma.BigIntWithAggregatesFilter<"user_accounts"> | bigint | number;
    bank_id?: Prisma.UuidWithAggregatesFilter<"user_accounts"> | string;
    account_type_id?: Prisma.UuidWithAggregatesFilter<"user_accounts"> | string;
    identifier?: Prisma.StringNullableWithAggregatesFilter<"user_accounts"> | string | null;
    balance?: Prisma.DecimalWithAggregatesFilter<"user_accounts"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"user_accounts"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"user_accounts"> | Date | string | null;
};
export type user_accountsCreateInput = {
    id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUser_accountsInput;
    account_types: Prisma.account_typesCreateNestedOneWithoutUser_accountsInput;
    banks: Prisma.banksCreateNestedOneWithoutUser_accountsInput;
    users: Prisma.usersCreateNestedOneWithoutUser_accountsInput;
};
export type user_accountsUncheckedCreateInput = {
    id: string;
    user_id: bigint | number;
    bank_id: string;
    account_type_id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUser_accountsInput;
};
export type user_accountsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transactions?: Prisma.transactionsUpdateManyWithoutUser_accountsNestedInput;
    account_types?: Prisma.account_typesUpdateOneRequiredWithoutUser_accountsNestedInput;
    banks?: Prisma.banksUpdateOneRequiredWithoutUser_accountsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutUser_accountsNestedInput;
};
export type user_accountsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    bank_id?: Prisma.StringFieldUpdateOperationsInput | string;
    account_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUser_accountsNestedInput;
};
export type user_accountsCreateManyInput = {
    id: string;
    user_id: bigint | number;
    bank_id: string;
    account_type_id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type user_accountsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_accountsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    bank_id?: Prisma.StringFieldUpdateOperationsInput | string;
    account_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type User_accountsListRelationFilter = {
    every?: Prisma.user_accountsWhereInput;
    some?: Prisma.user_accountsWhereInput;
    none?: Prisma.user_accountsWhereInput;
};
export type user_accountsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type User_accountsScalarRelationFilter = {
    is?: Prisma.user_accountsWhereInput;
    isNot?: Prisma.user_accountsWhereInput;
};
export type user_accountsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    bank_id?: Prisma.SortOrder;
    account_type_id?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type user_accountsAvgOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
};
export type user_accountsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    bank_id?: Prisma.SortOrder;
    account_type_id?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type user_accountsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    bank_id?: Prisma.SortOrder;
    account_type_id?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type user_accountsSumOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
};
export type user_accountsCreateNestedManyWithoutAccount_typesInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutAccount_typesInput, Prisma.user_accountsUncheckedCreateWithoutAccount_typesInput> | Prisma.user_accountsCreateWithoutAccount_typesInput[] | Prisma.user_accountsUncheckedCreateWithoutAccount_typesInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutAccount_typesInput | Prisma.user_accountsCreateOrConnectWithoutAccount_typesInput[];
    createMany?: Prisma.user_accountsCreateManyAccount_typesInputEnvelope;
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
};
export type user_accountsUncheckedCreateNestedManyWithoutAccount_typesInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutAccount_typesInput, Prisma.user_accountsUncheckedCreateWithoutAccount_typesInput> | Prisma.user_accountsCreateWithoutAccount_typesInput[] | Prisma.user_accountsUncheckedCreateWithoutAccount_typesInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutAccount_typesInput | Prisma.user_accountsCreateOrConnectWithoutAccount_typesInput[];
    createMany?: Prisma.user_accountsCreateManyAccount_typesInputEnvelope;
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
};
export type user_accountsUpdateManyWithoutAccount_typesNestedInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutAccount_typesInput, Prisma.user_accountsUncheckedCreateWithoutAccount_typesInput> | Prisma.user_accountsCreateWithoutAccount_typesInput[] | Prisma.user_accountsUncheckedCreateWithoutAccount_typesInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutAccount_typesInput | Prisma.user_accountsCreateOrConnectWithoutAccount_typesInput[];
    upsert?: Prisma.user_accountsUpsertWithWhereUniqueWithoutAccount_typesInput | Prisma.user_accountsUpsertWithWhereUniqueWithoutAccount_typesInput[];
    createMany?: Prisma.user_accountsCreateManyAccount_typesInputEnvelope;
    set?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    disconnect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    delete?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    update?: Prisma.user_accountsUpdateWithWhereUniqueWithoutAccount_typesInput | Prisma.user_accountsUpdateWithWhereUniqueWithoutAccount_typesInput[];
    updateMany?: Prisma.user_accountsUpdateManyWithWhereWithoutAccount_typesInput | Prisma.user_accountsUpdateManyWithWhereWithoutAccount_typesInput[];
    deleteMany?: Prisma.user_accountsScalarWhereInput | Prisma.user_accountsScalarWhereInput[];
};
export type user_accountsUncheckedUpdateManyWithoutAccount_typesNestedInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutAccount_typesInput, Prisma.user_accountsUncheckedCreateWithoutAccount_typesInput> | Prisma.user_accountsCreateWithoutAccount_typesInput[] | Prisma.user_accountsUncheckedCreateWithoutAccount_typesInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutAccount_typesInput | Prisma.user_accountsCreateOrConnectWithoutAccount_typesInput[];
    upsert?: Prisma.user_accountsUpsertWithWhereUniqueWithoutAccount_typesInput | Prisma.user_accountsUpsertWithWhereUniqueWithoutAccount_typesInput[];
    createMany?: Prisma.user_accountsCreateManyAccount_typesInputEnvelope;
    set?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    disconnect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    delete?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    update?: Prisma.user_accountsUpdateWithWhereUniqueWithoutAccount_typesInput | Prisma.user_accountsUpdateWithWhereUniqueWithoutAccount_typesInput[];
    updateMany?: Prisma.user_accountsUpdateManyWithWhereWithoutAccount_typesInput | Prisma.user_accountsUpdateManyWithWhereWithoutAccount_typesInput[];
    deleteMany?: Prisma.user_accountsScalarWhereInput | Prisma.user_accountsScalarWhereInput[];
};
export type user_accountsCreateNestedManyWithoutBanksInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutBanksInput, Prisma.user_accountsUncheckedCreateWithoutBanksInput> | Prisma.user_accountsCreateWithoutBanksInput[] | Prisma.user_accountsUncheckedCreateWithoutBanksInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutBanksInput | Prisma.user_accountsCreateOrConnectWithoutBanksInput[];
    createMany?: Prisma.user_accountsCreateManyBanksInputEnvelope;
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
};
export type user_accountsUncheckedCreateNestedManyWithoutBanksInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutBanksInput, Prisma.user_accountsUncheckedCreateWithoutBanksInput> | Prisma.user_accountsCreateWithoutBanksInput[] | Prisma.user_accountsUncheckedCreateWithoutBanksInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutBanksInput | Prisma.user_accountsCreateOrConnectWithoutBanksInput[];
    createMany?: Prisma.user_accountsCreateManyBanksInputEnvelope;
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
};
export type user_accountsUpdateManyWithoutBanksNestedInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutBanksInput, Prisma.user_accountsUncheckedCreateWithoutBanksInput> | Prisma.user_accountsCreateWithoutBanksInput[] | Prisma.user_accountsUncheckedCreateWithoutBanksInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutBanksInput | Prisma.user_accountsCreateOrConnectWithoutBanksInput[];
    upsert?: Prisma.user_accountsUpsertWithWhereUniqueWithoutBanksInput | Prisma.user_accountsUpsertWithWhereUniqueWithoutBanksInput[];
    createMany?: Prisma.user_accountsCreateManyBanksInputEnvelope;
    set?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    disconnect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    delete?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    update?: Prisma.user_accountsUpdateWithWhereUniqueWithoutBanksInput | Prisma.user_accountsUpdateWithWhereUniqueWithoutBanksInput[];
    updateMany?: Prisma.user_accountsUpdateManyWithWhereWithoutBanksInput | Prisma.user_accountsUpdateManyWithWhereWithoutBanksInput[];
    deleteMany?: Prisma.user_accountsScalarWhereInput | Prisma.user_accountsScalarWhereInput[];
};
export type user_accountsUncheckedUpdateManyWithoutBanksNestedInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutBanksInput, Prisma.user_accountsUncheckedCreateWithoutBanksInput> | Prisma.user_accountsCreateWithoutBanksInput[] | Prisma.user_accountsUncheckedCreateWithoutBanksInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutBanksInput | Prisma.user_accountsCreateOrConnectWithoutBanksInput[];
    upsert?: Prisma.user_accountsUpsertWithWhereUniqueWithoutBanksInput | Prisma.user_accountsUpsertWithWhereUniqueWithoutBanksInput[];
    createMany?: Prisma.user_accountsCreateManyBanksInputEnvelope;
    set?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    disconnect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    delete?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    update?: Prisma.user_accountsUpdateWithWhereUniqueWithoutBanksInput | Prisma.user_accountsUpdateWithWhereUniqueWithoutBanksInput[];
    updateMany?: Prisma.user_accountsUpdateManyWithWhereWithoutBanksInput | Prisma.user_accountsUpdateManyWithWhereWithoutBanksInput[];
    deleteMany?: Prisma.user_accountsScalarWhereInput | Prisma.user_accountsScalarWhereInput[];
};
export type user_accountsCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutTransactionsInput, Prisma.user_accountsUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.user_accountsWhereUniqueInput;
};
export type user_accountsUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutTransactionsInput, Prisma.user_accountsUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.user_accountsUpsertWithoutTransactionsInput;
    connect?: Prisma.user_accountsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.user_accountsUpdateToOneWithWhereWithoutTransactionsInput, Prisma.user_accountsUpdateWithoutTransactionsInput>, Prisma.user_accountsUncheckedUpdateWithoutTransactionsInput>;
};
export type user_accountsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutUsersInput, Prisma.user_accountsUncheckedCreateWithoutUsersInput> | Prisma.user_accountsCreateWithoutUsersInput[] | Prisma.user_accountsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutUsersInput | Prisma.user_accountsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.user_accountsCreateManyUsersInputEnvelope;
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
};
export type user_accountsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutUsersInput, Prisma.user_accountsUncheckedCreateWithoutUsersInput> | Prisma.user_accountsCreateWithoutUsersInput[] | Prisma.user_accountsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutUsersInput | Prisma.user_accountsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.user_accountsCreateManyUsersInputEnvelope;
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
};
export type user_accountsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutUsersInput, Prisma.user_accountsUncheckedCreateWithoutUsersInput> | Prisma.user_accountsCreateWithoutUsersInput[] | Prisma.user_accountsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutUsersInput | Prisma.user_accountsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.user_accountsUpsertWithWhereUniqueWithoutUsersInput | Prisma.user_accountsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.user_accountsCreateManyUsersInputEnvelope;
    set?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    disconnect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    delete?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    update?: Prisma.user_accountsUpdateWithWhereUniqueWithoutUsersInput | Prisma.user_accountsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.user_accountsUpdateManyWithWhereWithoutUsersInput | Prisma.user_accountsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.user_accountsScalarWhereInput | Prisma.user_accountsScalarWhereInput[];
};
export type user_accountsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.user_accountsCreateWithoutUsersInput, Prisma.user_accountsUncheckedCreateWithoutUsersInput> | Prisma.user_accountsCreateWithoutUsersInput[] | Prisma.user_accountsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.user_accountsCreateOrConnectWithoutUsersInput | Prisma.user_accountsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.user_accountsUpsertWithWhereUniqueWithoutUsersInput | Prisma.user_accountsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.user_accountsCreateManyUsersInputEnvelope;
    set?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    disconnect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    delete?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    connect?: Prisma.user_accountsWhereUniqueInput | Prisma.user_accountsWhereUniqueInput[];
    update?: Prisma.user_accountsUpdateWithWhereUniqueWithoutUsersInput | Prisma.user_accountsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.user_accountsUpdateManyWithWhereWithoutUsersInput | Prisma.user_accountsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.user_accountsScalarWhereInput | Prisma.user_accountsScalarWhereInput[];
};
export type user_accountsCreateWithoutAccount_typesInput = {
    id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUser_accountsInput;
    banks: Prisma.banksCreateNestedOneWithoutUser_accountsInput;
    users: Prisma.usersCreateNestedOneWithoutUser_accountsInput;
};
export type user_accountsUncheckedCreateWithoutAccount_typesInput = {
    id: string;
    user_id: bigint | number;
    bank_id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUser_accountsInput;
};
export type user_accountsCreateOrConnectWithoutAccount_typesInput = {
    where: Prisma.user_accountsWhereUniqueInput;
    create: Prisma.XOR<Prisma.user_accountsCreateWithoutAccount_typesInput, Prisma.user_accountsUncheckedCreateWithoutAccount_typesInput>;
};
export type user_accountsCreateManyAccount_typesInputEnvelope = {
    data: Prisma.user_accountsCreateManyAccount_typesInput | Prisma.user_accountsCreateManyAccount_typesInput[];
    skipDuplicates?: boolean;
};
export type user_accountsUpsertWithWhereUniqueWithoutAccount_typesInput = {
    where: Prisma.user_accountsWhereUniqueInput;
    update: Prisma.XOR<Prisma.user_accountsUpdateWithoutAccount_typesInput, Prisma.user_accountsUncheckedUpdateWithoutAccount_typesInput>;
    create: Prisma.XOR<Prisma.user_accountsCreateWithoutAccount_typesInput, Prisma.user_accountsUncheckedCreateWithoutAccount_typesInput>;
};
export type user_accountsUpdateWithWhereUniqueWithoutAccount_typesInput = {
    where: Prisma.user_accountsWhereUniqueInput;
    data: Prisma.XOR<Prisma.user_accountsUpdateWithoutAccount_typesInput, Prisma.user_accountsUncheckedUpdateWithoutAccount_typesInput>;
};
export type user_accountsUpdateManyWithWhereWithoutAccount_typesInput = {
    where: Prisma.user_accountsScalarWhereInput;
    data: Prisma.XOR<Prisma.user_accountsUpdateManyMutationInput, Prisma.user_accountsUncheckedUpdateManyWithoutAccount_typesInput>;
};
export type user_accountsScalarWhereInput = {
    AND?: Prisma.user_accountsScalarWhereInput | Prisma.user_accountsScalarWhereInput[];
    OR?: Prisma.user_accountsScalarWhereInput[];
    NOT?: Prisma.user_accountsScalarWhereInput | Prisma.user_accountsScalarWhereInput[];
    id?: Prisma.UuidFilter<"user_accounts"> | string;
    user_id?: Prisma.BigIntFilter<"user_accounts"> | bigint | number;
    bank_id?: Prisma.UuidFilter<"user_accounts"> | string;
    account_type_id?: Prisma.UuidFilter<"user_accounts"> | string;
    identifier?: Prisma.StringNullableFilter<"user_accounts"> | string | null;
    balance?: Prisma.DecimalFilter<"user_accounts"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeNullableFilter<"user_accounts"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"user_accounts"> | Date | string | null;
};
export type user_accountsCreateWithoutBanksInput = {
    id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUser_accountsInput;
    account_types: Prisma.account_typesCreateNestedOneWithoutUser_accountsInput;
    users: Prisma.usersCreateNestedOneWithoutUser_accountsInput;
};
export type user_accountsUncheckedCreateWithoutBanksInput = {
    id: string;
    user_id: bigint | number;
    account_type_id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUser_accountsInput;
};
export type user_accountsCreateOrConnectWithoutBanksInput = {
    where: Prisma.user_accountsWhereUniqueInput;
    create: Prisma.XOR<Prisma.user_accountsCreateWithoutBanksInput, Prisma.user_accountsUncheckedCreateWithoutBanksInput>;
};
export type user_accountsCreateManyBanksInputEnvelope = {
    data: Prisma.user_accountsCreateManyBanksInput | Prisma.user_accountsCreateManyBanksInput[];
    skipDuplicates?: boolean;
};
export type user_accountsUpsertWithWhereUniqueWithoutBanksInput = {
    where: Prisma.user_accountsWhereUniqueInput;
    update: Prisma.XOR<Prisma.user_accountsUpdateWithoutBanksInput, Prisma.user_accountsUncheckedUpdateWithoutBanksInput>;
    create: Prisma.XOR<Prisma.user_accountsCreateWithoutBanksInput, Prisma.user_accountsUncheckedCreateWithoutBanksInput>;
};
export type user_accountsUpdateWithWhereUniqueWithoutBanksInput = {
    where: Prisma.user_accountsWhereUniqueInput;
    data: Prisma.XOR<Prisma.user_accountsUpdateWithoutBanksInput, Prisma.user_accountsUncheckedUpdateWithoutBanksInput>;
};
export type user_accountsUpdateManyWithWhereWithoutBanksInput = {
    where: Prisma.user_accountsScalarWhereInput;
    data: Prisma.XOR<Prisma.user_accountsUpdateManyMutationInput, Prisma.user_accountsUncheckedUpdateManyWithoutBanksInput>;
};
export type user_accountsCreateWithoutTransactionsInput = {
    id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    account_types: Prisma.account_typesCreateNestedOneWithoutUser_accountsInput;
    banks: Prisma.banksCreateNestedOneWithoutUser_accountsInput;
    users: Prisma.usersCreateNestedOneWithoutUser_accountsInput;
};
export type user_accountsUncheckedCreateWithoutTransactionsInput = {
    id: string;
    user_id: bigint | number;
    bank_id: string;
    account_type_id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type user_accountsCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.user_accountsWhereUniqueInput;
    create: Prisma.XOR<Prisma.user_accountsCreateWithoutTransactionsInput, Prisma.user_accountsUncheckedCreateWithoutTransactionsInput>;
};
export type user_accountsUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.user_accountsUpdateWithoutTransactionsInput, Prisma.user_accountsUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.user_accountsCreateWithoutTransactionsInput, Prisma.user_accountsUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.user_accountsWhereInput;
};
export type user_accountsUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.user_accountsWhereInput;
    data: Prisma.XOR<Prisma.user_accountsUpdateWithoutTransactionsInput, Prisma.user_accountsUncheckedUpdateWithoutTransactionsInput>;
};
export type user_accountsUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    account_types?: Prisma.account_typesUpdateOneRequiredWithoutUser_accountsNestedInput;
    banks?: Prisma.banksUpdateOneRequiredWithoutUser_accountsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutUser_accountsNestedInput;
};
export type user_accountsUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    bank_id?: Prisma.StringFieldUpdateOperationsInput | string;
    account_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_accountsCreateWithoutUsersInput = {
    id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transactions?: Prisma.transactionsCreateNestedManyWithoutUser_accountsInput;
    account_types: Prisma.account_typesCreateNestedOneWithoutUser_accountsInput;
    banks: Prisma.banksCreateNestedOneWithoutUser_accountsInput;
};
export type user_accountsUncheckedCreateWithoutUsersInput = {
    id: string;
    bank_id: string;
    account_type_id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    transactions?: Prisma.transactionsUncheckedCreateNestedManyWithoutUser_accountsInput;
};
export type user_accountsCreateOrConnectWithoutUsersInput = {
    where: Prisma.user_accountsWhereUniqueInput;
    create: Prisma.XOR<Prisma.user_accountsCreateWithoutUsersInput, Prisma.user_accountsUncheckedCreateWithoutUsersInput>;
};
export type user_accountsCreateManyUsersInputEnvelope = {
    data: Prisma.user_accountsCreateManyUsersInput | Prisma.user_accountsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type user_accountsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.user_accountsWhereUniqueInput;
    update: Prisma.XOR<Prisma.user_accountsUpdateWithoutUsersInput, Prisma.user_accountsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.user_accountsCreateWithoutUsersInput, Prisma.user_accountsUncheckedCreateWithoutUsersInput>;
};
export type user_accountsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.user_accountsWhereUniqueInput;
    data: Prisma.XOR<Prisma.user_accountsUpdateWithoutUsersInput, Prisma.user_accountsUncheckedUpdateWithoutUsersInput>;
};
export type user_accountsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.user_accountsScalarWhereInput;
    data: Prisma.XOR<Prisma.user_accountsUpdateManyMutationInput, Prisma.user_accountsUncheckedUpdateManyWithoutUsersInput>;
};
export type user_accountsCreateManyAccount_typesInput = {
    id: string;
    user_id: bigint | number;
    bank_id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type user_accountsUpdateWithoutAccount_typesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transactions?: Prisma.transactionsUpdateManyWithoutUser_accountsNestedInput;
    banks?: Prisma.banksUpdateOneRequiredWithoutUser_accountsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutUser_accountsNestedInput;
};
export type user_accountsUncheckedUpdateWithoutAccount_typesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    bank_id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUser_accountsNestedInput;
};
export type user_accountsUncheckedUpdateManyWithoutAccount_typesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    bank_id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_accountsCreateManyBanksInput = {
    id: string;
    user_id: bigint | number;
    account_type_id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type user_accountsUpdateWithoutBanksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transactions?: Prisma.transactionsUpdateManyWithoutUser_accountsNestedInput;
    account_types?: Prisma.account_typesUpdateOneRequiredWithoutUser_accountsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutUser_accountsNestedInput;
};
export type user_accountsUncheckedUpdateWithoutBanksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    account_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUser_accountsNestedInput;
};
export type user_accountsUncheckedUpdateManyWithoutBanksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    account_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_accountsCreateManyUsersInput = {
    id: string;
    bank_id: string;
    account_type_id: string;
    identifier?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type user_accountsUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transactions?: Prisma.transactionsUpdateManyWithoutUser_accountsNestedInput;
    account_types?: Prisma.account_typesUpdateOneRequiredWithoutUser_accountsNestedInput;
    banks?: Prisma.banksUpdateOneRequiredWithoutUser_accountsNestedInput;
};
export type user_accountsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bank_id?: Prisma.StringFieldUpdateOperationsInput | string;
    account_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    transactions?: Prisma.transactionsUncheckedUpdateManyWithoutUser_accountsNestedInput;
};
export type user_accountsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bank_id?: Prisma.StringFieldUpdateOperationsInput | string;
    account_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type User_accountsCountOutputType = {
    transactions: number;
};
export type User_accountsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | User_accountsCountOutputTypeCountTransactionsArgs;
};
export type User_accountsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.User_accountsCountOutputTypeSelect<ExtArgs> | null;
};
export type User_accountsCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transactionsWhereInput;
};
export type user_accountsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    bank_id?: boolean;
    account_type_id?: boolean;
    identifier?: boolean;
    balance?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    transactions?: boolean | Prisma.user_accounts$transactionsArgs<ExtArgs>;
    account_types?: boolean | Prisma.account_typesDefaultArgs<ExtArgs>;
    banks?: boolean | Prisma.banksDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.User_accountsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user_accounts"]>;
export type user_accountsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    bank_id?: boolean;
    account_type_id?: boolean;
    identifier?: boolean;
    balance?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    account_types?: boolean | Prisma.account_typesDefaultArgs<ExtArgs>;
    banks?: boolean | Prisma.banksDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user_accounts"]>;
export type user_accountsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    bank_id?: boolean;
    account_type_id?: boolean;
    identifier?: boolean;
    balance?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    account_types?: boolean | Prisma.account_typesDefaultArgs<ExtArgs>;
    banks?: boolean | Prisma.banksDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user_accounts"]>;
export type user_accountsSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    bank_id?: boolean;
    account_type_id?: boolean;
    identifier?: boolean;
    balance?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type user_accountsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "bank_id" | "account_type_id" | "identifier" | "balance" | "created_at" | "updated_at", ExtArgs["result"]["user_accounts"]>;
export type user_accountsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | Prisma.user_accounts$transactionsArgs<ExtArgs>;
    account_types?: boolean | Prisma.account_typesDefaultArgs<ExtArgs>;
    banks?: boolean | Prisma.banksDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.User_accountsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type user_accountsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account_types?: boolean | Prisma.account_typesDefaultArgs<ExtArgs>;
    banks?: boolean | Prisma.banksDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type user_accountsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account_types?: boolean | Prisma.account_typesDefaultArgs<ExtArgs>;
    banks?: boolean | Prisma.banksDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $user_accountsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "user_accounts";
    objects: {
        transactions: Prisma.$transactionsPayload<ExtArgs>[];
        account_types: Prisma.$account_typesPayload<ExtArgs>;
        banks: Prisma.$banksPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        user_id: bigint;
        bank_id: string;
        account_type_id: string;
        identifier: string | null;
        balance: runtime.Decimal;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["user_accounts"]>;
    composites: {};
};
export type user_accountsGetPayload<S extends boolean | null | undefined | user_accountsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$user_accountsPayload, S>;
export type user_accountsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<user_accountsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: User_accountsCountAggregateInputType | true;
};
export interface user_accountsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['user_accounts'];
        meta: {
            name: 'user_accounts';
        };
    };
    findUnique<T extends user_accountsFindUniqueArgs>(args: Prisma.SelectSubset<T, user_accountsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__user_accountsClient<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends user_accountsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, user_accountsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__user_accountsClient<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends user_accountsFindFirstArgs>(args?: Prisma.SelectSubset<T, user_accountsFindFirstArgs<ExtArgs>>): Prisma.Prisma__user_accountsClient<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends user_accountsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, user_accountsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__user_accountsClient<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends user_accountsFindManyArgs>(args?: Prisma.SelectSubset<T, user_accountsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends user_accountsCreateArgs>(args: Prisma.SelectSubset<T, user_accountsCreateArgs<ExtArgs>>): Prisma.Prisma__user_accountsClient<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends user_accountsCreateManyArgs>(args?: Prisma.SelectSubset<T, user_accountsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends user_accountsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, user_accountsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends user_accountsDeleteArgs>(args: Prisma.SelectSubset<T, user_accountsDeleteArgs<ExtArgs>>): Prisma.Prisma__user_accountsClient<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends user_accountsUpdateArgs>(args: Prisma.SelectSubset<T, user_accountsUpdateArgs<ExtArgs>>): Prisma.Prisma__user_accountsClient<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends user_accountsDeleteManyArgs>(args?: Prisma.SelectSubset<T, user_accountsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends user_accountsUpdateManyArgs>(args: Prisma.SelectSubset<T, user_accountsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends user_accountsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, user_accountsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends user_accountsUpsertArgs>(args: Prisma.SelectSubset<T, user_accountsUpsertArgs<ExtArgs>>): Prisma.Prisma__user_accountsClient<runtime.Types.Result.GetResult<Prisma.$user_accountsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends user_accountsCountArgs>(args?: Prisma.Subset<T, user_accountsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], User_accountsCountAggregateOutputType> : number>;
    aggregate<T extends User_accountsAggregateArgs>(args: Prisma.Subset<T, User_accountsAggregateArgs>): Prisma.PrismaPromise<GetUser_accountsAggregateType<T>>;
    groupBy<T extends user_accountsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: user_accountsGroupByArgs['orderBy'];
    } : {
        orderBy?: user_accountsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, user_accountsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_accountsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: user_accountsFieldRefs;
}
export interface Prisma__user_accountsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    transactions<T extends Prisma.user_accounts$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.user_accounts$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    account_types<T extends Prisma.account_typesDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.account_typesDefaultArgs<ExtArgs>>): Prisma.Prisma__account_typesClient<runtime.Types.Result.GetResult<Prisma.$account_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    banks<T extends Prisma.banksDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.banksDefaultArgs<ExtArgs>>): Prisma.Prisma__banksClient<runtime.Types.Result.GetResult<Prisma.$banksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface user_accountsFieldRefs {
    readonly id: Prisma.FieldRef<"user_accounts", 'String'>;
    readonly user_id: Prisma.FieldRef<"user_accounts", 'BigInt'>;
    readonly bank_id: Prisma.FieldRef<"user_accounts", 'String'>;
    readonly account_type_id: Prisma.FieldRef<"user_accounts", 'String'>;
    readonly identifier: Prisma.FieldRef<"user_accounts", 'String'>;
    readonly balance: Prisma.FieldRef<"user_accounts", 'Decimal'>;
    readonly created_at: Prisma.FieldRef<"user_accounts", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"user_accounts", 'DateTime'>;
}
export type user_accountsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_accountsSelect<ExtArgs> | null;
    omit?: Prisma.user_accountsOmit<ExtArgs> | null;
    include?: Prisma.user_accountsInclude<ExtArgs> | null;
    where: Prisma.user_accountsWhereUniqueInput;
};
export type user_accountsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_accountsSelect<ExtArgs> | null;
    omit?: Prisma.user_accountsOmit<ExtArgs> | null;
    include?: Prisma.user_accountsInclude<ExtArgs> | null;
    where: Prisma.user_accountsWhereUniqueInput;
};
export type user_accountsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type user_accountsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type user_accountsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type user_accountsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_accountsSelect<ExtArgs> | null;
    omit?: Prisma.user_accountsOmit<ExtArgs> | null;
    include?: Prisma.user_accountsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.user_accountsCreateInput, Prisma.user_accountsUncheckedCreateInput>;
};
export type user_accountsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.user_accountsCreateManyInput | Prisma.user_accountsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type user_accountsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_accountsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.user_accountsOmit<ExtArgs> | null;
    data: Prisma.user_accountsCreateManyInput | Prisma.user_accountsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.user_accountsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type user_accountsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_accountsSelect<ExtArgs> | null;
    omit?: Prisma.user_accountsOmit<ExtArgs> | null;
    include?: Prisma.user_accountsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.user_accountsUpdateInput, Prisma.user_accountsUncheckedUpdateInput>;
    where: Prisma.user_accountsWhereUniqueInput;
};
export type user_accountsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.user_accountsUpdateManyMutationInput, Prisma.user_accountsUncheckedUpdateManyInput>;
    where?: Prisma.user_accountsWhereInput;
    limit?: number;
};
export type user_accountsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_accountsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.user_accountsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.user_accountsUpdateManyMutationInput, Prisma.user_accountsUncheckedUpdateManyInput>;
    where?: Prisma.user_accountsWhereInput;
    limit?: number;
    include?: Prisma.user_accountsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type user_accountsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_accountsSelect<ExtArgs> | null;
    omit?: Prisma.user_accountsOmit<ExtArgs> | null;
    include?: Prisma.user_accountsInclude<ExtArgs> | null;
    where: Prisma.user_accountsWhereUniqueInput;
    create: Prisma.XOR<Prisma.user_accountsCreateInput, Prisma.user_accountsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.user_accountsUpdateInput, Prisma.user_accountsUncheckedUpdateInput>;
};
export type user_accountsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_accountsSelect<ExtArgs> | null;
    omit?: Prisma.user_accountsOmit<ExtArgs> | null;
    include?: Prisma.user_accountsInclude<ExtArgs> | null;
    where: Prisma.user_accountsWhereUniqueInput;
};
export type user_accountsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_accountsWhereInput;
    limit?: number;
};
export type user_accounts$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type user_accountsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_accountsSelect<ExtArgs> | null;
    omit?: Prisma.user_accountsOmit<ExtArgs> | null;
    include?: Prisma.user_accountsInclude<ExtArgs> | null;
};
