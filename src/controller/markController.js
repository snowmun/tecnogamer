const Marca = require("../model/marcasModel");

const getMark = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const mark = await Marca.findById(id);
            if(!mark){
                return  res.json({  
                    "status":true,
                    "message":"no se encontro ninguna marca con la siguiente id",
                    "Data": id}); 
            }else{
                const nombreMarca=mark._doc
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
        const allMark = await Marca.find();
        res.status(200).json(allMark);
    }catch(error){
        res.json({message:error.message})
    }
};

const markregister = async (req, res) => {
    try {
        const {nombreMarca} = req.body;
        const  mark = await Marca.find({nombreMarca});
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

const updateMark = async (req,res) =>{
    try {
        const {id} = req.params;
        const {nombreMarca} = req.body;
        if(nombreMarca !== ''){
            await Marca.findByIdAndUpdate(id,req.body);
            res.status(200).json({
                "status":true,
                "message":"Registro Actualizado Correctamente",
                "id_Data": req.body
            });
        }else{
            res.status(409).json({
                "status":true,
                "message":"El campo nombre marca debe tener datos",
                "id_Data": nombreMarca
            });
        }
    } catch (error) {
        res.json({message:error.message})
    }
};

const deleteMark= async (req,res)=>{
    try {
        const {id} = req.params;
        await Marca.deleteOne({id});
        res.json({
            "status":true,
            "message":"Marca Eliminada Correctamente",
            "id_Data": id
        });
    } catch (error) {
        res.json({message:error.message})
    }
};

module.exports ={
    markregister,
    getAll,
    getMark,
    updateMark,
    deleteMark
}
