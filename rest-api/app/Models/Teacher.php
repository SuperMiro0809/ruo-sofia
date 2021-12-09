<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;
    use HasFactory;

    protected $casts = [
        'applications' => 'json',
    ];

    public function application() {
        return $this->belongsToJson('App\Models\Application', 'applications->application_ids');
    }
}
