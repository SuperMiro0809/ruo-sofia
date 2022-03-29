<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\CommitteEducation;
use App\Models\StudentClassApplication;
use App\Models\ProtocolClass;

class ProtocolClassController extends Controller
{
    public function index(Request $request) {
        $protocols = ProtocolClass::with('application')
                        ->with('application.student');

        if($request->has('number')) {
            $protocols->where('number', 'regexp', $request->query('number'));
        }

        if($request->has('startDate') && $request->has('endDate')) {
            $from = $request->query('startDate');
            $to = $request->query('endDate');
            $protocols->whereBetween('date', [$from, $to]);
        }
          
        return $protocols->get();
    }

    public function store(Request $request) {
        $protocol = new ProtocolClass();
        $committe = CommitteEducation::findOrFail(1);

        $protocol->number = $request->number;
        $protocol->date = $request->date;
        $protocol->orderNumber = $request->orderNumber;
        $protocol->orderDate = $request->orderDate;
        $protocol->startDate = $request->startDate;
        $protocol->endDate = $request->endDate;
        $protocol->president = $request->president;
        $protocol->vicePresidents = json_encode($request->vicePresidents);
        $protocol->members = json_encode($request->members);

        $committe->president = $request->president;
        $committe->vicePresidents = json_encode($request->vicePresidents);
        $committe->members = json_encode($request->members);
        $committe->save();

        try {
            $from = $request->startDate;
            $to = $request->endDate;
            $fromTime = strtotime($from);
            $toTime = strtotime($to);
            $fromDate = date("d.m.Y", $fromTime);
            $toDate = date("d.m.Y", $toTime);

            if(StudentClassApplication::whereNull('protocol_id')->whereBetween('dateOut', [$from, $to])->count() == 0) {
                return response()->json([
                    'message'=>"Няма налични заявления между $fromDate и $toDate!"
                ], 409);
            }

            $protocol->save();
            StudentClassApplication::whereNull('protocol_id')->whereBetween('dateOut', [$request->startDate, $request->endDate])->update(['protocol_id' => $protocol->id]);
        } catch(\Exception $e) {
            $errorCode = $e->errorInfo[1];
            
            if($errorCode == 1062){
                return response()->json([
                    'message'=>'Вече е въведен протокол с този номер!'
                ], 409);
            }
        }

        return response()->json(['message' => 'Created']);
    }

    public function destroy($id) {
        $protocol = ProtocolClass::findOrFail($id);

        $protocol->application()->update(['protocol_id' => null]);
        $protocol->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function getById($id) {
        $protocol = ProtocolClass::findOrFail($id);

        return $protocol;
    }

    public function edit(Request $request, $id) {
        $protocol = ProtocolClass::findOrFail($id);

        $protocol->number = $request->number;
        $protocol->date = $request->date;
        $protocol->orderNumber = $request->orderNumber;
        $protocol->orderDate = $request->orderDate;
        $protocol->startDate = $request->startDate;
        $protocol->endDate = $request->endDate;
        $protocol->president = $request->president;
        $protocol->vicePresidents = json_encode($request->vicePresidents);
        $protocol->members = json_encode($request->members);

        try {
            $protocol->save();
            StudentClassApplication::where('protocol_id', $id)->update(['protocol_id' => null]);
            StudentClassApplication::whereNull('protocol_id')->whereBetween('dateOut', [$request->startDate, $request->endDate])->update(['protocol_id' => $protocol->id]);
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
