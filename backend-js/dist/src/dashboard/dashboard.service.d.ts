import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(userId: bigint, filters: any): Promise<{
        summary: {
            totalIncome: number;
            totalExpense: number;
            balance: number;
        };
        expensesByCategory: {
            name: string;
            total: number;
            color: string;
        }[];
        chartData: {
            date: string;
            income: number;
            expense: number;
        }[];
    }>;
}
