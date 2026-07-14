<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Categorías predefinidas para Pfinance.
     */
    public function run(): void
    {
        $categories = [
            // ─── Gastos ──────────────────────────────────────
            ['name' => 'Alimentación',       'icon' => '🛒', 'color' => '#FF6B6B'],
            ['name' => 'Transporte',         'icon' => '🚗', 'color' => '#4ECDC4'],
            ['name' => 'Vivienda',           'icon' => '🏠', 'color' => '#45B7D1'],
            ['name' => 'Servicios básicos',  'icon' => '💡', 'color' => '#F9CA24'],
            ['name' => 'Salud',              'icon' => '🏥', 'color' => '#FF4757'],
            ['name' => 'Educación',          'icon' => '📚', 'color' => '#7C4DFF'],
            ['name' => 'Entretenimiento',    'icon' => '🎮', 'color' => '#FF9FF3'],
            ['name' => 'Restaurantes',       'icon' => '🍽️', 'color' => '#F39C12'],
            ['name' => 'Ropa y calzado',     'icon' => '👕', 'color' => '#E056A0'],
            ['name' => 'Tecnología',         'icon' => '💻', 'color' => '#00D2D3'],
            ['name' => 'Mascotas',           'icon' => '🐾', 'color' => '#A29BFE'],
            ['name' => 'Suscripciones',      'icon' => '📱', 'color' => '#6C5CE7'],
            ['name' => 'Seguros',            'icon' => '🛡️', 'color' => '#636E72'],
            ['name' => 'Deudas y préstamos', 'icon' => '💳', 'color' => '#D63031'],
            ['name' => 'Regalos',            'icon' => '🎁', 'color' => '#E17055'],
            ['name' => 'Ahorros',            'icon' => '🏦', 'color' => '#2ED573'],

            // ─── Ingresos ────────────────────────────────────
            ['name' => 'Sueldo',             'icon' => '💼', 'color' => '#00B894'],
            ['name' => 'Freelance',          'icon' => '🧑‍💻', 'color' => '#00CEC9'],
            ['name' => 'Inversiones',        'icon' => '📈', 'color' => '#0984E3'],
            ['name' => 'Ventas',             'icon' => '🏷️', 'color' => '#FDCB6E'],
            ['name' => 'Otros ingresos',     'icon' => '💵', 'color' => '#55EFC4'],

            // ─── General ─────────────────────────────────────
            ['name' => 'Otros',              'icon' => '📦', 'color' => '#B2BEC3'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']],
                $category
            );
        }
    }
}
