// src/users/users.controller.ts
import { Controller, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UsersService, UpdateUserDto } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: '[ADMIN] Lihat semua user' })
  @ApiResponse({ status: 200, description: 'Daftar semua user berhasil diambil' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, hanya ADMIN' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '[ADMIN] Detail user beserta toko-tokonya' })
  @ApiResponse({ status: 200, description: 'Detail user berhasil diambil' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, hanya ADMIN' })
  @ApiResponse({ status: 404, description: 'User tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '[ADMIN] Update user — bisa ubah nama, email, password, atau role',
    description: 'ADMIN bisa mengubah role user dari OWNER ke ADMIN atau sebaliknya.',
  })
  @ApiResponse({ status: 200, description: 'User berhasil diupdate' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, hanya ADMIN' })
  @ApiResponse({ status: 404, description: 'User tidak ditemukan' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '[ADMIN] Hapus user (beserta semua toko miliknya)' })
  @ApiResponse({ status: 200, description: 'User berhasil dihapus' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, hanya ADMIN' })
  @ApiResponse({ status: 404, description: 'User tidak ditemukan' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}