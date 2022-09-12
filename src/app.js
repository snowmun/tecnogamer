require('dotenv').config();
require('./database/db');
const express = require ('express');
const path = require('path');
const router = require ('./route/router.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));



app.use('/',router);

app.listen(PORT,()=>{
    console.log(`backend montado con exito en el puerto ${PORT}`)
})

