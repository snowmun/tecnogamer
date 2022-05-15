const Usuario = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const getAll = async(req,res) => {

    try{
        const allUser = await Usuario.find()
        res.status(200).json(allUser)
    }catch(error){
        res.json({message:error.message})
    }
};


const register = async (req, res) => {
    try {
        console.log(req.body)
        const {nombreUsuario, nombre,apellido, correo, contrasena,rol} = req.body;
        Usuario.findOne({ nombreUsuario }).then((usuario) => {
          if (usuario) {
            return res.status(409).json({ mensaje:`Ya existe un usuario con el siguiente correo ${correo}` });
          } else {
            bcrypt.hash(contrasena, 10, (error, contrasenaHasheada) => {
              
              const nuevoUsuario = new Usuario({
                nombreUsuario, nombre,apellido, correo,rol,
                  contrasena: contrasenaHasheada,
                });
                
                nuevoUsuario
                  .save()
                  .then((usuario) => {
                    res.status(200).json({  
                    "status":true,
                    "message":"Usuario agregado correctamente",
                    "Data": nuevoUsuario});
                  })
                  .catch((error) => console.error(error));

            });
          }
        });
    } catch (error) {
        console.error(error)
    }
};


module.exports={
    register,getAll
}