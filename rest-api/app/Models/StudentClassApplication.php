<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentClassApplication extends Model
{
    use HasFactory;

    protected $table = 'students_class_applications';

    protected $fillable = [
            'registerNumber',
            'dateOut',
            'documentNumber',
            'documentDate',
            'inNumber',
            'inDate',
            'class',
            'admits',
            'equivalenceExamsDate',
            'equivalenceExams',
            'grades'
    ];

    public function student() {
        return $this->belongsTo('App\Models\StudentClass');
    }
}
