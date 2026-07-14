import { PrismaService } from '../prisma/prisma.service';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    private mapTransaction;
    findAll(userId: bigint, filters: any): Promise<{
        data: any[];
    }>;
    findOne(id: string, userId: bigint): Promise<{
        transaction: any;
    }>;
    create(userId: bigint, data: any, reqMetadata: any): Promise<{
        message: string;
        transaction: any;
        warnings: string[];
    }>;
    update(id: string, userId: bigint, data: any, reqMetadata: any): Promise<{
        message: string;
        transaction: any;
        warnings: string[];
    }>;
    remove(id: string, userId: bigint, reqMetadata: any): Promise<{
        message: string;
    }>;
    private logAction;
    private adjustAccountBalance;
    private checkBudgetWarning;
}
