<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'ktp_photo',
        'residency_status',
        'phone_number',
        'marital_status',
    ];
}
