import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    private generateOrderNumber;
    private checkStoreAccess;
    create(storeId: string, dto: CreateOrderDto): Promise<{
        items: ({
            menuItem: {
                name: string;
                price: number;
            };
        } & {
            id: string;
            price: number;
            menuItemId: string;
            qty: number;
            note: string | null;
            subtotal: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        storeId: string;
        tableNumber: string | null;
        notes: string | null;
        source: string;
        status: string;
        orderNumber: string;
        totalAmount: number;
    }>;
    findByStore(storeId: string, status?: string): import(".prisma/client").Prisma.PrismaPromise<({
        items: ({
            menuItem: {
                name: string;
            };
        } & {
            id: string;
            price: number;
            menuItemId: string;
            qty: number;
            note: string | null;
            subtotal: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        storeId: string;
        tableNumber: string | null;
        notes: string | null;
        source: string;
        status: string;
        orderNumber: string;
        totalAmount: number;
    })[]>;
    findOne(id: string): Promise<{
        store: {
            name: string;
            slug: string;
            qrisImageUrl: string;
            bankName: string;
            bankAccount: string;
            bankHolder: string;
        };
        items: ({
            menuItem: {
                name: string;
                price: number;
                imageUrl: string;
            };
        } & {
            id: string;
            price: number;
            menuItemId: string;
            qty: number;
            note: string | null;
            subtotal: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        storeId: string;
        tableNumber: string | null;
        notes: string | null;
        source: string;
        status: string;
        orderNumber: string;
        totalAmount: number;
    }>;
    trackByNumber(orderNumber: string): Promise<{
        store: {
            name: string;
            qrisImageUrl: string;
            bankName: string;
            bankAccount: string;
            bankHolder: string;
        };
        items: ({
            menuItem: {
                name: string;
            };
        } & {
            id: string;
            price: number;
            menuItemId: string;
            qty: number;
            note: string | null;
            subtotal: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        storeId: string;
        tableNumber: string | null;
        notes: string | null;
        source: string;
        status: string;
        orderNumber: string;
        totalAmount: number;
    }>;
    nextStatus(id: string, userId: string, userRole: string): Promise<{
        items: ({
            menuItem: {
                name: string;
            };
        } & {
            id: string;
            price: number;
            menuItemId: string;
            qty: number;
            note: string | null;
            subtotal: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        storeId: string;
        tableNumber: string | null;
        notes: string | null;
        source: string;
        status: string;
        orderNumber: string;
        totalAmount: number;
    }>;
    updateStatus(id: string, dto: UpdateOrderStatusDto, userId: string, userRole: string): Promise<{
        items: ({
            menuItem: {
                name: string;
            };
        } & {
            id: string;
            price: number;
            menuItemId: string;
            qty: number;
            note: string | null;
            subtotal: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        storeId: string;
        tableNumber: string | null;
        notes: string | null;
        source: string;
        status: string;
        orderNumber: string;
        totalAmount: number;
    }>;
    getDailySummary(storeId: string, userId: string, userRole: string): Promise<{
        date: string;
        totalOrders: number;
        totalRevenue: number;
        byStatus: Record<string, number>;
    }>;
}
