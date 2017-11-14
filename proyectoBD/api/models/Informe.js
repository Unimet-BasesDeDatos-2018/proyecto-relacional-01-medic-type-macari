/**
 * Informe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'informe',
attributes:{
      id: {
        type: 'INTEGER',
        columnName: 'idInforme',
        primaryKey: true,
        autoIncrement: true,
        required: true

      },
      idDoctor:{
        type:'INTEGER',
        columnName: 'doctorTratante',
        required: true
      },

      idPaciente:{
          type: 'INTEGER',
          columnName: 'pacienteAtendido',
          required: true
      },
      fecha:  {
          type: 'DATE',
          //required: true,
          columnName: 'fecha'
      },
      emergencia:{
        type: 'BOOLEAN',
        required: true,
        columnName: 'emergencia'
      },
      sintomas:{
        type: 'TEXT',
        columnName: 'sintomas'
      },
      diagnostico: {
        type: 'INTEGER',
        columnName: 'diagnostico'
      },
      tratamiento: {
        type: 'TEXT',
        columnName: 'tratamiento'
      },
      notas: {
        type: 'TEXT',
        columnName: 'tratamiento'
      }
  }
};

