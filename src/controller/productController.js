const ObjectId = require('mongoose').Types.ObjectId;
const Product = require("../model/productoModel");
const {sendOk,badRequest,internalError} = require('../helpers/http');


const getProductById = async( req,res) => {
    try {
        const {id} = req.params;
       
        const product = await Product.findById(id);
        return (!product)
                ? badRequest(res, 'no se encontro ningún producto con la siguiente id', id)
                : sendOk(res,'Producto encontrada con exito', product)
            
    } catch (error) {
        return internalError(res, 'Error inesperado', error);
    }
};

const getAllProducts = async(req,res) => {
    try{

        const allProduct = await Product.find();
        
        return sendOk(res,'Productos encontrados', allProduct);
  
    }catch(error){
        return internalError(res, 'Error inesperado', error );
    }
};

const createProduct = async (req, res) => {
    try {
        const {nombreProducto} = req.body;
       
        if(await searchProduct(nombreProducto)){
            return badRequest(res, 'Ya se encuentra registrado este producto', nombreProducto);
        }

        const newProduct = await  new Product(req.body).save();

        if(!newProduct){
            return badRequest(res, 'No se pudo agregar correctamente', newProduct);
        }

        return sendOk(res,'Producto agregada correctamente', newProduct);
        
        }catch (error) {
            return internalError(res, 'Error inesperado', error ); 
    }
};

const updateProduct = async (req,res) =>{
    try {
        const {id} = req.params;

        const {nombreProducto} = req.body;

         if(await searchProduct(nombreProducto)){
            return badRequest(res, 'No se pudo actualizar el producto, ya que el nombre existe en la BD', nombreProducto);
         }
        
        const updateProduct = await Product.findByIdAndUpdate(id,req.body);

        if(!updateProduct){
            return badRequest(res, 'No se pudo actualizar el producto', nombreProducto);
        }
 
        return sendOk(res,'Producto Actualizado Correctamente', req.body);
        
    } catch (error) {
        return internalError(res, 'Error inesperado', error ); 
    }
};

const deleteProduct= async (req,res)=>{
    try {
        const {id} = req.params;

        const deleteProduct = await Product.findByIdAndDelete(id);

        (!deleteProduct)
            ? badRequest(res, 'No se pudo eliminar el producto', {})
            : sendOk(res,'Producto Eliminado Correctamente', id)
          
    } catch (error) {
        return internalError(res, 'Error inesperado', error );  
    }
};


const searchProduct = async(nombreProducto) =>{

    try {
        const existProduct = await Product.findOne({nombreProducto});
      
        return (existProduct) ? true : false;

    } catch (error) {

        return true;
    }
 
}

module.exports ={
    getProductById,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}