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
exports.UserAccountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
let UserAccountsService = class UserAccountsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapAccount(account) {
        const { banks, account_types, ...rest } = account;
        return {
            ...rest,
            bank: banks,
            account_type: account_types,
        };
    }
    async findAll(userId) {
        const accounts = await this.prisma.user_accounts.findMany({
            where: { user_id: userId },
            include: { banks: true, account_types: true },
            orderBy: { created_at: 'desc' },
        });
        return { accounts: accounts.map(a => this.mapAccount(a)) };
    }
    async findOne(id, userId) {
        const account = await this.prisma.user_accounts.findFirst({
            where: { id, user_id: userId },
            include: { banks: true, account_types: true },
        });
        if (!account)
            throw new common_1.NotFoundException('Account not found');
        return { account: this.mapAccount(account) };
    }
    async create(userId, data) {
        const account = await this.prisma.user_accounts.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                user_id: userId,
                bank_id: data.bank_id,
                account_type_id: data.account_type_id,
                identifier: data.identifier,
                balance: data.balance || 0,
                created_at: new Date(),
                updated_at: new Date(),
            },
            include: { banks: true, account_types: true },
        });
        return { message: 'Cuenta creada exitosamente.', account: this.mapAccount(account) };
    }
    async update(id, userId, data) {
        const existing = await this.prisma.user_accounts.findFirst({ where: { id, user_id: userId } });
        if (!existing)
            throw new common_1.NotFoundException('Account not found');
        const account = await this.prisma.user_accounts.update({
            where: { id },
            data: {
                bank_id: data.bank_id,
                account_type_id: data.account_type_id,
                identifier: data.identifier,
                balance: data.balance,
                updated_at: new Date(),
            },
            include: { banks: true, account_types: true },
        });
        return { message: 'Cuenta actualizada exitosamente.', account: this.mapAccount(account) };
    }
    async remove(id, userId) {
        const existing = await this.prisma.user_accounts.findFirst({ where: { id, user_id: userId } });
        if (!existing)
            throw new common_1.NotFoundException('Account not found');
        await this.prisma.user_accounts.delete({
            where: { id },
        });
        return { message: 'Cuenta eliminada exitosamente.' };
    }
};
exports.UserAccountsService = UserAccountsService;
exports.UserAccountsService = UserAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserAccountsService);
//# sourceMappingURL=user-accounts.service.js.map