const cron = require('node-cron');
const { Task } = require('../models');
const { updateTaskStatus } = require('../controllers/taskController');

// Function to update all task statuses
const updateAllTaskStatuses = async () => {
  try {
    const tasks = await Task.findAll();
    for (const task of tasks) {
      await updateTaskStatus(task);
    }
    console.log('Task statuses updated successfully');
  } catch (error) {
    console.error('Error updating task statuses:', error);
  }
};

// Schedule cron job to run every minute
const scheduleTaskStatusUpdates = () => {
  cron.schedule('* * * * *', () => {
    console.log('Running task status update check...');
    updateAllTaskStatuses();
  });
};

module.exports = {
  updateAllTaskStatuses,
  scheduleTaskStatusUpdates
}; 