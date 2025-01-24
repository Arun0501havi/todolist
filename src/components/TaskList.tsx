import React from 'react';
import { Check, Trash2, Flag } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskComplete,
  onTaskDelete,
}) => {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getPriorityLabel = (priority: Task['priority']) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`group flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all ${
            task.completed ? 'opacity-50' : ''
          }`}
        >
          <button
            onClick={() => onTaskComplete(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              task.completed
                ? 'bg-primary-600 border-primary-600'
                : 'border-gray-300 hover:border-primary-600'
            }`}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed && <Check className="w-4 h-4 text-white" />}
          </button>
          
          <div className="flex-grow">
            <h3 className={`font-medium ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {task.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded`}>
              <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
              <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                {getPriorityLabel(task.priority)}
              </span>
            </div>
            <button
              onClick={() => onTaskDelete(task.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No tasks for this day. Click "Add New Task" to get started!
        </div>
      )}
    </div>
  );
};