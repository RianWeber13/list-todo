// web/src/components/TaskList.jsx

import React, { useState } from 'react';
import { createTask, deleteTask } from '../services/taskServices.js';

function TaskList({ tasksForDay, selectedDate, onTasksChange }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newTaskTitle.trim() === '') return;

    const taskData = {
      title: newTaskTitle,
      task_date: selectedDate.toISOString().split('T')[0],
    };

    const createdTask = await createTask(taskData);
    if (createdTask) {
      setNewTaskTitle('');
      onTasksChange();
    }
  };

  // Função para deletar a tarefa
  const handleDelete = async (taskId) => {
    if (window.confirm('Tem certeza que deseja apagar esta tarefa?')) {
      const success = await deleteTask(taskId);
      if (success) {
        onTasksChange(); // Avisa o App.jsx para atualizar a lista
      }
    }
  };

  return (
    <div className="task-list-wrapper">
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          className="add-task-input"
          placeholder="Adicionar tarefa..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
        <button 
          type="submit" 
          className="add-task-button"
          onClick={(e) => e.stopPropagation()}
        >+</button>
      </form>

      <ul className="tasks-list">
        {tasksForDay.length > 0 ? (
          tasksForDay.map(task => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
              <button 
                className="delete-task-button"
                title="Deletar tarefa"
                onClick={(e) => {
                  e.stopPropagation(); // Impede que o clique afete o card do dia
                  handleDelete(task.id);
                }}
              >
                {/* Ícone de Lixeira em formato SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
              </button>
            </li>
          ))
        ) : (
          <p className="no-tasks-message">Nenhuma tarefa para este dia.</p>
        )}
      </ul>
    </div>
  );
}

export default TaskList;