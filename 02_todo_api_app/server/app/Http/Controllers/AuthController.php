<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|string|email|max:255|unique:users",
            "password" => "required|string|min:8|max:90"
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json([
            'token' => $user->createToken('API Token')->accessToken,
            'user' => $user
        ], 201);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        return response()->json([
            'token' => $user->createToken('API Token')->accessToken,
            'user' => $user
        ]);
    }

    public function user() {
        return response()->json(Auth::user());
    }

    public function logout(Request $request) {
        $request->user()->token()->revoke();

        return response()->json([
            'message' => "Successfully logged out"
        ]);    
    }
}


