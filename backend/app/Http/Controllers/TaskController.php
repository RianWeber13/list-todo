<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Receita para listar todas as tarefas.
     * Associada à rota: GET /api/tasks
     */
    public function index()
    {
        // Pega todas as tarefas do banco de dados, ordenadas pela mais recente.
        return Task::latest()->get();
    }

    /**
     * Receita para criar e salvar uma nova tarefa.
     * Associada à rota: POST /api/tasks
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task = Task::create($validatedData);

        return response()->json($task, 201); // 201 = "Created" (Criado com sucesso)
    }

    /**
     * Receita para mostrar uma única tarefa.
     * Associada à rota: GET /api/tasks/{task}
     */
    public function show(Task $task)
    {
        // O Laravel magicamente já busca a tarefa pelo ID da URL para nós!
        // Isso se chama "Route-Model Binding".
        return $task;
    }

    /**
     * Receita para atualizar uma tarefa existente.
     * Associada à rota: PUT /api/tasks/{task}
     */
    public function update(Request $request, Task $task)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'sometimes|boolean',
        ]);

        // O Laravel já encontrou a tarefa, agora só precisamos atualizá-la.
        $task->update($validatedData);

        return response()->json($task);
    }

    /**
     * Receita para deletar uma tarefa.
     * Associada à rota: DELETE /api/tasks/{task}
     */
    public function destroy(Task $task)
    {
        // O Laravel já encontrou a tarefa, agora só precisamos deletá-la.
        $task->delete();

        // Retorna uma resposta vazia com o status 204 "No Content".
        // É a forma padrão de dizer "Deletado com sucesso".
        return response(null, 204);
    }
}