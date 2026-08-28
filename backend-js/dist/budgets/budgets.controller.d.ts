import { BudgetsService } from './budgets.service';
export declare class BudgetsController {
    private readonly budgetsService;
    constructor(budgetsService: BudgetsService);
    create(req: any, data: any): Promise<{
        message: string;
        budget: any;
    }>;
    findAll(req: any): Promise<{
        budgets: any[];
    }>;
    findOne(req: any, id: string): Promise<{
        budget: any;
    }>;
    update(req: any, id: string, data: any): Promise<{
        message: string;
        budget: any;
    }>;
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
}
