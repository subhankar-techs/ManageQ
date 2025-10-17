# ManageQ - Task Management Application with AI Assistant

A modern, full-stack task management application built with React, Node.js, Express, and MongoDB, featuring an AI assistant for productivity insights.

## 🚀 Features

### Frontend Features
- **User Authentication**: Secure login/signup with JWT tokens
- **Task Management**: Create, read, update, delete tasks with priority levels
- **Dashboard**: Real-time statistics and task overview
- **AI Assistant**: Interactive chat for task insights and productivity tips
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Instant UI updates with optimistic rendering

### Backend Features
- **RESTful API**: Clean, organized API endpoints
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Express-validator for data validation
- **Security**: Helmet, CORS, rate limiting protection
- **Error Handling**: Comprehensive error handling middleware
- **Database**: MongoDB with Mongoose ODM

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for validation
- **helmet** for security headers
- **cors** for cross-origin requests
- **express-rate-limit** for rate limiting

## 📁 Project Structure

```
Task Manager With AI assist(Ejob)/
├── manageq/                    # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── layout/         # Layout components (Navbar, Sidebar, Footer)
│   │   │   └── ui/             # Base UI components (Button, Card, Input, etc.)
│   │   ├── contexts/           # React Context providers
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service layer
│   │   ├── types/              # TypeScript type definitions
│   │   ├── utils/              # Utility functions
│   │   └── App.tsx             # Main application component
│   ├── public/                 # Static assets
│   └── package.json            # Frontend dependencies
├── manageq-backend/            # Backend Node.js application
│   ├── src/
│   │   ├── config/             # Database configuration
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/             # MongoDB models
│   │   ├── routes/             # API routes
│   │   └── utils/              # Utility functions
│   ├── server.js               # Main server file
│   ├── .env                    # Environment variables
│   └── package.json            # Backend dependencies
└── README.md                   # This file
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (v5.0 or higher)
- **npm** or **yarn**

### 1. Clone Repository
```bash
git clone <repository-url>
cd "Task Manager With AI assist(Ejob)"
```

### 2. Backend Setup
```bash
cd manageq-backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/manageq
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd ../manageq
npm install
```

### 4. Start MongoDB
```bash
# Windows
net start MongoDB

# Or manually
mongod --dbpath "C:\data\db"

# macOS/Linux
sudo systemctl start mongod
```

### 5. Run Applications
```bash
# Terminal 1 - Backend
cd manageq-backend
npm run dev

# Terminal 2 - Frontend
cd manageq
npm run dev
```

### 6. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

### Task Endpoints

#### Get Tasks
```http
GET /api/tasks?status=todo&priority=high
Authorization: Bearer <jwt_token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the Q4 project proposal",
  "priority": "high",
  "status": "todo",
  "dueDate": "2024-01-15"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <jwt_token>
```

#### Get Task Statistics
```http
GET /api/tasks/stats
Authorization: Bearer <jwt_token>
```

### Chat Endpoints

#### Get Chat Messages
```http
GET /api/chat
Authorization: Bearer <jwt_token>
```

#### Send Message
```http
POST /api/chat
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "message": "What should I focus on today?"
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Configured for specific origins
- **Security Headers**: Helmet.js for security headers
- **Environment Variables**: Sensitive data in environment files

## 🎯 Usage Guide

### Getting Started
1. **Sign Up**: Create a new account with your email and password
2. **Login**: Access your dashboard with your credentials
3. **Create Tasks**: Add tasks with titles, descriptions, priorities, and due dates
4. **Manage Tasks**: Update status, edit details, or delete completed tasks
5. **Use AI Assistant**: Ask for task summaries, focus recommendations, or productivity tips

### AI Assistant Commands
- `"Summarize my pending tasks"` - Get overview of incomplete tasks
- `"What should I focus on today?"` - Get priority recommendations
- `"Show my progress stats"` - View completion statistics
- `"Give me productivity tips"` - Receive general productivity advice

### Task Management
- **Priority Levels**: Low, Medium, High
- **Status Types**: Todo, In Progress, Completed
- **Filtering**: Filter by status, priority, or search terms
- **Sorting**: Sort by creation date, due date, or priority

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use process manager like PM2
3. Configure reverse proxy (nginx)
4. Set up SSL certificates

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to static hosting (Vercel, Netlify)
3. Update API base URL for production

### Database
- Use MongoDB Atlas for cloud hosting
- Configure connection string in production
- Set up database backups

## 🧪 Testing

### Backend Testing
```bash
cd manageq-backend
npm test
```

### Frontend Testing
```bash
cd manageq
npm test
```

### API Testing
Use the included test script:
```bash
node test-backend.js
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database permissions

**CORS Issues**
- Check `CORS_ORIGIN` in backend `.env`
- Ensure frontend URL matches

**Port Conflicts**
- Change `PORT` in backend `.env`
- Update API URL in frontend

**Authentication Issues**
- Check JWT secret configuration
- Verify token storage in localStorage
- Ensure proper Authorization headers

### Support
For issues and questions, please create an issue in the repository or contact the development team.

## 🎉 Acknowledgments

- React team for the amazing framework
- MongoDB team for the database solution
- Express.js community for the web framework
- Tailwind CSS for the utility-first CSS framework