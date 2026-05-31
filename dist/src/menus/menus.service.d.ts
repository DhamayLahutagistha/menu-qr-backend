import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu-item.dto';
export declare class MenusService {
    private prisma;
    constructor(prisma: PrismaService);
    private checkCategoryOwner;
    findByCategory(categoryId: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    }>;
    create(categoryId: string, dto: CreateMenuItemDto, userId: string, userRole: string): Promise<{
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
    }>;
    update(id: string, dto: UpdateMenuItemDto, userId: string, userRole: string): Promise<{
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
    }>;
    updateImage(id: string, imageUrl: string, userId: string, userRole: string): Promise<{
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
    }>;
    remove(id: string, userId: string, userRole: string): Promise<{
        message: string;
    }>;
}
