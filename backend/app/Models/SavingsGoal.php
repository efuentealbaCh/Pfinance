<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavingsGoal extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'name',
        'target_amount',
        'current_amount',
        'deadline',
        'icon',
        'color',
    ];

    protected function casts(): array
    {
        return [
            'target_amount'  => 'decimal:2',
            'current_amount' => 'decimal:2',
            'deadline'       => 'date',
        ];
    }

    // ─── Relaciones ──────────────────────────────────────────

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // ─── Accessors ───────────────────────────────────────────

    /**
     * Porcentaje de progreso.
     */
    public function getPercentageAttribute(): float
    {
        if ((float) $this->target_amount <= 0) {
            return 0;
        }

        return round(((float) $this->current_amount / (float) $this->target_amount) * 100, 1);
    }

    /**
     * Monto restante para alcanzar la meta.
     */
    public function getRemainingAttribute(): float
    {
        return max(0, round((float) $this->target_amount - (float) $this->current_amount, 2));
    }

    /**
     * Si la meta fue alcanzada.
     */
    public function getIsCompletedAttribute(): bool
    {
        return (float) $this->current_amount >= (float) $this->target_amount;
    }
}
