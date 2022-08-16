
const Categoria = require("../model/categoriasModel");

const getCategory = async( req,res) => {
    try {
            const {id} = req.params;

            const categoria = await Categoria.findById(id);

            if(!categoria){
                return res.status(409).json({  
                "status":false,
                "message":"no se encontro ninguna categoria con la siguiente id",
                "Data": id
                });
            }else{
                return res.status(200).json({  
                "status":true,
                "message":"categoria encontrada",
                "Data": categoria});
            }

    } catch (error) {
        return res.status(500).json({  
        "status":false,
        "message":"Error inesperado",
        "Data": error}); 
    }
};

const getAllCategory = async(req,res) => {
    try{
        const allCategoria = await Categoria.find();
        return res.status(200).json({  
        "status":true,
        "message":"categoria encontrada",
        "Data": allCategoria}); 
    }catch(error){
        return  res.status(500).json({  
        "status":false,
        "message":"Error inesperado",
        "Data": error}); 
    }
};

const categoryregister = async (req, res) => {
    try {
        const {nombreCategoria} = req.body;
        const categoria = await Categoria.find({nombreCategoria});
        if(categoria.length > 0){
            return res.status(409).json({
            "status":false,
            "message":"Ya se encuentra registrada está categoría",
            "Data": nombreCategoria});
        }else{
            const nuevaCategoria= new Categoria({nombreCategoria});
            if(nuevaCategoria){
                const infoNewCategoria= await nuevaCategoria.save();
                return res.status(200).json({  
                "status":true,
                "message":"Categoría agregada correctamente",
                "Data": infoNewCategoria}); 
            }else{
                return res.status(409).json({
                "status":false,
                "message":"La categoría no se pudo agregar correctamente",
                "Data": nuevaCategoria});
            }
        };
        }catch (error) {
            return  res.status(500).json({  
            "status":false,
            "message":"Error inesperado",
            "Data": error}); 
    }
};


const updateCategory = async (req,res) =>{
    try {
        const {id} = req.params;
        const {nombreCategoria} = req.body;
        if(nombreCategoria !== ''){
            await Categoria.findByIdAndUpdate(id,req.body);
            return res.status(200).json({
            "status":false,
            "message":"Registro Actualizado Correctamente",
            "id_Data": req.body});
        }else{
            return res.status(409).json({
            "status":true,
            "message":"El campo nombre categoria debe tener datos",
            "id_Data": nombreCategoria});
        }
    } catch (error) {
        return res.status(500).json({  
        "status":false,
        "message":"Error inesperado",
        "Data": error}); 
    }
};

const deleteCategory= async (req,res)=>{
    try {
        const {id} = req.params;
        await Categoria.findByIdAndDelete(id);
        return res.status(200).json({
        "status":true,
        "message":"Categoria Eliminada Correctamente",
        "id_Data": id});
    } catch (error) {
        return res.status(500).json({  
        "status":false,
        "message":"Error inesperado",
        "Data": error}); 
    }
};

module.exports ={
    getCategory,
    getAllCategory,
    categoryregister,
    updateCategory,
    deleteCategory
}
