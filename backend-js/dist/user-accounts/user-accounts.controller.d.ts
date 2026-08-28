import { UserAccountsService } from './user-accounts.service';
export declare class UserAccountsController {
    private readonly userAccountsService;
    constructor(userAccountsService: UserAccountsService);
    create(req: any, data: any): Promise<{
        message: string;
        account: any;
    }>;
    findAll(req: any): Promise<{
        accounts: any[];
    }>;
    findOne(req: any, id: string): Promise<{
        account: any;
    }>;
    update(req: any, id: string, data: any): Promise<{
        message: string;
        account: any;
    }>;
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
}
