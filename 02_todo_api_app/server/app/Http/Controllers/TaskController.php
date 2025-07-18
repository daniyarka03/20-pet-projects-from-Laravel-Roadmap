<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "status" => "required|string",
            "due_date" => "date",
            "description" => "string"
        ]);

        $task = Task::create([
            "name" => $request->name,
            "status" => $request->status,
            "description" => $request->description,
            "due_date" => $request->due_date
        ]);

        return response()->json([
            "message" => "Successfully created new task",
            $task
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Task::find($id);
        return response()->json(["message" => $task], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = Task::find($id);
        $validateData = $request->validate([
            "name" => "string",
            "status" => "string",
            "due_date" => "date",
            "description" => "string"
        ]);
        $task->update($validateData);
        return response()->json(["message" => "Task updated successfully"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(["message" => "Task not found"], 404);
        }

        $task->delete();
        return response()->json(["message" => "Task deleted successfully"], 200);
    }
}
