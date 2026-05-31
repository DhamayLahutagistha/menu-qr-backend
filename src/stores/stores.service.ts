// src/stores/stores.service.ts
import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto, UpdateStoreDto, UpdatePaymentDto } from './dto/store.dto';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  // ADMIN: semua toko
  findAll() {
    return this.prisma.store.findMany({
      include: {
        owner: { select: { id: true, name: true, email: true } },
        _count: { select: { categories: true, orders: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // OWNER: toko milik sendiri
  findMyStores(ownerId: string) {
    return this.prisma.store.findMany({
      where: { ownerId },
      include: { _count: { select: { categories: true, orders: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  // PUBLIC: tampilan menu + info payment (untuk pelanggan scan QR)
  async findBySlug(slug: string) {
    const store = await this.prisma.store.findUnique({
      where: { slug, isActive: true },
      select: {
        id: true, name: true, slug: true, description: true,
        address: true, phone: true, logoUrl: true,
        // Info payment tampil ke pelanggan
        qrisImageUrl: true, bankName: true, bankAccount: true, bankHolder: true,
        categories: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          include: { menuItems: { orderBy: { sortOrder: 'asc' } } },
        },
      },
    });
    if (!store) throw new NotFoundException('Toko tidak ditemukan');
    return store;
  }

  async findOne(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
      include: { owner: { select: { id: true, name: true, email: true } } },
    });
    if (!store) throw new NotFoundException('Toko tidak ditemukan');
    return store;
  }

  async create(dto: CreateStoreDto, ownerId: string) {
    const slugExists = await this.prisma.store.findUnique({ where: { slug: dto.slug } });
    if (slugExists) throw new ConflictException('Slug sudah digunakan');
    return this.prisma.store.create({ data: { ...dto, ownerId } });
  }

  async update(id: string, dto: UpdateStoreDto, userId: string, userRole: string) {
    const store = await this.findOne(id);
    if (userRole !== 'ADMIN' && store.ownerId !== userId) {
      throw new ForbiddenException('Tidak boleh mengubah toko orang lain');
    }
    return this.prisma.store.update({ where: { id }, data: dto });
  }

  // ADMIN only: update info pembayaran (QRIS, bank)
  async updatePayment(id: string, dto: UpdatePaymentDto, userRole: string) {
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Hanya ADMIN yang bisa mengubah info pembayaran');
    }
    await this.findOne(id);
    return this.prisma.store.update({
      where: { id },
      data: dto,
      select: {
        id: true, name: true,
        qrisImageUrl: true, bankName: true, bankAccount: true, bankHolder: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string, userId: string, userRole: string) {
    const store = await this.findOne(id);
    if (userRole !== 'ADMIN' && store.ownerId !== userId) {
      throw new ForbiddenException('Tidak boleh menghapus toko orang lain');
    }
    await this.prisma.store.delete({ where: { id } });
    return { message: 'Toko berhasil dihapus' };
  }
}
