<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Protocol;

class ProtocolController extends Controller
{
    public function index() {
        $protocols = Protocol::all();

        foreach ($protocols as $p) {
            $p->application;
        }
        return $protocols;
    }
}
