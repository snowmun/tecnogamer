const Region = require("../model/regionModel");

const getAll = async(req,res) => {
    try{
        const allRegion = await Region.find()
        return   res.status(200).json({  
            "status":true,
            "message":"Region encontrados",
            "Data": allRegion}); 
    }catch(error){
        res.json({message:error.message})
    }
};


const registerRegion = async (req, res) => {
    try {
        const {nombreRegion} = req.body;
        const  region = await Region.find({nombreRegion});
        if(region.length > 0){
            return res.status(409).json({
                "status":true,
                "message":"Ya se encuentra registrada está región",
                "Data": nombreRegion
            });
        }else{
            const nuevaRegion = new Region({nombreRegion});

            if(nuevaRegion){
                const infoComuna = await nuevaRegion.save();
                return res.status(200).json({  
                "status":true,
                "message":"la región fue agregada correctamente",
                "Data": infoComuna}); 
            }else{

               return res.status(409).json({
                "status":true,
                "message":"No se pudo agregar correctamente",
                "Data": nuevaRegion});
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
    registerRegion,
    getAll
}
