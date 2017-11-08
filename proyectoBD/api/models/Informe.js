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
  tableName : 'Informe',
attributes:{
      id: {
        type: 'INTEGER',
        columnName: 'idInforme',
        primaryKey: true,
        autoIncrement: true
      },
      cedulaDoctor:{
        type:'INTEGER',
        columnName: 'doctorTratante'
      },

      cedulaPaciente:{
          type: 'INTEGER',
          columnName: 'cedulaPaciente'
      },
      tratamiento: 'STRING'
  }
};

