const sequelize = require('../config/database');
const Task = require('./Task');

// Define associations if needed
// Task.belongsTo(User);
// User.hasMany(Task);

module.exports = {
  sequelize,
  Task
}; 