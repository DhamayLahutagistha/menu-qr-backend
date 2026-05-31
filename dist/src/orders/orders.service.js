"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const NEXT_STATUS = {
    PENDING: 'PREPARING',
    PREPARING: 'READY',
    READY: 'COMPLETED',
    COMPLETED: null,
    CANCELLED: null,
};
const VALID_TRANSITIONS = {
    PENDING: ['PREPARING', 'CANCELLED'],
    PREPARING: ['READY', 'CANCELLED'],
    READY: ['COMPLETED'],
    COMPLETED: [],
    CANCELLED: [],
};
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateOrderNumber() {
        const now = new Date();
        const date = now.toISOString().slice(0, 10).replace(/-/g, '');
        const rand = Math.floor(1000 + Math.random() * 9000);
        return `ORD-${date}-${rand}`;
    }
    async checkStoreAccess(storeId, userId, userRole) {
        const store = await this.prisma.store.findUnique({ where: { id: storeId } });
        if (!store)
            throw new common_1.NotFoundException('Toko tidak ditemukan');
        if (userRole !== 'ADMIN' && store.ownerId !== userId) {
            throw new common_1.ForbiddenException('Tidak punya akses ke toko ini');
        }
        return store;
    }
    async create(storeId, dto) {
        const store = await this.prisma.store.findUnique({ where: { id: storeId } });
        if (!store)
            throw new common_1.NotFoundException('Toko tidak ditemukan');
        const menuItems = await this.prisma.menuItem.findMany({
            where: { id: { in: dto.items.map((i) => i.menuItemId) }, category: { storeId } },
        });
        if (menuItems.length !== dto.items.length) {
            throw new common_1.BadRequestException('Satu atau lebih menu item tidak valid');
        }
        const unavailable = menuItems.filter((m) => !m.isAvailable);
        if (unavailable.length > 0) {
            throw new common_1.BadRequestException(`Menu tidak tersedia: ${unavailable.map((m) => m.name).join(', ')}`);
        }
        const itemsWithPrice = dto.items.map((item) => {
            const menu = menuItems.find((m) => m.id === item.menuItemId);
            return { menuItemId: item.menuItemId, qty: item.qty, price: menu.price, subtotal: menu.price * item.qty, note: item.note };
        });
        const totalAmount = itemsWithPrice.reduce((sum, i) => sum + i.subtotal, 0);
        return this.prisma.$transaction(async (tx) => {
            return tx.order.create({
                data: {
                    orderNumber: this.generateOrderNumber(),
                    storeId,
                    tableNumber: dto.tableNumber,
                    notes: dto.notes,
                    source: dto.source || 'IN_APP',
                    totalAmount,
                    status: 'PENDING',
                    items: { create: itemsWithPrice },
                },
                include: { items: { include: { menuItem: { select: { name: true, price: true } } } } },
            });
        });
    }
    findByStore(storeId, status) {
        return this.prisma.order.findMany({
            where: { storeId, ...(status ? { status } : {}) },
            include: { items: { include: { menuItem: { select: { name: true } } } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                store: { select: { name: true, slug: true, qrisImageUrl: true, bankName: true, bankAccount: true, bankHolder: true } },
                items: { include: { menuItem: { select: { name: true, price: true, imageUrl: true } } } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        return order;
    }
    async trackByNumber(orderNumber) {
        const order = await this.prisma.order.findUnique({
            where: { orderNumber },
            include: {
                store: { select: { name: true, qrisImageUrl: true, bankName: true, bankAccount: true, bankHolder: true } },
                items: { include: { menuItem: { select: { name: true } } } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        return order;
    }
    async nextStatus(id, userId, userRole) {
        const order = await this.findOne(id);
        await this.checkStoreAccess(order.storeId, userId, userRole);
        const next = NEXT_STATUS[order.status];
        if (!next) {
            throw new common_1.BadRequestException(`Order sudah ${order.status}, tidak bisa dilanjutkan`);
        }
        return this.prisma.order.update({
            where: { id },
            data: { status: next },
            include: { items: { include: { menuItem: { select: { name: true } } } } },
        });
    }
    async updateStatus(id, dto, userId, userRole) {
        const order = await this.findOne(id);
        await this.checkStoreAccess(order.storeId, userId, userRole);
        if (!VALID_TRANSITIONS[order.status].includes(dto.status)) {
            throw new common_1.BadRequestException(`Tidak bisa ubah dari ${order.status} ke ${dto.status}. Valid: ${VALID_TRANSITIONS[order.status].join(', ') || '-'}`);
        }
        return this.prisma.order.update({
            where: { id },
            data: { status: dto.status },
            include: { items: { include: { menuItem: { select: { name: true } } } } },
        });
    }
    async getDailySummary(storeId, userId, userRole) {
        await this.checkStoreAccess(storeId, userId, userRole);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const orders = await this.prisma.order.findMany({
            where: { storeId, createdAt: { gte: today, lt: tomorrow }, status: { not: 'CANCELLED' } },
        });
        return {
            date: today.toISOString().slice(0, 10),
            totalOrders: orders.length,
            totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
            byStatus: orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {}),
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map