import { PrismaService } from '../prisma/prisma.service';
export declare class SavingsGoalsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: bigint): Promise<{
        goals: any[];
    }>;
    findOne(id: string, userId: bigint): Promise<{
        goal: any;
    }>;
    create(userId: bigint, data: any): Promise<{
        message: string;
        goal: any;
    }>;
    update(id: string, userId: bigint, data: any): Promise<{
        message: string;
        goal: any;
    }>;
    remove(id: string, userId: bigint): Promise<{
        message: string;
    }>;
    deposit(id: string, userId: bigint, amount: number): Promise<{
        message: string;
        goal: any;
    }>;
    withdraw(id: string, userId: bigint, amount: number): Promise<{
        message: string;
        goal: any;
    }>;
    private formatGoal;
}
