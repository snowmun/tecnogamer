const factura = require("../model/facturasModel");

const oneBilling = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const billing = await factura.findById(id);
            if(!billing){
                return  res.status(409).json({  
                    "status":true,
                    "message":"no se encotnre ninguna factura con el siguiente id",
                    "Data": id}); 
            }else{
                const datosBilling=billing._doc
                return  res.status(200).json({  
                    "status":true,
                    "message":"Factura encontrada con exito",
                    "Data": datosBilling}); 
            }
        }else{
           return  res.status(409).json({  
            "status":true,
            "message":"El id del la factura es incorrecto",
            "Data": id}); 
        }
    } catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const allBilling  = async(req,res) => {
    try{
        const allBilling = await factura.find();
        return  res.status(200).json({  
            "status":true,
            "message":"las siguientes facturas fueron encontradas",
            "Data": allBilling}); 
    }catch(error){
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const registerBilling  = async (req, res) => {
    try {
        // tengo dudas con el registro 
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

const updateBilling  = async (req,res) =>{
    try {
        const {id} = req.params;
        const {fechaCompra} = req.body;
        if(fechaCompra !== ''){
            await factura.findByIdAndUpdate(id,req.body);
            return res.status(200).json({
                "status":true,
                "message":"Factura Actualizada Correctamente",
                "id_Data": req.body
            });
        }else{
            return res.status(409).json({
                "status":true,
                "message":"Los campos deben estar llenados",
                "id_Data": req.body
            });
        }
    } catch (error) {
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const deleteBilling = async (req,res)=>{
    try {
        const {id} = req.params;

        await factura.deleteOne({id});
        
        return res.status(200).json({
            "status":true,
            "message":"factura Eliminada Correctamente",
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
    oneBilling,
    allBilling,    
    registerBilling,
    updateBilling,
    deleteBilling
}