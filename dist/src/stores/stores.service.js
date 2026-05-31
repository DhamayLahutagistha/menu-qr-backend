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
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StoresService = class StoresService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.store.findMany({
            include: {
                owner: { select: { id: true, name: true, email: true } },
                _count: { select: { categories: true, orders: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    findMyStores(ownerId) {
        return this.prisma.store.findMany({
            where: { ownerId },
            include: { _count: { select: { categories: true, orders: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findBySlug(slug) {
        const store = await this.prisma.store.findUnique({
            where: { slug, isActive: true },
            select: {
                id: true, name: true, slug: true, description: true,
                address: true, phone: true, logoUrl: true,
                qrisImageUrl: true, bankName: true, bankAccount: true, bankHolder: true,
                categories: {
                    where: { isActive: true },
                    orderBy: { sortOrder: 'asc' },
                    include: { menuItems: { orderBy: { sortOrder: 'asc' } } },
                },
            },
        });
        if (!store)
            throw new common_1.NotFoundException('Toko tidak ditemukan');
        return store;
    }
    async findOne(id) {
        const store = await this.prisma.store.findUnique({
            where: { id },
            include: { owner: { select: { id: true, name: true, email: true } } },
        });
        if (!store)
            throw new common_1.NotFoundException('Toko tidak ditemukan');
        return store;
    }
    async create(dto, ownerId) {
        const slugExists = await this.prisma.store.findUnique({ where: { slug: dto.slug } });
        if (slugExists)
            throw new common_1.ConflictException('Slug sudah digunakan');
        return this.prisma.store.create({ data: { ...dto, ownerId } });
    }
    async update(id, dto, userId, userRole) {
        const store = await this.findOne(id);
        if (userRole !== 'ADMIN' && store.ownerId !== userId) {
            throw new common_1.ForbiddenException('Tidak boleh mengubah toko orang lain');
        }
        return this.prisma.store.update({ where: { id }, data: dto });
    }
    async updatePayment(id, dto, userRole) {
        if (userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Hanya ADMIN yang bisa mengubah info pembayaran');
        }
        await this.findOne(id);
        return this.prisma.store.update({
            where: { id },
            data: dto,
            select: {
                id: true, name: true,
                qrisImageUrl: true, bankName: true, bankAccount: true, bankHolder: true,
                updatedAt: true,
            },
        });
    }
    async remove(id, userId, userRole) {
        const store = await this.findOne(id);
        if (userRole !== 'ADMIN' && store.ownerId !== userId) {
            throw new common_1.ForbiddenException('Tidak boleh menghapus toko orang lain');
        }
        await this.prisma.store.delete({ where: { id } });
        return { message: 'Toko berhasil dihapus' };
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoresService);
//# sourceMappingURL=stores.service.js.map