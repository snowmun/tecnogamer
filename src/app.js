require('dotenv').config();
require('./database/db')
const express = require ('express');
const router = require ('./route/router.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const {validarTokenRequest} = require('./auth/validaToken');
const {createToken} = require('./auth/getToken');
app.use(cors());
app.use(express.json());

app.post('/api/v0/getToken', createToken);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(validarTokenRequest);

app.use('/',router);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(PORT,()=>{
    console.log(`backend montado con exito en el puerto ${PORT}`)
})

