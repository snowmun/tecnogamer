const controllerUser = require ('./controller/UserController');
const controllerMark = require ('./controller/markController');
const controllerCategory = require ('./controller/categoryController');
const controllerProduct = require ('./controller/productController');
const controllerPago = require ('./controller/paymentController');
const controllerdetalleCompra = require ('./controller/purchaseDetailController');
const controllerComuna = require ('./controller/comunaController');


module.exports = {
    controllerUser,
    controllerMark,
    controllerCategory,
    controllerProduct,
    controllerPago,
    controllerdetalleCompra,
    controllerComuna,
}
