import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            rut: string | null;
        };
        token: string;
    }>;
    login(body: any): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            rut: string | null;
        };
        token: string;
    }>;
    getProfile(req: any): {
        user: any;
    };
    updateProfile(req: any, body: any): Promise<{
        id: string;
        name: string;
        email: string;
        rut: string | null;
    }>;
    updatePassword(req: any, body: any): Promise<{
        message: string;
    }>;
    logout(): {
        message: string;
    };
}
