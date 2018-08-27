const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');


const CorsoModel = sequelize.define('corso', {
   
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    codice: {
        type: Sequelize.STRING
    },
    nome: {
      type: Sequelize.STRING
    },
    ore: {
        type: Sequelize.INTEGER
    },
    data_inizio: {
        type: Sequelize.DATE
    },
    inizio_stage: {
        type: Sequelize.DATE
    },
    luogo_stage: {
        type: Sequelize.STRING
    },
    data_fine: {
        type: Sequelize.DATE
    },
    data_termine10: {
        type: Sequelize.DATE
    },
    aula: {
        type: Sequelize.STRING
    },
    ora_inizio: {
        type: Sequelize.INTEGER
    },
    ora_fine: {
        type: Sequelize.INTEGER
    },
    data_esame: {
        type: Sequelize.DATE
    },
    note: {
        type: Sequelize.STRING
    }
    
    
  },{ freezeTableName:true,createdAt: false,updatedAt: false});

  module.exports = CorsoModel;