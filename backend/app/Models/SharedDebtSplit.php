<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SharedDebtSplit extends Model
{
    use HasFactory;

    protected $fillable = ['shared_debt_id', 'user_id', 'percentage', 'amount_owed', 'is_paid'];

    public function sharedDebt(): BelongsTo
    {
        return $this->belongsTo(SharedDebt::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
