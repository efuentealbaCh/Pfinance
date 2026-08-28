import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from './encryption.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private encryptionService;
    constructor(prisma: PrismaService, jwtService: JwtService, encryptionService: EncryptionService);
    register(data: any): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            rut: any;
        };
        token: string;
    }>;
    login(data: any): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            rut: string | null;
        };
        token: string;
    }>;
    updateProfile(userId: string, data: any): Promise<{
        id: string;
        name: string;
        email: string;
        rut: string | null;
    }>;
    updatePassword(userId: string, data: any): Promise<{
        message: string;
    }>;
}
