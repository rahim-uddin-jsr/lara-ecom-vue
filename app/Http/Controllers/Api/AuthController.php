<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credential = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (!Auth::attempt($credential, true)) {
            return response()->json([
                'error' => 'The provided credential is not correct'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json([
            'massage' => 'user login successfully',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function register(RegisterRequest $request)
    {
        try {
            // Create the user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Generate a token for the user
            $token = $user->createToken('authToken')->plainTextToken;

            // Return a success response
            return response()->json([
                'message' => 'User created successfully',
                'user' => $user,
                'token' => $token,
            ], 201);
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Error creating user: ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'message' => 'Failed to create user',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
