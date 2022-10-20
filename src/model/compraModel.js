const { model, Schema } = require("mongoose");

const compraSchema = new Schema({
    valorCompra: { type: Number, require: true },
    fechaCompra: { type: String, require: true },
    usuarioId: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    }],
    detalleCompraId: [{
        type: Schema.Types.ObjectId,
        ref: 'DetalleVenta',
        autopopulate: true
    }],
});

compraSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Compra', compraSchema);
