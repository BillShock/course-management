
const Sequelize = require('sequelize');

  const sequelize = new Sequelize('course_management', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3308,
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
    // SQLite only
    storage: 'path/to/database.sqlite'
  });

  module.exports = sequelize;
  