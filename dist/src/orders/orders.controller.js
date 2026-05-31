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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const order_dto_1 = require("./dto/order.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(storeId, dto) {
        return this.ordersService.create(storeId, dto);
    }
    track(orderNumber) {
        return this.ordersService.trackByNumber(orderNumber);
    }
    findByStore(storeId, status, user) {
        return this.ordersService.findByStore(storeId, status);
    }
    findOne(id) {
        return this.ordersService.findOne(id);
    }
    nextStatus(id, user) {
        return this.ordersService.nextStatus(id, user.id, user.role);
    }
    updateStatus(id, dto, user) {
        return this.ordersService.updateStatus(id, dto, user.id, user.role);
    }
    getDailySummary(storeId, user) {
        return this.ordersService.getDailySummary(storeId, user.id, user.role);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)('stores/:storeId/orders'),
    (0, swagger_1.ApiOperation)({ summary: '[PUBLIC] Buat pesanan baru dari halaman menu' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pesanan berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Toko tidak ditemukan' }),
    __param(0, (0, common_1.Param)('storeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('orders/track/:orderNumber'),
    (0, swagger_1.ApiOperation)({ summary: '[PUBLIC] Cek status pesanan (untuk pelanggan) — termasuk info QRIS/rekening' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status pesanan berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Nomor pesanan tidak ditemukan' }),
    __param(0, (0, common_1.Param)('orderNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "track", null);
__decorate([
    (0, common_1.Get)('stores/:storeId/orders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER/ADMIN] Lihat semua pesanan (dashboard dapur)' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar pesanan berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('storeId')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findByStore", null);
__decorate([
    (0, common_1.Get)('orders/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER/ADMIN] Detail pesanan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail pesanan berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pesanan tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('orders/:id/next'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: '[OWNER/ADMIN] ✅ Sekali klik — otomatis pindah ke status berikutnya',
        description: 'PENDING → PREPARING → READY → COMPLETED. Tinggal klik tombol ini, tidak perlu pilih status.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status pesanan berhasil dipindah ke berikutnya' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Pesanan sudah di status akhir' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "nextStatus", null);
__decorate([
    (0, common_1.Patch)('orders/:id/status'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER/ADMIN] Set status manual (misal: CANCELLED)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status pesanan berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Status tidak valid' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.UpdateOrderStatusDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('stores/:storeId/orders/summary/daily'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER/ADMIN] Rekap penjualan hari ini' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rekap penjualan berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('storeId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getDailySummary", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map