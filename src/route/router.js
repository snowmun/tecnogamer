const express = require('express');
const router = express.Router();
const controllerUser = require ('../controller/UserController');
const controllerMark = require ('../controller/markController');
const controllerCategory = require ('../controller/categoryController');
const controllerProduct = require ('../controller/productController');
const controllerPago = require ('../controller/paymentController');
const controllerdetalleCompra = require ('../controller/purchaseDetailController');

//Rutas Usuario
router.get('/api/v0/oneuser/:id', controllerUser.getUser);
router.get('/api/v0/alluser',controllerUser.getAll);
router.post('/api/v0/useregister',controllerUser.useregister);
router.post('/api/v0/login',controllerUser.userlogin);
router.delete('/api/v0/deleteuser/:id',controllerUser.deleteUser);
router.put('/api/v0/updateuser/:id',controllerUser.UpdateUser);

//Rutas Marca
router.get('/api/v0/allmark',controllerMark.getAll);
router.get('/api/v0/onemark/:id', controllerMark.getMark);
router.post('/api/v0/markregister',controllerMark.markregister);
router.put('/api/v0/updatemark/:id',controllerMark.updateMark);
router.delete('/api/v0/deletemark/:id',controllerMark.deleteMark);


//Rutas Categoria
router.get('/api/v0/allcategory',controllerCategory.getAllCategory);
router.get('/api/v0/onecategory/:id', controllerCategory.getCategory);
router.post('/api/v0/categoryregister',controllerCategory.categoryregister);
router.put('/api/v0/updatecateogry/:id',controllerCategory.updateCategory);
router.delete('/api/v0/deletecategory/:id',controllerCategory.deleteCategory);

// producto
router.get('/api/v0/allproduct',controllerProduct.allProduct);
router.get('/api/v0/oneproduct/:id', controllerProduct.oneProduct);
router.post('/api/v0/registerproduct',controllerProduct.registerProduct);
router.put('/api/v0/updateproduct/:id',controllerProduct.updateProduct);
router.delete('/api/v0/deleteproduct/:id',controllerProduct.deleteProduct);

//pago
router.get('/api/v0/allPayment',controllerPago.onePayment);
router.get('/api/v0/onePayment/:id', controllerPago.allPayment);
router.post('/api/v0/registerPayment',controllerPago.registerPayment);
router.put('/api/v0/updatePayment/:id',controllerPago.updatePayment);
router.delete('/api/v0/deletePayment/:id',controllerPago.deletePayment);


//detalle compra
router.get('/api/v0/allPurchaseDetail',controllerdetalleCompra.allPurchaseDetail);
router.get('/api/v0/onePurchaseDetail/:id', controllerdetalleCompra.onePurchaseDetail);
router.post('/api/v0/registerPurchaseDetail',controllerdetalleCompra.registerPurchaseDetail);
router.put('/api/v0/updatePurchaseDetail/:id',controllerdetalleCompra.updatePurchaseDetail);
router.delete('/api/v0/deletePurchaseDetail/:id',controllerdetalleCompra.deletePurchaseDetail);

module.exports = router;
