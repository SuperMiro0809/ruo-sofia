<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;
    use HasFactory;
     
    public function protocol() {
        return $this->hasManyJson('App\Protocol', 'applications->application_ids');
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
