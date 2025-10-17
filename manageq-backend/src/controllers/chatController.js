import ChatMessage from '../models/ChatMessage.js';

export const getChatMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ userId: req.user._id })
      .sort({ createdAt: 1 })
      .limit(100)
      .lean();

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Save user message
    const userMessage = new ChatMessage({
      message,
      isUser: true,
      userId: req.user._id
    });
    await userMessage.save();

    // Generate AI response (simplified)
    const aiResponse = generateAIResponse(message);
    
    const aiMessage = new ChatMessage({
      message: aiResponse,
      isUser: false,
      userId: req.user._id
    });
    await aiMessage.save();

    res.json({
      userMessage,
      aiMessage
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const generateAIResponse = (userMessage) => {
  const responses = [
    "I understand you're working on task management. How can I help you organize your tasks better?",
    "That's a great question! Let me help you with your task planning.",
    "I can help you prioritize your tasks. Would you like me to suggest a priority order?",
    "Task management is important for productivity. What specific area would you like to focus on?",
    "I'm here to assist with your task organization. What would you like to accomplish today?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};