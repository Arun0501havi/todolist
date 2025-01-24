import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../types';

interface AddTaskProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  selectedDate: Date;
}

export const AddTask: React.FC<AddTaskProps> = ({ onAddTask, selectedDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      date: selectedDate.toISOString().split('T')[0],
      priority,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsOpen(false);
  };

  return (
    <div className="mb-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-3 flex items-center justify-center gap-2 text-gray-500 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Task</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            autoFocus
          />
          
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            rows={2}
          />
          
          <div className="flex items-center gap-4 mb-4">
            <label className="text-sm text-gray-600 dark:text-gray-300">Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              className="p-1 border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};