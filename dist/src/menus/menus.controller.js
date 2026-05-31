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
exports.MenusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const menus_service_1 = require("./menus.service");
const menu_item_dto_1 = require("./dto/menu-item.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let MenusController = class MenusController {
    constructor(menusService) {
        this.menusService = menusService;
    }
    findByCategory(categoryId) {
        return this.menusService.findByCategory(categoryId);
    }
    create(categoryId, dto, user) {
        return this.menusService.create(categoryId, dto, user.id, user.role);
    }
    update(id, dto, user) {
        return this.menusService.update(id, dto, user.id, user.role);
    }
    uploadImage(id, file, user) {
        const imageUrl = `/uploads/menus/${file.filename}`;
        return this.menusService.updateImage(id, imageUrl, user.id, user.role);
    }
    remove(id, user) {
        return this.menusService.remove(id, user.id, user.role);
    }
};
exports.MenusController = MenusController;
__decorate([
    (0, common_1.Get)('categories/:categoryId/items'),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat semua menu item dalam kategori' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar menu item berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategori tidak ditemukan' }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Post)('categories/:categoryId/items'),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER] Tambah menu item baru' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Menu item berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Bukan owner toko ini' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategori tidak ditemukan' }),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, menu_item_dto_1.CreateMenuItemDto, Object]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('menu-items/:id'),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER] Update menu item (termasuk toggle isAvailable)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Menu item berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Bukan owner toko ini' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Menu item tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, menu_item_dto_1.UpdateMenuItemDto, Object]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('menu-items/:id/image'),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER] Upload foto menu item' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Foto menu item berhasil diupload' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Bukan owner toko ini' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Menu item tidak ditemukan' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/menus',
            filename: (req, file, cb) => cb(null, `${Date.now()}${(0, path_1.extname)(file.originalname)}`),
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
                return cb(new Error('Hanya file gambar yang diizinkan'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Delete)('menu-items/:id'),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER] Hapus menu item' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Menu item berhasil dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Bukan owner toko ini' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Menu item tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "remove", null);
exports.MenusController = MenusController = __decorate([
    (0, swagger_1.ApiTags)('Menu Items'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [menus_service_1.MenusService])
], MenusController);
//# sourceMappingURL=menus.controller.js.map