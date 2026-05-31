// src/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Bu Sari' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'owner@warung.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: ['ADMIN', 'OWNER'], default: 'OWNER', required: false })
  @IsOptional()
  @IsIn(['ADMIN', 'OWNER'])
  role?: string;
}
