import type { Task } from '../types';
import apiService from '../services/api';

export const getUserTasks = async (): Promise<Task[]> => {
  try {
    const response = await apiService.getTasks();
    return response.tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const saveUserTasks = async (_tasks: Task[]): Promise<void> => {
  // This is now handled by individual API calls
  console.log('Tasks are automatically saved via API');
};

export const getUserChatMessages = async () => {
  try {
    const response = await apiService.getChatMessages();
    return response.messages;
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return [];
  }
};

export const saveUserChatMessages = async (_messages: any[]): Promise<void> => {
  // This is now handled by individual API calls
  console.log('Messages are automatically saved via API');
};