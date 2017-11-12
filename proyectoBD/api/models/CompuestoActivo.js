/**
 * CompuestoActivo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'CompuestoActivo',
  attributes: {
    idCompuestoActivo: {
      type: 'INTEGER',
      columnName: 'idCompuestoActivo',
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: 'string',
      columnName: 'nombre'
    }
  }
};

