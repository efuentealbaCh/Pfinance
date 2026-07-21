import { PrismaService } from '../prisma/prisma.service';
export declare class WebhookController {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleSync(secret: string, payload: {
        model: string;
        action: string;
        args: any;
    }): Promise<{
        success: boolean;
        message: string;
        result?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        result: any;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
        result?: undefined;
    }>;
}
