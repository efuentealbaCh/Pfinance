import { PrismaService } from '../prisma/prisma.service';
export declare class UserAccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    private mapAccount;
    findAll(userId: bigint): Promise<{
        accounts: any[];
    }>;
    findOne(id: string, userId: bigint): Promise<{
        account: any;
    }>;
    create(userId: bigint, data: any): Promise<{
        message: string;
        account: any;
    }>;
    update(id: string, userId: bigint, data: any): Promise<{
        message: string;
        account: any;
    }>;
    remove(id: string, userId: bigint): Promise<{
        message: string;
    }>;
}
