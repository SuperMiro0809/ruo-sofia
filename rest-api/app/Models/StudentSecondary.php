<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSecondary extends Model
{
    use HasFactory;

    protected $table = 'students_secondary';

    protected $fillable = [
        'name',
        'egn',
        'dateOfBirth',
        'citizenship',
        'school',
        'cityAndCountry',
        'registerNumber',
        'dateOut',
        'documentNumber',
        'documentDate',
        'inNumber',
        'inDate',
        'admits',
        'profession',
        'speciality',
        'grades',
        'equivalenceExams',
        'protocol_id',
        'protocol_order'
    ];

    public function protocol() {
        return $this->hasOne('App\Models\ProtocolSecondary', 'id', 'protocol_id');
    }
}
