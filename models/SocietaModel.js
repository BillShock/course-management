const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');


const SocietaModel = sequelize.define('societa', {
   
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    rag_sociale: {
      type: Sequelize.STRING
    },
    rag_sociale2: {
        type: Sequelize.STRING
    },
    dvr: {
        type: Sequelize.DATE
    }
    
  },{ freezeTableName:true,createdAt: false,updatedAt: false});

  module.exports = SocietaModel;