<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
        return 'Потребителят е добавен успешно!';
    }

    public function customLogin(Request $request)
    {
        // $request->validate([
        //     'email' => 'required',
        //     'password' => 'required',
        // ]);
   
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return response('Success', 200);
        }
  
        return response('Грешен имейл или парола', 401);
    }

    public function destroy($id) {
        $user = User::findOrFail($id);
        $user->delete();

        $users = User::all();
        $res = [
            'users' => $users,
            'text' => 'Потребителят е изтрит успешно!'
        ];

        return $res;
    }
}
