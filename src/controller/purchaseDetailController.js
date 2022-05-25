// detella compra 

const detalleCompra = require("../model/detalleCompraModel");

const onePurchaseDetail= async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const detalleCompra = await detalleCompra.findById(id);
            if(!detalleCompra){
                return  res.status(409).json({  
                    "status":true,
                    "message":"no se encontro ningun detalle compra con la siguiente id",
                    "Data": id}); 
            }else{
                const datosDetalle=detalleCompra._doc
                return  res.status(200).json({  
                    "status":true,
                    "message":"detalle compra encontrada con exito",
                    "Data": datosDetalle}); 
            }
        }else{
           return  res.status(409).json({  
            "status":true,
            "message":"El id del detalle compra es incorrecto",
            "Data": id}); 
        }
    } catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const allPurchaseDetail= async(req,res) => {
    try{
        const allDetalle = await detalleCompra.find();
        return  res.status(200).json({  
            "status":true,
            "message":"los siguientes detalles  fueron encontradas",
            "Data": allDetalle}); 
    }catch(error){
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const registerPurchaseDetail= async (req, res) => {
    try {
        const {valor,cantidad,productoId} = req.body;            
        if(valor || cantidad || productoId){
            const nuevoDetalle = new detalleCompra(req.body);
            if(nuevoDetalle){
                const infoNewDetalle = await nuevoDetalle.save();        
                return res.status(200).json({  
                "status":true,
                "message":"detalle creado correctamente",
                "Data": infoNewDetalle}); 
            }else{
               return res.status(409).json({
                "status":true,
                "message":"No se pudo crear el detalle correctamente",
                "Data": nuevoDetalle});
            }
          
        }else{
            return res.status(409).json({
                "status":true,
                "message":"deben estar todos los campos llenados",
                "Data": req.body
            });
        };
    }catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const updatePurchaseDetail = async (req,res) =>{
    try {
        const {id} = req.params;
        const {valor,cantidad,productoId} = req.body;
        if(valor !== '' || cantidad !== '' || productoId !== '' ){
            await detalleCompra.findByIdAndUpdate(id,req.body);
            return res.status(200).json({
                "status":true,
                "message":"detalle Actualizado Correctamente",
                "id_Data": req.body
            });
        }else{
            return res.status(409).json({
                "status":true,
                "message":"los campo deben tener datos",
                "id_Data": nombreProducto
            });
        }
    } catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const deletePurchaseDetail= async (req,res)=>{
    try {
        const {id} = req.params;

        await detalleCompra.deleteOne({id});
        
        return res.status(200).json({
            "status":true,
            "message":"detalle Eliminada Correctamente",
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
    onePurchaseDetail,
    allPurchaseDetail,
    registerPurchaseDetail,
    updatePurchaseDetail,
    deletePurchaseDetail
}