import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CurrencyService } from '../currency/currency.service';
import { Currency, formatAmount, normalizeCurrency } from '../common/currency.util';
import * as ExcelJS from 'exceljs';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit');

@Injectable()
export class ExportService {
  constructor(
    private prisma: PrismaService,
    private currencyService: CurrencyService,
  ) {}

  async exportTransactions(userId: string, filters: any, res: any) {
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

    const baseCurrency = await this.currencyService.getUserBaseCurrency(userId);

    if (filters.format === 'excel') {
      return this.exportExcel(transactions, res);
    } else {
      return this.exportPdf(transactions, filters.date_from, filters.date_to, res, baseCurrency);
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
      // El monto se exporta en la moneda de su cuenta, no convertido: una exportación de
      // movimientos tiene que coincidir con lo que muestra la cartola del banco. La columna
      // de moneda es lo que evita que una planilla con cuentas en CLP y USD sea ilegible.
      { header: 'Moneda', key: 'currency', width: 10 },
      { header: 'Descripción', key: 'description', width: 30 },
    ];

    for (const t of transactions) {
      worksheet.addRow({
        date: new Date(t.date).toLocaleDateString(),
        account: t.user_accounts ? `${t.user_accounts.banks?.name || ''} - ${t.user_accounts.identifier}` : 'N/A',
        category: t.categories ? t.categories.name : 'N/A',
        type: t.type === 'income' ? 'Ingreso' : 'Egreso',
        amount: Number(t.amount),
        currency: normalizeCurrency(t.user_accounts?.currency),
        description: t.description || '',
      });
    }

    const filename = `transacciones_${new Date().getTime()}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    await workbook.xlsx.write(res);
    res.end();
  }

  /**
   * Genera el PDF del reporte.
   *
   * Los totales de la cabecera se convierten a la moneda base del usuario con la cotización de
   * la fecha de cada movimiento, porque sumar pesos y dólares en crudo daría un número que no
   * representa nada. El detalle línea por línea, en cambio, conserva la moneda original de cada
   * cuenta y la muestra explícitamente.
   *
   * @param transactions transacciones a listar, con su cuenta incluida
   * @param dateFrom inicio del período filtrado, si lo hubo
   * @param dateTo fin del período filtrado, si lo hubo
   * @param res response de Express donde se escribe el PDF
   * @param baseCurrency moneda a la que se convierten los totales
   */
  private async exportPdf(
    transactions: any[],
    dateFrom: string,
    dateTo: string,
    res: any,
    baseCurrency: Currency,
  ) {
    let totalIncome = 0;
    let totalExpense = 0;

    for (const t of transactions) {
      if (t.type !== 'income' && t.type !== 'expense') continue;
      const converted = await this.currencyService.convert(
        Number(t.amount),
        normalizeCurrency(t.user_accounts?.currency),
        baseCurrency,
        t.date,
      );
      if (t.type === 'income') totalIncome += converted;
      else totalExpense += converted;
    }

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
    doc.text(`Totales expresados en ${baseCurrency}`);
    doc.text(`Ingresos Totales: ${formatAmount(totalIncome, baseCurrency)}`);
    doc.text(`Egresos Totales: ${formatAmount(totalExpense, baseCurrency)}`);
    doc.text(`Balance: ${formatAmount(balance, baseCurrency)}`);
    doc.moveDown();

    doc.fontSize(10);

    for (const t of transactions) {
      const date = new Date(t.date).toLocaleDateString();
      const type = t.type === 'income' ? 'Ingreso' : 'Egreso';
      const cat = t.categories ? t.categories.name : 'N/A';
      const currency = normalizeCurrency(t.user_accounts?.currency);
      const amount = formatAmount(Number(t.amount), currency);
      doc.text(`${date} | ${type} | ${cat} | ${amount} ${currency} | ${t.description || ''}`);
      doc.moveDown(0.5);
    }

    doc.end();
  }
}
