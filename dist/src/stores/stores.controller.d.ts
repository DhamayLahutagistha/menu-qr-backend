import { StoresService } from './stores.service';
import { CreateStoreDto, UpdateStoreDto, UpdatePaymentDto } from './dto/store.dto';
export declare class StoresController {
    private storesService;
    constructor(storesService: StoresService);
    getPublicMenu(slug: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        address: string;
        phone: string;
        logoUrl: string;
        qrisImageUrl: string;
        bankName: string;
        bankAccount: string;
        bankHolder: string;
        categories: ({
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
        })[];
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        owner: {
            id: string;
            email: string;
            name: string;
        };
        _count: {
            categories: number;
            orders: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        address: string | null;
        phone: string | null;
        logoUrl: string | null;
        isActive: boolean;
        qrisImageUrl: string | null;
        bankName: string | null;
        bankAccount: string | null;
        bankHolder: string | null;
        ownerId: string;
    })[]>;
    findMyStores(user: any): import(".prisma/client").Prisma.PrismaPromise<({
        _count: {
            categories: number;
            orders: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        address: string | null;
        phone: string | null;
        logoUrl: string | null;
        isActive: boolean;
        qrisImageUrl: string | null;
        bankName: string | null;
        bankAccount: string | null;
        bankHolder: string | null;
        ownerId: string;
    })[]>;
    findOne(id: string): Promise<{
        owner: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        address: string | null;
        phone: string | null;
        logoUrl: string | null;
        isActive: boolean;
        qrisImageUrl: string | null;
        bankName: string | null;
        bankAccount: string | null;
        bankHolder: string | null;
        ownerId: string;
    }>;
    create(dto: CreateStoreDto, user: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        address: string | null;
        phone: string | null;
        logoUrl: string | null;
        isActive: boolean;
        qrisImageUrl: string | null;
        bankName: string | null;
        bankAccount: string | null;
        bankHolder: string | null;
        ownerId: string;
    }>;
    update(id: string, dto: UpdateStoreDto, user: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        address: string | null;
        phone: string | null;
        logoUrl: string | null;
        isActive: boolean;
        qrisImageUrl: string | null;
        bankName: string | null;
        bankAccount: string | null;
        bankHolder: string | null;
        ownerId: string;
    }>;
    updatePayment(id: string, dto: UpdatePaymentDto, user: any): Promise<{
        id: string;
        name: string;
        updatedAt: Date;
        qrisImageUrl: string;
        bankName: string;
        bankAccount: string;
        bankHolder: string;
    }>;
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
}
