import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import type { ChatMessage } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockAIResponses } from '../utils/mockData';

export const AIAssistant: React.FC = () => {
  const { state, dispatch } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });

    // Clear input and show typing indicator
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiResponse });
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('summarize') || lowerMessage.includes('summary')) {
      const pendingTasks = state.tasks.filter(task => task.status !== 'completed');
      if (pendingTasks.length === 0) {
        return "Great news! You have no pending tasks. You're all caught up! 🎉";
      }
      return `You have ${pendingTasks.length} pending tasks: ${pendingTasks.map(task => `"${task.title}"`).join(', ')}. Focus on high-priority items first.`;
    }
    
    if (lowerMessage.includes('focus') || lowerMessage.includes('priority')) {
      const highPriorityTasks = state.tasks.filter(task => task.priority === 'high' && task.status !== 'completed');
      if (highPriorityTasks.length === 0) {
        return "You don't have any high-priority pending tasks. Consider working on medium-priority items or taking a well-deserved break!";
      }
      return `Focus on these high-priority tasks: ${highPriorityTasks.map(task => `"${task.title}"`).join(', ')}.`;
    }
    
    if (lowerMessage.includes('progress') || lowerMessage.includes('stats')) {
      const stats = getTaskStats();
      return `Your progress: ${stats.completed}/${stats.total} tasks completed (${Math.round(stats.completionRate)}% completion rate). ${stats.inProgress} tasks in progress, ${stats.todo} tasks to do.`;
    }
    
    // Return random response for other queries
    return mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
  };

  const getTaskStats = () => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(task => task.status === 'completed').length;
    const inProgress = state.tasks.filter(task => task.status === 'in-progress').length;
    const todo = state.tasks.filter(task => task.status === 'todo').length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    return { total, completed, inProgress, todo, completionRate };
  };

  const quickPrompts = [
    "Summarize my pending tasks",
    "What should I focus on today?",
    "Show my progress stats",
    "Give me productivity tips"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          AI Assistant
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Get intelligent insights and suggestions for your tasks
        </p>
      </div>

      {/* Quick Prompts */}
      <Card className="space-y-3">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickPrompts.map((prompt) => (
            <Button
              key={prompt}
              variant="secondary"
              size="sm"
              onClick={() => setInputMessage(prompt)}
              className="text-left justify-start"
            >
              {prompt}
            </Button>
          ))}
        </div>
      </Card>

      {/* Chat Interface */}
      <Card className="h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {state.chatMessages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <Bot size={48} className="mx-auto mb-4 text-gray-400" />
              <p>Hi! I'm your AI assistant. Ask me about your tasks, progress, or productivity tips!</p>
            </div>
          ) : (
            state.chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && <Bot size={16} className="mt-1 flex-shrink-0" />}
                    {message.isUser && <User size={16} className="mt-1 flex-shrink-0" />}
                    <p className="text-sm">{message.message}</p>
                  </div>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot size={16} />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about your tasks..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" disabled={!inputMessage.trim() || isTyping}>
              <Send size={18} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};