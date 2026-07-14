import { PrismaService } from '../prisma/prisma.service';
export declare class BudgetsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: bigint): Promise<{
        budgets: any[];
    }>;
    findOne(id: string, userId: bigint): Promise<{
        budget: any;
    }>;
    create(userId: bigint, data: any): Promise<{
        message: string;
        budget: any;
    }>;
    update(id: string, userId: bigint, data: any): Promise<{
        message: string;
        budget: any;
    }>;
    remove(id: string, userId: bigint): Promise<{
        message: string;
    }>;
    private enrichBudgetWithSpent;
    private getPeriodRange;
}
