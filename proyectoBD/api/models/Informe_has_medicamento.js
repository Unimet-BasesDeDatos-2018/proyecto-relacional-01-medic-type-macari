/**
 * Informe_has_medicamento.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'informe_has_medicamento',
  attributes: {
    Informe_idInforme: {
      type: "INTEGER",
      columnName: 'Informe_idInforme'
    },
    Medicamento_idMedicamento: {
      type: "INTEGER",
      columnName: 'Medicamento_idMedicamento'
    },
    Dosis: {
      type: "INTEGER",
      columnName: "Dosis"
    }
  }
};

