const express = require('express');
const router = express.Router();
const controllerUser = require ('../controller/UserController');
const controllerMark = require ('../controller/markController');
const controllerCategory = require ('../controller/categoryController');

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




module.exports = router;
