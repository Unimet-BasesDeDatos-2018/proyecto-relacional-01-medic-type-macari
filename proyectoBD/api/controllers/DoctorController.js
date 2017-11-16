/**
 * DoctorController
 *
 * @description :: Server-side logic for managing Doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	menu: function(req,res,next){
        Doctor.findOne({cedulaDoc:req.param('cedulaDoctor')}).exec(function(err,Doctor){
            if(err){
                return res.json(500,{error: 'Some error ocurred'});
                sails.log('El ID introducido no existe en la BD');
            }
            sails.log(Doctor)
           res.view({
            Doctor:Doctor
           });
        })
	},
	
	registrar: function(req,res,next){
		q = 'select * from especialidad';
		Especialidad.query(q,function(err,esp){
			if(err){
				sails.log(err);
				return;
			}
			var especialidad = JSON.parse(JSON.stringify(esp));
			res.view({
				especialidad: especialidad
			})
		})
	},

	registrado: function(req,res){
		var esp;
		if(req.param('especialidad')>0){
			esp = req.param('especialidad');
		}
		else{
			esp = null;
		}
		Doctor.create({
			cedulaDoc: req.param('cedulaDoc'),
			nombre: req.param('nombre'),
			sexo: req.param('sexo'),
			fechaNacimiento: (sails.moment(req.param('fechaNacimiento')).format("YYYY-MM-DD")),
			especialidad: esp
		}).exec(function(err,Doctor){
			if(err){
				sails.log(err);
				return;
			}
			sails.log(Doctor);
			res.redirect("/");
		})
	},

    verHistoriaPaciente:  function(req,res){
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

	verMedicamentos:	function(req,res){
		sails.log('req');	
		sails.log(req.param('compuestoActivo'));
		var q = "select medicamento.idMedicamento as id, medicamento.nombre as medicamento, compuestoactivo.nombre as compuestoActivo, medicamento.efectosSecundarios as efectosSecundarios  from compuestoactivo inner join medicamento on medicamento.compuestoActivo=compuestoactivo.idCompuestoActivo where compuestoactivo.nombre='"+req.param('compuestoActivo')+"'";
		var inf = CompuestoActivo.query(q,function(errr,medicamento){
			if(errr){
				sails.log(errr);
				return;
			}
			sails.log(medicamento);
			inf = JSON.parse(JSON.stringify(medicamento));
			sails.log('lista de medicamentos');
			sails.log(inf);
			var aux = req.param('compuestoActivo');
			aux = JSON.parse(JSON.stringify(aux));
			res.view({
				medicina:inf,
				compuesto:aux
			})
		})
	},

	registrarMedicamento: function(req,res){
		var q = 'SELECT * from compuestoactivo';
		CompuestoActivo.query(q,function(err,comp){
			if(err){
				sails.log(err);
				return;
			}
			var compuesto = JSON.parse(JSON.stringify(comp));
			sails.log('compuestos');
			sails.log(compuesto);
			res.view({
				compuesto:compuesto
			})
		})
	},

	medicamentoConCompuesto: function(req,res){
		Medicamento.create(req.params.all()).exec(function(err,med){
			if(err){
				sails.log(err);
			}
			console.log(med);
			res.redirect("/");
		})
	},

	registrarCompuestoActivo: function(req,res){
		CompuestoActivo.create(req.params.all()).exec(function(err,comp){
			if(err){
				sails.log(err);
				return;
			}
			res.redirect("/");
		})
	}, 

	evitarCompuesto: function(req,res){
		var q = "select medicamento.nombre as medicamento, medicamento.efectosSecundarios as efectosSecundarios, compuestoactivo.nombre as compuesto from compuestoactivo inner join medicamento on medicamento.compuestoActivo= compuestoactivo.idCompuestoActivo where not compuestoactivo.nombre = '"+req.param('compuestoActivo')+"'";
		Medicamento.query(q,function(err,med){
			if(err){
				sails.log(err);
				return;
			}
			var medicina =JSON.parse(JSON.stringify(med));
			sails.log("medicamentos");
			sails.log(medicina);
			res.view({
				medicina: medicina
			})
		})
	},

	nuevoInforme: function(req,res){
		sails.log(req.param('cedulaDoc'));

		var q = "select doctor.idDoctor as idDoctor, especialidad.idespecialidad as especialidad from doctor inner join especialidad on doctor.especialidad = especialidad.idespecialidad where doctor.cedulaDoctor="+req.param('cedulaDoc');
		var qq = "select enfermedad.idEnfermedad as idEnfermedad, enfermedad.Nombre as nombreEnfermedad from enfermedad";
		var qqq = "select medicamento.idMedicamento as idMedicamento, medicamento.nombre as nombreMedicamento from medicamento"
		Doctor.query(q,function(err,doc){
			if(err){
				sails.log(err);
				return;
			}
			var doctor = JSON.parse(JSON.stringify(doc));
			sails.log(doctor);
			Enfermedad.query(qq,function(err,enfer){
				if(err){
					sails.log(err);
					return;
				}
				var enfermedad = JSON.parse(JSON.stringify(enfer));
				sails.log(enfermedad);
				Medicamento.query(qqq,function(err,meds){
					if(err){
						sails.log(err);
						return;
					}
					var medicamento = JSON.parse(JSON.stringify(meds));
					sails.log(medicamento);
					res.view({
						Doctor: doctor,
						Enfermedad: enfermedad,
						Medicamento: medicamento
					})
				})
			})
		})
	},

	informeCreado: function(req,res){
		var especial = req.param('especialidad');
		sails.log('especialidad');
		sails.log(typeof especial);
		var a = sails.moment();
		var fecha = new Date();
		var emer = 0;
		if(req.param('emergencia')===1){
			emer = 1;
		}
		sails.log(fecha);
		Paciente.findOne({cedulaPa:req.param('cedulaPa')}).exec(function(err,Paciente){
			if(err){
				sails.log(err);
				return;
			}
			else{
				sails.log('1');
				Informe.create({
					idDoctor: req.param('idDoctor'),
					idPaciente: Paciente.id,
					fecha: fecha,
					emergencia: emer,
					sintomas: req.param('sintomas'),
					diagnostico: req.param('enfermedad'),
					tratamiento: req.param('tratamiento')
				}).exec(function(err,inf){
					if(err){
						sails.log(err);
						return;
					}
					else{
						var idDelInf = inf.id;
						sails.log('2');
						Informe_has_medicamento.create({
							Informe_idInforme: idDelInf,
							Medicamento_idMedicamento: req.param('medicamento'),
							Dosis: req.param('dosis')	
						}).exec(function(err,infmed){
							if(err){
								sails.log(err);
								return;
							}
							else{
								sails.log('3');
								Enfermedad_has_informe.create({
									enfermedad_idEnfermedad: req.param('enfermedad'),
									informe_idInforme: idDelInf
								}).exec(function(err,infenf){
									if(err){
										sails.log(err);
										return;
									}
									else{
										//cirujano
										sails.log('4');
										if(especial==='1'){
											Infocirujano.create({
												idInforme: idDelInf,
												motivoOperacion: req.param('motivoOperacion'),
												examenesPreOperatorio: req.param('examenesPreOperatorio'),
												diagnosticoPreOperatorio: req.param('diagnosticoPreOperatorio')
											}).exec(function(err,infoCir){
												if(err){
													sails.log(err);
													return;
												}
												sails.log('cirujano');
												//res.redirect("/")
											})
										}
										//pediatra
										if(especial==='2'){
											Infopediatra.create({
												idInforme: idDelInf,
												colegio: req.param('colegio'),
												aspectosIntelectuales: req.param('aspectosIntelectuales'),
												aspectosDesarrolloMotor: req.param('aspectosDesarrolloMotor'),
												aspectosEmocionales: req.param('aspectosEmocionales')
											}).exec(function(err,infoPed){
												if(err){
													sails.log(err);
													return;
												}
												sails.log('pediatra');
												//res.redirect("/");
											})
										}
										//dermatologo
										if(especial==='3'){
											Infodermatologo.create({
												idInforme: idDelInf,
												examenFisico: req.param('examenFisico'),
												diagnosticoPrimario: req.param('diagnosticoPrimario')
											}).exec(function(err,infoDer){
												if(err){
													sails.log(err);
													return;
												}
												sails.log('dermatologo');
												//res.redirect("/");
											})
										}
										//cardiologo
										if(especial==='4'){
											Infocardiologo.create({
												idInforme: inf.id,
												frecuenciaCardiaca: req.param('frecuenciaCardiaca'),
												tension: req.param("tension")
											}).exec(function(err,cardioInf){
												if(err){
													sails.log(err);
													return;
												}
												sails.log('cardiologo');
												//res.redirect("/")
											})
										}
										//si no tiene especializacion
										sails.log('sin esp');
										res.redirect("/");
									}
								})
							}
						})
					}
				})
			}
		})
	}
};

