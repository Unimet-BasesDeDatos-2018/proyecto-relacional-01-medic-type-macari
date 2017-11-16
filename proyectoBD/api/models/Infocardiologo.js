/**
 * Inforcardiologo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'infocardiologo',
  attributes: {
    idInforme: {
      type: "INTEGER",
      columnName: "idInforme"
    },
    frecuenciaCardiaca: {
      type: "INTEGER",
      columnName: "frecuenciaCardiaca"
    },
    tension: {
      type: "INTEGER",
      columnName: "tension"
    }
  }
};

