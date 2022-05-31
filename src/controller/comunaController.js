const Comuna = require("../model/comunaModel");

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
}
