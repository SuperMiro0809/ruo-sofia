<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProtocolMps extends Model
{
    use HasFactory;

    protected $table = 'protocols_mps';

    protected $fillable = [
        'number',
        'date',
        'startDate',
        'endDate',
        'orderNumber',
        'orderDate',
        'president',
        'vicePresidents',
        'members'
    ];

    public function application() {
        return $this->hasMany('App\Models\Mps', 'protocol_id');
    }
}
