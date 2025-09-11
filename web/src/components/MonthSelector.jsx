// web/src/components/MonthSelector.jsx
import React from 'react';

// O componente agora recebe 'onMonthSelect', 'loading' e 'monthsWithTasks' do App.jsx
function MonthSelector({ onMonthSelect, loading, monthsWithTasks }) {
  const anoAtual = new Date().getFullYear();
  const mesesDoAno = [...Array(12).keys()].map(i => {
    return new Date(anoAtual, i).toLocaleString('pt-BR', { month: 'long' });
  });

  // Função para formatar a lista de meses (continua igual)
  const formatMonthsNotice = () => {
    if (monthsWithTasks.length === 0) return '';
    return monthsWithTasks.join(', ');
  };

  return (
    // O JSX é quase o mesmo de antes, mas agora usa os dados das props
    <>
      <div className="month-selector-container">
        <h2>Selecione um Mês de {anoAtual}</h2>
        <div className="month-grid">
          {mesesDoAno.map((nomeDoMes, index) => (
            <button 
              key={index} 
              className="month-tile"
              onClick={() => onMonthSelect(index)}
            >
              {nomeDoMes.charAt(0).toUpperCase() + nomeDoMes.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="tasks-list-container">
        {loading && <p>Analisando tarefas...</p>}

        {!loading && monthsWithTasks.length > 0 && (
          <p className="tasks-notice">
            ✨ Você tem tarefas nos seguintes meses: <strong>{formatMonthsNotice()}</strong>.
          </p>
        )}
      </div>
    </>
  );
}

export default MonthSelector;