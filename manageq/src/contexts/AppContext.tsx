import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Task, User, ChatMessage, TaskStats } from '../types';
import { getUserTasks } from '../utils/userTasks';

interface AppState {
  tasks: Task[];
  user: User | null;
  chatMessages: ChatMessage[];
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;
}

type AppAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_AUTH_ERROR' };

const initialState: AppState = {
  tasks: [],
  user: null,
  chatMessages: [],
  isDarkMode: false,
  isSidebarOpen: false,
  isAuthenticated: false,
  authLoading: false,
  authError: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload),
      };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case 'LOGIN_START':
      return { ...state, authLoading: true, authError: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        authLoading: false, 
        authError: null
      };
    case 'LOGIN_ERROR':
      return { 
        ...state, 
        authLoading: false, 
        authError: action.payload, 
        isAuthenticated: false, 
        user: null 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        tasks: [], 
        chatMessages: [], 
        authError: null 
      };
    case 'CLEAR_AUTH_ERROR':
      return { ...state, authError: null };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  getTaskStats: () => TaskStats;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  React.useEffect(() => {
    const loadUserData = async () => {
      if (state.user && state.isAuthenticated) {
        try {
          const tasks = await getUserTasks();
          dispatch({ type: 'SET_TASKS', payload: tasks });
        } catch (error) {
          console.error('Failed to load user data:', error);
        }
      }
    };

    loadUserData();
  }, [state.user, state.isAuthenticated]);

  const getTaskStats = (): TaskStats => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(task => task.status === 'completed').length;
    const inProgress = state.tasks.filter(task => task.status === 'in-progress').length;
    const todo = state.tasks.filter(task => task.status === 'todo').length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return { total, completed, inProgress, todo, completionRate };
  };

  return (
    <AppContext.Provider value={{ state, dispatch, getTaskStats }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};