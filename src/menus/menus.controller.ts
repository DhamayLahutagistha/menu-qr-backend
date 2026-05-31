// src/menus/menus.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MenusService } from './menus.service';
import { CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu-item.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Menu Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class MenusController {
  constructor(private menusService: MenusService) {}

  @Get('categories/:categoryId/items')
  @ApiOperation({ summary: 'Lihat semua menu item dalam kategori' })
  @ApiResponse({ status: 200, description: 'Daftar menu item berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.menusService.findByCategory(categoryId);
  }

  @Post('categories/:categoryId/items')
  @ApiOperation({ summary: '[OWNER] Tambah menu item baru' })
  @ApiResponse({ status: 201, description: 'Menu item berhasil dibuat' })
  @ApiResponse({ status: 403, description: 'Bukan owner toko ini' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  create(@Param('categoryId') categoryId: string, @Body() dto: CreateMenuItemDto, @CurrentUser() user: any) {
    return this.menusService.create(categoryId, dto, user.id, user.role);
  }

  @Patch('menu-items/:id')
  @ApiOperation({ summary: '[OWNER] Update menu item (termasuk toggle isAvailable)' })
  @ApiResponse({ status: 200, description: 'Menu item berhasil diupdate' })
  @ApiResponse({ status: 403, description: 'Bukan owner toko ini' })
  @ApiResponse({ status: 404, description: 'Menu item tidak ditemukan' })
  update(@Param('id') id: string, @Body() dto: UpdateMenuItemDto, @CurrentUser() user: any) {
    return this.menusService.update(id, dto, user.id, user.role);
  }

  @Post('menu-items/:id/image')
  @ApiOperation({ summary: '[OWNER] Upload foto menu item' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Foto menu item berhasil diupload' })
  @ApiResponse({ status: 403, description: 'Bukan owner toko ini' })
  @ApiResponse({ status: 404, description: 'Menu item tidak ditemukan' })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/menus',
      filename: (req, file, cb) => cb(null, `${Date.now()}${extname(file.originalname)}`),
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('Hanya file gambar yang diizinkan'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @CurrentUser() user: any) {
    const imageUrl = `/uploads/menus/${file.filename}`;
    return this.menusService.updateImage(id, imageUrl, user.id, user.role);
  }

  @Delete('menu-items/:id')
  @ApiOperation({ summary: '[OWNER] Hapus menu item' })
  @ApiResponse({ status: 200, description: 'Menu item berhasil dihapus' })
  @ApiResponse({ status: 403, description: 'Bukan owner toko ini' })
  @ApiResponse({ status: 404, description: 'Menu item tidak ditemukan' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.menusService.remove(id, user.id, user.role);
  }
}