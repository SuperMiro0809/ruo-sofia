<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\StudentSecondary;

class StudentsSecondaryController extends Controller
{
    public function index(Request $request) {
        $students = StudentSecondary::query();
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
        $student = new StudentSecondary();

        $student->name = $request->name;
        $student->egn = $request->egn;
        $student->dateOfBirth = $request->dateOfBirth;
        $student->citizenship = $request->citizenship;
        $student->school = $request->school;
        $student->cityAndCountry = $request->cityAndCountry;
        $student->registerNumber = $request->registerNumber;
        $student->dateOut = $request->dateOut;
        $student->documentNumber = $request->documentNumber;
        $student->documentDate = $request->documentDate;
        $student->inNumber = $request->inNumber;
        $student->inDate = $request->inDate;
        $student->admits = $request->admits;
        $student->profession = $request->profession;
        $student->speciality = $request->speciality;
        $student->equivalenceExams = json_encode($request->equivalenceExams);
        $student->grades = json_encode($request->grades);

        try {
            $student->save();
        } catch(\Exception $e) {
            $errorCode = $e->errorInfo[1];
            
            if($errorCode == 1062){
                return response()->json([
                    'message'=>'Вече е въведен ученик с това ЕГН!'
                ], 409);
            }
        }

        return response()->json(['message' => 'Created']);
    }

    public function destroy($id) {
        $student = StudentSecondary::find($id);

        $student->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function edit(Request $request, $id) {
        $student = StudentSecondary::find($id);

        $student->name = $request->name;
        $student->egn = $request->egn;
        $student->dateOfBirth = $request->dateOfBirth;
        $student->citizenship = $request->citizenship;
        $student->school = $request->school;
        $student->cityAndCountry = $request->cityAndCountry;
        $student->registerNumber = $request->registerNumber;
        $student->dateOut = $request->dateOut;
        $student->documentNumber = $request->documentNumber;
        $student->documentDate = $request->documentDate;
        $student->inNumber = $request->inNumber;
        $student->inDate = $request->inDate;
        $student->admits = $request->admits;
        $student->profession = $request->profession;
        $student->speciality = $request->speciality;
        $student->equivalenceExams = json_encode($request->equivalenceExams);
        $student->grades = json_encode($request->grades);

        try {
            $student->save();
        } catch(\Exception $e) {
            $errorCode = $e->errorInfo[1];
            
            if($errorCode == 1062){
                return response()->json([
                    'message'=>'Вече е въведен ученик с това ЕГН!'
                ], 409);
            }
        }

        return response()->json(['message' => 'Edited']);
    }

    public function certificates(Request $request) {
        if($request->has('startDate') && $request->has('endDate')) {
            $from = $request->query('startDate');
            $to = $request->query('endDate');
            return StudentSecondary::whereBetween('dateOut', [$from, $to])->get();
        }

        return StudentSecondary::all();
    }

    public function getById($id) {
        return StudentSecondary::findOrFail($id);
    }
}
