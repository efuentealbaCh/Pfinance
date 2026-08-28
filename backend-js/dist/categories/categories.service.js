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
const crypto_1 = require("crypto");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const category = await this.prisma.categories.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                name: data.name,
                color: data.color || '#cccccc',
                icon: data.icon || 'default',
                created_at: new Date(),
                updated_at: new Date(),
            },
        });
        return { category };
    }
    async findAll() {
        const categories = await this.prisma.categories.findMany({
            orderBy: { name: 'asc' },
        });
        return categories;
    }
    async findOne(id) {
        const category = await this.prisma.categories.findFirst({
            where: { id },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
    async update(id, data) {
        const category = await this.prisma.categories.findFirst({
            where: { id },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        const updated = await this.prisma.categories.update({
            where: { id },
            data: {
                name: data.name,
                color: data.color,
                icon: data.icon,
                updated_at: new Date(),
            },
        });
        return updated;
    }
    async remove(id) {
        const category = await this.prisma.categories.findFirst({
            where: { id },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        await this.prisma.categories.delete({ where: { id } });
        return { message: 'Category deleted' };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map