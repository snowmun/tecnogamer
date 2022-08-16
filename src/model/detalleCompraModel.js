const {model , Schema} = require("mongoose");
//orlando modificar listo 

const detalleVentaSchema = new Schema ({
    valor:{type:Number,require: true},
    cantidad:{type:Number,require: true},
    productoId: [{
        type: Schema.Types.ObjectId,
        ref: 'producto',
        autopopulate: true
    }],    
});

detalleVentaSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('DetalleVenta', detalleVentaSchema);