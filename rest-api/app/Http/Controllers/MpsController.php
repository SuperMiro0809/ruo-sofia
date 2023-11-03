<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mps;

class MpsController extends Controller
{
    public function index() {
        $query = Mps::select('mps.*');
        $perPage = request()->query('per_page');

        if(request()->query('name')) {
            $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->query('egn')) {
            $query->where('egn', 'LIKE', '%'.request()->query('egn').'%');
        }

        if(request()->query('date')) {
            $query->where('date', request()->query('date'));
        }

        return $query->paginate($perPage);
    }

    public function certificates() {
        $query = Mps::select('mps.*');
        $perPage = request()->query('per_page');

        if(request()->query('name')) {
            $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->query('egn')) {
            $query->where('egn', 'LIKE', '%'.request()->query('egn').'%');
        }

        $query->whereNotNull('protocol_id')->with('protocol');

        return $query->paginate($perPage);
    }

    public function store(Request $request) {
        $validator = validator($request->only('egn'), 
            [
                'egn' => 'required|string|max:10|unique:mps'
            ],
            [
                'egn.unique' => 'ЕГН-то вече е въведено',
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $mps = Mps::create([
            'name' => $request->name,
            'egn' => $request->egn,
            'dateOfBirth' => $request->dateOfBirth,
            'citizenship' => $request->citizenship,
            'documentNumber' => $request->documentNumber,
            'documentDate' => $request->documentDate,
            'school' => $request->school,
            'city' => $request->city,
            'country' => $request->country,
            'class' => $request->class,
            'number' => $request->number,
            'date' => $request->date
        ]);

        return $mps;
    }

    public function edit(Request $request, $id) {
        $mps = Mps::findOrFail($id);

        $validator = validator($request->only('egn'), 
            [
                'egn' => 'required|string|max:10|unique:mps,egn,' . $id
            ],
            [
                'egn.unique' => 'ЕГН-то вече е въведено',
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $mps->update([
            'name' => $request->name,
            'egn' => $request->egn,
            'dateOfBirth' => $request->dateOfBirth,
            'citizenship' => $request->citizenship,
            'documentNumber' => $request->documentNumber,
            'documentDate' => $request->documentDate,
            'school' => $request->school,
            'city' => $request->city,
            'country' => $request->country,
            'class' => $request->class,
            'number' => $request->number,
            'date' => $request->date
        ]);

        return $mps;
    }

    public function destroy($id) {
        $mps = Mps::findOrFail($id);

        $mps->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function getById($id) {
        $mps = Mps::findOrFail($id);

        return $mps;
    }
}
