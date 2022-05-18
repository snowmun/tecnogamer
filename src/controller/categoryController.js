const Categoria = require("../model/categoriasModel");

const getCategoria = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const categoria = await Categoria.findById(id);
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
        const allCategoria = await Categoria.find();
        res.status(200).json(allCategoria);
    }catch(error){
        res.json({message:error.message})
    }
};

const categoryregister = async (req, res) => {
    try {
        const {nombreCategoria} = req.body;
        const categoria = await Categoria.find({nombreCategoria});
        if(categoria.length > 0){
            return res.status(409).json({
                "status":true,
                "message":"Ya se encuentra registrada está marca",
                "Data": nombreCategoria
            })
        }else{
            const nuevaCategoria= new Categoria({nombreCategoria});
            if(nuevaCategoria){
                const infoNewCategoria= await nuevaCategoria.save();
                res.status(200).json({  
                "status":true,
                "message":"Categoriaagregada correctamente",
                "Data": infoNewCategoria}); 
            }else{
                return res.status(409).json({
                "status":true,
                "message":"No se pudo agregar correctamente",
                "Data": nuevaCategoria});
            }
        };
        }catch (error) {
            console.error(error)
    }
};

module.exports ={
    register,
    getAll,
    categoryregister
}
