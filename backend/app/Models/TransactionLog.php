<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionLog extends Model
{
    use HasFactory, HasUuids;

    /**
     * Esta tabla no tiene updated_at, solo created_at.
     */
    const UPDATED_AT = null;

    protected $table = 'transaction_logs';

    protected $fillable = [
        'transaction_id',
        'user_id',
        'action',
        'payload_before',
        'payload_after',
        'ip_address',
        'user_agent',
    ];

    protected function casts(): array
    {
        return [
            'payload_before' => 'array',
            'payload_after'  => 'array',
        ];
    }

    // ─── Relaciones ──────────────────────────────────────────

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
