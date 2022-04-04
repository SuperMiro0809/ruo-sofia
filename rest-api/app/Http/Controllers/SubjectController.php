<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;

class SubjectController extends Controller
{
    public function index(Request $request) {
        $subjects = Subject::query();

        if($request->has('name')) {
            $subjects->where('name', 'regexp', $request->query('name'));
        }

        if($request->has('per_page')) {
            $perPage = (int) $request->query('per_page');
            return $subjects->paginate($perPage);
        }else {
            return $subjects->get();
        }
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
