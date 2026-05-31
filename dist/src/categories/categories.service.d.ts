import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    private checkStoreOwner;
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
    findOne(id: string): Promise<{
        menuItems: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            sortOrder: number;
            price: number;
            imageUrl: string | null;
            isAvailable: boolean;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        sortOrder: number;
        storeId: string;
    }>;
    create(storeId: string, dto: CreateCategoryDto, userId: string, userRole: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        sortOrder: number;
        storeId: string;
    }>;
    update(id: string, dto: UpdateCategoryDto, userId: string, userRole: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        sortOrder: number;
        storeId: string;
    }>;
    remove(id: string, userId: string, userRole: string): Promise<{
        message: string;
    }>;
}
