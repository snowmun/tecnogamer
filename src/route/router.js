const express = require('express');
const router = express.Router();
const controllerUser = require ('../controller/UserController');
const controllerMarcas = require ('../controller/marcaController');
const controllerCategoria = require ('../controller/categoriaController');

//Rutas Usuario
router.get('/api/v0/user/:id', controllerUser.getUser);
router.get('/api/v0/alluser',controllerUser.getAll);
router.post('/api/v0/register',controllerUser.register);
router.post('/api/v0/login',controllerUser.login);
router.delete('/api/v0/deleteuser/:id',controllerUser.deleteUser);
router.put('/api/v0/updateuser/:id',controllerUser.UpdateUser);

//Rutas Marca
router.get('/api/v0/allmarcas',controllerMarcas.getAll);
router.get('/api/v0/marca/:id', controllerMarcas.getMarca);
router.post('/api/v0/marca/register',controllerMarcas.register);

//Rutas Categoria
router.get('/api/v0/allCategoria',controllerCategoria.getAll);
router.get('/api/v0/categoria/:id', controllerCategoria.getCategoria);
router.post('/api/v0/categoria/register',controllerCategoria.register);

module.exports = router;
