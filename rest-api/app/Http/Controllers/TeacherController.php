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

    public function addApplication(Request $request) {
        $application = new Application();
        $application->adress = $request->adress;
        $application->tel = $request->tel;
        $application->ruoNumber = $request->ruoNumber;
        $application->date = $request->date;
        $application->workplace = json_encode($request->workplace);
        $application->education = json_encode($request->education);
        $application->diploma = json_encode($request->diploma);
        
        if (isset($request->teacherId)) {
            $application->teacher_id = $request->teacherId;
            $application->save();
            $application_id = $application->id;
            
            $teacher = Teacher::findOrFail($request->teacherId);
            $teacher->application()->attach($application_id);

            $teacher->save();
        }else {
            $teacher = new Teacher();
            $teacher->egn = $request->egn;
            $teacher->firstName = $request->teacher["firstName"];
            $teacher->middleName = $request->teacher["middleName"];
            $teacher->lastName = $request->teacher["lastName"];
            $teacher->application()->attach([]);

            $teacher->save();
            $application->teacher_id = $teacher->id;

            $application->save();
            $application_id = $application->id;
            $teacher->application()->attach($application_id);
            $teacher->save();
        }

        return response()->json(['message' => 'Created']);
    }

    public function destroy($id) {
        $teacher = Teacher::findOrFail($id);
        $applications = $teacher->applications['application_ids'];
        
        foreach ($applications as $aId) {
            $application = Application::findOrFail($aId);
            $application->delete();
        }

        $teacher->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
