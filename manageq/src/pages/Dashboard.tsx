import React, { useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/Card';
import { TaskCard } from '../components/TaskCard';
import apiService from '../services/api';

export const Dashboard: React.FC = () => {
  const { state, getTaskStats, dispatch } = useApp();
  const stats = getTaskStats();
  const recentTasks = state.tasks.slice(0, 3);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const tasksResponse = await apiService.getTasks();
      dispatch({ type: 'SET_TASKS', payload: tasksResponse.tasks });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: CheckCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    },
    {
      title: 'Completion Rate',
      value: `${Math.round(stats.completionRate)}%`,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Overview of your tasks and productivity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(({ title, value, icon: Icon, color, bgColor }) => (
          <Card key={title} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {value}
                </p>
              </div>
              <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={color} size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Recent Tasks
          </h2>
        </div>
        
        {state.tasks.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="mx-auto text-gray-400" size={48} />
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              No tasks yet. Create your first task to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => {}}
                onDelete={() => {}}
                onToggleComplete={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      <Card className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          AI Suggestions
        </h2>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 Focus on high-priority tasks first to maximize productivity
            </p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              🎯 Break down large tasks into smaller, manageable subtasks
            </p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
            <p className="text-sm text-purple-800 dark:text-purple-200">
              ⏰ Set specific time blocks for deep work on important tasks
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};