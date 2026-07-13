import { AccountTypesService } from './account-types.service';
export declare class AccountTypesController {
    private readonly accountTypesService;
    constructor(accountTypesService: AccountTypesService);
    findAll(): Promise<{
        id: string;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
    }[]>;
}
