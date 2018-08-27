const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');


const IscrizioneModel = sequelize.define('iscrizione', {
   
    codice: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idcliente: {
        type: Sequelize.INTEGER
    },
    idcorso: {
        type: Sequelize.INTEGER
    },
    prezzo: {
        type: Sequelize.DECIMAL(10, 0)
    },
    esito_esame: {
        type: Sequelize.STRING
    },
   
    
    
  },{ freezeTableName:true,createdAt: false,updatedAt: false});

  module.exports = IscrizioneModel;