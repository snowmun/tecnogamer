const express = require('express');
const router = express.Router();
const controllerUser = require ('../controller/UserController');
const controllerMarcas = require ('../controller/markController');
const controllerCategoria = require ('../controller/categoryController');

//Rutas Usuario
router.get('/api/v0/oneuser/:id', controllerUser.getUser);
router.get('/api/v0/alluser',controllerUser.getAll);
router.post('/api/v0/useregister',controllerUser.register);
router.post('/api/v0/login',controllerUser.login);
router.delete('/api/v0/deleteuser/:id',controllerUser.deleteUser);
router.put('/api/v0/updateuser/:id',controllerUser.UpdateUser);

//Rutas Marca
router.get('/api/v0/allmark',controllerMarcas.getAll);
router.get('/api/v0/onemark/:id', controllerMarcas.getMarca);
router.post('/api/v0/markregister',controllerMarcas.register);

//Rutas Categoria
router.get('/api/v0/allcategory',controllerCategoria.getAll);
router.get('/api/v0/category/:id', controllerCategoria.getCategoria);
router.post('/api/v0/categoryregister',controllerCategoria.register);

module.exports = router;
