const pagos = require("../model/pagosModel");
const Product = require("../model/productoModel");

const onePayment = async( req,res) => {

    try {

        const {id} = req.params;
        const pago = await pagos.findById(id);

        return  (!pago)
                        ? badRequest(res, 'no se encontro ningun pago con la siguiente id', id)
                        : sendOk(res,'pago encontrada con exito', pago)
          
    } catch (error) {
        return internalError(res, 'Error inesperado', error);
    }
};

const allPayment  = async(req,res) => {

    try{

        const allPagos = await pagos.find();

        return sendOk(res,'las siguientes producto fueron encontradas', allPagos);

    }catch(error){

        return internalError(res, 'Error inesperado', error);

    }
};

const registerPayment  = async (req, res) => {
    try {

        const {nombreProducto} = req.body;

        if(await searchProduct(nombreProducto)){
            
            return badRequest(res, 'Ya se encuentra registrado este producto', nombreProducto);
        
        }
        
        const newProducto = await new Producto({nombreProducto}).save();
        
        if(!newProducto){
           return badRequest(res, 'No se pudo agregar correctamente', newProducto);
        }

        return sendOk(res,'Producto agregado correctamente', newProducto); 

    }catch (error) {
        return  internalError(res, 'Error inesperado', error); 
    }
};

const updatePayment  = async (req,res) =>{
    try {
        
        const {id} = req.params;
        const {tipoPago} = req.body;
        
        if(nombreCategoria.length <= 0){
            return badRequest(res, 'El campo tipo de pago debe tener datos', tipoPago);
        }

        if(await searchPago(tipoPago)){
             return badRequest(res, 'No se pudo actualizar el pago ', tipoPago);
        }

        const canUpdatePay = await Product.findByIdAndUpdate(id,req.body);

        if(!canUpdatePay){
            return badRequest(res, 'No se pudo actualizar el pago ', tipoPago);
        }
        return sendOk(res,'pago Actualizado Correctamente', req.body); 
          
    } catch (error) {
        return internalError(res, 'Error inesperado', error); 
    }
};

const deletePayment = async (req,res)=>{
    try {

        const {id} = req.params;
        const cantDeletePagos = await pagos.deleteOne({id});;

        return (!cantDeletePagos)
            ? badRequest(res, 'No se pudo eliminar el pago', {id})
            : sendOk(res,'pago Eliminada Correctamente', id); 
     
    } catch (error) {
        return internalError(res, 'Error inesperado', error); 
    }
};

const searchProduct = async(nombreProducto) =>{
    try {

        const exitPago = await Product.findOne({nombreProducto});

        return (exitPago) ? true : false;

    } catch (error) {
        return true;
    }
}

const searchPago = async(nombreProducto) =>{
    try {

        const exitProduct = await pago.findOne({nombreProducto});

        return (exitProduct) ? true : false;

    } catch (error) {
        return true;
    }
 
}

module.exports ={
    onePayment,
    allPayment,
    registerPayment,
    updatePayment,
    deletePayment
}