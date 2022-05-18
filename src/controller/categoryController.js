const Categoria = require("../model/categoriasModel");

const getCategory = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const categoria = await Categoria.findById(id);
            if(!categoria){
                return  res.json({  
                    "status":true,
                    "message":"no se encontro ninguna categoria con la siguiente id",
                    "Data": id}); 
            }else{
                const datosCategory=categoria
                res.json(datosCategory);
            }
        }else{
            return res.json({  
            "status":true,
            "message":"El id de la categoria es incorrecto",
            "Data": id}); 
        }
    } catch (error) {
        console.log(error)
    }
};

const getAllCategory = async(req,res) => {
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


const updateCategory = async (req,res) =>{
    try {
        const {id} = req.params;
        const {nombreCategoria} = req.body;
        if(nombreCategoria !== ''){
            await Categoria.findByIdAndUpdate(id,req.body);
            res.status(200).json({
                "status":true,
                "message":"Registro Actualizado Correctamente",
                "id_Data": req.body
            });
        }else{
            res.status(409).json({
                "status":true,
                "message":"El campo nombre categoria debe tener datos",
                "id_Data": nombreCategoria
            });
        }
    } catch (error) {
        res.json({message:error.message})
    }
};

const deleteCategory= async (req,res)=>{
    try {
        const {id} = req.params;
        await Categoria.deleteOne({id});

        res.json({
            "status":true,
            "message":"Categoria Eliminada Correctamente",
            "id_Data": id
        });
    } catch (error) {
        res.json({message:error.message})
    }
};

module.exports ={
    getCategory,
    getAllCategory,
    categoryregister,
    updateCategory,
    deleteCategory
}
