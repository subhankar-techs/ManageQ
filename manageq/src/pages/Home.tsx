import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, Bot, BarChart3, Users } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../contexts/AppContext';

const features = [
  {
    icon: CheckSquare,
    title: 'Task Management',
    description: 'Create, organize, and track your tasks with ease. Set priorities and due dates.',
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'Get intelligent suggestions and summaries to boost your productivity.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track your progress with detailed analytics and completion rates.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Work together with your team and share tasks efficiently.',
  },
];

export const Home: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (state.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [state.isAuthenticated, navigate]);
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to <span className="text-primary-500">ManageQ</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your intelligent task management companion. Organize your work, boost productivity, 
          and get AI-powered insights to achieve your goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
          <Link to="/ai-assistant">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Try AI Assistant
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto">
                <Icon className="text-primary-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 dark:bg-primary-900 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Ready to boost your productivity?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Join thousands of users who have transformed their task management with ManageQ.
        </p>
        <Link to="/tasks">
          <Button size="lg">
            Start Managing Tasks
          </Button>
        </Link>
      </section>
    </div>
  );
};