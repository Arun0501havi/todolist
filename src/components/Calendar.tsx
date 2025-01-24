import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Task } from '../types';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  tasks: { [date: string]: Task[] };
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, tasks }) => {
  const [currentMonth, setCurrentMonth] = React.useState(selectedDate);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days: Array<{ date: Date | null; hasTask: boolean }> = [];
    
    // Add empty days for padding
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ date: null, hasTask: false });
    }
    
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      days.push({ 
        date, 
        hasTask: Boolean(tasks[dateString]?.length)
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + (direction === 'next' ? 1 : -1),
      1
    ));
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">{monthYear}</h2>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`aspect-square p-1 ${
              day.date
                ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'bg-transparent'
            }`}
            onClick={() => day.date && onDateSelect(day.date)}
          >
            {day.date && (
              <div
                className={`h-full rounded-lg flex flex-col items-center justify-center ${
                  day.date.toDateString() === selectedDate.toDateString()
                    ? 'bg-blue-500 text-white'
                    : ''
                }`}
              >
                <span className="text-sm">{day.date.getDate()}</span>
                {day.hasTask && (
                  <div className="w-1 h-1 rounded-full bg-blue-500 mt-1" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};