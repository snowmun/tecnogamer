const Usuario = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const getUser = async( req,res) => {
    
    try {
        const {id} = req.params;
        if(id.length === 24){
            Usuario.findById(id).then((usuario)=>{
                if(!usuario){
                    return  res.json({  
                        "status":true,
                        "message":"no se encontro ningun usuario con la siguiente id",
                        "Data": id}); 
                }else{
                    const {_id,contrasena,__v,...resto}=usuario._doc
                    res.json(resto);
                }
            });
    
        }else{
            return  res.json({  
                "status":true,
                "message":"El id del usuario es incorrecto",
                "Data": id}); 
        }
    } catch (error) {
        console.log(error)
    }
};

const getAll = async(req,res) => {

    try{
        const allUser = await Usuario.find()
        res.status(200).json(allUser)
    }catch(error){
        res.json({message:error.message})
    }
};

const useregister = async (req, res) => {
    try {
        const {nombreUsuario, nombre,apellido, correo, contrasena,direccion} = req.body;
        const  user = await Usuario.find({nombreUsuario});
        const  userCorreo = await Usuario.find({correo});
        if(!nombre || !nombreUsuario || !apellido || !correo || !contrasena || !direccion){
            return res.status(409).json({
                "status":true,
                "message":"uno o más campos no han sido rellenados",
                "id_Data": req.body
            })
        }else if (user.length !== 0) {
            return res.status(409).json({
                "status":true,
                "message":"Ya existe un usuario registrado con este nombre",
                "id_Data": nombreUsuario
            })
        }else if (userCorreo.length !== 0) {
            return res.status(409).json({
                "status":true,
                "message":"No se pueden crear más de un usuario por correo",
                "id_Data": correo
            })
        }else{
            bcrypt.hash(contrasena, 10, async(error, contrasenaHasheada) => {
                const nuevoUsuario = new Usuario({nombreUsuario, nombre,apellido, correo,direccion,contrasena: contrasenaHasheada,rol:1});
                if(nuevoUsuario){
                    const newUser = await nuevoUsuario.save();
                    res.status(200).json({  
                    "status":true,
                    "message":"Usuario agregado correctamente",
                    "Data": newUser}); 
                }else{
                    return res.status(409).json({
                    "status":true,
                    "message":"No se pudo agregar correctamente el usuario",
                    "Data": nombreUsuario});
                }
        })};
        }catch (error) {
            console.error(error)
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
                res.status(200).json({
                    "status":true,
                    "message":" Usuario Logeado correctamente ",
                    usuario:token
                })
            }else{
                return res.status(409).json({mensaje: "contraseña Incorrecta"})
            }
        })
    })
};

const deleteUser= async (req,res)=>{
    try {
        const id = req.params.id
        await Usuario.deleteOne({_id:id})
        res.json({
            "status":true,
            "message":"Usuario Eliminado Correctamente",
            "id_Data": id
        })
    } catch (error) {
        res.json({message:error.message})
    }
};

const UpdateUser = async (req,res) =>{
    try {
        const id = req.params.id
        await Usuario.findByIdAndUpdate({_id:id},req.body)
        res.status(200).json({
            "status":true,
            "message":"Registro Actualizado Correctamente",
            "id_Data": id
        })
    } catch (error) {
        res.json({message:error.message})
    }
};

module.exports = {
    getUser,useregister,userlogin,getAll,deleteUser,UpdateUser
}