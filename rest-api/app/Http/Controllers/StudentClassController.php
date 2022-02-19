<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\StudentClass;
use App\Models\StudentClassApplication;

class StudentClassController extends Controller
{
    public function index() {
        $students = StudentClass::with('application')->get();

        return $students;
    }

    public function store(Request $request) {
        if(isset($request->studentId)) {
            $student = StudentClass::find($request->studentId);
        }else {
            $student = new StudentClass();
        }

        $student->name = $request->name;
        $student->egn = $request->egn;
        $student->dateOfBirth = $request->dateOfBirth;
        $student->citizenship = $request->citizenship;
        $student->school = $request->school;
        $student->cityAndCountry = $request->cityAndCountry;

        $student->save();

        $application = new StudentClassApplication();
        $application->registerNumber = $request->registerNumber;
        $application->dateOut = $request->dateOut;
        $application->documentNumber = $request->documentNumber;
        $application->documentDate = $request->documentDate;
        $application->inNumber = $request->inNumber;
        $application->inDate = $request->inDate;
        $application->class = $request->class;
        $application->admits = $request->admits;
        $application->equivalenceExamsDate = $request->equivalenceExamsDate;
        $application->equivalenceExams = json_encode($request->equivalenceExams);
        $application->grades = json_encode($request->grades);
        $application->student_id = $student->id;

        $application->save();

        return response()->json(['message' => 'Created']);
    }

    public function findByEgn($egn) {
        $student = StudentClass::where('egn', $egn)->get();

        return $student;
    }

    public function destroy($id) {
        $student = StudentClass::find($id);
        
        $student->application()->delete();
        $student->delete();

        return response()->json(['message' => 'Deleted']);
    }
}