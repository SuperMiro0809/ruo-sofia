<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Committe;

class CommitteController extends Controller
{
    public function index() {
        $committe = Committe::all();

        return $committe;
    }

    public function save(Request $request) {
        $committe = Committe::findOrFail(1);

        $committe->president = $request->president;
        $committe->members = json_encode($request->members);

        $committe->save();

        return response()->json(['message' => 'Saved!']);
    }
}
