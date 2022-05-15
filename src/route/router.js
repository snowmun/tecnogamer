const express = require('express');
const router = express.Router();
const controller = require ('../controller/UserController');

router.get('/api/v0/user', controller.getUser)
router.get('/api/v0/alluser',controller.getAll)
router.post('/api/v0/register',controller.register)
router.post('/api/v0/login',controller.login)
router.delete('/api/v0/deleteuser/:id',controller.deleteUser)
router.put('/api/v0/deleteuser/:id',controller.UpdateUser)



module.exports = router;
