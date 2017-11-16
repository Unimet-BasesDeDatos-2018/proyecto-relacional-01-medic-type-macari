/**
 * Enfermedad_has_informe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'mysql',
  tableName : 'enfermedad_has_informe',
  attributes: {
    enfermedad_idEnfermedad: {
      type: "INTEGER",
      columnName: "enfermedad_idEnfermedad"
    },
    informe_idInforme: {
      type: "INTEGER",
      columnName: "informe_idInforme"
    }
  }
};

