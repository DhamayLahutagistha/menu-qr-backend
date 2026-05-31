import { MenusService } from './menus.service';
import { CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu-item.dto';
export declare class MenusController {
    private menusService;
    constructor(menusService: MenusService);
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
    create(categoryId: string, dto: CreateMenuItemDto, user: any): Promise<{
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
    update(id: string, dto: UpdateMenuItemDto, user: any): Promise<{
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
    uploadImage(id: string, file: Express.Multer.File, user: any): Promise<{
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
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
}
