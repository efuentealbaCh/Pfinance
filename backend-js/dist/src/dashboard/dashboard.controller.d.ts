import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    summary(req: any, filters: any): Promise<{
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
