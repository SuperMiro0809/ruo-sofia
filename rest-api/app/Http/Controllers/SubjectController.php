<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;

class SubjectController extends Controller
{
    public function index() {
        $subjects = Subject::all();

        return $subjects;
    }

    public function save(Request $request) {
        $subject = new Subject();
        $subject->name = $request->name;

        $subject->save();

        return response()->json(['message' => 'Created']);
    }

    public function destroy($id) {
        Subject::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function edit(Request $request, $id) {
        $subject = Subject::findOrFail($id);

        $subject->name = $request->name;
        $subject->save();

        return response()->json(['message' => 'Edited']);
    }
}
