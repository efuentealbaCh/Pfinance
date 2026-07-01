<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    /**
     * Exportar transacciones a CSV o PDF.
     */
    public function exportTransactions(Request $request)
    {
        $request->validate([
            'format' => 'required|in:excel,pdf',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date',
        ]);

        $userId = $request->user()->id;
        $format = $request->input('format');
        
        $dateFrom = $request->input('date_from');
        $dateTo = $request->input('date_to');

        // Construir query
        $query = Transaction::with(['category', 'userAccount.bank'])
            ->where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc');

        if ($dateFrom) {
            $query->whereDate('date', '>=', $dateFrom);
        }
        if ($dateTo) {
            $query->whereDate('date', '<=', $dateTo);
        }

        $transactions = $query->get();

        if ($format === 'excel') {
            return $this->exportExcel($transactions);
        }

        return $this->exportPdf($transactions, $dateFrom, $dateTo, $request->user());
    }

    /**
     * Generar y descargar Excel.
     */
    private function exportExcel($transactions)
    {
        $filename = 'transacciones_' . date('Ymd_His') . '.xlsx';

        return response()->streamDownload(function () use ($transactions) {
            $writer = \Spatie\SimpleExcel\SimpleExcelWriter::create('php://output', 'xlsx');

            foreach ($transactions as $t) {
                $writer->addRow([
                    'Fecha' => Carbon::parse($t->date)->format('d/m/Y'),
                    'Cuenta' => $t->userAccount ? ($t->userAccount->bank->name . ' - ' . $t->userAccount->identifier) : 'N/A',
                    'Categoría' => $t->category ? $t->category->name : 'N/A',
                    'Tipo' => $t->type === 'income' ? 'Ingreso' : 'Egreso',
                    'Monto' => (float) $t->amount,
                    'Descripción' => $t->description ?? ''
                ]);
            }

            $writer->close();
        }, $filename);
    }

    /**
     * Generar y descargar PDF.
     */
    private function exportPdf($transactions, $dateFrom, $dateTo, $user)
    {
        $totalIncome = $transactions->where('type', 'income')->sum('amount');
        $totalExpense = $transactions->where('type', 'expense')->sum('amount');
        $balance = $totalIncome - $totalExpense;

        $data = [
            'user' => $user,
            'transactions' => $transactions,
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo,
            'totalIncome' => $totalIncome,
            'totalExpense' => $totalExpense,
            'balance' => $balance,
        ];

        $pdf = Pdf::loadView('exports.transactions', $data);
        
        $filename = 'reporte_' . date('Ymd_His') . '.pdf';
        
        return $pdf->download($filename);
    }
}
