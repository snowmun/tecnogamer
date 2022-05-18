const Marca = require("../model/marcasModel");

const getMarca = async( req,res) => {
    try {

        const {id} = req.params;
        console.log(id)
        if(id.length === 24){
            const marca = Marca.findById(id);
            if(!marca){
                return  res.json({  
                    "status":true,
                    "message":"no se encontro ninguna marca con la siguiente id",
                    "Data": id}); 
            }else{
                const {nombreMarca}=marca._doc
                res.json(nombreMarca);
            }
        }else{
            return  res.json({  
                "status":true,
                "message":"El id de la marca es incorrecto",
                "Data": id}); 
        }
    } catch (error) {
        console.log(error)
    }
};

const getAll = async(req,res) => {
    try{
        const allMarca = await Marca.find();
        res.status(200).json(allMarca);
    }catch(error){
        res.json({message:error.message})
    }
};

const register = async (req, res) => {
    try {
        const {nombreMarca} = req.body;
        const  marca = await Marca.find({nombreMarca});
        if(!marca){
            return res.status(409).json({
                "status":true,
                "message":"Ya se encuentra registrada está marca",
                "Data": nombreMarca
            })
        }else{
            const nuevaMarca = new Marca({nombreMarca});
            const infoNewMarca = await nuevaMarca.save();
            if(infoNewMarca){
                    res.status(200).json({  
                    "status":true,
                    "message":"Marca agregada correctamente",
                    "Data": infoNewMarca}); 
                }else{
                    return res.status(409).json({
                    "status":true,
                    "message":"No se pudo agregar correctamente",
                    "Data": infoNewMarca});
                }
        };
        }catch (error) {
            console.error(error)
    }
};

module.exports ={
    register,
    getAll,
    getMarca
}
