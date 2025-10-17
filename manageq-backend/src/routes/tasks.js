import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, getTaskStats } from '../controllers/taskController.js';
import { validateTask } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/stats', getTaskStats);
router.get('/', getTasks);
router.post('/', validateTask, createTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

export default router;