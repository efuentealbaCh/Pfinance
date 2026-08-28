import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(body: any): Promise<{
        category: {
            id: string;
            name: string;
            created_at: Date | null;
            updated_at: Date | null;
            icon: string | null;
            color: string | null;
        };
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
        icon: string | null;
        color: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
        icon: string | null;
        color: string | null;
    }>;
    update(id: string, body: any): Promise<{
        id: string;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
        icon: string | null;
        color: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
