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
    public function index(Request $request) {
        $protocols = Protocol::with('application')
            ->with('application.teacher')
            ->with('application.teaching')
            ->with('application.report')
            ->with('application.publication');

        if($request->has('startDate') && $request->has('endDate')) {
            $from = $request->query('startDate');
            $to = $request->query('endDate');
            $protocols->whereBetween('date', [$from, $to]);
        }

        if($request->has('number')) {
            $protocols->where('number', 'regexp', $request->query('number'));
        }

        if($request->has('per_page')) {
            $perPage = (int) $request->query('per_page');
            return $protocols->paginate($perPage);
        }else {
            return $protocols->get();
        }

    }

    public function store(Request $request) {
        $protocol = new Protocol();
        $protocol->number = $request->number;
        $protocol->date = $request->date;
        $protocol->about = $request->about;
        $protocol->president = $request->president;
        $protocol->members = json_encode($request->members);

        try {
            $protocol->save();
        } catch(\Exception $e) {
            $errorCode = $e->errorInfo[1];
            
            if($errorCode == 1062){
                return response()->json([
                    'message'=>'Вече е въведен протокол с този номер!'
                ], 409);
            }
        }

        foreach ($request->applications as $appl=>$appl_value) {
            $application = Application::findOrFail($appl_value["application"]);
            $application->ruoNumberOut = $appl_value["ruoNumberOut"];
            $application->dateOut = $appl_value["dateOut"];
            $application->inProtocol = true;
            $application->protocol_id = $protocol->id;

            try {
                $application->save();
            } catch(\Exception $e) {
                $errorCode = $e->errorInfo[1];
                
                if($errorCode == 1062){
                    $time = strtotime($application->date);
                    $applDate = date("d.m.Y", $time);
                    return response()->json([
                        'message'=> "Заявление $application->ruoNumber/$applDate - изходящият номер вече е въведен!"
                    ], 409);
                }
            }

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

        return response()->json(['message' => 'Created']);
    }

    public function destroy($id) {
        $protocol = Protocol::findOrFail($id);
        $applications = Application::where('protocol_id', $protocol->id)->get();
        
        foreach ($applications as $application) {
            $application->inProtocol = false;
            $application->protocol_id = null;

            $application->teaching->each(function($teaching) {
                $teaching->approve = null;
                $teaching->notApprove = null;
                $teaching->credits = null;

                $teaching->save();
            });
            $application->report->each(function($report) {
                $report->approve = null;
                $report->notApprove = null;
                $report->credits = null;

                $report->save();
            });
            $application->publication->each(function($publication) {
                $publication->approve = null;
                $publication->notApprove = null;
                $publication->credits = null;

                $publication->save();
            });

            $application->save();
        }

        $protocol->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function edit(Request $request, $id) {
        $protocol = Protocol::findOrFail($id);
        $protocol->number = $request->number;
        $protocol->date = $request->date;
        $protocol->about = $request->about;
        $protocol->president = $request->president;
        $protocol->members = json_encode($request->members);

        foreach ($request->applications as $appl=>$appl_value) {
            $application = Application::findOrFail($appl_value["application"]);
            $application->ruoNumberOut = $appl_value["ruoNumberOut"];
            $application->dateOut = $appl_value["dateOut"];

            try {
                $application->save();
            } catch(\Exception $e) {
                $errorCode = $e->errorInfo[1];
                
                if($errorCode == 1062){
                    $time = strtotime($application->date);
                    $applDate = date("d.m.Y", $time);
                    return response()->json([
                        'message'=> "Заявление $application->ruoNumber/$applDate - изходящият номер вече е въведен!"
                    ], 409);
                }
            }

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

        try {
            $protocol->save();
        } catch(\Exception $e) {
            $errorCode = $e->errorInfo[1];
            
            if($errorCode == 1062){
                return response()->json([
                    'message'=>'Вече е въведен протокол с този номер!'
                ], 409);
            }
        }

        return response()->json(['message' => 'Edited']);
    }
}
