const { model, Schema } = require("mongoose");
//orlando modificar listo
const pagoSchema = new Schema({
    tipoPago: { type: String, require: true },
    estadoPago: { type: String, require: true },
    fechaPago: { type: String, require: true },
    compraId: [{
        type: Schema.Types.ObjectId,
        ref: 'Compra',
        autopopulate: true
    }],
});

pagoSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Pago', pagoSchema);