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
			//window.alert("Usted ha sido registrado exitpsamente");
			res.redirect("/");
		})
	},

	revisarDatos: function(req,res){
		Paciente.findOne({cedulaPa:req.param('cedulaPaciente')}).exec(function(err,Paciente){
			if(err){
				sails.log(err);
			}
			res.view({
				Paciente:Paciente
			});
		})
	},

	actualizar: function(req,res){
		var cedula = req.param('cedulaPa');
		sails.log('cedula '+cedula);
		Paciente.update({cedulaPa:req.param('cedulaPa')},
		{nombre:req.param('nombre'),
		 sexo:req.param('sexo'),
		 //fechaNacimiento:req.param('fechaNacimiento'),
		 tipoSangre:req.param('tipoSangre')
		}).exec(function(err,Paciente){
			if(err){
				sails.log(err);
			}
			sails.log(Paciente);
			sails.log('succes');
			res.redirect('/');
		});
	}
	
};
