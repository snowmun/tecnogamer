const Producto = require("../model/productoModel");

const oneProduct = async( req,res) => {
    try {
        const {id} = req.params;
        if(id.length === 24){
            const product = await Producto.findById(id);
            if(!product){
                return  res.status(409).json({  
                    "status":true,
                    "message":"no se encontro ningun producto con la siguiente id",
                    "Data": id}); 
            }else{
                const datosProducto=product._doc
                return  res.status(200).json({  
                    "status":true,
                    "message":"Producto encontrada con exito",
                    "Data": datosProducto}); 
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

const allProduct = async(req,res) => {
    try{
        const allProduct = await Producto.find();
        return  res.status(200).json({  
            "status":true,
            "message":"las siguientes producto fueron encontradas",
            "Data": allProduct}); 
    }catch(error){
        return  res.status(409).json({  
            "status":true,
            "message":error
        }); 
    }
};

const registerProduct = async (req, res) => {
    try {
        const {nombreProducto,stock,precio,descripcion} = req.body;
       
        if(nombreProducto !== '' && stock !== '' && precio !== '' && descripcion !== ''){

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
        }else{
            return res.status(409).json({
                "status":true,
                "message":"uno o más campos no han sido rellenados",
                "id_Data": {
                    nombreProducto,
                    stock,
                    precio,
                    descripcion
                }
            });
        }

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
        const {nombreProducto} = req.body;
        if(nombreProducto !== ''){
            await Producto.findByIdAndUpdate(id,req.body);
            return res.status(200).json({
                "status":true,
                "message":"Registro Actualizado Correctamente",
                "id_Data": req.body
            });
        }else{
            return res.status(409).json({
                "status":true,
                "message":"El campo nombre producto debe tener datos",
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

const deleteProduct= async (req,res)=>{
    try {
        const {id} = req.params;

        await Producto.deleteOne({id});
        
        return res.status(200).json({
            "status":true,
            "message":"Producto Eliminada Correctamente",
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