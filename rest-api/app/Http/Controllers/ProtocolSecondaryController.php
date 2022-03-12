<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\CommitteEducation;
use App\Models\StudentSecondary;
use App\Models\ProtocolEducation;

class ProtocolSecondaryController extends Controller
{
    public function index(Request $request) {
        $protocols = ProtocolEducation::all();

        return $protocols;
    }

    public function store(Request $request) {
        
    }
}
