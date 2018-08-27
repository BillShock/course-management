const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');


const ClienteModel = sequelize.define('cliente', {
   
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    indirizzo: {
        type: Sequelize.STRING
    },
    civico: {
        type: Sequelize.STRING
    },
    cap: {
        type: Sequelize.DATE
    },
    citta: {
        type: Sequelize.STRING
    },
    p_iva: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    note: {
        type: Sequelize.STRING
    },
    
    
  },{ freezeTableName:true,createdAt: false,updatedAt: false});

  module.exports = ClienteModel;