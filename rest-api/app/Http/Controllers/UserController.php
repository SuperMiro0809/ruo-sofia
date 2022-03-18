<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Rules\MatchOldPassword;
use JWTAuth;
use Validator;

class UserController extends Controller
{
    public function index(Request $request) {
        $name = $request->query('name', '');
        $email = $request->query('email', '');
        $role = $request->query('role', '');

        $users = User::select('*')
            ->where('name', 'regexp', $name)
            ->where('email', 'regexp', $email)
            ->where('role','regexp', $role)
            ->get();
        
        return $users;
    }

    public function store(Request $request) {
        $user = new User();

        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->role = $request->role;
        $user->email = $request->email;

        $user->save();
        return response()->json(['message' => 'Потребителят е добавен успешно!']);
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

        return response()->json(['message' => 'Потребителят е редактиран успешно!', 'user' => $user]);
    }

    public function changePassword(Request $request, $id) {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'oldPassword' => ['required', new MatchOldPassword],
            'newPassword' => 'required',
            'repeatNewPassword' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if($request->oldPassword == $request->newPassword) {
            return response()->json(['oldPassword' => 'Старата парола съвпада с новата!'], 422);
        }

        if($request->repeatNewPassword != $request->newPassword) {
            return response()->json(['oldPassword' => 'Повторената парола не съвпада!'], 422); 
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();
        auth()->logout();

        return response()->json(['message' => 'Password changed']);
    }

    public function uploadAvatar(Request $request) {
        //$path = $request->file('avatar')->store('avatars', ['disc' => 'public']);
        $path = $request->file('avatar')->store('public/avatars');
        $pieces = explode("/", $path);
        $filename = $pieces[count($pieces) - 1];

        $userId = auth()->user()->id;
        $user = User::findOrFail($userId);
        if ($user->avatar) {
            //Storage::delete('/avatars/' . $user->avatar);
            Storage::delete('/public/avatars/' . $user->avatar);
        }

        $user->avatar = $filename;

        $user->save();
        return response()->json(['message' => 'Successfully uploaded!', 'path' => $filename, 'user' => $user]);
    }

    public function deleteAvatar() {
        $userId = auth()->user()->id;
        $user = User::findOrFail($userId);
        //Storage::delete('/avatars/' . $user->avatar);
        Storage::delete('/public/avatars/' . $user->avatar);
        $user->avatar = '';
        $user->save();

        return response()->json(['message' => 'Successfully deleted!', 'user' => $user]);
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
