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
exports.SharedDebtsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SharedDebtsService = class SharedDebtsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(groupId, userId, data) {
        const sum = data.splits.reduce((acc, split) => acc + Number(split.percentage), 0);
        if (Math.round(sum * 100) / 100 !== 100.00) {
            throw new common_1.UnprocessableEntityException('Percentages must sum to 100.');
        }
        const gId = BigInt(groupId);
        const groupMembership = await this.prisma.group_user.findFirst({
            where: { group_id: gId, user_id: userId }
        });
        if (!groupMembership)
            throw new common_1.NotFoundException('Group not found');
        const debt = await this.prisma.$transaction(async (tx) => {
            const created = await tx.shared_debts.create({
                data: {
                    group_id: gId,
                    created_by: userId,
                    title: data.title,
                    amount: data.amount,
                    date: new Date(data.date),
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            });
            for (const split of data.splits) {
                if (Number(split.percentage) > 0) {
                    const amount_owed = (Number(data.amount) * Number(split.percentage)) / 100;
                    await tx.shared_debt_splits.create({
                        data: {
                            shared_debt_id: created.id,
                            user_id: BigInt(split.user_id),
                            percentage: split.percentage,
                            amount_owed,
                            is_paid: false,
                            created_at: new Date(),
                            updated_at: new Date(),
                        }
                    });
                }
            }
            const debt = await tx.shared_debts.findUnique({
                where: { id: created.id },
                include: { shared_debt_splits: { include: { users: { select: { id: true, name: true } } } }, users: { select: { id: true, name: true } }, groups: { select: { id: true, name: true } } }
            });
            if (!debt)
                return debt;
            const { shared_debt_splits, users, groups: g, ...rest } = debt;
            return {
                ...rest,
                splits: shared_debt_splits ? shared_debt_splits.map((s) => ({ ...s, user: s.users })) : [],
                creator: users,
                group: g,
            };
        });
        return debt;
    }
    async pay(debtId, userId) {
        const dId = BigInt(debtId);
        const split = await this.prisma.shared_debt_splits.findFirst({
            where: { shared_debt_id: dId, user_id: userId }
        });
        if (!split)
            throw new common_1.NotFoundException('Split not found');
        const updated = await this.prisma.shared_debt_splits.update({
            where: { id: split.id },
            data: { is_paid: true, updated_at: new Date() }
        });
        return { message: 'Debt marked as paid.', split: updated };
    }
};
exports.SharedDebtsService = SharedDebtsService;
exports.SharedDebtsService = SharedDebtsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SharedDebtsService);
//# sourceMappingURL=shared-debts.service.js.map