import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(req: any, data: any, ip: string, userAgent: string): Promise<{
        message: string;
        transaction: any;
        warnings: string[];
    }>;
    findAll(req: any, filters: any): Promise<{
        data: any[];
    }>;
    findOne(req: any, id: string): Promise<{
        transaction: any;
    }>;
    update(req: any, id: string, data: any, ip: string, userAgent: string): Promise<{
        message: string;
        transaction: any;
        warnings: string[];
    }>;
    remove(req: any, id: string, ip: string, userAgent: string): Promise<{
        message: string;
    }>;
}
