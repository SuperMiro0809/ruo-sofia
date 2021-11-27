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
        }
        return $protocols;
    }

    public function store(Request $request) {
        $protocol = new Protocol();
        $ids = [];

        foreach ($request->applications as $appl=>$appl_value) {
            $application = new Application();

            $application->number = $appl_value["number"];
            $application->ruoNumber = $appl_value["ruoNumber"];
            $application->firstName = $appl_value["firstName"];
            $application->middleName = $appl_value["middleName"];
            $application->lastName = $appl_value["lastName"];
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
        $protocol->applications()->attach($ids);

        $protocol->save();

        return response()->json(['message' => 'Created']);
    }
}
