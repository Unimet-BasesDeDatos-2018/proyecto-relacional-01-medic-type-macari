/**
 * Especialidad.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'especialidad',
  attributes: {
    id: {
      type: 'INTEGER',
      columnName: 'idespecialidad',
      primaryKey: true,
      autoIncrement: true
    },    
    nombreEspecialidad:{
      type: 'STRING',
      columnName: 'especialidad'
    }
  }
};

