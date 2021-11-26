<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Protocol extends Model
{
    use HasFactory;

    public function application() {
        return $this->hasMany('App\Models\Application', 'id', 'application_id');
    }
}