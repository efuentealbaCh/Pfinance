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
exports.SavingsGoalsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
let SavingsGoalsService = class SavingsGoalsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId) {
        const goals = await this.prisma.savings_goals.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
        });
        return { goals: goals.map(g => this.formatGoal(g)) };
    }
    async findOne(id, userId) {
        const goal = await this.prisma.savings_goals.findFirst({
            where: { id, user_id: userId },
        });
        if (!goal)
            throw new common_1.NotFoundException('Savings goal not found');
        return { goal: this.formatGoal(goal) };
    }
    async create(userId, data) {
        const goal = await this.prisma.savings_goals.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                user_id: userId,
                name: data.name,
                target_amount: data.target_amount,
                current_amount: data.current_amount || 0,
                deadline: data.deadline ? new Date(data.deadline) : null,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });
        return { message: 'Meta de ahorro creada exitosamente.', goal: this.formatGoal(goal) };
    }
    async update(id, userId, data) {
        const existing = await this.prisma.savings_goals.findFirst({ where: { id, user_id: userId } });
        if (!existing)
            throw new common_1.NotFoundException('Savings goal not found');
        const goal = await this.prisma.savings_goals.update({
            where: { id },
            data: {
                name: data.name,
                target_amount: data.target_amount,
                deadline: data.deadline ? new Date(data.deadline) : null,
                updated_at: new Date(),
            },
        });
        return { message: 'Meta de ahorro actualizada exitosamente.', goal: this.formatGoal(goal) };
    }
    async remove(id, userId) {
        const existing = await this.prisma.savings_goals.findFirst({ where: { id, user_id: userId } });
        if (!existing)
            throw new common_1.NotFoundException('Savings goal not found');
        await this.prisma.savings_goals.delete({ where: { id } });
        return { message: 'Meta de ahorro eliminada exitosamente.' };
    }
    async deposit(id, userId, amount) {
        const goal = await this.prisma.savings_goals.findFirst({ where: { id, user_id: userId } });
        if (!goal)
            throw new common_1.NotFoundException('Savings goal not found');
        const newAmount = Number(goal.current_amount) + Number(amount);
        const updated = await this.prisma.savings_goals.update({
            where: { id },
            data: { current_amount: newAmount, updated_at: new Date() },
        });
        const isCompleted = newAmount >= Number(updated.target_amount);
        const message = isCompleted
            ? '🎉 ¡Felicidades! Has alcanzado tu meta de ahorro.'
            : 'Abono registrado exitosamente.';
        return { message, goal: this.formatGoal(updated) };
    }
    async withdraw(id, userId, amount) {
        const goal = await this.prisma.savings_goals.findFirst({ where: { id, user_id: userId } });
        if (!goal)
            throw new common_1.NotFoundException('Savings goal not found');
        const withdrawAmount = Number(amount);
        const currentAmount = Number(goal.current_amount);
        if (withdrawAmount > currentAmount) {
            throw new common_1.UnprocessableEntityException(`No puedes retirar más de lo que tienes ahorrado ($${currentAmount.toFixed(2)}).`);
        }
        const updated = await this.prisma.savings_goals.update({
            where: { id },
            data: { current_amount: currentAmount - withdrawAmount, updated_at: new Date() },
        });
        return { message: 'Retiro registrado exitosamente.', goal: this.formatGoal(updated) };
    }
    formatGoal(goal) {
        const target = Number(goal.target_amount);
        const current = Number(goal.current_amount);
        const percentage = target > 0 ? Number(((current / target) * 100).toFixed(1)) : 0;
        const remaining = Math.max(0, target - current);
        const is_completed = current >= target;
        return {
            ...goal,
            target_amount: target,
            current_amount: current,
            percentage,
            remaining,
            is_completed,
        };
    }
};
exports.SavingsGoalsService = SavingsGoalsService;
exports.SavingsGoalsService = SavingsGoalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SavingsGoalsService);
//# sourceMappingURL=savings-goals.service.js.map