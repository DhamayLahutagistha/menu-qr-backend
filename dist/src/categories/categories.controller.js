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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./categories.service");
const category_dto_1 = require("./dto/category.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    findByStore(storeId) {
        return this.categoriesService.findByStore(storeId);
    }
    create(storeId, dto, user) {
        return this.categoriesService.create(storeId, dto, user.id, user.role);
    }
    update(id, dto, user) {
        return this.categoriesService.update(id, dto, user.id, user.role);
    }
    remove(id, user) {
        return this.categoriesService.remove(id, user.id, user.role);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)('stores/:storeId/categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat semua kategori di sebuah toko' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar kategori berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Toko tidak ditemukan' }),
    __param(0, (0, common_1.Param)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findByStore", null);
__decorate([
    (0, common_1.Post)('stores/:storeId/categories'),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER] Tambah kategori baru' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Kategori berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Bukan owner toko ini' }),
    __param(0, (0, common_1.Param)('storeId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('categories/:id'),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER] Update kategori' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kategori berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Bukan owner toko ini' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategori tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    (0, swagger_1.ApiOperation)({ summary: '[OWNER] Hapus kategori' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kategori berhasil dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Bukan owner toko ini' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategori tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Categories'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map