<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentClassApplication extends Model
{
    use HasFactory;

    protected $table = 'students_class_applications';

    public function student() {
        return $this->belongsTo('App\Models\StudentClass');
    }
}
