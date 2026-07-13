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
    findAll(req: any): Promise<any[]>;
    findOne(req: any, id: string): Promise<any>;
    removeMember(req: any, id: string, userId: string): Promise<{
        message: string;
    }>;
}
