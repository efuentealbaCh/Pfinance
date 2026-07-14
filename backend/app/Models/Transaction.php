<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'user_account_id',
        'category_id',
        'amount',
        'description',
        'date',
        'type',
        'is_shared',
    ];

    protected function casts(): array
    {
        return [
            'amount'    => 'decimal:2',
            'date'      => 'date',
            'is_shared' => 'boolean',
        ];
    }

    // ─── Relaciones ──────────────────────────────────────────

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function userAccount(): BelongsTo
    {
        return $this->belongsTo(UserAccount::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(TransactionLog::class);
    }
}
