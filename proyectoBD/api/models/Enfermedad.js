/**
 * Enfermedad.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'enfermedad',
  attributes: {
    idEnfermedad: {
      type: 'INTEGER',
      columnName: 'idEnfermedad',
      primaryKey: true,
      autoIncrement: true
    },    
    nombre:{
      type: 'STRING',
      columnName: 'nombre'
    },
    Descripcion: 'TEXT'
  }
};

