const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');


const RataModel = sequelize.define('rata', {
   
    cod_iscrizione: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    num_rata: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    importo: {
        type: Sequelize.DECIMAL(10, 0)
    },
    data: {
        type: Sequelize.DATE
    },
    metodo: {
        type: Sequelize.STRING
    },
    num_ricevuta: {
        type: Sequelize.STRING
    }
   
    
    
  },{ freezeTableName:true,createdAt: false,updatedAt: false});

  module.exports = RataModel;