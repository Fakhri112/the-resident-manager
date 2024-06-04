<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    use HasFactory;
    protected $fillable = [
        'resident_id', 'payment_type', 'payment_id', 'occupancy_status', 'address', 'number'
    ];
}
