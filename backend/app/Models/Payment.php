<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'amount_paid',
        'payment_status',
        'house_id',
        'new_bill_date',
        'description',
    ];
}
