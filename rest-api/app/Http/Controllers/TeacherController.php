<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Models\Teacher;
use App\Models\Application;
use App\Models\Teaching;
use App\Models\Report;
use App\Models\Publication;

class TeacherController extends Controller
{
    public function index(Request $request) {
        $teachers = Teacher::with('application')
                        ->with('application.teaching')
                        ->with('application.report')
                        ->with('application.publication');
        
        if($request->has('fullName')) {
            $teachers->where(DB::raw("CONCAT(firstName,' ',middleName,' ',lastName)"), 'regexp', $request->query('fullName'));
        }

        if($request->has('per_page')) {
            $perPage = (int) $request->query('per_page');
            return $teachers->paginate($perPage);
        }else if($request->has('applications')) {
            return $teachers->get();
        }else {
            return Teacher::all();
        }
    }

    public function store(Request $request) {
        $teacher = new Teacher();

        $teacher->dateOfBirth = $request->dateOfBirth;
        $teacher->firstName = $request->firstName;
        $teacher->middleName = $request->middleName;
        $teacher->lastName = $request->lastName;

        $teacher->save();

        return response()->json(['message' => 'Created']);
    }

    public function getApplication($id) {
        $application_teachings = Application::find($id)->teaching;
        $application_reports = Application::find($id)->report;
        $application_publications = Application::find($id)->publication;

        return response()->json([
            "teachings" => $application_teachings,
            "reports" => $application_reports,
            "publications" => $application_publications
        ]);
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
            $teacher = Teacher::find($request->teacherId);

            $teacher->update([
                'adress' => $request->adress,
                'tel' => $request->tel,
                'workplace' => json_encode($request->workplace),
                'education' => json_encode($request->education),
                'diploma' => json_encode($request->diploma)
            ]);

            try {
                $application->save();
            } catch(\Exception $e) {
                $errorCode = $e->errorInfo[1];
                
                if($errorCode == 1062){
                    return response()->json([
                        'message'=>'Dublicate key'
                    ], 409);
                }
            }

            $application_id = $application->id;

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

            //$teacher->save();
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
        $applications = $teacher->application();

        foreach($applications->get() as $application) {
            if($application->inProtocol) {
                $time = strtotime($application->date);
                $applDate = date("d.m.Y", $time);
                return response()->json([
                    'message'=> "Заявление $application->ruoNumber/$applDate е част от протокол!"
                ], 409);
            }
            
            $application->teaching()->delete();
            $application->report()->delete();
            $application->publication()->delete();
        }

        $teacher->application()->delete();
        $teacher->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function edit(Request $request, $id) {
        $teacher = Teacher::findOrFail($id);

        $teacher->dateOfBirth = $request->dateOfBirth;
        $teacher->firstName = $request->firstName;
        $teacher->middleName = $request->middleName;
        $teacher->lastName = $request->lastName;

        $teacher->save();

        return response()->json(['message' => 'Edited']);
    }

    public function certificates(Request $request) {
        $from = date($request->query('startDate', '1999-01-01'));
        $to = date($request->query('endDate', '2300-01-01'));
        $certificates = [];

        $teachings = DB::table('teachers')
            ->join('applications', 'applications.teacher_id', '=', 'teachers.id')
            ->join('teachings', 'teachings.application_id', '=', 'applications.id')
            ->whereNull('teachings.notApprove')
            ->where('applications.inProtocol', '=', '1')
            ->whereBetween('applications.dateOut', [$from, $to])
            ->get();

        $reports = DB::table('teachers')
            ->join('applications', 'applications.teacher_id', '=', 'teachers.id')
            ->join('reports', 'reports.application_id', '=', 'applications.id')
            ->whereNull('reports.notApprove')
            ->where('applications.inProtocol', '=', '1')
            ->whereBetween('applications.dateOut', [$from, $to])
            ->get();

        $publications = DB::table('teachers')
            ->join('applications', 'applications.teacher_id', '=', 'teachers.id')
            ->join('publications', 'publications.application_id', '=', 'applications.id')
            ->whereNull('publications.notApprove')
            ->where('applications.inProtocol', '=', '1')
            ->whereBetween('applications.dateOut', [$from, $to])
            ->get();

        foreach($teachings as $teaching) {
            $certificates[] = $teaching;
        }
        foreach($reports as $report) {
            $certificates[] = $report;
        }
        foreach($publications as $publication) {
            $certificates[] = $publication;
        }
        
        return $certificates;
    }

    public function getById($id) {
        return Teacher::findOrFail($id);
    }
}
