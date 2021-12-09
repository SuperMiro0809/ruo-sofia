<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\Application;

class TeacherController extends Controller
{
    public function index() {
        $teachers = Teacher::all();

        foreach ($teachers as $t) {
            $t->application;
        }

        return $teachers;
    }

    public function store(Request $request) {
        $teacher = new Teacher();

        $applications = [];
        $teacher->egn = $request->egn;
        $teacher->firstName = $request->firstName;
        $teacher->middleName = $request->middleName;
        $teacher->lastName = $request->lastName;
        $teacher->application()->attach($applications);

        $teacher->save();

        return response()->json(['message' => 'Created']);
    }

    public function teacher($egn) {
        $teacher = Teacher::where('egn', $egn)->get();

        return $teacher;
    }
}
