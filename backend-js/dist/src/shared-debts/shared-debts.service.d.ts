import { PrismaService } from '../prisma/prisma.service';
export declare class SharedDebtsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(groupId: string, userId: bigint, data: any): Promise<{
        splits: any[];
        creator: {
            id: bigint;
            name: string;
        };
        group: {
            id: bigint;
            name: string;
        };
        id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        date: Date;
        created_by: bigint;
        group_id: bigint;
        title: string;
    } | null>;
    pay(debtId: string, userId: bigint): Promise<{
        message: string;
        split: {
            id: bigint;
            created_at: Date | null;
            updated_at: Date | null;
            user_id: bigint;
            shared_debt_id: bigint;
            percentage: import("@prisma/client/runtime/library").Decimal;
            amount_owed: import("@prisma/client/runtime/library").Decimal;
            is_paid: boolean;
        };
    }>;
}
