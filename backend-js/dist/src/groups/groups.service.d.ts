import { PrismaService } from '../prisma/prisma.service';
export declare class GroupsService {
    private prisma;
    constructor(prisma: PrismaService);
    private mapGroup;
    findAll(userId: bigint): Promise<any[]>;
    findOne(id: string, userId: bigint): Promise<any>;
    create(userId: bigint, data: any): Promise<{
        id: bigint;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
        description: string | null;
        created_by: bigint;
    }>;
    removeMember(groupId: string, targetUserId: bigint, requesterId: bigint): Promise<{
        message: string;
    }>;
}
