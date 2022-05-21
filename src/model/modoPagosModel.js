const {model , Schema} = require("mongoose");

const modoPagoSchema = new Schema ({
    tipoPago:{type:String,require: true},
    pagoId: [{
        type: Schema.Types.ObjectId,
        ref: 'Pago',
        autopopulate: true
    }],    
});

modoPagoSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('ModoPago', modoPagoSchema);