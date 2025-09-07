<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// --- NOSSO CARDÁPIO PARA TAREFAS ---

// GET /api/tasks  -> Rota para LER TODAS as tarefas.
Route::get('/tasks', [TaskController::class, 'index']);

// POST /api/tasks -> Rota para CRIAR uma nova tarefa.
Route::post('/tasks', [TaskController::class, 'store']);

// GET /api/tasks/{task} -> Rota para LER UMA tarefa específica.
Route::get('/tasks/{task}', [TaskController::class, 'show']);

// PUT /api/tasks/{task} -> Rota para ATUALIZAR uma tarefa existente.
Route::put('/tasks/{task}', [TaskController::class, 'update']);

// DELETE /api/tasks/{task} -> Rota para DELETAR uma tarefa.
Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);