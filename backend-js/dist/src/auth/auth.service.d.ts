import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: any): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            rut: string | null;
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
    updateProfile(userId: bigint, data: any): Promise<{
        id: string;
        name: string;
        email: string;
        rut: string | null;
    }>;
    updatePassword(userId: bigint, data: any): Promise<{
        message: string;
    }>;
}
