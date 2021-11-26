<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    public function protocol() {
        return $this->belongsTo('App\Protocol', 'application_id', 'id');
    }
}
