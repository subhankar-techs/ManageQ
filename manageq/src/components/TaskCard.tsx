import React from 'react';
import { Calendar, Edit, Trash2, CheckCircle } from 'lucide-react';
import type { Task } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
            {task.title}
          </h3>
          <div className="flex space-x-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(task)}
              className="p-1"
            >
              <Edit size={14} />
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="p-1"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {task.description}
        </p>

        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
            {task.status.replace('-', ' ')}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={14} />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
          
          <Button
            variant={task.status === 'completed' ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => onToggleComplete(task)}
            className="flex items-center space-x-1"
          >
            <CheckCircle size={14} />
            <span>{task.status === 'completed' ? 'Undo' : 'Complete'}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};