<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GroupController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $groups = $request->user()->groups()->withCount('users')->get();
        return response()->json($groups);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $group = Group::create([
            'name' => $request->name,
            'description' => $request->description,
            'created_by' => $request->user()->id
        ]);

        // Add creator as admin/accepted
        $group->users()->attach($request->user()->id, [
            'status' => 'accepted',
            'role' => 'admin'
        ]);

        return response()->json($group, 201);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        // Must belong to the group
        $group = $request->user()->groups()->with(['users', 'sharedDebts.splits.user', 'sharedDebts.creator'])->findOrFail($id);
        
        return response()->json($group);
    }

    public function removeMember(Request $request, string $groupId, string $userId): JsonResponse
    {
        $group = $request->user()->groups()->wherePivot('role', 'admin')->findOrFail($groupId);

        if ($group->created_by == $userId) {
            return response()->json(['message' => 'No puedes eliminar al creador del grupo.'], 403);
        }

        $group->users()->detach($userId);

        return response()->json(['message' => 'Miembro eliminado correctamente.']);
    }
}
