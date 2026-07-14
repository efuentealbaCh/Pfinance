import { GroupsService } from './groups.service';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    create(req: any, data: any): Promise<{
        id: bigint;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
        description: string | null;
        created_by: bigint;
    }>;
    getInvitations(req: any): Promise<{
        id: bigint;
        name: string;
        description: string | null;
        invited_at: Date | null;
    }[]>;
    findAll(req: any): Promise<any[]>;
    findOne(req: any, id: string): Promise<any>;
    invite(req: any, id: string, email: string): Promise<{
        message: string;
    }>;
    accept(req: any, id: string): Promise<{
        message: string;
    }>;
    reject(req: any, id: string): Promise<{
        message: string;
    }>;
    removeMember(req: any, id: string, userId: string): Promise<{
        message: string;
    }>;
}
