<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstName',
        'middleName',
        'lastName',
        'dateOfBirth',
        'adress',
        'tel',
        'workplace',
        'education',
        'diploma'
    ];
    
    public function application() {
        return $this->hasMany('App\Models\Application');
    }
}
