// src/categories/categories.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  private async checkStoreOwner(storeId: string, userId: string, userRole: string) {
    const store = await this.prisma.store.findUnique({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Toko tidak ditemukan');
    if (userRole !== 'ADMIN' && store.ownerId !== userId) {
      throw new ForbiddenException('Tidak punya akses ke toko ini');
    }
    return store;
  }

  findByStore(storeId: string) {
    return this.prisma.category.findMany({
      where: { storeId },
      include: { _count: { select: { menuItems: true } } },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const cat = await this.prisma.category.findUnique({
      where: { id },
      include: { menuItems: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!cat) throw new NotFoundException('Kategori tidak ditemukan');
    return cat;
  }

  async create(storeId: string, dto: CreateCategoryDto, userId: string, userRole: string) {
    await this.checkStoreOwner(storeId, userId, userRole);
    return this.prisma.category.create({ data: { ...dto, storeId } });
  }

  async update(id: string, dto: UpdateCategoryDto, userId: string, userRole: string) {
    const cat = await this.findOne(id);
    await this.checkStoreOwner(cat.storeId, userId, userRole);
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async remove(id: string, userId: string, userRole: string) {
    const cat = await this.findOne(id);
    await this.checkStoreOwner(cat.storeId, userId, userRole);
    await this.prisma.category.delete({ where: { id } });
    return { message: 'Kategori berhasil dihapus' };
  }
}
