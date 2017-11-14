/**
 * DoctorController
 *
 * @description :: Server-side logic for managing Doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	menu: function(req,res,next){
        Doctor.find({cedulaDoc:req.param('cedulaDoctor')}).exec(function(err,Doctor){
            if(err){
                return res.json(500,{error: 'Some error ocurred'});
                console.log('El ID introducido no existe en la BD');
            }
            console.log(Doctor)
           res.view({
            Doctor:Doctor
           });
        })
    }, 

    verHistoriaPaciente:  function(req,res){
		var q = 'select all informe.idInforme as informe, paciente.nombre as paciente, doctor.nombre as doctor, informe.fecha as fecha, informe.emergencia as emergencia, informe.sintomas as sintomas, enfermedad.Nombre as enfermedad, informe.tratamiento as tratamiento from paciente inner join informe on paciente.idPaciente=informe.pacienteAtendido left JOIN informe_has_medicamento on informe.idInforme=informe_has_medicamento.Informe_idInforme left join medicamento on medicamento.idMedicamento= informe_has_medicamento.Medicamento_idMedicamento inner join enfermedad on informe.diagnostico=enfermedad.idEnfermedad inner join doctor on informe.doctorTratante=doctor.idDoctor where paciente.cedulaPaciente=?';
		var inf = Paciente.query(q,[req.param('cedulaPaciente')],function(errr,historia){
			if (errr){
				sails.log(errr);
				return;
			}
			inf = JSON.parse(JSON.stringify(historia));
			sails.log('informe.json ');
			sails.log(inf);
			sails.log(inf[0]);
			res.view({
				historia:inf
			});
		});
	},

	verMedicamentos:	function(req,res){
		sails.log('req');	
		sails.log(req.param('compuestoActivo'));
		var q = "select medicamento.nombre as medicamento, compuestoactivo.nombre as compuestoActivo, medicamento.efectosSecundarios as efectosSecundarios  from compuestoactivo inner join medicamento on medicamento.compuestoActivo=compuestoactivo.idCompuestoActivo where compuestoactivo.nombre='"+req.param('compuestoActivo')+"'";
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
	}
	
};

