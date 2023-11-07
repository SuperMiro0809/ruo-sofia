<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\StudentClass;
use App\Models\StudentClassApplication;

class StudentClassController extends Controller
{
    public function index(Request $request) {
        $students = StudentClass::with('application');
        $perPage = (int) $request->query('per_page');

        if($request->has('name')) {
            $students->where('name', 'regexp', $request->query('name'));
        }

        if($request->has('egn')) {
            $students->where('egn', $request->query('egn'));
        }
            
        return $students->paginate($perPage);
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

    public function certificates(Request $request) {   
        $certificates = StudentClassApplication::with('student');

        if($request->has('startDate') && $request->has('endDate')) {
            $from = date($request->query('startDate'));
            $to = date($request->query('endDate'));
            
            $certificates->whereBetween('dateOut', [$from, $to]);
        }
            
        return $certificates->get();
    }

    public function getCertificates(Request $request) {
        $students = StudentClass::with('application');
        $perPage = (int) $request->query('per_page');

        if($request->has('name')) {
            $students->where('name', 'regexp', $request->query('name'));
        }

        if($request->has('egn')) {
            $students->where('egn', $request->query('egn'));
        }

        $students->whereHas('application', function ($q) {
            $q->whereNotNull('protocol_id');
        })
        ->with('protocol');
            
        return $students->paginate($perPage);
    }

    public function getApplication($id) {
        $application = StudentClassApplication::findOrFail($id);

        return $application;
    }

    public function editApplication(Request $request, $id) {
        $application = StudentClassApplication::findOrFail($id);

        $application->update([
            'registerNumber' => $request->registerNumber,
            'dateOut' => $request->dateOut,
            'documentNumber' => $request->documentNumber,
            'documentDate' => $request->documentDate,
            'inNumber' => $request->inNumber,
            'inDate' => $request->inDate,
            'class' => $request->class,
            'admits' => $request->admits,
            'equivalenceExamsDate' => $request->equivalenceExamsDate,
            'equivalenceExams' => json_encode($request->equivalenceExams),
            'grades' => json_encode($request->grades)
        ]);

        return $application;
    }

    public function deleteApplication($id) {
        $application = StudentClassApplication::findOrFail($id);
    
        $application->delete();

        return response()->json(['message' => 'Deleted']);
    }
}