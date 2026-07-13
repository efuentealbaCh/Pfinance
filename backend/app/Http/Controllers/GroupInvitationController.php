<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GroupInvitationController extends Controller
{
    public function pending(Request $request): JsonResponse
    {
        // Get groups where the user has a 'pending' status
        $pendingGroups = $request->user()->groups()->wherePivot('status', 'pending')->get();
        return response()->json($pendingGroups);
    }

    public function invite(Request $request, string $groupId): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        $group = $request->user()->groups()->findOrFail($groupId);

        $invitee = User::where('email', $request->email)->firstOrFail();

        // Check if already in group
        if ($group->users()->where('user_id', $invitee->id)->exists()) {
            return response()->json(['message' => 'El usuario ya pertenece al grupo o tiene una invitación pendiente.'], 400);
        }

        $group->users()->attach($invitee->id, [
            'status' => 'pending',
            'role' => 'member'
        ]);

        return response()->json(['message' => 'Invitación enviada dentro de la aplicación.']);
    }

    public function accept(Request $request, string $groupId): JsonResponse
    {
        $group = Group::findOrFail($groupId);

        $pivot = $group->users()->where('user_id', $request->user()->id)->first();

        if (!$pivot) {
            return response()->json(['message' => 'No invitation found.'], 404);
        }

        $group->users()->updateExistingPivot($request->user()->id, ['status' => 'accepted']);

        return response()->json(['message' => 'Invitation accepted.']);
    }

    public function reject(Request $request, string $groupId): JsonResponse
    {
        $group = Group::findOrFail($groupId);
        $group->users()->detach($request->user()->id);

        return response()->json(['message' => 'Invitación rechazada.']);
    }
}
