const express = require('express');
const router = express.Router();
const { controllerUser, controllerMark, controllerCategory, controllerProduct,
    controllerPago, controllerdetalleCompra, controllerComuna, controllerRegion, controllerUpload, controllerToken } = require("../controller/indexController");
const { validarToken } = require('../auth/validaToken');
const { createToken } = require('../auth/getToken');
const upload = require('../config/multer/multer');
const { send } = require('../config/mailer');
const { validaExtension } = require('../middleware/validaExtension');
const { validaFormProduct, validaFormRegister } = require('../middleware/validaForm');
const { validIdMongo } = require('../middleware/validaParamsId');
const { validarUser } = require('../middleware/validUser');
const { validaStock } = require('../middleware/validaStock');

//Rutas Usuario
router.get('/api/v0/oneuser/:id', controllerUser.getUser);
router.get('/api/v0/alluser', controllerUser.getAll);
router.post('/api/v0/create-user', [validaFormRegister], controllerUser.useregister);
router.post('/api/v0/login', controllerUser.userlogin);
router.put('/api/v0/update-user/:id', [validarToken, validIdMongo], controllerUser.UpdateUser);
router.put('/api/v0/update-pass/:id', [validarToken, validIdMongo], controllerUser.changePass);
router.delete('/api/v0/deleteuser/:id', controllerUser.deleteUser);

//Rutas Marca
router.get('/api/v0/allmarks', controllerMark.getAllMarks);
router.get('/api/v0/onemark/:id', validIdMongo, controllerMark.getMarkById);
router.post('/api/v0/create-mark', [validarToken, validarUser], controllerMark.createMark);
router.put('/api/v0/update-mark/:id', [validarToken, validarUser, validIdMongo], controllerMark.updateMark);
router.delete('/api/v0/delete-mark/:id', [validarToken, validarUser, validIdMongo], controllerMark.deleteMark);

//Rutas Categoria
router.get('/api/v0/allcategories', controllerCategory.getAllCategorys);
router.get('/api/v0/onecategory/:id', validIdMongo, controllerCategory.getCategoryById);
router.post('/api/v0/create-category', [validarToken, validarUser], controllerCategory.createCategory);
router.put('/api/v0/update-cateogry/:id', [validarToken, validarUser, validIdMongo], controllerCategory.updateCategory);
router.delete('/api/v0/delete-category/:id', [validarToken, validarUser, validIdMongo], controllerCategory.deleteCategory);

// producto
router.get('/api/v0/allproducts', controllerProduct.getAllProducts);
router.get('/api/v0/one-product/:id', validIdMongo, controllerProduct.getProductById);
router.get('/api/v0/products-by-category/:id', validIdMongo, controllerProduct.getProductsByCategory);
router.post('/api/v0/create-product', [validarToken, validarUser, validaFormProduct], controllerProduct.createProduct);
router.put('/api/v0/update-product/:id', [validarToken, validarUser, validIdMongo, validaFormProduct], controllerProduct.updateProduct);
router.delete('/api/v0/delete-product/:id', [validarToken, validarUser, validIdMongo], controllerProduct.deleteProduct);

//pago
router.get('/api/v0/allPayment', validIdMongo, controllerPago.onePayment);
router.get('/api/v0/onePayment/:id', validIdMongo, controllerPago.allPayment);
router.post('/api/v0/register-payment', [validarToken, validaStock], controllerPago.registerPayment);
router.put('/api/v0/updatePayment/:id', controllerPago.updatePayment);
router.delete('/api/v0/deletePayment/:id', controllerPago.deletePayment);


//detalle compra
router.get('/api/v0/allPurchaseDetail', controllerdetalleCompra.allPurchaseDetail);
router.get('/api/v0/onePurchaseDetail/:id', validIdMongo, controllerdetalleCompra.onePurchaseDetail);
router.post('/api/v0/registerPurchaseDetail', controllerdetalleCompra.registerPurchaseDetail);
router.put('/api/v0/updatePurchaseDetail/:id', controllerdetalleCompra.updatePurchaseDetail);
router.delete('/api/v0/deletePurchaseDetail/:id', controllerdetalleCompra.deletePurchaseDetail);


//Comuna
router.get('/api/v0/Allcomunas', controllerComuna.getComunas);
router.post('/api/v0/registerComuna', controllerComuna.registerComuna);

//Región
router.get('/api/v0/allRegion', controllerRegion.getAll);
router.post('/api/v0/registerRegion', controllerRegion.registerRegion);

//Token
router.post('/api/v0/getToken', createToken);
router.post('/api/v0/validToken', controllerToken.validarToken)
//Upload
router.post('/api/v0/upload', [validarToken, validarUser, validaExtension], controllerUpload.upload);

//Correo
router.post('/api/v0/send-email', send);

module.exports = router;
