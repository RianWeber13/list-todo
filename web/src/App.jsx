// web/src/App.jsx

import { useState, useEffect } from 'react';
import MonthSelector from './components/MonthSelector';
import DaySelector from './components/DaySelector';
import Layout from './components/Layout';
import { getAllTasks } from './services/taskServices';
import { getHolidaysForYear } from './services/holidayService'; // 1. Importa o novo serviço
import './index.css';

function App() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthsWithTasks, setMonthsWithTasks] = useState([]);
  const [holidays, setHolidays] = useState([]); // 2. Novo estado para guardar os feriados
  const anoAtual = new Date().getFullYear();

  // 3. Modificamos o useEffect para buscar tarefas E feriados
  useEffect(() => {
    // Função para buscar todos os dados iniciais da nossa aplicação
    async function fetchInitialData() {
      try {
        // Usamos Promise.all para buscar as duas coisas em paralelo
        const [tasksData, holidaysData] = await Promise.all([
          getAllTasks(),
          getHolidaysForYear(anoAtual)
        ]);
        
        // Processa os dados das tarefas
        setTasks(tasksData);
        if (tasksData && tasksData.length > 0) {
          const uniqueMonths = new Set();
          tasksData.forEach(task => {
            const taskDate = new Date(task.created_at);
            const monthName = taskDate.toLocaleString('pt-BR', { month: 'long' });
            uniqueMonths.add(monthName);
          });
          setMonthsWithTasks(Array.from(uniqueMonths));
        }

        // Guarda os dados dos feriados
        setHolidays(holidaysData);

      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, [anoAtual]); // Adicionamos 'anoAtual' como dependência

  // Funções de navegação (continuam iguais)
  const handleMonthSelect = (monthIndex) => {
    setSelectedMonthIndex(monthIndex);
  };
  const handleBackToMonths = () => {
    setSelectedMonthIndex(null);
  };

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
          tasks={tasks.filter(t => new Date(t.created_at).getMonth() === selectedMonthIndex)}
          holidays={holidays} // 4. Passamos os feriados para o DaySelector
        />
      )}
    </Layout>
  );
}

export default App;