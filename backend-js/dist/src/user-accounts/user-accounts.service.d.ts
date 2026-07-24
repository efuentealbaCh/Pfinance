import { PrismaService } from '../prisma/prisma.service';
export declare class UserAccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    private mapAccount;
    findAll(userId: string): Promise<{
        accounts: any[];
    }>;
    findOne(id: string, userId: string): Promise<{
        account: any;
    }>;
    create(userId: string, data: any): Promise<{
        message: string;
        account: any;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        message: string;
        account: any;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
