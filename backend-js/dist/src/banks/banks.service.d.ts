import { PrismaService } from '../prisma/prisma.service';
export declare class BanksService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
        logo: string | null;
    }[]>;
}
