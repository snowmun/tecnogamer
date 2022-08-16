const Comuna = require("../model/comunaModel");


const getComunas = async( req,res) => {
    try {
        const comuna = await Comuna.find();

        return  res.status(200).json({  
                "status":true,
                "message":"Comunas encontradas",
                "Data": comuna
        }); 
            
    } catch (error) {
        return   res.status(409).json({  
            "status":false,
            "message":"No hay resultados",
            "Data": error}); 
    }
};

const registerComuna = async (req, res) => {
    try {
        const {nombre,regionId} = req.body;
        const  comuna = await Comuna.find({nombre});
        if(comuna.length > 0){
            return res.status(409).json({
                "status":true,
                "message":"Ya se encuentra registrada está comuna",
                "Data": nombre
            });
        }else{
            const nuevaComuna = new Comuna({nombre,regionId});

            if(nuevaComuna){
                const infoComuna = await nuevaComuna.save();
                return res.status(200).json({  
                "status":true,
                "message":"la comuna fue agregada correctamente",
                "Data": infoComuna}); 
            }else{

               return res.status(409).json({
                "status":true,
                "message":"No se pudo agregar correctamente",
                "Data": nuevaComuna});
            }
        };
        }catch (error) {
            return  res.status(409).json({  
                "status":true,
                "message":error
            }); 
    }
};

module.exports ={
    registerComuna,
    getComunas
}
