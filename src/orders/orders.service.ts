// src/orders/orders.service.ts
import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

// Alur status: sekali klik otomatis pindah ke status berikutnya
const NEXT_STATUS: Record<string, string | null> = {
  PENDING:   'PREPARING',
  PREPARING: 'READY',
  READY:     'COMPLETED',
  COMPLETED: null,
  CANCELLED: null,
};

const VALID_TRANSITIONS: Record<string, string[]> = {
  PENDING:   ['PREPARING', 'CANCELLED'],
  PREPARING: ['READY', 'CANCELLED'],
  READY:     ['COMPLETED'],
  COMPLETED: [],
  CANCELLED: [],
};

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  private generateOrderNumber(): string {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${date}-${rand}`;
  }

  private async checkStoreAccess(storeId: string, userId: string, userRole: string) {
    const store = await this.prisma.store.findUnique({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Toko tidak ditemukan');
    if (userRole !== 'ADMIN' && store.ownerId !== userId) {
      throw new ForbiddenException('Tidak punya akses ke toko ini');
    }
    return store;
  }

  // Buat order baru — transaksi atomik
  async create(storeId: string, dto: CreateOrderDto) {
    const store = await this.prisma.store.findUnique({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Toko tidak ditemukan');

    const menuItems = await this.prisma.menuItem.findMany({
      where: { id: { in: dto.items.map((i) => i.menuItemId) }, category: { storeId } },
    });

    if (menuItems.length !== dto.items.length) {
      throw new BadRequestException('Satu atau lebih menu item tidak valid');
    }

    const unavailable = menuItems.filter((m) => !m.isAvailable);
    if (unavailable.length > 0) {
      throw new BadRequestException(`Menu tidak tersedia: ${unavailable.map((m) => m.name).join(', ')}`);
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

  findByStore(storeId: string, status?: string) {
    return this.prisma.order.findMany({
      where: { storeId, ...(status ? { status } : {}) },
      include: { items: { include: { menuItem: { select: { name: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        store: { select: { name: true, slug: true, qrisImageUrl: true, bankName: true, bankAccount: true, bankHolder: true } },
        items: { include: { menuItem: { select: { name: true, price: true, imageUrl: true } } } },
      },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    return order;
  }

  async trackByNumber(orderNumber: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: {
        store: { select: { name: true, qrisImageUrl: true, bankName: true, bankAccount: true, bankHolder: true } },
        items: { include: { menuItem: { select: { name: true } } } },
      },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    return order;
  }

  // ✅ ONE-CLICK: otomatis pindah ke status berikutnya
  async nextStatus(id: string, userId: string, userRole: string) {
    const order = await this.findOne(id);
    await this.checkStoreAccess(order.storeId, userId, userRole);

    const next = NEXT_STATUS[order.status];
    if (!next) {
      throw new BadRequestException(`Order sudah ${order.status}, tidak bisa dilanjutkan`);
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: next },
      include: { items: { include: { menuItem: { select: { name: true } } } } },
    });
  }

  // Manual set status (untuk cancel, dll)
  async updateStatus(id: string, dto: UpdateOrderStatusDto, userId: string, userRole: string) {
    const order = await this.findOne(id);
    await this.checkStoreAccess(order.storeId, userId, userRole);

    if (!VALID_TRANSITIONS[order.status].includes(dto.status)) {
      throw new BadRequestException(
        `Tidak bisa ubah dari ${order.status} ke ${dto.status}. Valid: ${VALID_TRANSITIONS[order.status].join(', ') || '-'}`,
      );
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status },
      include: { items: { include: { menuItem: { select: { name: true } } } } },
    });
  }

  async getDailySummary(storeId: string, userId: string, userRole: string) {
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
      byStatus: orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {} as Record<string, number>),
    };
  }
}
