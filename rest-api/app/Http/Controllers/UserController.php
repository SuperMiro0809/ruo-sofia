<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index() {
        $users = User::all();
        return $users;
    }

    public function store(Request $request) {
        $user = new User();

        $user->name = $request->name;
        $user->password = $request->password;
        $user->role = $request->role;
        $user->email = $request->email;

        $user->save();
        return 'Creaed!';
    }

    public function destroy() {

    }
}
