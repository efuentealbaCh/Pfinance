<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('budgets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained();
            $table->foreignUuid('category_id')->constrained('categories');
            $table->decimal('amount', 15, 2);
            $table->enum('period', ['monthly', 'weekly', 'yearly'])->default('monthly');
            $table->timestamps();

            // Un usuario no puede tener dos presupuestos para la misma categoría y período
            $table->unique(['user_id', 'category_id', 'period']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budgets');
    }
};
