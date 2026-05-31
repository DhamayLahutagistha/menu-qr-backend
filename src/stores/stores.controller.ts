// src/stores/stores.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { StoresService } from './stores.service';
import { CreateStoreDto, UpdateStoreDto, UpdatePaymentDto } from './dto/store.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get('public/:slug')
  @ApiOperation({ summary: '[PUBLIC] Lihat menu + info pembayaran toko (pelanggan scan QR)' })
  @ApiResponse({ status: 200, description: 'Data menu dan info toko berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Toko tidak ditemukan' })
  getPublicMenu(@Param('slug') slug: string) {
    return this.storesService.findBySlug(slug);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: '[ADMIN] Lihat semua toko' })
  @ApiResponse({ status: 200, description: 'Daftar semua toko berhasil diambil' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, hanya ADMIN' })
  findAll() {
    return this.storesService.findAll();
  }

  @Get('my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '[OWNER] Lihat toko milik saya' })
  @ApiResponse({ status: 200, description: 'Daftar toko milik user berhasil diambil' })
  findMyStores(@CurrentUser() user: any) {
    return this.storesService.findMyStores(user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Detail toko' })
  @ApiResponse({ status: 200, description: 'Detail toko berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Toko tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '[OWNER] Buat toko baru' })
  @ApiResponse({ status: 201, description: 'Toko berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Data tidak valid' })
  create(@Body() dto: CreateStoreDto, @CurrentUser() user: any) {
    return this.storesService.create(dto, user.id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '[OWNER/ADMIN] Update data toko (nama, alamat, dll)' })
  @ApiResponse({ status: 200, description: 'Data toko berhasil diupdate' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  @ApiResponse({ status: 404, description: 'Toko tidak ditemukan' })
  update(@Param('id') id: string, @Body() dto: UpdateStoreDto, @CurrentUser() user: any) {
    return this.storesService.update(id, dto, user.id, user.role);
  }

  @Patch(':id/payment')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({
    summary: '[ADMIN] Update info pembayaran toko (QRIS, rekening bank)',
    description: 'Hanya ADMIN yang bisa mengatur QRIS dan info rekening. Info ini akan tampil ke pelanggan saat order.',
  })
  @ApiResponse({ status: 200, description: 'Info pembayaran berhasil diupdate' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, hanya ADMIN' })
  @ApiResponse({ status: 404, description: 'Toko tidak ditemukan' })
  updatePayment(@Param('id') id: string, @Body() dto: UpdatePaymentDto, @CurrentUser() user: any) {
    return this.storesService.updatePayment(id, dto, user.role);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '[OWNER/ADMIN] Hapus toko' })
  @ApiResponse({ status: 200, description: 'Toko berhasil dihapus' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  @ApiResponse({ status: 404, description: 'Toko tidak ditemukan' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.storesService.remove(id, user.id, user.role);
  }
}