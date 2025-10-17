import type { User } from '../types';
import type { LoginCredentials, SignupCredentials } from '../types/auth';
import apiService from '../services/api';

export const authenticateUser = async (credentials: LoginCredentials): Promise<User> => {
  const response = await apiService.login(credentials);
  return response.user;
};

export const registerUser = async (credentials: SignupCredentials): Promise<User> => {
  const { confirmPassword, ...userData } = credentials;
  const response = await apiService.register(userData);
  return response.user;
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const response = await apiService.getProfile();
    return response.user;
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const removeCurrentUser = (): void => {
  localStorage.removeItem('currentUser');
  apiService.logout();
};