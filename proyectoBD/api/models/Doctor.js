/**
 * Doctor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'doctor',
attributes:{
      id: {
          type: 'INTEGER',
          columnName: 'idDoctor',
          primaryKey: true,
          autoIncrement: true
      },    
      cedulaDoc:{
          type: 'INTEGER',
          columnName: 'cedulaDoctor'
      },
      nombre: {
          type:'STRING',
          columnName: 'nombre'
      },
      sexo: {
          type: 'STRING',
          columnName: 'sexo'  
      },
      fechaNacimiento: {
          type: 'DATE',
          columnName: 'fechaNacimiento'
      },
      especialidad: {
          type: 'INTEGER',
          columnName: 'especialidad'
      }
  }
};

