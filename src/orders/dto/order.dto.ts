// src/orders/dto/order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsInt, IsIn, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty({ example: 'uuid-menu-item-id' })
  @IsString()
  menuItemId: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  qty: number;

  @ApiProperty({ required: false, example: 'Pedas banget' })
  @IsOptional()
  @IsString()
  note?: string;
}

export class CreateOrderDto {
  @ApiProperty({ example: '3', description: 'Nomor meja' })
  @IsOptional()
  @IsString()
  tableNumber?: string;

  @ApiProperty({ required: false, example: 'Tidak pakai bawang' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ enum: ['IN_APP', 'MANUAL'], default: 'IN_APP' })
  @IsOptional()
  @IsIn(['IN_APP', 'MANUAL'])
  source?: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: ['PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'] })
  @IsIn(['PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'])
  status: string;
}
