import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Calendar } from './components/Calendar';
import { TaskList } from './components/TaskList';
import { AddTask } from './components/AddTask';
import { Task, DayTasks } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<DayTasks>({});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      completed: false,
    };

    setTasks(prev => ({
      ...prev,
      [task.date]: [...(prev[task.date] || []), task],
    }));
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach(date => {
        newTasks[date] = newTasks[date].map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
      });
      return newTasks;
    });
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach(date => {
        newTasks[date] = newTasks[date].filter(task => task.id !== taskId);
        if (newTasks[date].length === 0) {
          delete newTasks[date];
        }
      });
      return newTasks;
    });
  };

  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const selectedTasks = tasks[selectedDateStr] || [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Havila's To Do List
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                tasks={tasks}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                Tasks for {selectedDate.toLocaleDateString()}
              </h2>
              <AddTask
                onAddTask={handleAddTask}
                selectedDate={selectedDate}
              />
              <TaskList
                tasks={selectedTasks}
                onTaskComplete={handleTaskComplete}
                onTaskDelete={handleTaskDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;