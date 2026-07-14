import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type password_reset_tokensModel = runtime.Types.Result.DefaultSelection<Prisma.$password_reset_tokensPayload>;
export type AggregatePassword_reset_tokens = {
    _count: Password_reset_tokensCountAggregateOutputType | null;
    _min: Password_reset_tokensMinAggregateOutputType | null;
    _max: Password_reset_tokensMaxAggregateOutputType | null;
};
export type Password_reset_tokensMinAggregateOutputType = {
    email: string | null;
    token: string | null;
    created_at: Date | null;
};
export type Password_reset_tokensMaxAggregateOutputType = {
    email: string | null;
    token: string | null;
    created_at: Date | null;
};
export type Password_reset_tokensCountAggregateOutputType = {
    email: number;
    token: number;
    created_at: number;
    _all: number;
};
export type Password_reset_tokensMinAggregateInputType = {
    email?: true;
    token?: true;
    created_at?: true;
};
export type Password_reset_tokensMaxAggregateInputType = {
    email?: true;
    token?: true;
    created_at?: true;
};
export type Password_reset_tokensCountAggregateInputType = {
    email?: true;
    token?: true;
    created_at?: true;
    _all?: true;
};
export type Password_reset_tokensAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.password_reset_tokensWhereInput;
    orderBy?: Prisma.password_reset_tokensOrderByWithRelationInput | Prisma.password_reset_tokensOrderByWithRelationInput[];
    cursor?: Prisma.password_reset_tokensWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Password_reset_tokensCountAggregateInputType;
    _min?: Password_reset_tokensMinAggregateInputType;
    _max?: Password_reset_tokensMaxAggregateInputType;
};
export type GetPassword_reset_tokensAggregateType<T extends Password_reset_tokensAggregateArgs> = {
    [P in keyof T & keyof AggregatePassword_reset_tokens]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePassword_reset_tokens[P]> : Prisma.GetScalarType<T[P], AggregatePassword_reset_tokens[P]>;
};
export type password_reset_tokensGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.password_reset_tokensWhereInput;
    orderBy?: Prisma.password_reset_tokensOrderByWithAggregationInput | Prisma.password_reset_tokensOrderByWithAggregationInput[];
    by: Prisma.Password_reset_tokensScalarFieldEnum[] | Prisma.Password_reset_tokensScalarFieldEnum;
    having?: Prisma.password_reset_tokensScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Password_reset_tokensCountAggregateInputType | true;
    _min?: Password_reset_tokensMinAggregateInputType;
    _max?: Password_reset_tokensMaxAggregateInputType;
};
export type Password_reset_tokensGroupByOutputType = {
    email: string;
    token: string;
    created_at: Date | null;
    _count: Password_reset_tokensCountAggregateOutputType | null;
    _min: Password_reset_tokensMinAggregateOutputType | null;
    _max: Password_reset_tokensMaxAggregateOutputType | null;
};
export type GetPassword_reset_tokensGroupByPayload<T extends password_reset_tokensGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Password_reset_tokensGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Password_reset_tokensGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Password_reset_tokensGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Password_reset_tokensGroupByOutputType[P]>;
}>>;
export type password_reset_tokensWhereInput = {
    AND?: Prisma.password_reset_tokensWhereInput | Prisma.password_reset_tokensWhereInput[];
    OR?: Prisma.password_reset_tokensWhereInput[];
    NOT?: Prisma.password_reset_tokensWhereInput | Prisma.password_reset_tokensWhereInput[];
    email?: Prisma.StringFilter<"password_reset_tokens"> | string;
    token?: Prisma.StringFilter<"password_reset_tokens"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"password_reset_tokens"> | Date | string | null;
};
export type password_reset_tokensOrderByWithRelationInput = {
    email?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type password_reset_tokensWhereUniqueInput = Prisma.AtLeast<{
    email?: string;
    AND?: Prisma.password_reset_tokensWhereInput | Prisma.password_reset_tokensWhereInput[];
    OR?: Prisma.password_reset_tokensWhereInput[];
    NOT?: Prisma.password_reset_tokensWhereInput | Prisma.password_reset_tokensWhereInput[];
    token?: Prisma.StringFilter<"password_reset_tokens"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"password_reset_tokens"> | Date | string | null;
}, "email">;
export type password_reset_tokensOrderByWithAggregationInput = {
    email?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.password_reset_tokensCountOrderByAggregateInput;
    _max?: Prisma.password_reset_tokensMaxOrderByAggregateInput;
    _min?: Prisma.password_reset_tokensMinOrderByAggregateInput;
};
export type password_reset_tokensScalarWhereWithAggregatesInput = {
    AND?: Prisma.password_reset_tokensScalarWhereWithAggregatesInput | Prisma.password_reset_tokensScalarWhereWithAggregatesInput[];
    OR?: Prisma.password_reset_tokensScalarWhereWithAggregatesInput[];
    NOT?: Prisma.password_reset_tokensScalarWhereWithAggregatesInput | Prisma.password_reset_tokensScalarWhereWithAggregatesInput[];
    email?: Prisma.StringWithAggregatesFilter<"password_reset_tokens"> | string;
    token?: Prisma.StringWithAggregatesFilter<"password_reset_tokens"> | string;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"password_reset_tokens"> | Date | string | null;
};
export type password_reset_tokensCreateInput = {
    email: string;
    token: string;
    created_at?: Date | string | null;
};
export type password_reset_tokensUncheckedCreateInput = {
    email: string;
    token: string;
    created_at?: Date | string | null;
};
export type password_reset_tokensUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type password_reset_tokensUncheckedUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type password_reset_tokensCreateManyInput = {
    email: string;
    token: string;
    created_at?: Date | string | null;
};
export type password_reset_tokensUpdateManyMutationInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type password_reset_tokensUncheckedUpdateManyInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type password_reset_tokensCountOrderByAggregateInput = {
    email?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type password_reset_tokensMaxOrderByAggregateInput = {
    email?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type password_reset_tokensMinOrderByAggregateInput = {
    email?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type password_reset_tokensSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    email?: boolean;
    token?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["password_reset_tokens"]>;
export type password_reset_tokensSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    email?: boolean;
    token?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["password_reset_tokens"]>;
export type password_reset_tokensSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    email?: boolean;
    token?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["password_reset_tokens"]>;
export type password_reset_tokensSelectScalar = {
    email?: boolean;
    token?: boolean;
    created_at?: boolean;
};
export type password_reset_tokensOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"email" | "token" | "created_at", ExtArgs["result"]["password_reset_tokens"]>;
export type $password_reset_tokensPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "password_reset_tokens";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        email: string;
        token: string;
        created_at: Date | null;
    }, ExtArgs["result"]["password_reset_tokens"]>;
    composites: {};
};
export type password_reset_tokensGetPayload<S extends boolean | null | undefined | password_reset_tokensDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload, S>;
export type password_reset_tokensCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<password_reset_tokensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Password_reset_tokensCountAggregateInputType | true;
};
export interface password_reset_tokensDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['password_reset_tokens'];
        meta: {
            name: 'password_reset_tokens';
        };
    };
    findUnique<T extends password_reset_tokensFindUniqueArgs>(args: Prisma.SelectSubset<T, password_reset_tokensFindUniqueArgs<ExtArgs>>): Prisma.Prisma__password_reset_tokensClient<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends password_reset_tokensFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, password_reset_tokensFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__password_reset_tokensClient<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends password_reset_tokensFindFirstArgs>(args?: Prisma.SelectSubset<T, password_reset_tokensFindFirstArgs<ExtArgs>>): Prisma.Prisma__password_reset_tokensClient<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends password_reset_tokensFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, password_reset_tokensFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__password_reset_tokensClient<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends password_reset_tokensFindManyArgs>(args?: Prisma.SelectSubset<T, password_reset_tokensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends password_reset_tokensCreateArgs>(args: Prisma.SelectSubset<T, password_reset_tokensCreateArgs<ExtArgs>>): Prisma.Prisma__password_reset_tokensClient<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends password_reset_tokensCreateManyArgs>(args?: Prisma.SelectSubset<T, password_reset_tokensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends password_reset_tokensCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, password_reset_tokensCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends password_reset_tokensDeleteArgs>(args: Prisma.SelectSubset<T, password_reset_tokensDeleteArgs<ExtArgs>>): Prisma.Prisma__password_reset_tokensClient<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends password_reset_tokensUpdateArgs>(args: Prisma.SelectSubset<T, password_reset_tokensUpdateArgs<ExtArgs>>): Prisma.Prisma__password_reset_tokensClient<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends password_reset_tokensDeleteManyArgs>(args?: Prisma.SelectSubset<T, password_reset_tokensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends password_reset_tokensUpdateManyArgs>(args: Prisma.SelectSubset<T, password_reset_tokensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends password_reset_tokensUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, password_reset_tokensUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends password_reset_tokensUpsertArgs>(args: Prisma.SelectSubset<T, password_reset_tokensUpsertArgs<ExtArgs>>): Prisma.Prisma__password_reset_tokensClient<runtime.Types.Result.GetResult<Prisma.$password_reset_tokensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends password_reset_tokensCountArgs>(args?: Prisma.Subset<T, password_reset_tokensCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Password_reset_tokensCountAggregateOutputType> : number>;
    aggregate<T extends Password_reset_tokensAggregateArgs>(args: Prisma.Subset<T, Password_reset_tokensAggregateArgs>): Prisma.PrismaPromise<GetPassword_reset_tokensAggregateType<T>>;
    groupBy<T extends password_reset_tokensGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: password_reset_tokensGroupByArgs['orderBy'];
    } : {
        orderBy?: password_reset_tokensGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, password_reset_tokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPassword_reset_tokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: password_reset_tokensFieldRefs;
}
export interface Prisma__password_reset_tokensClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface password_reset_tokensFieldRefs {
    readonly email: Prisma.FieldRef<"password_reset_tokens", 'String'>;
    readonly token: Prisma.FieldRef<"password_reset_tokens", 'String'>;
    readonly created_at: Prisma.FieldRef<"password_reset_tokens", 'DateTime'>;
}
export type password_reset_tokensFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    where: Prisma.password_reset_tokensWhereUniqueInput;
};
export type password_reset_tokensFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    where: Prisma.password_reset_tokensWhereUniqueInput;
};
export type password_reset_tokensFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    where?: Prisma.password_reset_tokensWhereInput;
    orderBy?: Prisma.password_reset_tokensOrderByWithRelationInput | Prisma.password_reset_tokensOrderByWithRelationInput[];
    cursor?: Prisma.password_reset_tokensWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Password_reset_tokensScalarFieldEnum | Prisma.Password_reset_tokensScalarFieldEnum[];
};
export type password_reset_tokensFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    where?: Prisma.password_reset_tokensWhereInput;
    orderBy?: Prisma.password_reset_tokensOrderByWithRelationInput | Prisma.password_reset_tokensOrderByWithRelationInput[];
    cursor?: Prisma.password_reset_tokensWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Password_reset_tokensScalarFieldEnum | Prisma.Password_reset_tokensScalarFieldEnum[];
};
export type password_reset_tokensFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    where?: Prisma.password_reset_tokensWhereInput;
    orderBy?: Prisma.password_reset_tokensOrderByWithRelationInput | Prisma.password_reset_tokensOrderByWithRelationInput[];
    cursor?: Prisma.password_reset_tokensWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Password_reset_tokensScalarFieldEnum | Prisma.Password_reset_tokensScalarFieldEnum[];
};
export type password_reset_tokensCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.password_reset_tokensCreateInput, Prisma.password_reset_tokensUncheckedCreateInput>;
};
export type password_reset_tokensCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.password_reset_tokensCreateManyInput | Prisma.password_reset_tokensCreateManyInput[];
    skipDuplicates?: boolean;
};
export type password_reset_tokensCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    data: Prisma.password_reset_tokensCreateManyInput | Prisma.password_reset_tokensCreateManyInput[];
    skipDuplicates?: boolean;
};
export type password_reset_tokensUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.password_reset_tokensUpdateInput, Prisma.password_reset_tokensUncheckedUpdateInput>;
    where: Prisma.password_reset_tokensWhereUniqueInput;
};
export type password_reset_tokensUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.password_reset_tokensUpdateManyMutationInput, Prisma.password_reset_tokensUncheckedUpdateManyInput>;
    where?: Prisma.password_reset_tokensWhereInput;
    limit?: number;
};
export type password_reset_tokensUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.password_reset_tokensUpdateManyMutationInput, Prisma.password_reset_tokensUncheckedUpdateManyInput>;
    where?: Prisma.password_reset_tokensWhereInput;
    limit?: number;
};
export type password_reset_tokensUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    where: Prisma.password_reset_tokensWhereUniqueInput;
    create: Prisma.XOR<Prisma.password_reset_tokensCreateInput, Prisma.password_reset_tokensUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.password_reset_tokensUpdateInput, Prisma.password_reset_tokensUncheckedUpdateInput>;
};
export type password_reset_tokensDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
    where: Prisma.password_reset_tokensWhereUniqueInput;
};
export type password_reset_tokensDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.password_reset_tokensWhereInput;
    limit?: number;
};
export type password_reset_tokensDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_tokensSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_tokensOmit<ExtArgs> | null;
};
