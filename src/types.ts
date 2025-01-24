export interface Task {
  id: string;
  title: string;
  description?: string;
  date: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export interface DayTasks {
  [date: string]: Task[];
}