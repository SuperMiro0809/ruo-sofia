<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CommitteEducation;

class CommitteEducationController extends Controller
{
    public function index() {
        $committe = CommitteEducation::all();

        return $committe;
    }
}
