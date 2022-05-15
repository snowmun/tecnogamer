const express = require('express');
const router = express.Router();
const controller = require ('../controller/UserController');


router.get('/api/v0/alluser',controller.getAll)
router.post('/api/v0/register',controller.register)


module.exports = router;
