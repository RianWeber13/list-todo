import React, { useState } from 'react';
import TaskList from './TaskList';

function DaySelector({ monthIndex, year, onBack, tasks, holidays, onTasksChange }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const monthName = new Date(year, monthIndex).toLocaleString('pt-BR', { month: 'long' });

  // --- FUNÇÕES DE LÓGICA ---

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  
  const handleBackToMonthView = () => {
    setSelectedDay(null);
  };
  
  const toYYYYMMDD = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getHolidayInfo = (day, month) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays.find(holiday => holiday.date === dateString);
  };

  // --- FUNÇÕES DE RENDERIZAÇÃO ---

  const renderWeekView = () => {
    const selectedDate = new Date(year, monthIndex, selectedDay);
    const dayOfWeek = selectedDate.getDay();
    const firstDayOfWeek = new Date(selectedDate);
    firstDayOfWeek.setDate(selectedDate.getDate() - dayOfWeek);

    const weekDays = Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + index);
      return day;
    });

    return (
      <div className="week-view-container">
        <button onClick={handleBackToMonthView} className="back-button">← Voltar para o Mês</button>
        <h2>{monthName.charAt(0).toUpperCase() + monthName.slice(1)} de {year}</h2>
        <div className="weekday-header">
          {diasDaSemana.map(dia => <div key={dia}>{dia.substring(0, 3)}</div>)}
        </div>
        <div className="day-grid">
          {weekDays.map(dateObject => {
            const day = dateObject.getDate();
            const currentMonthIndex = dateObject.getMonth();
            const holidayInfo = getHolidayInfo(day, currentMonthIndex);
            const isHoliday = !!holidayInfo;
            const isSelected = day === selectedDay && currentMonthIndex === monthIndex;
            
            const dateStringForTile = toYYYYMMDD(dateObject);
            const tasksForDay = tasks.filter(task => task.task_date === dateStringForTile);

            return (
              <div 
                key={dateObject.toISOString()}
                role="button"
                tabIndex={0}
                className={`day-tile ${isHoliday ? 'holiday-tile' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="day-number">{day}</div>
                {isHoliday && <span className="holiday-name">{holidayInfo.name}</span>}
                
                {tasksForDay.length > 0 && !isSelected && <div className="tasks-indicator"></div>}

                {isSelected && (
                  <TaskList
                    tasksForDay={tasksForDay}
                    selectedDate={dateObject}
                    onTasksChange={onTasksChange}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const daysCount = new Date(year, monthIndex + 1, 0).getDate();
    const days = [...Array(daysCount).keys()].map(i => i + 1);
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
    const emptyTiles = Array.from({ length: firstDayOfMonth }).map((_, index) => (
      <div key={`empty-${index}`} className="empty-tile"></div>
    ));

    return (
      <div className="month-view-container">
        <button onClick={onBack} className="back-button">← Voltar para Meses</button>
        <h2>{monthName.charAt(0).toUpperCase() + monthName.slice(1)} de {year}</h2>
        <div className="weekday-header">
          {diasDaSemana.map(dia => <div key={dia}>{dia.substring(0, 3)}</div>)}
        </div>
        <div className="day-grid">
          {emptyTiles}
          {days.map(day => {
            const dateObject = new Date(year, monthIndex, day);
            const dateStringForTile = toYYYYMMDD(dateObject);
            const tasksForDay = tasks.filter(task => task.task_date === dateStringForTile);
            const holidayInfo = getHolidayInfo(day, monthIndex);
            const isHoliday = !!holidayInfo;

            return (
              <div key={day} role="button" tabIndex={0} className={`day-tile ${isHoliday ? 'holiday-tile' : ''}`} onClick={() => handleDayClick(day)}>
                <div className="day-number">{day}</div>
                {isHoliday && <span className="holiday-name">{holidayInfo.name}</span>}
                {tasksForDay.length > 0 && <div className="tasks-indicator"></div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    selectedDay === null ? renderMonthView() : renderWeekView()
  );
}

export default DaySelector;