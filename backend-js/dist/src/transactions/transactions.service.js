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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
let TransactionsService = class TransactionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapTransaction(t) {
        if (!t)
            return t;
        const { categories, user_accounts, target_accounts, ...rest } = t;
        let mappedUserAccount = undefined;
        if (user_accounts) {
            const { banks, ...uaRest } = user_accounts;
            mappedUserAccount = {
                ...uaRest,
                bank: banks,
            };
        }
        let mappedTargetAccount = undefined;
        if (target_accounts) {
            const { banks, ...taRest } = target_accounts;
            mappedTargetAccount = {
                ...taRest,
                bank: banks,
            };
        }
        return {
            ...rest,
            category: categories || null,
            user_account: mappedUserAccount,
            target_account: mappedTargetAccount,
        };
    }
    async findAll(userId, filters) {
        const where = { user_id: userId };
        if (filters.type)
            where.type = filters.type;
        if (filters.user_account_id) {
            where.OR = [
                { user_account_id: filters.user_account_id },
                { target_account_id: filters.user_account_id },
            ];
        }
        if (filters.date_from || filters.date_to) {
            where.date = {};
            if (filters.date_from)
                where.date.gte = new Date(filters.date_from);
            if (filters.date_to)
                where.date.lte = new Date(filters.date_to);
        }
        if (filters.amount_min || filters.amount_max) {
            where.amount = {};
            if (filters.amount_min)
                where.amount.gte = Number(filters.amount_min);
            if (filters.amount_max)
                where.amount.lte = Number(filters.amount_max);
        }
        const transactions = await this.prisma.transactions.findMany({
            where,
            include: {
                categories: true,
                user_accounts: { include: { banks: true } },
                target_accounts: { include: { banks: true } },
            },
            orderBy: [{ date: 'desc' }, { created_at: 'desc' }],
            take: 15,
        });
        return { data: transactions.map(t => this.mapTransaction(t)) };
    }
    async findOne(id, userId) {
        const transaction = await this.prisma.transactions.findFirst({
            where: { id, user_id: userId },
            include: {
                categories: true,
                user_accounts: { include: { banks: true } },
                target_accounts: { include: { banks: true } },
                transaction_logs: true,
            },
        });
        if (!transaction)
            throw new common_1.NotFoundException('Transaction not found');
        return { transaction: this.mapTransaction(transaction) };
    }
    async create(userId, data, reqMetadata) {
        const account = await this.prisma.user_accounts.findFirst({
            where: { id: data.user_account_id, user_id: userId },
        });
        if (!account)
            throw new common_1.NotFoundException('Account not found');
        if (data.type === 'transfer' && !data.target_account_id) {
            throw new Error('Target account is required for transfers.');
        }
        const transaction = await this.prisma.transactions.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                user_id: userId,
                user_account_id: data.user_account_id,
                target_account_id: data.type === 'transfer' ? data.target_account_id : null,
                category_id: data.type === 'transfer' ? null : data.category_id,
                amount: data.amount,
                description: data.description,
                date: new Date(data.date),
                type: data.type,
                is_shared: data.is_shared ?? true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            include: {
                categories: true,
                user_accounts: { include: { banks: true } },
                target_accounts: { include: { banks: true } }
            },
        });
        if (data.is_shared && data.group_id && data.type === 'expense') {
            const groupMembers = await this.prisma.group_user.findMany({
                where: { group_id: BigInt(data.group_id) }
            });
            if (groupMembers.length > 0) {
                const splitAmount = Number(data.amount) / groupMembers.length;
                const percentage = 100 / groupMembers.length;
                await this.prisma.shared_debts.create({
                    data: {
                        group_id: BigInt(data.group_id),
                        created_by: userId,
                        title: data.description || 'Gasto compartido',
                        amount: data.amount,
                        date: new Date(data.date),
                        transaction_id: transaction.id,
                        shared_debt_splits: {
                            create: groupMembers.map(member => ({
                                user_id: member.user_id,
                                percentage: percentage,
                                amount_owed: splitAmount,
                                is_paid: member.user_id === userId,
                            }))
                        }
                    }
                });
            }
        }
        await this.adjustAccountBalance(userId, transaction.user_account_id, transaction.type, Number(transaction.amount), false, transaction.target_account_id);
        await this.logAction(transaction.id, userId, 'CREATE', null, transaction, reqMetadata);
        const warnings = await this.checkBudgetWarning(userId, transaction);
        return {
            message: 'Transacción creada exitosamente.',
            transaction: this.mapTransaction(transaction),
            warnings,
        };
    }
    async update(id, userId, data, reqMetadata) {
        const transaction = await this.prisma.transactions.findFirst({
            where: { id, user_id: userId },
        });
        if (!transaction)
            throw new common_1.NotFoundException('Transaction not found');
        if (data.user_account_id && data.user_account_id !== transaction.user_account_id) {
            const account = await this.prisma.user_accounts.findFirst({
                where: { id: data.user_account_id, user_id: userId },
            });
            if (!account)
                throw new common_1.NotFoundException('Account not found');
        }
        if (data.type === 'transfer' && !data.target_account_id) {
            throw new Error('Target account is required for transfers.');
        }
        const before = transaction;
        await this.adjustAccountBalance(userId, before.user_account_id, before.type, Number(before.amount), true, before.target_account_id);
        const updatedTransaction = await this.prisma.transactions.update({
            where: { id },
            data: {
                user_account_id: data.user_account_id,
                target_account_id: data.type === 'transfer' ? data.target_account_id : null,
                category_id: data.type === 'transfer' ? null : data.category_id,
                amount: data.amount,
                description: data.description,
                date: data.date ? new Date(data.date) : undefined,
                type: data.type,
                is_shared: data.is_shared,
                updated_at: new Date(),
            },
            include: {
                categories: true,
                user_accounts: { include: { banks: true } },
                target_accounts: { include: { banks: true } }
            },
        });
        if (updatedTransaction.is_shared && updatedTransaction.type === 'expense') {
            const existingDebt = await this.prisma.shared_debts.findFirst({
                where: { transaction_id: updatedTransaction.id }
            });
            if (existingDebt && (Number(existingDebt.amount) !== Number(updatedTransaction.amount) || data.date)) {
                const groupMembers = await this.prisma.group_user.findMany({
                    where: { group_id: existingDebt.group_id }
                });
                if (groupMembers.length > 0) {
                    const splitAmount = Number(updatedTransaction.amount) / groupMembers.length;
                    await this.prisma.shared_debts.update({
                        where: { id: existingDebt.id },
                        data: { amount: updatedTransaction.amount, date: data.date ? new Date(data.date) : undefined },
                    });
                    for (const member of groupMembers) {
                        await this.prisma.shared_debt_splits.updateMany({
                            where: { shared_debt_id: existingDebt.id, user_id: member.user_id },
                            data: { amount_owed: splitAmount },
                        });
                    }
                }
            }
        }
        await this.adjustAccountBalance(userId, updatedTransaction.user_account_id, updatedTransaction.type, Number(updatedTransaction.amount), false, updatedTransaction.target_account_id);
        await this.logAction(transaction.id, userId, 'UPDATE', before, updatedTransaction, reqMetadata);
        const warnings = await this.checkBudgetWarning(userId, updatedTransaction);
        return {
            message: 'Transacción actualizada exitosamente.',
            transaction: this.mapTransaction(updatedTransaction),
            warnings,
        };
    }
    async remove(id, userId, reqMetadata) {
        const transaction = await this.prisma.transactions.findFirst({
            where: { id, user_id: userId },
        });
        if (!transaction)
            throw new common_1.NotFoundException('Transaction not found');
        await this.logAction(transaction.id, userId, 'DELETE', transaction, null, reqMetadata);
        await this.adjustAccountBalance(userId, transaction.user_account_id, transaction.type, Number(transaction.amount), true, transaction.target_account_id);
        await this.prisma.transactions.delete({ where: { id } });
        return { message: 'Transacción eliminada exitosamente.' };
    }
    async logAction(transactionId, userId, action, before, after, reqMetadata) {
        await this.prisma.transaction_logs.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                transaction_id: transactionId,
                user_id: userId,
                action,
                payload_before: before,
                payload_after: after,
                ip_address: reqMetadata.ip,
                user_agent: reqMetadata.userAgent,
                created_at: new Date(),
            }
        });
    }
    async adjustAccountBalance(userId, accountId, type, amount, revert = false, targetAccountId = null) {
        const account = await this.prisma.user_accounts.findFirst({ where: { id: accountId, user_id: userId } });
        if (!account)
            return;
        let balance = Number(account.balance);
        const factor = revert ? -1 : 1;
        if (type === 'income') {
            balance += (amount * factor);
        }
        else if (type === 'expense') {
            balance -= (amount * factor);
        }
        else if (type === 'transfer') {
            balance -= (amount * factor);
            if (targetAccountId) {
                const targetAccount = await this.prisma.user_accounts.findFirst({ where: { id: targetAccountId, user_id: userId } });
                if (targetAccount) {
                    let targetBalance = Number(targetAccount.balance);
                    targetBalance += (amount * factor);
                    await this.prisma.user_accounts.update({
                        where: { id: targetAccountId },
                        data: { balance: targetBalance },
                    });
                }
            }
        }
        await this.prisma.user_accounts.update({
            where: { id: accountId },
            data: { balance },
        });
    }
    async checkBudgetWarning(userId, transaction) {
        if (transaction.type !== 'expense')
            return [];
        const date = new Date();
        const currentMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const budget = await this.prisma.budgets.findFirst({
            where: { user_id: userId, category_id: transaction.category_id, period: currentMonth },
        });
        if (budget) {
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const spentAgg = await this.prisma.transactions.aggregate({
                _sum: { amount: true },
                where: {
                    user_id: userId,
                    category_id: transaction.category_id,
                    type: 'expense',
                    date: { gte: startOfMonth, lte: endOfMonth },
                }
            });
            const spent = Number(spentAgg._sum.amount || 0);
            const budgetAmount = Number(budget.amount);
            if (spent >= (budgetAmount * 0.8)) {
                const category = transaction.categories ? transaction.categories.name : 'la categoría';
                return [`¡Atención! Has alcanzado o superado el 80% de tu presupuesto de $${budgetAmount} para ${category} en este mes.`];
            }
        }
        return [];
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map