/**
 * Intervenciones.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'intervenciones',
  attributes: {
    idintervenciones: {
      type: 'INTEGER',
      columnName: 'idcondiciones',
      primaryKey: true,
      autoIncrement: true
    },
    intervencion: {
      type: 'STRING',
      columnName: 'intervencion'
    }
  }
};

