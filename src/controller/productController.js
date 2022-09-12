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

        let filename = '';
        
        if(req.file){
            filename = req.file.filename;
        }
    
        const countProduct = await searchProduct(nombreProducto.trim());
        
        if( countProduct > 0 || countProduct === -1){
            return badRequest(res, 'Ya se encuentra registrado este producto', nombreProducto);
        }

        delete req.body.img;

        const newProduct = await  new Product({...req.body,img:filename}).save();

        if(!newProduct){
            return badRequest(res, 'No se pudo agregar correctamente', newProduct);
        }

        return sendOk(res,'Producto agregado correctamente', newProduct);
        
        }catch (error) {
            console.log(error)
            return internalError(res, 'Error inesperado', error ); 
    }
};

const updateProduct = async (req,res) =>{
    try {
        const {id} = req.params;

        const {nombreProducto} = req.body;

        let filename = '';
        
        if(req.file){
            filename = req.file.filename;
        }
        
        delete req.body.img;

        const canUpdateProduct = await Product.findByIdAndUpdate(id,{...req.body,img:filename});

        
        if(!canUpdateProduct){
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

        const canDeleteProduct = await Product.findByIdAndDelete(id);

        (!canDeleteProduct)
            ? badRequest(res, 'No se pudo eliminar el producto', {})
            : sendOk(res,'Producto Eliminado Correctamente', id)
          
    } catch (error) {
        return internalError(res, 'Error inesperado', error );  
    }
};


const searchProduct = async(nombreProducto) =>{

    try {

        return  (await Product.find({nombreProducto})).length;

    } catch (error) {

        return -1;
    }
 
}

module.exports ={
    getProductById,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}