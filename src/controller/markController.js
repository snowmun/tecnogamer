const Marca = require("../model/marcasModel");

const getMarca = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const marca = await Marca.findById(id);
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
            res.json({  
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

const markregister = async (req, res) => {
    try {
        const {nombreMarca} = req.body;
        const  marca = await Marca.find({nombreMarca});
        if(marca.length > 0){
            return res.status(409).json({
                "status":true,
                "message":"Ya se encuentra registrada está marca",
                "Data": nombreMarca
            });
        }else{
            const nuevaMarca = new Marca({nombreMarca});
            if(nuevaMarca){
                const infoNewMarca = await nuevaMarca.save();
                res.status(200).json({  
                "status":true,
                "message":"Marca agregada correctamente",
                "Data": infoNewMarca}); 
            }else{
                res.status(409).json({
                "status":true,
                "message":"No se pudo agregar correctamente",
                "Data": nuevaMarca});
            }
        };
        }catch (error) {
            console.error(error)
    }
};

module.exports ={
    markregister,
    getAll,
    getMarca
}
