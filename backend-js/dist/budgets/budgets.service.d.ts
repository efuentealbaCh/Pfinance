import { PrismaService } from '../prisma/prisma.service';
export declare class BudgetsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<{
        budgets: any[];
    }>;
    findOne(id: string, userId: string): Promise<{
        budget: any;
    }>;
    create(userId: string, data: any): Promise<{
        message: string;
        budget: any;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        message: string;
        budget: any;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    private enrichBudgetWithSpent;
    private getPeriodRange;
}
