const Marca = require("../model/marcasModel");

const getMark = async( req,res) => {
    try {
        const {id} = req.params;
        const mark = await Marca.findById(id);
        if(!mark){
            return  res.status(409).json({  
                "status":false,
                "message":"no se encontro ninguna marca con la siguiente id",
                "Data": id}); 
        }else{
            return  res.status(200).json({  
                "status":true,
                "message":"Marca encontrada con exito",
                "Data": mark}); 
        }
       
    } catch (error) {
        return  res.status(500).json({  
            "status":false,
            "message":error
        }); 
    }
};

const getAll = async(req,res) => {
    try{
        const allMark = await Marca.find();
        return  res.status(200).json({  
            "status":true,
            "message":"las siguientes marcas fueron encontradas",
            "Data": allMark}); 
    }catch(error){
        return  res.status(500).json({  
            "status":true,
            "message":error
        }); 
    }
};

const markregister = async (req, res) => {
    try {
        const {nombreMarca} = req.body;
        const  mark = await Marca.find({nombreMarca});

        if(mark.length > 0){
            return res.status(409).json({
                "status":false,
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
                "status":false,
                "message":"No se pudo agregar correctamente",
                "Data": nuevaMarca});
            }
        };
        }catch (error) {
            return  res.status(500).json({  
                "status":true,
                "message":error
            }); 
    }
};

const updateMark = async (req,res) =>{
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
                "status":false,
                "message":"El campo nombre marca debe tener datos",
                "id_Data": nombreMarca
            });
        }
    } catch (error) {
        return  res.status(500).json({  
            "status":false,
            "message":error
        }); 
    }
};

const deleteMark= async (req,res)=>{
    try {
        const {id} = req.params;
        await Marca.findByIdAndDelete(id);
       return res.status(200).json({
            "status":true,
            "message":"Marca Eliminada Correctamente",
            "id_Data": id
        });
    } catch (error) {
        return  res.status(500).json({  
            "status":false,
            "message":error
        }); 
    }
};

module.exports ={
    markregister,
    getAll,
    getMark,
    updateMark,
    deleteMark
}
