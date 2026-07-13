import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit');

@Injectable()
export class ExportService {
  constructor(private prisma: PrismaService) {}

  async exportTransactions(userId: bigint, filters: any, res: any) {
    if (!filters.format || !['excel', 'pdf'].includes(filters.format)) {
      throw new BadRequestException('Formato inválido. Use "excel" o "pdf".');
    }

    const where: any = { user_id: userId };
    if (filters.date_from || filters.date_to) {
      where.date = {};
      if (filters.date_from) where.date.gte = new Date(filters.date_from);
      if (filters.date_to) where.date.lte = new Date(filters.date_to);
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
    } else {
      return this.exportPdf(transactions, filters.date_from, filters.date_to, res);
    }
  }

  private async exportExcel(transactions: any[], res: any) {
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

  private async exportPdf(transactions: any[], dateFrom: string, dateTo: string, res: any) {
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
}
