const {model , Schema} = require("mongoose");

const detalleVentaSchema = new Schema ({
    cantidad:{type:Number,require: true},
    precio:{type:Number,require: true},
    fechaCompra:{type:Date,require: true},
    productoId: [{
        type: Schema.Types.ObjectId,
        ref: 'producto',
        autopopulate: true
    }],    
});

detalleVentaSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('DetalleVenta', detalleVentaSchema);