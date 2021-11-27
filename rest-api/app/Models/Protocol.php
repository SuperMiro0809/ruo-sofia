<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Protocol extends Model
{
    use \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;
    use HasFactory;

    protected $casts = [
        'applications' => 'json',
    ];

    public function application() {
        //return $this->hasManyJson('App\Models\Application', 'id', 'application_id');
        return $this->belongsToJson('App\Models\Application', 'applications->application_ids');
    }
}