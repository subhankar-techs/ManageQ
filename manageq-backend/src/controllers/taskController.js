import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const { status, priority, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    const filter = { userId: req.user._id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .lean();

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const taskData = { ...req.body, userId: req.user._id };
    const task = new Task(taskData);
    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const stats = await Task.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
          },
          todo: {
            $sum: { $cond: [{ $eq: ['$status', 'todo'] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats[0] || { total: 0, completed: 0, inProgress: 0, todo: 0 };
    result.completionRate = result.total > 0 ? (result.completed / result.total) * 100 : 0;

    res.json({ stats: result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};