const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

const Model = sequelize.define('fattura', {
   
    numero: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    anno: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    data: {
        type: Sequelize.DATE
    },
    prestazione: {
        type: Sequelize.STRING
    },
    importo: {
        type: Sequelize.DECIMAL(10, 3)
    },
    iva: {
        type: Sequelize.DECIMAL(10, 3)
    },
    con_cassa: {
        type: Sequelize.DECIMAL(10, 3)
    },
    ritenuta: {
        type: Sequelize.DECIMAL(10, 3)
    },
    bolli: {
        type: Sequelize.DECIMAL(10, 3)
    },
    totale: {
        type: Sequelize.DECIMAL(10, 3)
    },
    id_cliente: {
        type: Sequelize.INTEGER
    },
    
    
  },{ freezeTableName:true,createdAt: false,updatedAt: false});

  module.exports = Model;