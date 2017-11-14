/**
 * Medicamento.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'medicamento',
  attributes: {
      idMedicamento : {
        type: 'INTEGER',
        columnName: 'idMedicamento',
        primaryKey: true,
        autoIncrement: true
      },
      nombreMedicamento: {
        type: 'string',
        columnName: 'nombre',
        required: true
      },
      compuestoActivo: {
        type: 'INTEGER',
        columnName: 'compuestoActivo',
      },
      efectosSecundarios: {
        type: 'string',
        columnName: 'efectosSecundarios'
      }
  }
};

