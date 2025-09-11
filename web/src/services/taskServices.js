// web/src/services/taskService.js

// A URL base da nossa API Laravel.
const API_URL = 'http://localhost:8000/api';

/**
 * Função para buscar todas as tarefas da API.
 * Ela é 'exportada' para que outros arquivos possam usá-la.
 */
export async function getAllTasks() {
  try {
    // Faz a chamada GET para o endpoint /tasks
    const response = await fetch(`${API_URL}/tasks`);

    // Se a resposta não for um sucesso (ex: erro 500), lança um erro.
    if (!response.ok) {
      throw new Error('Erro ao buscar tarefas da API');
    }

    const data = await response.json();
    return data; // Retorna a lista de tarefas

  } catch (error) {
    console.error("Falha em getAllTasks:", error);
    // Em caso de erro, retorna uma lista vazia para não quebrar a aplicação.
    return [];
  }
}

/**
 * No futuro, adicionaremos mais funções aqui para interagir com a API.
 * Por exemplo:
 *
 * export async function createTask(taskData) { ... }
 * export async function deleteTask(taskId) { ... }
 *
 */