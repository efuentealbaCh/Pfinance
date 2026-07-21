import { BanksService } from './banks.service';
export declare class BanksController {
    private readonly banksService;
    constructor(banksService: BanksService);
    findAll(): Promise<{
        id: string;
        name: string;
        logo: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }[]>;
}
