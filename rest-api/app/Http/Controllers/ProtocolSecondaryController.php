<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\CommitteEducation;
use App\Models\StudentSecondary;
use App\Models\ProtocolSecondary;

class ProtocolSecondaryController extends Controller
{
    public function index(Request $request) {
        $number = $request->query('number', '');
        $protocols = ProtocolSecondary::where('number', 'regexp', $number)->with('application');

        if($request->has('startDate') && $request->has('endDate')) {
            $from = $request->query('startDate');
            $to = $request->query('endDate');
            $protocols->whereBetween('date', [$from, $to]);
        }
          
        return $protocols->get();
    }

    public function store(Request $request) {
        $protocol = new ProtocolSecondary();
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
            $protocol->save();

            StudentSecondary::whereNull('protocol_id')->whereBetween('dateOut', [$request->startDate, $request->endDate])->update(['protocol_id' => $protocol->id]);
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
        $protocol = ProtocolSecondary::findOrFail($id);

        $protocol->application()->update(['protocol_id' => null]);
        $protocol->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function getById($id) {
        $protocol = ProtocolSecondary::findOrFail($id);

        return $protocol;
    }

    public function edit(Request $request, $id) {
        $protocol = ProtocolSecondary::findOrFail($id);

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
            StudentSecondary::where('protocol_id', $id)->update(['protocol_id' => null]);
            StudentSecondary::whereNull('protocol_id')->whereBetween('dateOut', [$request->startDate, $request->endDate])->update(['protocol_id' => $protocol->id]);
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
