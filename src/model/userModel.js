const {model , Schema} = require("mongoose");

const userSchema = new Schema ({
    nombreUsuario:{type:String,require: true},
    correo:{type:String,require: true , unique:true},
    contrasena:{type:String,require: true},
    nombre:{type:String,require: true},
    apellido:{type:String,require: true},
    direccion:{type:String,require: true},
    rol:{type:Number,require: true},
});

module.exports = model('User', userSchema);