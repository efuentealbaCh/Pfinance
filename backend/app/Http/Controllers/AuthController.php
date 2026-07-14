<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Registrar un nuevo usuario.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario registrado exitosamente.',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    /**
     * Iniciar sesión y obtener token.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Credenciales incorrectas.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso.',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    /**
     * Obtener el usuario autenticado.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Cerrar sesión (revocar token actual).
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada exitosamente.',
        ]);
    }

    /**
     * Actualizar nombre y email del usuario.
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $request->user()->id,
        ], [
            'name.required'  => 'El nombre es obligatorio.',
            'email.required' => 'El correo es obligatorio.',
            'email.email'    => 'El correo debe ser válido.',
            'email.unique'   => 'Ese correo ya está en uso.',
        ]);

        $request->user()->update($request->only('name', 'email'));

        return response()->json([
            'message' => 'Perfil actualizado exitosamente.',
            'user'    => $request->user(),
        ]);
    }

    /**
     * Cambiar contraseña.
     */
    public function changePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => 'required',
            'new_password'     => 'required|string|min:8|confirmed',
        ], [
            'current_password.required' => 'La contraseña actual es obligatoria.',
            'new_password.required'     => 'La nueva contraseña es obligatoria.',
            'new_password.min'          => 'La nueva contraseña debe tener al menos 8 caracteres.',
            'new_password.confirmed'    => 'Las contraseñas no coinciden.',
        ]);

        if (!Hash::check($request->current_password, $request->user()->password)) {
            return response()->json([
                'message' => 'La contraseña actual es incorrecta.',
            ], 422);
        }

        $request->user()->update([
            'password' => Hash::make($request->new_password),
        ]);

        return response()->json([
            'message' => 'Contraseña actualizada exitosamente.',
        ]);
    }
}
