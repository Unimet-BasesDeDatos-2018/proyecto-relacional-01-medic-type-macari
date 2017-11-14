/**
 * Paciente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
   connection: 'mysql',
  tableName : 'paciente',
attributes:{
      id: {
          type: 'INTEGER',
          columnName: 'idPaciente',
          primaryKey: true,
          autoIncrement: true
      },
      cedulaPa:{
          type: 'INTEGER',
          columnName: 'cedulaPaciente',
          unique: true
      },
      nombre: 'STRING',
      sexo: 'STRING',
      fechaNacimiento: 'DATE',
      tipoSangre: 'STRING'
  }
};


