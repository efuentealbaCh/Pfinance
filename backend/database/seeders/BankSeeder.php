<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Bank;

class BankSeeder extends Seeder
{
    public function run(): void
    {
        $banks = [
            ['name' => 'Banco de Chile'],
            ['name' => 'Banco de Crédito e Inversiones (BCI)'],
            ['name' => 'BancoEstado'],
            ['name' => 'Banco Santander'],
            ['name' => 'Scotiabank Chile'],
            ['name' => 'Itaú Chile'],
            ['name' => 'Banco BICE'],
            ['name' => 'Banco Security'],
            ['name' => 'Banco Falabella'],
            ['name' => 'Banco Ripley'],
            ['name' => 'Banco Consorcio'],
            ['name' => 'Tenpo (Prepago/Digital)'],
            ['name' => 'Mercado Pago (Prepago/Digital)'],
            ['name' => 'Tanner Banco Digital'],
        ];

        foreach ($banks as $bank) {
            Bank::firstOrCreate(['name' => $bank['name']], $bank);
        }
    }
}
