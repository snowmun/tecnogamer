const Comuna = require("../model/comunaModel");


const getComunas = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            Comuna.find({regionId:id}).then((comuna)=>{
                if(!comuna){
                    return   res.status(409).json({  
                        "status":true,
                        "message":"no se encontro ninguna comuna con la siguiente id",
                        "Data": id}); 
                }else{
                    const {_id,__v,...resto}=comuna._doc;
                    return  res.status(200).json({  
                        "status":true,
                        "message":"Comunas encontradas",
                        "Data": resto}); 
                }
            });
        }else{
            return   res.status(409).json({  
                "status":true,
                "message":"El id de la región es incorrecto",
                "Data": id}); 
        }
    } catch (error) {
        return   res.status(409).json({  
            "status":true,
            "message":"No hay resultados",
            "Data": error}); 
    }
};

const registerComuna = async (req, res) => {
    try {
        const {nombre} = req.body;
        const  comuna = await Comuna.find({nombre});
        if(comuna.length > 0){
            return res.status(409).json({
                "status":true,
                "message":"Ya se encuentra registrada está comuna",
                "Data": nombre
            });
        }else{
            const nuevaComuna = new Comuna({nombre});

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
            console.log("3 Ya se encuentra registrada está comuna")

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
