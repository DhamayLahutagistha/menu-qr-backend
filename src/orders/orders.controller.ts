// src/orders/orders.controller.ts
import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Orders')
@Controller()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('stores/:storeId/orders')
  @ApiOperation({ summary: '[PUBLIC] Buat pesanan baru dari halaman menu' })
  @ApiResponse({ status: 201, description: 'Pesanan berhasil dibuat' })
  @ApiResponse({ status: 404, description: 'Toko tidak ditemukan' })
  create(@Param('storeId') storeId: string, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(storeId, dto);
  }

  @Get('orders/track/:orderNumber')
  @ApiOperation({ summary: '[PUBLIC] Cek status pesanan (untuk pelanggan) — termasuk info QRIS/rekening' })
  @ApiResponse({ status: 200, description: 'Status pesanan berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Nomor pesanan tidak ditemukan' })
  track(@Param('orderNumber') orderNumber: string) {
    return this.ordersService.trackByNumber(orderNumber);
  }

  @Get('stores/:storeId/orders')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '[OWNER/ADMIN] Lihat semua pesanan (dashboard dapur)' })
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'] })
  @ApiResponse({ status: 200, description: 'Daftar pesanan berhasil diambil' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  findByStore(@Param('storeId') storeId: string, @Query('status') status: string, @CurrentUser() user: any) {
    return this.ordersService.findByStore(storeId, status);
  }

  @Get('orders/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '[OWNER/ADMIN] Detail pesanan' })
  @ApiResponse({ status: 200, description: 'Detail pesanan berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Pesanan tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch('orders/:id/next')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '[OWNER/ADMIN] ✅ Sekali klik — otomatis pindah ke status berikutnya',
    description: 'PENDING → PREPARING → READY → COMPLETED. Tinggal klik tombol ini, tidak perlu pilih status.',
  })
  @ApiResponse({ status: 200, description: 'Status pesanan berhasil dipindah ke berikutnya' })
  @ApiResponse({ status: 400, description: 'Pesanan sudah di status akhir' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  nextStatus(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.nextStatus(id, user.id, user.role);
  }

  @Patch('orders/:id/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '[OWNER/ADMIN] Set status manual (misal: CANCELLED)' })
  @ApiResponse({ status: 200, description: 'Status pesanan berhasil diupdate' })
  @ApiResponse({ status: 400, description: 'Status tidak valid' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto, @CurrentUser() user: any) {
    return this.ordersService.updateStatus(id, dto, user.id, user.role);
  }

  @Get('stores/:storeId/orders/summary/daily')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '[OWNER/ADMIN] Rekap penjualan hari ini' })
  @ApiResponse({ status: 200, description: 'Rekap penjualan berhasil diambil' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  getDailySummary(@Param('storeId') storeId: string, @CurrentUser() user: any) {
    return this.ordersService.getDailySummary(storeId, user.id, user.role);
  }
}