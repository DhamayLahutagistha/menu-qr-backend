// src/stores/dto/store.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, Matches, IsBoolean } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({ example: 'Warung Bu Sari' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'warung-bu-sari', description: 'Huruf kecil dan tanda hubung saja' })
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug hanya boleh huruf kecil, angka, dan tanda hubung' })
  slug: string;

  @ApiProperty({ required: false, example: 'Warung makan rumahan enak' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, example: 'Jl. Soekarno Hatta No.10' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false, example: '081234567890' })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class UpdateStoreDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// Khusus ADMIN: update info pembayaran toko
export class UpdatePaymentDto {
  @ApiProperty({ required: false, description: 'URL gambar QRIS (hasil upload)', example: '/uploads/general/qris-123.png' })
  @IsOptional()
  @IsString()
  qrisImageUrl?: string;

  @ApiProperty({ required: false, example: 'BCA' })
  @IsOptional()
  @IsString()
  bankName?: string;

  @ApiProperty({ required: false, example: '1234567890' })
  @IsOptional()
  @IsString()
  bankAccount?: string;

  @ApiProperty({ required: false, example: 'Bu Sari' })
  @IsOptional()
  @IsString()
  bankHolder?: string;
}
