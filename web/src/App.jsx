import { useState, useEffect } from 'react';
import MonthSelector from './components/MonthSelector';
import DaySelector from './components/DaySelector';
import Layout from './components/Layout';
import { getAllTasks } from './services/taskServices';
import { getHolidaysForYear } from './services/holidayService';
import './index.css';

function App() {
  // Estado para controlar a navegação (qual tela mostrar)
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);
  
  // Estados para controlar os dados da aplicação
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthsWithTasks, setMonthsWithTasks] = useState([]);
  const [holidays, setHolidays] = useState([]);
  
  const anoAtual = new Date().getFullYear();

  // Função para buscar/atualizar a lista de tarefas, que pode ser chamada a qualquer momento
  const fetchTasks = async () => {
    const tasksData = await getAllTasks();
    console.log("LOG 1: Dados recebidos da API em App.jsx:", tasksData);
    setTasks(tasksData);

    if (tasksData && tasksData.length > 0) {
      console.log(">>> DATA VINDA DO BANCO (primeira tarefa):", tasksData[0].task_date);
      const uniqueMonths = new Set();
      tasksData.forEach(task => {
        // Usamos task_date, que é a data correta da tarefa
        const taskDate = new Date(task.task_date + 'T00:00:00'); // Adiciona T00:00 para evitar problemas de fuso horário
        const monthName = taskDate.toLocaleString('pt-BR', { month: 'long' });
        uniqueMonths.add(monthName);
      });
      setMonthsWithTasks(Array.from(uniqueMonths));
    } else {
      setMonthsWithTasks([]); // Limpa a lista se não houver tarefas
    }
  };

  // useEffect para buscar os dados iniciais (feriados e a primeira carga de tarefas)
  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      await Promise.all([
        fetchTasks(),
        getHolidaysForYear(anoAtual).then(setHolidays)
      ]);
      setLoading(false);
    }
    fetchInitialData();
  }, [anoAtual]);

  // Funções para controlar a navegação
  const handleMonthSelect = (monthIndex) => setSelectedMonthIndex(monthIndex);
  const handleBackToMonths = () => setSelectedMonthIndex(null);

  // O JSX que decide qual tela mostrar
  return (
    <Layout>
      {selectedMonthIndex === null ? (
        <MonthSelector 
          onMonthSelect={handleMonthSelect}
          loading={loading}
          monthsWithTasks={monthsWithTasks}
        />
      ) : (
        <DaySelector 
          monthIndex={selectedMonthIndex}
          year={anoAtual}
          onBack={handleBackToMonths} 
          tasks={tasks}
          holidays={holidays}
          onTasksChange={fetchTasks} // Passa a função de atualização
        />
      )}
    </Layout>
  );
}

export default App;