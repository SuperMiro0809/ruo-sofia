<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Teacher;
use App\Models\Application;
use App\Models\Teaching;
use App\Models\Report;
use App\Models\Publication;

class TeacherController extends Controller
{
    public function index() {
        $teachers = Teacher::all();
        $teachers1 = DB::table('teachers')
            ->join('applications', 'teachers.id', '=', 'applications.teacher_id')
            ->get();

        foreach ($teachers as $t) {
            $t->application;
        }

        return $teachers;
    }

    public function store(Request $request) {
        $teacher = new Teacher();

        $applications = [];
        $teacher->dateOfBirth = $request->dateOfBirth;
        $teacher->firstName = $request->firstName;
        $teacher->middleName = $request->middleName;
        $teacher->lastName = $request->lastName;
        $teacher->application()->attach($applications);

        $teacher->save();

        return response()->json(['message' => 'Created']);
    }

    public function teacher($egn) {
        $teacher = Teacher::where('egn', $egn)->get();
        foreach ($teacher as $t) {
            $t->application;
        }
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

            foreach($request->teaching as $thc=>$val) {
                $teaching = new Teaching();
                $teaching->institution = $val["institution"];
                $teaching->eik = $val["eik"];
                $teaching->startDate = $val["startDate"];
                $teaching->endDate = $val["endDate"];
                $teaching->lessonHours = $val["lessonHours"];
                $teaching->theme = $val["theme"];
                $teaching->teacher_id = $request->teacherId;
                $teaching->application_id = $application_id;

                $teaching->save();
            }

            foreach($request->report as $rep=>$val) {
                $report = new Report();
                $report->institution = $val["institution"];
                $report->startDate = $val["startDate"];
                $report->endDate = $val["endDate"];
                $report->lessonHours = $val["lessonHours"];
                $report->theme = $val["theme"];
                $report->teacher_id = $request->teacherId;
                $report->application_id = $application_id;

                $report->save();
            }

            foreach($request->publication as $publ=>$val) {
                $publication = new Publication();
                $publication->institution = $val["institution"];
                $publication->startDate = $val["startDate"];
                $publication->endDate = $val["endDate"];
                $publication->theme = $val["theme"];
                $publication->published = $val["published"];
                $publication->teacher_id = $request->teacherId;
                $publication->application_id = $application_id;

                $publication->save();
            }

            $teacher->save();
        }else {
            // $teacher = new Teacher();
            // $teacher->egn = $request->egn;
            // $teacher->firstName = $request->teacher["firstName"];
            // $teacher->middleName = $request->teacher["middleName"];
            // $teacher->lastName = $request->teacher["lastName"];
            // $teacher->application()->attach([]);

            // $teacher->save();
            // $application->teacher_id = $teacher->id;

            // $application->save();
            // $application_id = $application->id;
            // $teacher->application()->attach($application_id);
            // $teacher->save();
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

    public function edit(Request $request, $id) {
        $teacher = Teacher::findOrFail($id);

        $teacher->egn = $request->egn;
        $teacher->firstName = $request->firstName;
        $teacher->middleName = $request->middleName;
        $teacher->lastName = $request->lastName;

        $teacher->save();

        return response()->json(['message' => 'Edited']);
    }
}
