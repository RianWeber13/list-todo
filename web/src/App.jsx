// 1. Importando as ferramentas do React que vamos usar
import { useState, useEffect } from 'react';
import './App.css'; // Estilos padrões que vêm com o projeto

// Este é o nosso componente principal, a nossa aplicação
function App() {
  // 2. Criando um "estado" para guardar nossa lista de tarefas.
  //    - 'tasks' é a variável que vai guardar os dados. Começa como uma lista vazia [].
  //    - 'setTasks' é a função que usamos para atualizar essa lista.
  const [tasks, setTasks] = useState([]);
  
  // 3. Criando um "estado" para sabermos se estamos carregando os dados.
  //    Começa como 'true', pois vamos carregar os dados assim que a página abrir.
  const [loading, setLoading] = useState(true);

  // 4. useEffect: Este bloco de código vai rodar UMA VEZ, logo depois que o
  //    componente aparecer na tela. É o lugar perfeito para buscar dados de uma API.
  useEffect(() => {
    // Definimos uma função especial (async) para podermos usar 'await',
    // que deixa o código mais limpo e fácil de ler.
    async function fetchTasks() {
      try {
        // 5. A CHAMADA À API! Usamos 'fetch' para "buscar" os dados na URL do nosso backend.
        const response = await fetch('http://localhost:8000/api/tasks');
        
        // 6. Pegamos a resposta da rede e a transformamos em formato JSON.
        const data = await response.json();
        
        // 7. Usamos a função 'setTasks' para atualizar nossa lista com os dados da API.
        setTasks(data);

      } catch (error) {
        // Se der algum erro na comunicação, mostramos no console do navegador.
        console.error('Erro ao buscar as tarefas:', error);
      } finally {
        // 8. Independentemente de sucesso ou erro, dizemos que o carregamento terminou.
        setLoading(false);
      }
    }

    fetchTasks(); // Aqui nós executamos a função que acabamos de criar.
  }, []); // O [] vazio no final é muito importante: ele garante que este useEffect rode apenas uma vez.

  // 9. A parte visual do nosso componente (o que vai aparecer na tela em HTML).
  return (
    <div className="App">
      <h1>Minha Lista de Tarefas</h1>
      
      {/* Usando uma condição: se estiver carregando, mostra uma mensagem. */}
      {loading ? (
        <p>Carregando tarefas...</p>
      ) : (
        // Se não estiver carregando, verifica se há tarefas na nossa lista.
        tasks.length === 0 ? (
          // Se a lista estiver vazia (length === 0), mostra esta mensagem.
          <p>Nenhuma tarefa encontrada. Adicione uma!</p>
        ) : (
          // Se houver tarefas, faz um loop e exibe cada uma.
          // (Ainda não temos tarefas, mas o código já está pronto para quando tivermos)
          <ul>
            {tasks.map(task => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export default App;