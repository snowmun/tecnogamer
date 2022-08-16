const Comprar = require("../model/compraModel");

const registerPurchase  = async (req, res) => {
    try {
            const {valorCompra} = req.body;
        
            if(valorCompra !== ''){
                const nuevaCompra = new Comprar(req.body);
                if(nuevaCompra){
                    const infoNewProducto = await nuevaCompra.save();
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
            }else{

            }
        }catch (error) {
            return  res.status(409).json({  
                "status":true,
                "message":error
            }); 
    }
};