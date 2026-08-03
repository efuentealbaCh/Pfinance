import { PrismaService } from '../prisma/prisma.service';
export declare class GroupsService {
    private prisma;
    constructor(prisma: PrismaService);
    private mapGroup;
    findAll(userId: string): Promise<any[]>;
    findOne(id: string, userId: string): Promise<any>;
    create(userId: string, data: any): Promise<{
        id: string;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
        description: string | null;
        created_by: string;
    }>;
    removeMember(groupId: string, targetUserId: string, requesterId: string): Promise<{
        message: string;
    }>;
    inviteUser(groupId: string, email: string, requesterId: string): Promise<{
        message: string;
    }>;
    acceptInvitation(groupId: string, userId: string): Promise<{
        message: string;
    }>;
    rejectInvitation(groupId: string, userId: string): Promise<{
        message: string;
    }>;
    getInvitations(userId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        invited_at: Date | null;
    }[]>;
}
