/**
 * Infopediatra.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'infopediatra',
  attributes: {
    idInforme: {
      type: "INTEGER",
      columnName: "idInforme"
    },
    colegio: {
      type: 'STRING',
      columnName: 'colegio'
    },
    aspectosIntelectuales: {
      type: 'TEXT',
      columnName: 'aspectosIntelectuales'
    },
    aspectosDesarrolloMotor: {
      type: 'TEXT',
      columnName: 'aspectosDesarrolloMotor'
    },
    aspectosEmocionales: {
      type: 'TEXT',
      columnName: 'aspectosEmocionales'
    }
  }
};

