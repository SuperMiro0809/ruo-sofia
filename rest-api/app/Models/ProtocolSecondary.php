<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProtocolSecondary extends Model
{
    use HasFactory;

    protected $table = 'protocols_secondary';

    public function application() {
        return $this->hasMany('App\Models\StudentSecondary', 'protocol_id');
    }
}
