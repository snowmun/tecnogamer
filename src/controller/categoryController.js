const Categoria = require("../model/categoriasModel");

const getCategory = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const categoria = await Categoria.findById(id)
                .then(()=>{
                    if(!categoria){
                        return  res.status(409).json({  
                            "status":true,
                            "message":"no se encontro ninguna categoria con la siguiente id",
                            "Data": id}); 
                    }else{
                        const datosCategory=categoria
                        return  res.status(200).json({  
                            "status":true,
                            "message":"categoria encontrada",
                            "Data": datosCategory}); 
                    }
            });
        }else{
            return res.json({  
            "status":true,
            "message":"El id de la categoria es incorrecto",
            "Data": id}); 
        }
    } catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":"El id del usuario es incorrecto",
            "Data": error}); 
    }
};

const getAllCategory = async(req,res) => {
    try{
        const allCategoria = await Categoria.find();
        return  res.status(200).json({  
            "status":true,
            "message":"categoria encontrada",
            "Data": allCategoria}); 
    }catch(error){
        return   res.status(409).json({  
            "status":true,
            "message":"El id del usuario es incorrecto",
            "Data": error}); 
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
                return res.status(200).json({  
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
            return   res.status(409).json({  
                "status":true,
                "message":"El id del usuario es incorrecto",
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
                "status":true,
                "message":"Registro Actualizado Correctamente",
                "id_Data": req.body
            });
        }else{
            return res.status(409).json({
                "status":true,
                "message":"El campo nombre categoria debe tener datos",
                "id_Data": nombreCategoria
            });
        }
    } catch (error) {
        return   res.status(409).json({  
            "status":true,
            "message":"El id del usuario es incorrecto",
            "Data": error}); 
    }
};

const deleteCategory= async (req,res)=>{
    try {
        const {id} = req.params;
        await Categoria.deleteOne({id});
        return res.status(200).json({
            "status":true,
            "message":"Categoria Eliminada Correctamente",
            "id_Data": id
        });
    } catch (error) {
        return   res.status(409).json({  
            "status":true,
            "message":"El id del usuario es incorrecto",
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
