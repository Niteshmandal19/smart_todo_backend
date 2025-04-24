const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const taskRoutes = require('./routes/taskRoutes');
const { scheduleTaskStatusUpdates } = require('./utils/taskStatusUpdater');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  'http://localhost:5176',
  'https://smart-todo-frontend-cwzmcuoa0-nitesh-mandals-projects.vercel.app/',
  'https://smart-todo-frontend-eo89sttqm-nitesh-mandals-projects.vercel.app/'
];

// Middleware
app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());

// Health check endpoint for Render
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync database models
    await sequelize.sync();
    console.log('Database models synchronized.');
    
    // Start the task status updater
    scheduleTaskStatusUpdates();
    console.log('Task status updater scheduled.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer();
