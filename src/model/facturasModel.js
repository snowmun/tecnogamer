const {model , Schema} = require("mongoose");

const facturaSchema = new Schema ({
    fechaCompra:{type:Date,require: true},
    detallesVentas: [{
        type: Schema.Types.ObjectId,
        ref: 'DetalleVenta',
        autopopulate: true
    }],    
});

facturaSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Factura', facturaSchema);