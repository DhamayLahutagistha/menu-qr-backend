// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Daftar akun baru (default role: OWNER)" })
  @ApiResponse({
    status: 201,
    description: "Berhasil register, langsung dapat token",
  })
  @ApiResponse({ status: 409, description: "Email sudah terdaftar" })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @HttpCode(200)
  @ApiOperation({ summary: "Login dan dapatkan JWT token" })
  @ApiResponse({
    status: 200,
    description: "Login berhasil, token dikembalikan",
  })
  @ApiResponse({ status: 401, description: "Email atau password salah" })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Lihat profil user yang sedang login" })
  @ApiResponse({
    status: 200,
    description: "Data profil user berhasil diambil",
  }) // ← tambah ini
  me(@CurrentUser() user: any) {
    return this.authService.me(user.id);
  }
}
