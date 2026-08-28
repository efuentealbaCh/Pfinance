"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ExcelJS = __importStar(require("exceljs"));
const PDFDocument = require('pdfkit');
let ExportService = class ExportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async exportTransactions(userId, filters, res) {
        if (!filters.format || !['excel', 'pdf'].includes(filters.format)) {
            throw new common_1.BadRequestException('Formato inválido. Use "excel" o "pdf".');
        }
        const where = { user_id: userId };
        if (filters.date_from || filters.date_to) {
            where.date = {};
            if (filters.date_from)
                where.date.gte = new Date(filters.date_from);
            if (filters.date_to)
                where.date.lte = new Date(filters.date_to);
        }
        const transactions = await this.prisma.transactions.findMany({
            where,
            include: {
                categories: true,
                user_accounts: { include: { banks: true } },
            },
            orderBy: [{ date: 'desc' }, { created_at: 'desc' }],
        });
        if (filters.format === 'excel') {
            return this.exportExcel(transactions, res);
        }
        else {
            return this.exportPdf(transactions, filters.date_from, filters.date_to, res);
        }
    }
    async exportExcel(transactions, res) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Transacciones');
        worksheet.columns = [
            { header: 'Fecha', key: 'date', width: 15 },
            { header: 'Cuenta', key: 'account', width: 30 },
            { header: 'Categoría', key: 'category', width: 20 },
            { header: 'Tipo', key: 'type', width: 15 },
            { header: 'Monto', key: 'amount', width: 15 },
            { header: 'Descripción', key: 'description', width: 30 },
        ];
        for (const t of transactions) {
            worksheet.addRow({
                date: new Date(t.date).toLocaleDateString(),
                account: t.user_accounts ? `${t.user_accounts.banks?.name || ''} - ${t.user_accounts.identifier}` : 'N/A',
                category: t.categories ? t.categories.name : 'N/A',
                type: t.type === 'income' ? 'Ingreso' : 'Egreso',
                amount: Number(t.amount),
                description: t.description || '',
            });
        }
        const filename = `transacciones_${new Date().getTime()}.xlsx`;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        await workbook.xlsx.write(res);
        res.end();
    }
    async exportPdf(transactions, dateFrom, dateTo, res) {
        const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
        const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
        const balance = totalIncome - totalExpense;
        const doc = new PDFDocument({ margin: 30 });
        const filename = `reporte_${new Date().getTime()}.pdf`;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        doc.pipe(res);
        doc.fontSize(20).text('Reporte de Transacciones', { align: 'center' });
        doc.moveDown();
        if (dateFrom || dateTo) {
            doc.fontSize(12).text(`Período: ${dateFrom || 'Inicio'} - ${dateTo || 'Fin'}`);
        }
        doc.moveDown();
        doc.text(`Ingresos Totales: $${totalIncome.toFixed(2)}`);
        doc.text(`Egresos Totales: $${totalExpense.toFixed(2)}`);
        doc.text(`Balance: $${balance.toFixed(2)}`);
        doc.moveDown();
        doc.fontSize(10);
        for (const t of transactions) {
            const date = new Date(t.date).toLocaleDateString();
            const type = t.type === 'income' ? 'Ingreso' : 'Egreso';
            const cat = t.categories ? t.categories.name : 'N/A';
            const amount = Number(t.amount).toFixed(2);
            doc.text(`${date} | ${type} | ${cat} | $${amount} | ${t.description || ''}`);
            doc.moveDown(0.5);
        }
        doc.end();
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExportService);
//# sourceMappingURL=export.service.js.map