<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentClass extends Model
{
    use HasFactory;

    protected $table = 'students_class';

    public function application() {
        return $this->hasMany('App\Models\StudentClassApplication', 'student_id');
    }
}
