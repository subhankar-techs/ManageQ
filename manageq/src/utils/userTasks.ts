import type { Task } from '../types';

export const getUserTasks = (userId: string): Task[] => {
  const tasksKey = `tasks_${userId}`;
  const savedTasks = localStorage.getItem(tasksKey);
  return savedTasks ? JSON.parse(savedTasks) : [];
};

export const saveUserTasks = (userId: string, tasks: Task[]): void => {
  const tasksKey = `tasks_${userId}`;
  localStorage.setItem(tasksKey, JSON.stringify(tasks));
};

export const getUserChatMessages = (userId: string) => {
  const chatKey = `chat_${userId}`;
  const savedMessages = localStorage.getItem(chatKey);
  return savedMessages ? JSON.parse(savedMessages) : [];
};

export const saveUserChatMessages = (userId: string, messages: any[]) => {
  const chatKey = `chat_${userId}`;
  localStorage.setItem(chatKey, JSON.stringify(messages));
};