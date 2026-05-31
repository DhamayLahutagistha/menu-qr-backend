import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
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
    track(orderNumber: string): Promise<{
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
    findByStore(storeId: string, status: string, user: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    nextStatus(id: string, user: any): Promise<{
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
    updateStatus(id: string, dto: UpdateOrderStatusDto, user: any): Promise<{
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
    getDailySummary(storeId: string, user: any): Promise<{
        date: string;
        totalOrders: number;
        totalRevenue: number;
        byStatus: Record<string, number>;
    }>;
}
