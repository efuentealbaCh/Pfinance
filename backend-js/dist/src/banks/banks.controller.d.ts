import { BanksService } from './banks.service';
export declare class BanksController {
    private readonly banksService;
    constructor(banksService: BanksService);
    findAll(): Promise<{
        id: string;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
        logo: string | null;
    }[]>;
    findAccountTypes(id: string): Promise<{
        id: string;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
    }[]>;
}
