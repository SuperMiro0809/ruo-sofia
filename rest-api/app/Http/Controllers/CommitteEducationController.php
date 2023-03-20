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

    public function save(Request $request) {
        $committe = CommitteEducation::findOrFail(1);

        $committe->president = $request->president;
        $committe->vicePresidents = json_encode($request->vicePresidents);
        $committe->members = json_encode($request->members);

        $committe->save();

        return response()->json(['message' => 'Saved!']);
    }
}
