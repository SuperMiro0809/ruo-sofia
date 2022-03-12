<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProtocolClass extends Model
{
    use HasFactory;

    protected $table = 'protocols_class';

    public function application() {
        return $this->hasMany('App\Models\StudentClassApplication', 'protocol_id');
    }
}
