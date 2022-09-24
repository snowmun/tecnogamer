const Comuna = require("../model/comunaModel");


const getComunas = async( req,res) => {
    try{
        
        const comuna = await Comuna.find();
        return sendOk(res,'Comunas encontradas', comuna);
         
    }catch(error){
        return internalError(res, 'Error inesperado', error);
    }
};

const registerComuna = async (req, res) => {
    try {

        const {nombre,regionId} = req.body;
        const  comuna = await Comuna.find({nombre});
        
        if(await searchCategory(comuna)){
             return badRequest(res, 'Ya se encuentra registrada está comuna', comuna);
        }
        
        const nuevaComuna = await new Comuna({nombre,regionId}).save();
        
        if(!nuevaComuna){
           return badRequest(res, 'La comuna no se pudo agregar correctamente', nuevaComuna);
        }

        return sendOk(res,'la comuna fue agregada correctamente', nuevaComuna); 

    }catch (error) {
        return  internalError(res, 'Error inesperado', error); 
    }
};

module.exports ={
    registerComuna,
    getComunas
}
