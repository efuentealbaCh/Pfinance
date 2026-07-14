import { SavingsGoalsService } from './savings-goals.service';
export declare class SavingsGoalsController {
    private readonly savingsGoalsService;
    constructor(savingsGoalsService: SavingsGoalsService);
    create(req: any, data: any): Promise<{
        message: string;
        goal: any;
    }>;
    findAll(req: any): Promise<{
        goals: any[];
    }>;
    findOne(req: any, id: string): Promise<{
        goal: any;
    }>;
    update(req: any, id: string, data: any): Promise<{
        message: string;
        goal: any;
    }>;
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
    deposit(req: any, id: string, amount: number): Promise<{
        message: string;
        goal: any;
    }>;
    withdraw(req: any, id: string, amount: number): Promise<{
        message: string;
        goal: any;
    }>;
}
