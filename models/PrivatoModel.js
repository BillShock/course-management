const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');


const PrivatoModel = sequelize.define('privato', {
   
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nome: {
      type: Sequelize.STRING
    },
    cognome: {
        type: Sequelize.STRING
    },
    data_nascita: {
        type: Sequelize.DATE
    },
    cf: {
        type: Sequelize.STRING
    },
    
    
  },{ freezeTableName:true,createdAt: false,updatedAt: false});

  module.exports = PrivatoModel;