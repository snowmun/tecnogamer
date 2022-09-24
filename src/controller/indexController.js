const controllerUser = require ('./userController');
const controllerMark = require ('./markController');
const controllerCategory = require ('./categoryController');
const controllerProduct = require ('./productController');
const controllerPago = require ('./paymentController');
const controllerdetalleCompra = require ('./purchaseDetailController');
const controllerComuna = require ('./comunaController');
const controllerRegion = require ('./regionController');
const controllerUpload = require ('./uploadController');


module.exports = {
    controllerUser,
    controllerMark,
    controllerCategory,
    controllerProduct,
    controllerPago,
    controllerdetalleCompra,
    controllerComuna,
    controllerRegion,
    controllerUpload
}
