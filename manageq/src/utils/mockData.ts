import type { Task, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the Q4 project proposal for the new client',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-01-15',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull requests from the development team',
    priority: 'medium',
    status: 'todo',
    dueDate: '2024-01-12',
    createdAt: '2024-01-08T09:00:00Z',
    updatedAt: '2024-01-08T09:00:00Z'
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Update API documentation with new endpoints',
    priority: 'low',
    status: 'completed',
    dueDate: '2024-01-10',
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-09T16:00:00Z'
  }
];

export const mockAIResponses = [
  "Based on your tasks, I recommend focusing on the high-priority 'Complete project proposal' first, as it's due soon and currently in progress.",
  "You have 3 tasks total with 1 completed (33% completion rate). Great progress! Consider tackling the code review next.",
  "Your pending tasks include: 1) Complete project proposal (High priority, due Jan 15), 2) Review code changes (Medium priority, due Jan 12).",
  "To improve productivity, try breaking down larger tasks into smaller, manageable subtasks. This helps maintain momentum and track progress better."
];