import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto, UpdateStoreDto, UpdatePaymentDto } from './dto/store.dto';
export declare class StoresService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findMyStores(ownerId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    findBySlug(slug: string): Promise<{
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
    create(dto: CreateStoreDto, ownerId: string): Promise<{
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
    update(id: string, dto: UpdateStoreDto, userId: string, userRole: string): Promise<{
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
    updatePayment(id: string, dto: UpdatePaymentDto, userRole: string): Promise<{
        id: string;
        name: string;
        updatedAt: Date;
        qrisImageUrl: string;
        bankName: string;
        bankAccount: string;
        bankHolder: string;
    }>;
    remove(id: string, userId: string, userRole: string): Promise<{
        message: string;
    }>;
}
