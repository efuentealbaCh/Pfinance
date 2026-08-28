import { PrismaService } from '../prisma/prisma.service';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    private mapTransaction;
    findAll(userId: string, filters: any): Promise<{
        data: any[];
    }>;
    findOne(id: string, userId: string): Promise<{
        transaction: any;
    }>;
    create(userId: string, data: any, reqMetadata: any): Promise<{
        message: string;
        transaction: any;
        warnings: string[];
    }>;
    update(id: string, userId: string, data: any, reqMetadata: any): Promise<{
        message: string;
        transaction: any;
        warnings: string[];
    }>;
    remove(id: string, userId: string, reqMetadata: any): Promise<{
        message: string;
    }>;
    private logAction;
    private adjustAccountBalance;
    private checkBudgetWarning;
}
