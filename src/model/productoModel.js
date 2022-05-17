const {model , Schema} = require("mongoose");

const productoSchema = new Schema ({
    nombreProducto:{type:String,require: true},
    stock:{type:String,require: true , unique:true},
    precio:{type:String,require: true},
    descripcion:{type:String,require: true},
    categoria:{type:String,require: true},
    marca:{type:String,require: true},

});

module.exports = model('Producto', productoSchema);