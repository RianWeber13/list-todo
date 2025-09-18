// web/src/services/taskService.js

const API_URL = 'http://localhost:8000/api';

/**
 * Função para buscar TODAS as tarefas da API.
 */
export async function getAllTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Erro ao buscar tarefas da API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha em getAllTasks:", error);
    return [];
  }
}

/**
 * Função para CRIAR uma nova tarefa na API.
 * @param {object} taskData - Os dados da nova tarefa, ex: { title: 'Comprar pão' }
 */
export async function createTask(taskData) {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar a tarefa');
    }
    const newTask = await response.json();
    return newTask;

  } catch (error) {
    console.error("Falha em createTask:", error);
    return null;
  }
}

/**
 * Função para ATUALIZAR uma tarefa existente.
 * @param {number} taskId - O ID da tarefa a ser atualizada.
 * @param {object} taskData - Os novos dados da tarefa, ex: { completed: true }
 */
export async function updateTask(taskId, taskData) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar a tarefa');
    }
    const updatedTask = await response.json();
    return updatedTask;

  } catch (error) {
    console.error("Falha em updateTask:", error);
    return null;
  }
}

/**
 * Função para DELETAR uma tarefa.
 * @param {number} taskId - O ID da tarefa a ser deletada.
 */
export async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar a tarefa');
    }
    return true; // Retorna sucesso

  } catch (error) {
    console.error("Falha em deleteTask:", error);
    return false; // Retorna falha
  }
}