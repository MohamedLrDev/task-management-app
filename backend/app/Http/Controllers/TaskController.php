<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Tasks::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'task_content' => 'required|string|max:255',
        ]);
    
        $task = Tasks::create($request->all());
        return $task; // The ID will be auto-assigned by the database
    }
    

    public function show($id)
    {
        return Tasks::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $task = Tasks::findOrFail($id);
        $task->update($request->only(['checked']));
        return $task;
    }
    
    public function destroy($id)
    {
        $task = Tasks::findOrFail($id);
        $task->delete();

        return response(null, 204);
    }
}
