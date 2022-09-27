const { model, Schema } = require("mongoose");

const productoSchema = new Schema({
    nombreProducto: { type: String, require: true },
    stock: { type: String, require: true },
    precio: { type: String, require: true },
    descripcion: { type: String, require: true },
    img: { type: Buffer, require: true },
    extension: { type: String, require: false },
    categoriaId: [{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        autopopulate: true
    }],
    marcaId: [{
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        autopopulate: true
    }],

});

productoSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Producto', productoSchema);

