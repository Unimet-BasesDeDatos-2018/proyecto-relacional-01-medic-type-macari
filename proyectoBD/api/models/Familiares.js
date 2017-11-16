/**
 * Familiares.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'familiares',
  attributes: {
    id: {
      type: 'INTEGER',
      columnName: 'idFamiliar',
      primaryKey: true,
      autoIncrement: true
    },
    idPaciente: {
      type: 'INTEGER',
      columnName: 'idPaciente',
      
    },
    nombre: {
      type: 'STRING',
      columnName: 'nombre'
    },
    Parentezco: {
      type: 'STRING',
      columnName: 'Parentezco'
    }
  }
};

