<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Apenas retorna todas as tarefas.
        return Task::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valida os dados que chegam.
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'task_date' => 'required|date',
        ]);

        // Cria a tarefa no banco de dados.
        $task = Task::create($validatedData);

        // Retorna a tarefa recém-criada com o status 201.
        return response()->json($task, 201);
    }

    // Deixaremos os outros métodos para depois.
}