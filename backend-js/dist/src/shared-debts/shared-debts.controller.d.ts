import { SharedDebtsService } from './shared-debts.service';
export declare class SharedDebtsController {
    private readonly sharedDebtsService;
    constructor(sharedDebtsService: SharedDebtsService);
    create(req: any, groupId: string, data: any): Promise<{
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
        group_id: string;
        created_by: string;
        title: string;
        date: Date;
        transaction_id: string | null;
    } | null>;
    pay(req: any, debtId: string): Promise<{
        message: string;
        split: {
            id: string;
            created_at: Date | null;
            updated_at: Date | null;
            user_id: string;
            shared_debt_id: string;
            percentage: import("@prisma/client/runtime/library").Decimal;
            amount_owed: import("@prisma/client/runtime/library").Decimal;
            is_paid: boolean;
        };
    }>;
}
