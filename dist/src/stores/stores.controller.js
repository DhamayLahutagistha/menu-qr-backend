"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stores_service_1 = require("./stores.service");
const store_dto_1 = require("./dto/store.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let StoresController = class StoresController {
    constructor(storesService) {
        this.storesService = storesService;
    }
    getPublicMenu(slug) {
        return this.storesService.findBySlug(slug);
    }
    findAll() {
        return this.storesService.findAll();
    }
    findMyStores(user) {
        return this.storesService.findMyStores(user.id);
    }
    findOne(id) {
        return this.storesService.findOne(id);
    }
    create(dto, user) {
        return this.storesService.create(dto, user.id);
    }
    update(id, dto, user) {
        return this.storesService.update(id, dto, user.id, user.role);
    }
    updatePayment(id, dto, user) {
        return this.storesService.updatePayment(id, dto, user.role);
    }
    remove(id, user) {
        return this.storesService.remove(id, user.id, user.role);
    }
};
exports.StoresController = StoresController;
__decorate([
    (0, common_1.Get)('public/:slug'),
    (0, swagger_1.ApiOperation)({ summary: '[PUBLIC] Lihat menu + info pembayaran toko (pelanggan scan QR)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data menu dan info toko berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Toko tidak ditemukan' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "getPublicMenu", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Lihat semua toko' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar semua toko berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak, hanya ADMIN' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER] Lihat toko milik saya' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar toko milik user berhasil diambil' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findMyStores", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Detail toko' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail toko berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Toko tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER] Buat toko baru' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Toko berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Data tidak valid' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.CreateStoreDto, Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER/ADMIN] Update data toko (nama, alamat, dll)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data toko berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Toko tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, store_dto_1.UpdateStoreDto, Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/payment'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Update info pembayaran toko (QRIS, rekening bank)',
        description: 'Hanya ADMIN yang bisa mengatur QRIS dan info rekening. Info ini akan tampil ke pelanggan saat order.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Info pembayaran berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak, hanya ADMIN' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Toko tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, store_dto_1.UpdatePaymentDto, Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "updatePayment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER/ADMIN] Hapus toko' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Toko berhasil dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Toko tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "remove", null);
exports.StoresController = StoresController = __decorate([
    (0, swagger_1.ApiTags)('Stores'),
    (0, common_1.Controller)('stores'),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
//# sourceMappingURL=stores.controller.js.map