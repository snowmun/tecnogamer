const Categoria = require("../model/categoriasModel");

const getCategoria = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const categoria = Categoria.findById(id);
            if(!categoria){
                return  res.json({  
                    "status":true,
                    "message":"no se encontro ninguna marca con la siguiente id",
                    "Data": id}); 
            }else{
                const {nombreCategoria}=categoria._doc
                res.json(nombreCategoria);
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
        const allCategoria = await Categoria.find();
        res.status(200).json(allCategoria);
    }catch(error){
        res.json({message:error.message})
    }
};

const register = async (req, res) => {
    try {
        const {nombreCategoria} = req.body;
        const categoria = await Categoria.find({nombreCategoria});
        if(!categoria){
            return res.status(409).json({
                "status":true,
                "message":"Ya se encuentra registrada está marca",
                "Data": nombreCategoria
            })
        }else{
            const nuevaCategoria= new Categoria({nombreCategoria});
            const infoNewCategoria= await nuevaCategoria.save();
            if(infoNewCategoria){
                    res.status(200).json({  
                    "status":true,
                    "message":"Categoriaagregada correctamente",
                    "Data": infoNewCategoria}); 
                }else{
                    return res.status(409).json({
                    "status":true,
                    "message":"No se pudo agregar correctamente",
                    "Data": infoNewCategoria});
                }
        };
        }catch (error) {
            console.error(error)
    }
};

module.exports ={
    register,
    getAll,
    getCategoria
}
