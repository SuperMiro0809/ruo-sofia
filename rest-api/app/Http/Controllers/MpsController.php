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
            $query->where('firstName', 'LIKE', '%'.request()->query('name').'%')
                    ->orWhere('middleName', 'LIKE', '%'.request()->query('name').'%')
                    ->orWhere('lastName', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->query('egn')) {
            $query->where('egn', 'LIKE', '%'.request()->query('egn').'%');
        }

        if(request()->query('date')) {
            $query->where('date', request()->query('date'));
        }

        return $query->paginate($perPage);
    }

    public function store(Request $request) {
        $validator = validator($request->only('egn'), 
            [
                'egn' => 'required|string|max:10|unique:mps'
            ],
            [
                'egn' => 'ЕГН-то вече е въведено',
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $mps = Mps::create([
            'firstName' => $request->firstName,
            'middleName' => $request->middleName,
            'lastName' => $request->lastName,
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
        //
    }

    public function delete($id) {
        //
    }

    public function getById($id) {
        //
    }
}
