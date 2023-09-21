<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    ProtocolMps,
    Mps,
    CommitteEducation
};

class ProtocolMpsController extends Controller
{
    public function index(Request $request) {
        $protocols = ProtocolMps::with('applications');

        $perPage = $request->query('per_page');

        if($request->has('number')) {
            $protocols->where('number', 'regexp', $request->query('number'));
        }

        if($request->has('startDate') && $request->has('endDate')) {
            $from = $request->query('startDate');
            $to = $request->query('endDate');
            $protocols->whereBetween('date', [$from, $to]);
        }
          
        return $protocols->paginate($perPage);
    }

    public function store(Request $request) {
        $protocol = new ProtocolMps();
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

            if(Mps::whereNull('protocol_id')->whereBetween('date', [$from, $to])->count() == 0) {
                return response()->json([
                    'message'=>"Няма налични заявления между $fromDate и $toDate!"
                ], 409);
            }

            $protocol->save();
            Mps::whereNull('protocol_id')->whereBetween('date', [$request->startDate, $request->endDate])->update(['protocol_id' => $protocol->id]);
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
        $protocol = ProtocolMps::findOrFail($id);

        $protocol->applications()->update(['protocol_id' => null]);
        $protocol->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function getById($id) {
        $protocol = ProtocolMps::findOrFail($id);

        return $protocol;
    }

    public function edit(Request $request, $id) {
        $protocol = ProtocolMps::findOrFail($id);

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
            Mps::where('protocol_id', $id)->update(['protocol_id' => null]);
            Mps::whereNull('protocol_id')->whereBetween('date', [$request->startDate, $request->endDate])->update(['protocol_id' => $protocol->id]);
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
