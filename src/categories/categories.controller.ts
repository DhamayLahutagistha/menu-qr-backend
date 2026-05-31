// src/categories/categories.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('stores/:storeId/categories')
  @ApiOperation({ summary: 'Lihat semua kategori di sebuah toko' })
  @ApiResponse({ status: 200, description: 'Daftar kategori berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Toko tidak ditemukan' })
  findByStore(@Param('storeId') storeId: string) {
    return this.categoriesService.findByStore(storeId);
  }

  @Post('stores/:storeId/categories')
  @ApiOperation({ summary: '[OWNER] Tambah kategori baru' })
  @ApiResponse({ status: 201, description: 'Kategori berhasil dibuat' })
  @ApiResponse({ status: 403, description: 'Bukan owner toko ini' })
  create(@Param('storeId') storeId: string, @Body() dto: CreateCategoryDto, @CurrentUser() user: any) {
    return this.categoriesService.create(storeId, dto, user.id, user.role);
  }

  @Patch('categories/:id')
  @ApiOperation({ summary: '[OWNER] Update kategori' })
  @ApiResponse({ status: 200, description: 'Kategori berhasil diupdate' })
  @ApiResponse({ status: 403, description: 'Bukan owner toko ini' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto, @CurrentUser() user: any) {
    return this.categoriesService.update(id, dto, user.id, user.role);
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: '[OWNER] Hapus kategori' })
  @ApiResponse({ status: 200, description: 'Kategori berhasil dihapus' })
  @ApiResponse({ status: 403, description: 'Bukan owner toko ini' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.categoriesService.remove(id, user.id, user.role);
  }
}