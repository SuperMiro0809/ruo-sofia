<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
     
    public function protocol() {
        return $this->belongsTo('App\Models\Protocol');
    }

    public function teacher() {
        return $this->belongsTo('App\Models\Teacher', 'teacher_id');
    }

    public function teaching() {
        return $this->hasMany('App\Models\Teaching');
    }

    public function report() {
        return $this->hasMany('App\Models\Report');
    }

    public function publication() {
        return $this->hasMany('App\Models\Publication');
    }
}
