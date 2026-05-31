import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    findByStore(storeId: string): import(".prisma/client").Prisma.PrismaPromise<({
        _count: {
            menuItems: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        sortOrder: number;
        storeId: string;
    })[]>;
    create(storeId: string, dto: CreateCategoryDto, user: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        sortOrder: number;
        storeId: string;
    }>;
    update(id: string, dto: UpdateCategoryDto, user: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        sortOrder: number;
        storeId: string;
    }>;
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
}
