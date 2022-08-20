require('dotenv').config();
const mongoose = require('mongoose')

const url = `mongodb+srv://snow:${process.env.MongoClave}@tecnogamer.x5opd.mongodb.net/tecno?retryWrites=true&w=majority`

mongoose.connect(url)


const db = mongoose.connection
db.on('open', ()=>{ console.log("¡Conectado a MongoDB!")} )
db.on('error', ()=>{ console.log("¡Error al conectar a MongoDB!")} )

module.exports=db  