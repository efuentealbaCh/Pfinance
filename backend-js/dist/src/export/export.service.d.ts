import { PrismaService } from '../prisma/prisma.service';
export declare class ExportService {
    private prisma;
    constructor(prisma: PrismaService);
    exportTransactions(userId: bigint, filters: any, res: any): Promise<void>;
    private exportExcel;
    private exportPdf;
}
