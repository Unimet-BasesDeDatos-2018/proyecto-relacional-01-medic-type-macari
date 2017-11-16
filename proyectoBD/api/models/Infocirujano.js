/**
 * Infocirujano.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'infocirujano',
  attributes: {
    idInforme: {
      type: "INTEGER",
      columnName: "idInforme"
    },
    motivoOperacion:{
      type: "TEXT",
      columnName: "motivoOperacion"
    },
    examenesPreOperatorio: {
      type: "TEXT",
      columnName: "examenesPreOperatorio"
    },
    diagnosticoPreOperatorio: {
      type: "TEXT",
      columnName: "diagnosticoPreOperatorio"
    }
  }
};

