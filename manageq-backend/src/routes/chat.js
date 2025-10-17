import express from 'express';
import { getChatMessages, sendMessage } from '../controllers/chatController.js';
import { authenticate } from '../middleware/auth.js';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getChatMessages);
router.post('/', [
  body('message')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  handleValidationErrors
], sendMessage);

export default router;