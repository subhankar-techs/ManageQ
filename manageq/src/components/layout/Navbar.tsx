import React from 'react';
import { Menu, Moon, Sun, User, LogOut } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { removeCurrentUser } from '../../utils/auth';

export const Navbar: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleLogout = () => {
    removeCurrentUser();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="lg:hidden"
          >
            <Menu size={20} />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            ManageQ
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          >
            {state.isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          {state.user && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  {state.user.avatar ? (
                    <img
                      src={state.user.avatar}
                      alt={state.user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                  {state.user.name}
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut size={16} />
                <span className="hidden sm:block">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};