import { ExportService } from './export.service';
import type { Response } from 'express';
export declare class ExportController {
    private readonly exportService;
    constructor(exportService: ExportService);
    exportTransactions(req: any, filters: any, res: Response): Promise<void>;
}
