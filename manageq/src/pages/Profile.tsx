import React, { useState } from 'react';
import { User, Mail, Settings, Bell, Shield } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Profile: React.FC = () => {
  const { state } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
  });

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  const settingsOptions = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      action: 'Configure',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Control your privacy and security settings',
      action: 'Manage',
    },
    {
      icon: Settings,
      title: 'General Settings',
      description: 'App preferences and general settings',
      action: 'Configure',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Information */}
      <Card className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Profile Information
          </h2>
          <Button
            variant="secondary"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center">
            {state.user?.avatar ? (
              <img
                src={state.user.avatar}
                alt={state.user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <User size={32} className="text-white" />
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {state.user?.name || 'User Name'}
                </h3>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Mail size={16} />
                  <span>{state.user?.email || 'user@example.com'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Settings
        </h2>
        <div className="space-y-4">
          {settingsOptions.map(({ icon: Icon, title, description, action }) => (
            <div
              key={title}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                {action}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Theme Toggle */}
      <Card className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Appearance
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Dark Mode
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Toggle between light and dark themes
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.isDarkMode}
              onChange={() => {}}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </Card>

      {/* Account Actions */}
      <Card className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Account Actions
        </h2>
        <div className="space-y-3">
          <Button variant="secondary" className="w-full justify-start">
            Export Data
          </Button>
          <Button variant="secondary" className="w-full justify-start">
            Import Data
          </Button>
          <Button variant="danger" className="w-full justify-start">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
};