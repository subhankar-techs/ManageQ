# ManageQ - Task Management App with AI Assistant

A modern, responsive task management application built with React, TypeScript, and TailwindCSS. ManageQ helps users organize their tasks, set priorities, track progress, and get AI-powered suggestions.

## 🚀 Features

### Authentication
- **User Registration**: Create new accounts with email validation
- **User Login**: Secure login with email and password
- **Session Management**: Persistent login sessions with localStorage
- **User-Specific Data**: Each user has their own tasks and chat history
- **Form Validation**: Comprehensive client-side validation for all forms

### Core Features
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Priority System**: Categorize tasks by priority (Low, Medium, High)
- **Status Tracking**: Track task status (To-Do, In Progress, Completed)
- **Search & Filter**: Find tasks quickly with search and filtering options
- **Analytics Dashboard**: View task statistics and completion rates

### AI Assistant
- **Chat Interface**: Interactive AI assistant with chat-style interface
- **Smart Suggestions**: Get AI-powered task summaries and productivity tips
- **Quick Actions**: Pre-defined prompts for common queries
- **Mock Responses**: Intelligent responses based on your task data

### UI/UX Features
- **Responsive Design**: Mobile-friendly layout with collapsible sidebar
- **Dark/Light Theme**: Toggle between dark and light modes
- **Modern Design**: Clean, minimal interface using TailwindCSS
- **Smooth Animations**: Hover effects and transitions throughout the app
- **Reusable Components**: Modular UI components (Button, Card, Modal, Input, Loader)

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API with useReducer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd manageq
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Loader.tsx
│   └── TaskCard.tsx
├── contexts/
│   └── AppContext.tsx
├── pages/
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Tasks.tsx
│   ├── AIAssistant.tsx
│   └── Profile.tsx
├── types/
│   └── index.ts
├── utils/
│   └── mockData.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎯 Usage

### Getting Started
1. **Sign Up**: Create a new account or use demo credentials
   - Demo: john@example.com / password123
2. **Login**: Access your personal dashboard
3. **Start Managing**: Create and organize your tasks

### Task Management
1. Navigate to the **Tasks** page
2. Click **"Add Task"** to create a new task
3. Fill in task details (title, description, priority, status, due date)
4. Use search and filters to find specific tasks
5. Edit or delete tasks using the action buttons on each task card

### AI Assistant
1. Go to the **AI Assistant** page
2. Use quick action buttons or type your own questions
3. Ask about task summaries, priorities, or productivity tips
4. Get intelligent responses based on your current tasks

### Dashboard
- View task statistics and completion rates
- See recent tasks at a glance
- Get AI-powered productivity suggestions

## 🎨 Customization

### Theme Colors
The app uses a primary color scheme that can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### Adding New Features
1. Create new components in the appropriate directory
2. Add new pages to the `pages/` directory
3. Update routing in `App.tsx`
4. Extend the context state and actions as needed

## 📱 Responsive Design

The app is fully responsive and works on:
- **Desktop**: Full sidebar navigation
- **Tablet**: Collapsible sidebar
- **Mobile**: Overlay sidebar with touch-friendly interface

## 🔮 Future Enhancements

- **Backend Integration**: Connect to a real API for data persistence
- **Real AI Integration**: Integrate with OpenAI or other AI services
- **User Authentication**: Add login/signup functionality
- **Team Collaboration**: Multi-user support and task sharing
- **Notifications**: Push notifications for due dates and reminders
- **Data Export**: Export tasks to various formats (CSV, PDF)
- **Drag & Drop**: Drag and drop task reordering
- **Subtasks**: Support for nested subtasks
- **Time Tracking**: Built-in time tracking for tasks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind Labs** for TailwindCSS
- **Lucide** for the beautiful icons
- **Vite Team** for the fast build tool