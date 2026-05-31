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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkStoreOwner(storeId, userId, userRole) {
        const store = await this.prisma.store.findUnique({ where: { id: storeId } });
        if (!store)
            throw new common_1.NotFoundException('Toko tidak ditemukan');
        if (userRole !== 'ADMIN' && store.ownerId !== userId) {
            throw new common_1.ForbiddenException('Tidak punya akses ke toko ini');
        }
        return store;
    }
    findByStore(storeId) {
        return this.prisma.category.findMany({
            where: { storeId },
            include: { _count: { select: { menuItems: true } } },
            orderBy: { sortOrder: 'asc' },
        });
    }
    async findOne(id) {
        const cat = await this.prisma.category.findUnique({
            where: { id },
            include: { menuItems: { orderBy: { sortOrder: 'asc' } } },
        });
        if (!cat)
            throw new common_1.NotFoundException('Kategori tidak ditemukan');
        return cat;
    }
    async create(storeId, dto, userId, userRole) {
        await this.checkStoreOwner(storeId, userId, userRole);
        return this.prisma.category.create({ data: { ...dto, storeId } });
    }
    async update(id, dto, userId, userRole) {
        const cat = await this.findOne(id);
        await this.checkStoreOwner(cat.storeId, userId, userRole);
        return this.prisma.category.update({ where: { id }, data: dto });
    }
    async remove(id, userId, userRole) {
        const cat = await this.findOne(id);
        await this.checkStoreOwner(cat.storeId, userId, userRole);
        await this.prisma.category.delete({ where: { id } });
        return { message: 'Kategori berhasil dihapus' };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map