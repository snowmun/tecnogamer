require('dotenv').config();
const express = require ('express');
// const router = require ('./route/routes.js');
const cors = require('cors');
// const db = require('./database/db')
// const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.listen(PORT,()=>{
    console.log(`backend montado con exito en el puerto ${PORT}`)
})

