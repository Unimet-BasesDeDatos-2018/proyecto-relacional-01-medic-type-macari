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
		var q = 'select all Informe.idInforme as informe, Paciente.nombre as paciente, Doctor.nombre as doctor, Informe.fecha as fecha, Informe.emergencia as emergencia, Informe.sintomas as sintomas, Enfermedad.Nombre as enfermedad, Informe.tratamiento as tratamiento, Informe.notas as notas from Paciente  inner join Informe on Paciente.idPaciente=Informe.pacienteAtendido left JOIN Informe_has_Medicamento on Informe.idInforme=Informe_has_Medicamento.Informe_idInforme left join Medicamento on Medicamento.idMedicamento= Informe_has_Medicamento.Medicamento_idMedicamento inner join Enfermedad on Informe.diagnostico=Enfermedad.idEnfermedad inner join Doctor on Informe.doctorTratante=Doctor.idDoctor where cedulaPaciente=?';
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
		var q = "select Medicamento.nombre as medicamento, CompuestoActivo.nombre as compuestoActivo from CompuestoActivo inner join Medicamento on Medicamento.compuestoActivo=CompuestoActivo.idCompuestoActivo where CompuestoActivo.nombre='"+req.param('compuestoActivo')+"'";
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
		var q = 'SELECT * from CompuestoActivo';
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

