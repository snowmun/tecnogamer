const {model , Schema,mongoose} = require("mongoose");

const productoSchema = new Schema ({
    nombreProducto:{type:String,require: true},
    stock:{type:String,require: true , unique:true},
    precio:{type:String,require: true},
    descripcion:{type:String,require: true},
    categoria: [{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        autopopulate: true
    }],
    marca: [{
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        autopopulate: true
    }],

});

productoSchema.plugin(require('mongoose-autopopulate'))
module.exports = model('Producto', productoSchema);

