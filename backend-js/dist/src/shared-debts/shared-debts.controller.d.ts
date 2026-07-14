import { SharedDebtsService } from './shared-debts.service';
export declare class SharedDebtsController {
    private readonly sharedDebtsService;
    constructor(sharedDebtsService: SharedDebtsService);
    create(req: any, groupId: string, data: any): Promise<{
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
        group_id: bigint;
        title: string;
        created_by: bigint;
        transaction_id: string | null;
    } | null>;
    pay(req: any, debtId: string): Promise<{
        message: string;
        split: {
            id: bigint;
            created_at: Date | null;
            updated_at: Date | null;
            user_id: bigint;
            percentage: import("@prisma/client/runtime/library").Decimal;
            amount_owed: import("@prisma/client/runtime/library").Decimal;
            is_paid: boolean;
            shared_debt_id: bigint;
        };
    }>;
}
