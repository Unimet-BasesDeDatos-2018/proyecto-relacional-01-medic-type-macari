/**
 * Infodermatologo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'infodermatologo',
  attributes: {
    idInforme: {
      type: "INTEGER",
      columnName: "idInforme"
    },
    examenFisico: {
      type: "TEXT",
      columnName: "examenFisico"
    },
    diagnosticoPrimario: {
      type: "TEXT",
      columnName: "diagnosticoPrimario"
    }
  }
};

