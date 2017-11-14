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
			
			res.view({
				Paciente:Paciente
			});
		})
	},

	//create
	registrado: function(req,res){
		//var paciente={cedulaPa:req.param('cedulaPaciente'),nombre:req.param('nombrePaciente'),sexo:req.param('sexoPaciente'),fechaNacimiento:req.param('fechaNacimiento'),tipoSangre:req.param('tipoSangre')};
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
		var q = 'select all informe.idInforme as informe, paciente.nombre as paciente, doctor.nombre as doctor, informe.fecha as fecha, informe.emergencia as emergencia, informe.sintomas as sintomas, enfermedad.Nombre as enfermedad, informe.tratamiento as tratamiento from paciente inner join informe on paciente.idPaciente=informe.pacienteAtendido left JOIN informe_has_medicamento on informe.idInforme=informe_has_medicamento.Informe_idInforme left join medicamento on medicamento.idMedicamento= informe_has_medicamento.Medicamento_idMedicamento inner join enfermedad on informe.diagnostico=enfermedad.idEnfermedad inner join doctor on informe.doctorTratante=doctor.idDoctor where paciente.cedulaPaciente=?';
		var inf = Paciente.query(q,[req.param('cedulaPaciente')],function(errr,historia){
			if (errr){
				sails.log(errr);
				return;
			}
			sails.log(historia);
			inf = JSON.parse(JSON.stringify(historia));
			sails.log('informe.json ');
			sails.log(inf);
			sails.log('taco');
			res.view({
				historia:inf
			});
		});
		
	}
	
};
