import { PrismaService } from '../prisma/prisma.service';
export declare class SharedDebtsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(groupId: string, userId: string, data: any): Promise<{
        splits: any[];
        creator: {
            id: string;
            name: string;
        };
        group: {
            id: string;
            name: string;
        };
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        date: Date;
        group_id: string;
        title: string;
        created_by: string;
        transaction_id: string | null;
    } | null>;
    pay(debtId: string, userId: string): Promise<{
        message: string;
        split: {
            id: string;
            created_at: Date | null;
            updated_at: Date | null;
            user_id: string;
            percentage: import("@prisma/client/runtime/library").Decimal;
            amount_owed: import("@prisma/client/runtime/library").Decimal;
            is_paid: boolean;
            shared_debt_id: string;
        };
    }>;
}
