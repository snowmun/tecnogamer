const express = require('express');
const router = express.Router();
const {controllerUser,controllerMark,controllerCategory,controllerProduct,
    controllerPago,controllerdetalleCompra,controllerComuna,controllerRegion} = require("../controller/indexController");
const { validaForm } = require('../middleware/validaForm');
const { validIdMongo } = require('../middleware/validaParamsId');
const {validarTokenRequest} = require('../auth/validaToken');
const {createToken} = require('../auth/getToken');
//Rutas Usuario
router.get('/api/v0/oneuser/:id', controllerUser.getUser);
router.get('/api/v0/alluser',controllerUser.getAll);
router.post('/api/v0/useregister',controllerUser.useregister);
router.post('/api/v0/login',controllerUser.userlogin);
router.delete('/api/v0/deleteuser/:id',controllerUser.deleteUser);
router.put('/api/v0/updateuser/:id',controllerUser.UpdateUser);

//Rutas Marca
router.get('/api/v0/allmark',controllerMark.getAllMarks);
router.get('/api/v0/onemark/:id',validIdMongo, controllerMark.getMarkById);
router.post('/api/v0/markregister',[validarTokenRequest],controllerMark.createMark);
router.put('/api/v0/updatemark/:id',[validarTokenRequest,validIdMongo],controllerMark.updateMark);
router.delete('/api/v0/deletemark/:id',[validarTokenRequest,validIdMongo],controllerMark.deleteMark);


//Rutas Categoria
router.get('/api/v0/allcategory',controllerCategory.getAllCategorys);
router.get('/api/v0/onecategory/:id', validIdMongo, controllerCategory.getCategoryById);
router.post('/api/v0/categoryregister',[validarTokenRequest],controllerCategory.createCategory);
router.put('/api/v0/updatecateogry/:id',[validarTokenRequest,validIdMongo],controllerCategory.updateCategory);
router.delete('/api/v0/deletecategory/:id',[validarTokenRequest,validIdMongo],controllerCategory.deleteCategory);

// producto
router.get('/api/v0/allproduct',controllerProduct.getAllProducts);
router.get('/api/v0/oneproduct/:id', validIdMongo,controllerProduct.getProductById);
router.post('/api/v0/registerproduct',[validarTokenRequest,validaForm],controllerProduct.createProduct);
router.put('/api/v0/updateproduct/:id',[validarTokenRequest,validIdMongo, validaForm],controllerProduct.updateProduct);
router.delete('/api/v0/deleteproduct/:id',[validarTokenRequest,validIdMongo],controllerProduct.deleteProduct);

//pago
router.get('/api/v0/allPayment',controllerPago.onePayment);
router.get('/api/v0/onePayment/:id',validIdMongo, controllerPago.allPayment);
router.post('/api/v0/registerPayment',controllerPago.registerPayment);
router.put('/api/v0/updatePayment/:id',controllerPago.updatePayment);
router.delete('/api/v0/deletePayment/:id',controllerPago.deletePayment);


//detalle compra
router.get('/api/v0/allPurchaseDetail',controllerdetalleCompra.allPurchaseDetail);
router.get('/api/v0/onePurchaseDetail/:id', validIdMongo, controllerdetalleCompra.onePurchaseDetail);
router.post('/api/v0/registerPurchaseDetail',controllerdetalleCompra.registerPurchaseDetail);
router.put('/api/v0/updatePurchaseDetail/:id',controllerdetalleCompra.updatePurchaseDetail);
router.delete('/api/v0/deletePurchaseDetail/:id',controllerdetalleCompra.deletePurchaseDetail);


//Comuna
router.get('/api/v0/Allcomunas',controllerComuna.getComunas);
router.post('/api/v0/registerComuna',controllerComuna.registerComuna);

//Región
router.get('/api/v0/allRegion',controllerRegion.getAll);
router.post('/api/v0/registerRegion', controllerRegion.registerRegion);

//Token
router.post('/api/v0/getToken', createToken);
module.exports = router;
