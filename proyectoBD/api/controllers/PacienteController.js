/**
 * PacienteController
 *
 * @description :: Server-side logic for managing Pacientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	mostrarPaciente: function(req,res,next){
        Paciente.find({cedulaPa:req.param('id')}).exec(function(err,Paciente){
            if(err){
                return res.json(500,{error: 'Some error ocurred'});
                console.log('El ID introducido no existe en la BD');
            }
            console.log(Paciente)
           // res.redirect('/Paciente/mostrarPaciente/'+Paciente.id);
           res.view({
            Paciente:Paciente
           });
        })
    },

	menu: function(req,res,next){
		Paciente.findOne({cedulaPa:req.param('cedulaPaciente')}).exec(function(err,Paciente){
			sails.log(Paciente);
			if(err || Paciente===undefined || Paciente===null){
				sails.log(err);
			}
			else{
				var q = 'select * from especialidad';
				Especialidad.query(q,function(err,esp){
					if(err){
						sails.log(err);
						return;
					}
					var especialidad = JSON.parse(JSON.stringify(esp));
					res.view({
						especialidad: especialidad,
						Paciente: Paciente
					})
				});
			}
			
		});
	},

	//create
	registrado: function(req,res){
		Paciente.create(req.params.all()).exec(function(err,paciente){
			if (err){
				console.log(err);
			}
			console.log(paciente);

			res.redirect("/");
		})
	},

	revisarDatos: function(req,res){
		Paciente.findOne({cedulaPa:req.param('cedulaPaciente')}).exec(function(err,Paciente){
			if(err){
				sails.log(err);
			}
			var fechaFormateada = sails.moment(Paciente.fechaNacimiento).format("YYYY-MM-DD");
			var jsonFecha = JSON.parse(JSON.stringify(fechaFormateada));
			sails.log(jsonFecha);
			console.log(jsonFecha);
			res.view({
				Paciente:Paciente,
				Fecha: jsonFecha
			});
		})
	},

	actualizar: function(req,res){
		var fechaFormateada = sails.moment(req.param('fechaNacimiento')).format('YYYY-MM-DD');
		sails.log('fecha de nacimiento');
		sails.log(fechaFormateada)
		Paciente.update({cedulaPa:req.param('cedulaPa')},
		{nombre:req.param('nombre'),
		 sexo:req.param('sexo'),
		 fechaNacimiento:fechaFormateada,
		 tipoSangre:req.param('tipoSangre')
		}).exec(function(err,Paciente){
			if(err){
				sails.log(err);
			}
			sails.log(Paciente);
			sails.log('succes');
			res.redirect('/');
		});
	},

	verInformes: function(req,res){
		var q = `select all informe.idInforme as informe, paciente.nombre as paciente, doctor.nombre as doctor, 
		doctor.especialidad as especialidad, informe.fecha as fecha, informe.emergencia as emergencia,
		informe.sintomas as sintomas, enfermedad.Nombre as enfermedad, informe.tratamiento as tratamiento,
		medicamento.nombre as medicamento, informe_has_medicamento.Dosis as dosis,
		infocardiologo.frecuenciaCardiaca as frecCardiaca, infocardiologo.tension as tension,
		infocirujano.diagnosticoPreOperatorio as diagnosticoPreO, infocirujano.examenesPreOperatorio as examenesPreO,
		infocirujano.motivoOperacion as motivoOp, infodermatologo.diagnosticoPrimario as diagPrim,
		infodermatologo.examenFisico as examFisico, infopediatra.aspectosIntelectuales as intelectuales,
		infopediatra.aspectosEmocionales as emocionales, infopediatra.aspectosDesarrolloMotor as motores
		from paciente left join informe on paciente.idPaciente=informe.pacienteAtendido 
		left join infocardiologo on informe.idInforme = infocardiologo.idInforme
		left join infocirujano on informe.idInforme = infocirujano.idInforme
		left join infodermatologo on informe.idInforme = infodermatologo.idInforme
		left join infopediatra on informe.idInforme = infopediatra.idInforme
		left JOIN informe_has_medicamento on informe.idInforme=informe_has_medicamento.Informe_idInforme 
		left join medicamento on medicamento.idMedicamento= informe_has_medicamento.Medicamento_idMedicamento 
		inner join enfermedad on informe.diagnostico=enfermedad.idEnfermedad 
		inner join doctor on informe.doctorTratante=doctor.idDoctor 
		where paciente.cedulaPaciente=?`;
		var qq = `select condiciones.* from paciente
		inner join paciente_has_condiciones on paciente.idPaciente = paciente_has_condiciones.idpaciente
		inner join condiciones on paciente_has_condiciones.idcondiciones = condiciones.idcondiciones
		where paciente.cedulaPaciente=?`
		var qqq = `select intervenciones.* from paciente
		inner join paciente_has_intervenciones on paciente.idPaciente = paciente_has_intervenciones.idpaciente
		inner join intervenciones on paciente_has_intervenciones.idintervenciones = intervenciones.idintervenciones
		where paciente.cedulaPaciente=?`
		var inf = Paciente.query(q,[req.param('cedulaPaciente')],function(errr,historia){
			if (errr){
				sails.log(errr);
				return;
			}
			else{
				inf = JSON.parse(JSON.stringify(historia));
				sails.log(inf);
				Paciente.query(qq,[req.param('cedulaPaciente')],function(err,cond){
					if(err){
						sails.log(err);
						return;
					}
					else{
						var condiciones = JSON.parse(JSON.stringify(cond));
						sails.log(condiciones);
						Paciente.query(qqq,[req.param('cedulaPaciente')],function(err,inter){
							if(err){
								sails.log(err);
								return err;
							}
							else{
								var intervenciones = JSON.parse(JSON.stringify(inter));
								sails.log(intervenciones);
								res.view({
									historia: inf,
									condicion: condiciones,
									intervenciones: intervenciones
								})
							}
						})
					}
				})
			}
		});
	},

	condiciones: function(req,res){
		var padece;
		var cond;
		var queryPadece = "select paciente_has_condiciones.idcondiciones as id from paciente inner join paciente_has_condiciones on paciente.idPaciente=paciente_has_condiciones.idpaciente inner join condiciones on paciente_has_condiciones.idcondiciones = condiciones.idcondiciones where paciente.cedulaPaciente="+req.param('cedulaPaciente');
		var queryCondiciones = "select condiciones.idcondiciones as id, condiciones.nombre as nombre from condiciones";
		Paciente.query(queryPadece,function(err,padecimientos){
			if(err){
				sails.log('taco');
				sails.log(err);
				return;
			}
			else{
				padece = JSON.parse(JSON.stringify(padecimientos));
				Condiciones.query(queryCondiciones,function(err,condiciones){
					if(err){
						sails.log('taco');
						sails.log(err);
						return;
					}
					cond = JSON.parse(JSON.stringify(condiciones));
					sails.log(padece);
					sails.log(cond);
					res.view({
						padece: padece,
						condiciones: cond
					})
				});
			}
		});
	},

	intervenciones: function(req,res){
		var intervenido;
		var intervenciones;
		var queryIntervenido = "select paciente_has_intervenciones.idintervenciones as id from paciente inner join paciente_has_intervenciones on paciente.idPaciente=paciente_has_intervenciones.idpaciente inner join intervenciones on paciente_has_intervenciones.idintervenciones = intervenciones.idintervenciones where paciente.cedulaPaciente="+req.param('cedulaPaciente');
		var queryIntervenciones = "select intervenciones.idintervenciones as id, intervenciones.intervencion as nombre from intervenciones";
		Paciente.query(queryIntervenido,function(err,inter){
			if(err){
				sails.log(err);
				return;
			}
			else{
				intervenido = JSON.parse(JSON.stringify(inter));
				Intervenciones.query(queryIntervenciones,function(err,interven){
					if(err){
						sails.log(err);
						return;
					}
					intervenciones = JSON.parse(JSON.stringify(interven));
					res.view({
						intervenido: intervenido,
						intervenciones: intervenciones
					})
				})
			}
		})
	},

	buscarMedicos: function(req,res){
		if(req.param('especialidad')>0){
			var q = 'select doctor.cedulaDoctor as cedula, doctor.nombre as nombre, especialidad.especialidad as especialidad from doctor inner join especialidad on doctor.especialidad = especialidad.idespecialidad where especialidad.idespecialidad ='+req.param('especialidad');
			Doctor.query(q,function(err,docs){
				if(err){
					sails.log(err);
					return;
				}
				res.view({
					doctor: docs
				})
			})
		}
		else{
			var q = 'select doctor.cedulaDoctor as cedula, doctor.nombre as nombre from doctor where doctor.especialidad is null';
			Doctor.query(q,function(err,docs){
				if(err){
					sails.log(err);
					return;
				}
				res.view({
					doctor: docs
				})
			})

		}
	},

	verFamiliares: function(req,res){
		var q = 'select familiares.idFamiliar as idFamiliar, familiares.nombre as nombreFamiliar, familiares.Parentezco as parentezco from paciente inner join familiares on paciente.idPaciente = familiares.idPaciente where paciente.cedulaPaciente='+req.param('cedulaPaciente');
		Paciente.query(q,function(err,pa){
			if(err){
				sails.log(err);
				return;
			}
			var fam = JSON.parse(JSON.stringify(pa));
			sails.log(fam);
			res.view({
				familiar: fam
			})
		})
	},

	eliminarFamiliar: function(req,res){
		Familiares.destroy({id: req.param('id')}).exec(function(err,del){
			if(err){
				sails.log('taco');
				sails.log(err);
				return;
			}
			sails.log('eliminado');
			res.redirect("/");
		});
	}
	
};
