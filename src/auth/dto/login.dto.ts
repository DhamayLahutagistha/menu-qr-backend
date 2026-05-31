// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'owner@warung.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'owner123' })
  @IsString()
  password: string;
}
