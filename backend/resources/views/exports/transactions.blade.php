<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte de Transacciones</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #333;
            font-size: 12px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #4ECDC4;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #1a1a1a;
            margin: 0;
            font-size: 24px;
        }
        .header p {
            margin: 5px 0 0 0;
            color: #666;
        }
        .summary-box {
            width: 100%;
            margin-bottom: 20px;
            border-collapse: collapse;
        }
        .summary-box td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: center;
            background-color: #f9f9f9;
        }
        .summary-box td strong {
            display: block;
            font-size: 14px;
            color: #444;
            margin-bottom: 5px;
        }
        .income { color: #12b886; font-size: 16px; font-weight: bold; }
        .expense { color: #fa5252; font-size: 16px; font-weight: bold; }
        .balance { color: #228be6; font-size: 16px; font-weight: bold; }
        
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        table.data-table th, table.data-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        table.data-table th {
            background-color: #4ECDC4;
            color: white;
            font-weight: bold;
        }
        table.data-table tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        .text-right {
            text-align: right !important;
        }
        .footer {
            margin-top: 30px;
            font-size: 10px;
            text-align: center;
            color: #999;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>Pfinance - Reporte Financiero</h1>
        <p>Generado para: <strong>{{ $user->name }}</strong> ({{ $user->email }})</p>
        <p>
            Período: 
            @if($dateFrom && $dateTo)
                {{ \Carbon\Carbon::parse($dateFrom)->format('d/m/Y') }} al {{ \Carbon\Carbon::parse($dateTo)->format('d/m/Y') }}
            @elseif($dateFrom)
                Desde {{ \Carbon\Carbon::parse($dateFrom)->format('d/m/Y') }}
            @elseif($dateTo)
                Hasta {{ \Carbon\Carbon::parse($dateTo)->format('d/m/Y') }}
            @else
                Histórico completo
            @endif
        </p>
    </div>

    <table class="summary-box">
        <tr>
            <td>
                <strong>Total Ingresos</strong>
                <span class="income">${{ number_format($totalIncome, 0, ',', '.') }}</span>
            </td>
            <td>
                <strong>Total Egresos</strong>
                <span class="expense">${{ number_format($totalExpense, 0, ',', '.') }}</span>
            </td>
            <td>
                <strong>Balance General</strong>
                <span class="balance">${{ number_format($balance, 0, ',', '.') }}</span>
            </td>
        </tr>
    </table>

    <table class="data-table">
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Categoría</th>
                <th>Cuenta</th>
                <th>Descripción</th>
                <th class="text-right">Monto</th>
            </tr>
        </thead>
        <tbody>
            @forelse($transactions as $t)
                <tr>
                    <td>{{ \Carbon\Carbon::parse($t->date)->format('d/m/Y') }}</td>
                    <td>{{ $t->category ? $t->category->name : 'N/A' }}</td>
                    <td>{{ $t->userAccount ? ($t->userAccount->bank->name . ' - ' . $t->userAccount->identifier) : 'N/A' }}</td>
                    <td>{{ $t->description ?? '' }}</td>
                    <td class="text-right {{ $t->type === 'income' ? 'income' : 'expense' }}">
                        {{ $t->type === 'income' ? '+' : '-' }}${{ number_format($t->amount, 0, ',', '.') }}
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" style="text-align: center;">No se encontraron transacciones en este período.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Generado el {{ now()->format('d/m/Y H:i') }}
    </div>

</body>
</html>
