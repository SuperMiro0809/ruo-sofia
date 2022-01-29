<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Protocol;
use App\Models\Application;
use App\Models\Teaching;
use App\Models\Report;
use App\Models\Publication;

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
            $application->ruoNumberOut = $appl_value["ruoNumberOut"];
            $application->dateOut = $appl_value["dateOut"];
            $application->inProtocol = true;
            
            $application->save();
            $id = $application->id;
            $ids[] = $id;

            foreach($appl_value["teachings"] as $th=>$th_val) {
                $th_id = $th_val["id"];
                $teaching = Teaching::find($th_id);
                $teaching->approve = $th_val["approve"];
                $teaching->notApprove = $th_val["notApprove"];
                $teaching->credits = $th_val["credits"];

                $teaching->save();
            }

            foreach($appl_value["reports"] as $rp=>$rp_val) {
                $rp_id = $rp_val["id"];
                $report = Report::find($rp_id);
                $report->approve = $rp_val["approve"];
                $report->notApprove = $rp_val["notApprove"];
                $report->credits = $rp_val["credits"];

                $report->save();
            }

            foreach($appl_value["publications"] as $pbl=>$pbl_val) {
                $pbl_id = $pbl_val["id"];
                $publication = Publication::find($pbl_id);
                $publication->approve = $pbl_val["approve"];
                $publication->notApprove = $pbl_val["notApprove"];
                $publication->credits = $pbl_val["credits"];

                $publication->save();
            }
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
