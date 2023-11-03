<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mps extends Model
{
    use HasFactory;

    protected $table = 'mps';

    protected $fillable = [
        'name',
        'egn',
        'dateOfBirth',
        'citizenship',
        'documentNumber',
        'documentDate',
        'school',
        'city',
        'country',
        'class',
        'number',
        'date',
        'protocol_id',
        'protocol_order'
    ];

    public function protocol() {
        return $this->hasOne('App\Models\ProtocolMps', 'id', 'protocol_id');
    }
}
