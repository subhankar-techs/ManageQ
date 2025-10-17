import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  isUser: {
    type: Boolean,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

chatMessageSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('ChatMessage', chatMessageSchema);