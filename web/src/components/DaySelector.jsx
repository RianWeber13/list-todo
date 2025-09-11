// web/src/components/DaySelector.jsx
import React from 'react';

// 1. O componente agora também recebe a lista de 'holidays'
function DaySelector({ monthIndex, year, onBack, tasks, holidays }) {
  const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const monthName = new Date(year, monthIndex).toLocaleString('pt-BR', { month: 'long' });
  const daysCount = new Date(year, monthIndex + 1, 0).getDate();
  const days = [...Array(daysCount).keys()].map(i => i + 1);
  const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
  const emptyTiles = Array.from({ length: firstDayOfMonth }).map((_, index) => (
    <div key={`empty-${index}`} className="empty-tile"></div>
  ));

  // 2. Função para verificar se um dia é feriado e retornar os dados do feriado
  const getHolidayInfo = (day) => {
    const dateString = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays.find(holiday => holiday.date === dateString);
  };

  return (
    <div className="day-selector-container">
      <button onClick={onBack} className="back-button">← Voltar para Meses</button>
      <h2>{monthName.charAt(0).toUpperCase() + monthName.slice(1)} de {year}</h2>
      
      <div className="weekday-header">
        {diasDaSemana.map(dia => <div key={dia}>{dia.substring(0, 3)}</div>)}
      </div>

      <div className="day-grid">
        {emptyTiles}
        {days.map(day => {
          // 3. Para cada dia, verificamos se é um feriado
          const holidayInfo = getHolidayInfo(day);
          const isHoliday = !!holidayInfo; // Converte para verdadeiro/falso

          return (
            // 4. Adicionamos a classe 'holiday-tile' condicionalmente
            <button key={day} className={`day-tile ${isHoliday ? 'holiday-tile' : ''}`}>
              <div className="day-number">{day}</div>
              {/* 5. Se for feriado, mostramos o nome dele */}
              {isHoliday && <span className="holiday-name">{holidayInfo.name}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DaySelector;