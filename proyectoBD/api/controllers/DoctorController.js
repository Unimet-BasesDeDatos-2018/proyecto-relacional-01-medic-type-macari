/**
 * DoctorController
 *
 * @description :: Server-side logic for managing Doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	mostrarDoctor: function(req,res,next){
        Doctor.find({cedulaDoc:req.param('id')}).exec(function(err,Doctor){
            if(err){
                return res.json(500,{error: 'Some error ocurred'});
                console.log('El ID introducido no existe en la BD');
            }
            console.log(Doctor)
           res.view({
            Doctor:Doctor
           });
        })
    }
};

