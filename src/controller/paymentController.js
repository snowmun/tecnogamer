const pagos = require("../model/pagosModel");

const onePayment = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const pago = await pagos.findById(id);
            if(!pago){
                return  res.status(409).json({  
                    "status":true,
                    "message":"no se encontro ningun pago con la siguiente id",
                    "Data": id}); 
            }else{
                const datosPago=pago._doc
                return  res.status(200).json({  
                    "status":true,
                    "message":"pago encontrada con exito",
                    "Data": datosPago}); 
            }
        }else{
           return  res.status(409).json({  
            "status":true,
            "message":"El id del producto es incorrecto",
            "Data": id}); 
        }
    } catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const allPayment  = async(req,res) => {
    try{
        const allPagos = await pagos.find();
        return  res.status(200).json({  
            "status":true,
            "message":"las siguientes producto fueron encontradas",
            "Data": allPagos}); 
    }catch(error){
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const registerPayment  = async (req, res) => {
    try {
        const {nombreProducto} = req.body;
       
        const  product = await Producto.find({nombreProducto});
        
        if(product.length > 0){
            return res.status(409).json({
                "status":true,
                "message":"Ya se encuentra registrado este producto",
                "Data": nombreProducto
            });
        }else{
            const nuevaProducto = new Producto(req.body);
            if(nuevaProducto){
                const infoNewProducto = await nuevaProducto.save();
                return res.status(200).json({  
                "status":true,
                "message":"Producto agregada correctamente",
                "Data": infoNewProducto}); 
            }else{
               return res.status(409).json({
                "status":true,
                "message":"No se pudo agregar correctamente",
                "Data": nuevaProducto});
            }
        };
        }catch (error) {
            return  res.status(409).json({  
                "status":true,
                "message":error
            }); 
    }
};

const updatePayment  = async (req,res) =>{
    try {
        const {id} = req.params;
        const {tipoPago} = req.body;
        if(tipoPago !== ''){
            await pagos.findByIdAndUpdate(id,req.body);
            return res.status(200).json({
                "status":true,
                "message":"Pago Actualizado Correctamente",
                "id_Data": req.body
            });
        }else{
            return res.status(409).json({
                "status":true,
                "message":"los campos deben estar llenados",
                "id_Data":  req.body
            });
        }
    } catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const deletePayment = async (req,res)=>{
    try {
        const {id} = req.params;

        await pagos.deleteOne({id});
        
        return res.status(200).json({
            "status":true,
            "message":"pago Eliminada Correctamente",
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
    onePayment,
    allPayment,
    registerPayment,
    updatePayment,
    deletePayment
}