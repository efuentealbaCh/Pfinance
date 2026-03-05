<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AccountType;

class AccountTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['name' => 'Cuenta Corriente'],
            ['name' => 'Cuenta Vista / RUT'],
            ['name' => 'Cuenta de Ahorro'],
            ['name' => 'Tarjeta de Crédito'],
            ['name' => 'Línea de Crédito'],
            ['name' => 'Cuenta Prepago'],
        ];

        foreach ($types as $type) {
            AccountType::create($type);
        }
    }
}
