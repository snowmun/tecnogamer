const Usuario = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Direccion = require('../model/direccionModel');
const DatosP = require('../model/datosPersonalesModel');
const Comuna = require('../model/comunaModel');
const Region = require('../model/regionModel');


const getUser = async( req,res) => {
    
    try {
        const {id} = req.params;
        if(id.length === 24){
            Usuario.findById(id).then((usuario)=>{
                if(!usuario){
                    return   res.status(409).json({  
                        "status":true,
                        "message":"no se encontro ningun usuario con la siguiente id",
                        "Data": id}); 
                }else{
                    const {_id,contrasena,__v,...resto}=usuario._doc
                    return  res.status(200).json({  
                        "status":true,
                        "message":"usuario encontrado",
                        "Data": resto}); 
                }
            });
    
        }else{
            return   res.status(409).json({  
                "status":true,
                "message":"El id del usuario es incorrecto",
                "Data": id}); 
        }
    } catch (error) {
        return   res.status(409).json({  
            "status":true,
            "message":"El id del usuario es incorrecto",
            "Data": error}); 
    }
};

const getAll = async(req,res) => {

    try{
        const allUser = await Usuario.find()
        return   res.status(200).json({  
            "status":true,
            "message":"Usuarios encontrados",
            "Data": allUser}); 
    }catch(error){
        res.json({message:error.message})
    }
};

const useregister = async (req, res) => {
    try {
        const {calle, numero, block, depto, piso,comunaId} = req.body; //Desestructuración de modelo dirección
        
        const {nombre, rut,correo,apellido,fono} = req.body; //Desestructuración de modelo datos personales

        const {contrasena} = req.body; //Desestructuración de modelo usuario

        if( calle !== '' 
            && numero !== '' 
            && nombre !== ''
            && rut !== ''
            && correo !== ''
            && apellido !== ''
            && contrasena !== '' ){

            const rut2 = await DatosP.find({rut});
    
            if(rut2.length > 0){
                return res.status(409).json({
                    "status":true,
                    "message":"El rut ya esta registrado",
                    "id_Data": rut
                });
            }
            
            let nombreUser = `${nombre.substr(nombre,2)}${apellido}`.toLowerCase(),
            usuario = '',
            contador = 1;
            
            do {
                usuario = await Usuario.find({nombreUsuario:nombreUser});

                if(usuario.length > 0) nombreUser += contador++;

            } while (usuario === '');

            
            bcrypt.hash(contrasena, 10, async(error, contrasenaHasheada) => {
                const nuevoDireccion = new Direccion({calle, numero, block, depto, piso, comunaId});
                const direccionBd = await nuevoDireccion.save();
                const nuevoDatosP = new DatosP({nombre, rut,correo, direccionId:direccionBd._id,apellido,fono});
                const datosPBd = await nuevoDatosP.save();
                const nuevoUsuario = new Usuario({nombreUsuario:nombreUser, contrasena:contrasenaHasheada, rol:1, datosPersoId:datosPBd._id});
                await nuevoUsuario.save().then((usuario) => {
                    res.status(200).json({
                    "status":true,
                    "message":"Usuario agregado correctamente",
                    "Data": usuario});
                  }).catch((error) => {
                      //console.log(error)
                    res.status(409).json({
                        "status":true,
                        "message":"El usuairo no fue agregado",
                        "Data": error});
                  });
            })
        }else{
            return res.status(409).json({
                "status":true,
                "message":"uno o más campos no han sido rellenados",
                "id_Data": req.body
            });
        }

        


        }catch (error) {
            return  res.status(409).json({  
                        "status":true,
                        "message":"El usuairo no fue agregado",
                        "Data": error});
    }
};

const userlogin = async( req,res) => {
   
    const {nombreUsuario,contrasena} = req.body;
    Usuario.findOne({nombreUsuario}).then((usuario)=>{
        if(!usuario){
            return res.status(409).json({
                "status":true,
                "message":" El usuario no fue encontraro ",
                "id_Data": nombreUsuario,
            })
        }
        bcrypt.compare(contrasena, usuario.contrasena).then((esCorrecta)=>{
            if(esCorrecta){
                const token = jwt.sign({ id:usuario.id , correo:usuario.correo }, 'moveraenv',{
                    expiresIn:'1m' /* 1 minuto */ 

                });
                return res.status(200).json({
                    "status":true,
                    "message":" Usuario Logeado correctamente ",
                    usuario:token
                })
            }else{
                return res.status(409).json({
                    "status":true,
                    "message":"  contraseña incorrecta ",
                })
            }
        })
    })
};

const deleteUser= async (req,res)=>{
    try {
        const id = req.params.id
        await Usuario.deleteOne({_id:id})
        return  res.status(200)({
            "status":true,
            "message":"Usuario Eliminado Correctamente",
            "id_Data": id
        })
    } catch (error) {
       return   res.status(409)({
            "status":true,
            "message":error,
        })
    }
};

const UpdateUser = async (req,res) =>{
    try {
        const id = req.params.id
        await Usuario.findByIdAndUpdate({_id:id},req.body)
        return res.status(200).json({
            "status":true,
            "message":"Registro Actualizado Correctamente",
            "id_Data": id
        })
    } catch (error) {
        return res.status(409).json({
            "status":true,
            "message":error,
        })
    }
};

module.exports = {
    getUser,useregister,userlogin,getAll,deleteUser,UpdateUser
}