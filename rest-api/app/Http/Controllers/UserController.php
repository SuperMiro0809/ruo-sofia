<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use Validator;

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

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
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

    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    public function userProfile() {
        return response()->json(auth()->user());
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            // 'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
