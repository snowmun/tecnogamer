const Producto = require("../model/productoModel");

const oneProduct = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const mark = await Marca.findById(id);
            if(!mark){
                return  res.status(409).json({  
                    "status":true,
                    "message":"no se encontro ninguna marca con la siguiente id",
                    "Data": id}); 
            }else{
                const nombreMarca=mark._doc
                return  res.status(200).json({  
                    "status":true,
                    "message":"Marca encontrada con exito",
                    "Data": nombreMarca}); 
            }
        }else{
           return  res.status(409).json({  
            "status":true,
            "message":"El id de la marca es incorrecto",
            "Data": id}); 
        }
    } catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const allProduct = async(req,res) => {
    try{
        const allMark = await Marca.find();
        return  res.status(200).json({  
            "status":true,
            "message":"las siguientes marcas fueron encontradas",
            "Data": allMark}); 
    }catch(error){
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const registerProduct = async (req, res) => {
    try {
        const {nombreMarca} = req.body;
        const  mark = await Marca.find({nombreMarca});
        console.log(mark)

        if(mark.length > 0){
            return res.status(409).json({
                "status":true,
                "message":"Ya se encuentra registrada está marca",
                "Data": nombreMarca
            });
        }else{
            const nuevaMarca = new Marca({nombreMarca});

            if(nuevaMarca){
                const infoNewMarca = await nuevaMarca.save();
                return res.status(200).json({  
                "status":true,
                "message":"Marca agregada correctamente",
                "Data": infoNewMarca}); 
            }else{
               return res.status(409).json({
                "status":true,
                "message":"No se pudo agregar correctamente",
                "Data": nuevaMarca});
            }
        };
        }catch (error) {
            return  res.status(409).json({  
                "status":true,
                "message":error
            }); 
    }
};

const updateProduct = async (req,res) =>{
    try {
        const {id} = req.params;
        const {nombreMarca} = req.body;
        if(nombreMarca !== ''){
            await Marca.findByIdAndUpdate(id,req.body);
            return res.status(200).json({
                "status":true,
                "message":"Registro Actualizado Correctamente",
                "id_Data": req.body
            });
        }else{
            return res.status(409).json({
                "status":true,
                "message":"El campo nombre marca debe tener datos",
                "id_Data": nombreMarca
            });
        }
    } catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const deleteProduct= async (req,res)=>{
    try {
        const {id} = req.params;
        await Marca.deleteOne({id});
       return res.status(200).json({
            "status":true,
            "message":"Marca Eliminada Correctamente",
            "id_Data": id
        });
    } catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

module.exports ={
    oneProduct,
    allProduct,
    registerProduct,
    updateProduct,
    deleteProduct
}