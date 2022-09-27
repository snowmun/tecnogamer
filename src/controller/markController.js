const Mark = require("../model/marcasModel");

const {badRequest,sendOk,internalError} = require('../helpers/http');

const getMarkById = async( req,res) => {
    try {

        const {id} = req.params;
        const mark = await Mark.findById(id);

        return  (!mark)
                        ? badRequest(res, 'no se encontro ninguna marca con la siguiente id', id)
                        : sendOk(res,'Marca encontrada con exito', mark)
          
    } catch (error) {
        return internalError(res, 'Error inesperado', error);
    }
};

const getAllMarks = async(req,res) => {
    try{
        const allMark = await Mark.find();

        return sendOk(res,'las siguientes marcas fueron encontradas', allMark);
          
    }catch(error){
        return  internalError(res, 'Error inesperado', error); 
    }
};

const createMark = async (req, res) => {
    try {

        const {nombreMarca} = req.body;
        const  mark = await Mark.find({nombreMarca});

        if(await searchMark(nombreMarca)){
            return badRequest(res, 'Ya se encuentra registrada está marca', mark);
        }

        const newMark = await new Mark({nombreMarca}).save();

        if(!newMark){
            return badRequest(res, 'No se pudo agregar correctamente', newMark); 
        }

        return sendOk(res, 'Marca agregada correctamente', newMark);
    
    }catch (error) {
        return  internalError(res, 'Error inesperado', error);  
    }
};

const updateMark = async (req,res) =>{
    try {
        const {id} = req.params;
        const {nombreMarca} = req.body;

        if(nombreMarca.length <= 0){
            return badRequest(res, 'El campo nombre marca debe tener datos', nombreMarca);
        }

        if(await searchMark(nombreMarca)){
             return badRequest(res, 'No se pudo actualizar la marca, ya que el nombre existe en la BD', nombreMarca);
        }

        const canUpdateMark = await Mark.findByIdAndUpdate(id,req.body);
        
        if(!canUpdateMark){
            return badRequest(res, 'No se pudo actualizar la marca', nombreMarca);
        }

        return sendOk(res,'Marca Actualizada Correctamente', req.body); 
        
    } catch (error) {
       return  internalError(res, 'Error inesperado', error);  
    }
};

const deleteMark= async (req,res)=>{
    try {
        const {id} = req.params;
        const canDeleteMark = await Mark.findByIdAndDelete(id);

        return (!canDeleteMark)
                                ? badRequest(res, 'No se pudo eliminar la marca', {})
                                : sendOk(res,'Marca Eliminada Correctamente', id)
            
    } catch (error) {
        return  internalError(res, 'Error inesperado', error); 
    }
};


const searchMark = async(nombreMarca) =>{

    try {
        const existMark = await Mark.findOne({nombreMarca});

        return (existMark) ? true : false;

    } catch (error) {

        return true;
    }
 
}

module.exports ={
    createMark,
    getAllMarks,
    getMarkById,
    updateMark,
    deleteMark
}
