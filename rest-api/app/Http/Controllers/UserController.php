<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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
        $user->password = Hash::make($request->password);
        $user->role = $request->role;
        $user->email = $request->email;

        $user->save();
        return 'Потребителят е добавен успешно!';
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:1',
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

    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    public function userProfile() {
        return response()->json(auth()->user());
    }

    public function editUser(Request $request, $id) {
        $user = User::findOrFail($id);

        $user->name = $request->name;
        $user->role = $request->role;
        $user->email = $request->email;

        $user->save();

        return response()->json(['message' => 'Потребителят е редактиран успешно!']);
    }

    public function uploadAvatar(Request $request) {
        $path = $request->file('avatar')->store('public/avatars');

        return response()->json(['message' => 'File Uploaded', 'path' => $path]);
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
