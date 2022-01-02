<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Protocol;
use App\Models\Application;

class ProtocolController extends Controller
{
    public function index() {
        $protocols = Protocol::all();

        foreach ($protocols as $p) {
            $p->application;
            foreach($p->application as $a) {
                $a->teacher;
            }
        }
        return $protocols;
    }

    public function store(Request $request) {
        $protocol = new Protocol();
        $ids = [];

        foreach ($request->applications as $appl=>$appl_value) {
            $application = Application::findOrFail($appl_value["application"]);

            // $application->number = $appl_value["number"];
            // $application->ruoNumber = $appl_value["ruoNumber"];
            // $application->firstName = $appl_value["firstName"];
            // $application->middleName = $appl_value["middleName"];
            // $application->lastName = $appl_value["lastName"];
            $application->approve = $appl_value["approve"];
            $application->notApprove = $appl_value["notApprove"];

            $application->save();
            $id = $application->id;
            $ids[] = $id;
        }

        $protocol->number = $request->number;
        $protocol->date = $request->date;
        $protocol->about = $request->about;
        $protocol->president = $request->president;
        $protocol->members = json_encode($request->members);
        $protocol->application()->attach($ids);

        $protocol->save();

        return response()->json(['message' => 'Created']);
    }

    public function destroy($id) {
        $protocol = Protocol::findOrFail($id);
        $applications = $protocol->applications['application_ids'];
        
        foreach ($applications as $aId) {
            $application = Application::findOrFail($aId);
            $application->delete();
        }

        $protocol->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
