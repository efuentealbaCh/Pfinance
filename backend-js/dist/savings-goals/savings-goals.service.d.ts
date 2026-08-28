import { PrismaService } from '../prisma/prisma.service';
export declare class SavingsGoalsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<{
        goals: any[];
    }>;
    findOne(id: string, userId: string): Promise<{
        goal: any;
    }>;
    create(userId: string, data: any): Promise<{
        message: string;
        goal: any;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        message: string;
        goal: any;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    deposit(id: string, userId: string, amount: number): Promise<{
        message: string;
        goal: any;
    }>;
    withdraw(id: string, userId: string, amount: number): Promise<{
        message: string;
        goal: any;
    }>;
    private formatGoal;
}
