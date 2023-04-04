<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mps extends Model
{
    use HasFactory;

    protected $table = 'mps';

    protected $fillable = [
        'firstName',
        'middleName',
        'lastName',
        'egn',
        'dateOfBirth',
        'citizenship',
        'documentNumber',
        'documentDate',
        'school',
        'city',
        'country',
        'class',
        'number',
        'date'
    ];
}
