<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;
    use HasFactory;
     
    public function protocol() {
        // return $this->belongsToJson('App\Protocol', 'application_id', 'id');
        return $this->hasManyJson('App\Protocol', 'applications->application_ids');
    }

    public function teacher() {
        return $this->belongsTo('App\Models\Teacher', 'teacher_id');
    }
}
