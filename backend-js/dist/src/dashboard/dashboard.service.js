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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary(userId, filters) {
        const whereTransactions = { user_id: userId };
        if (filters.user_account_id)
            whereTransactions.user_account_id = filters.user_account_id;
        if (filters.date_from || filters.date_to) {
            whereTransactions.date = {};
            if (filters.date_from)
                whereTransactions.date.gte = new Date(filters.date_from);
            if (filters.date_to)
                whereTransactions.date.lte = new Date(filters.date_to);
        }
        const incomeAgg = await this.prisma.transactions.aggregate({
            _sum: { amount: true },
            where: { ...whereTransactions, type: 'income' },
        });
        const expenseAgg = await this.prisma.transactions.aggregate({
            _sum: { amount: true },
            where: { ...whereTransactions, type: 'expense' },
        });
        const totalIncome = Number(incomeAgg._sum.amount || 0);
        const totalExpense = Number(expenseAgg._sum.amount || 0);
        const balance = totalIncome - totalExpense;
        const expensesGroup = await this.prisma.transactions.groupBy({
            by: ['category_id'],
            _sum: { amount: true },
            where: { ...whereTransactions, type: 'expense' },
            orderBy: { _sum: { amount: 'desc' } },
        });
        const categoryIds = expensesGroup.map(e => e.category_id).filter(id => id);
        const categories = await this.prisma.categories.findMany({ where: { id: { in: categoryIds } } });
        const expensesByCategory = expensesGroup.map(g => {
            const cat = categories.find(c => c.id === g.category_id);
            return {
                name: cat?.name || 'Unknown',
                total: Number(g._sum.amount),
                color: cat?.color || '#cccccc',
            };
        });
        const allTransactions = await this.prisma.transactions.findMany({
            where: whereTransactions,
            select: { date: true, type: true, amount: true },
            orderBy: { date: 'asc' },
        });
        const chartMap = new Map();
        for (const t of allTransactions) {
            const d = new Date(t.date).toISOString().split('T')[0];
            if (!chartMap.has(d))
                chartMap.set(d, { income: 0, expense: 0 });
            const current = chartMap.get(d);
            if (t.type === 'income')
                current.income += Number(t.amount);
            else if (t.type === 'expense')
                current.expense += Number(t.amount);
        }
        const chartData = Array.from(chartMap.entries()).map(([date, data]) => ({
            date,
            income: data.income,
            expense: data.expense,
        }));
        return {
            summary: { totalIncome, totalExpense, balance },
            expensesByCategory,
            chartData,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map