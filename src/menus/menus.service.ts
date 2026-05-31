// src/menus/menus.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu-item.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  private async checkCategoryOwner(categoryId: string, userId: string, userRole: string) {
    const cat = await this.prisma.category.findUnique({
      where: { id: categoryId },
      include: { store: true },
    });
    if (!cat) throw new NotFoundException('Kategori tidak ditemukan');
    if (userRole !== 'ADMIN' && cat.store.ownerId !== userId) {
      throw new ForbiddenException('Tidak punya akses');
    }
    return cat;
  }

  findByCategory(categoryId: string) {
    return this.prisma.menuItem.findMany({
      where: { categoryId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.menuItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Menu item tidak ditemukan');
    return item;
  }

  async create(categoryId: string, dto: CreateMenuItemDto, userId: string, userRole: string) {
    await this.checkCategoryOwner(categoryId, userId, userRole);
    return this.prisma.menuItem.create({ data: { ...dto, categoryId } });
  }

  async update(id: string, dto: UpdateMenuItemDto, userId: string, userRole: string) {
    const item = await this.findOne(id);
    await this.checkCategoryOwner(item.categoryId, userId, userRole);
    return this.prisma.menuItem.update({ where: { id }, data: dto });
  }

  async updateImage(id: string, imageUrl: string, userId: string, userRole: string) {
    const item = await this.findOne(id);
    await this.checkCategoryOwner(item.categoryId, userId, userRole);
    return this.prisma.menuItem.update({ where: { id }, data: { imageUrl } });
  }

  async remove(id: string, userId: string, userRole: string) {
    const item = await this.findOne(id);
    await this.checkCategoryOwner(item.categoryId, userId, userRole);
    await this.prisma.menuItem.delete({ where: { id } });
    return { message: 'Menu item berhasil dihapus' };
  }
}
