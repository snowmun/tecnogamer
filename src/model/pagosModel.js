const {model , Schema} = require("mongoose");

const pagoSchema = new Schema ({
    tipoPago:{type:String,require: true},
    usuarioId: [{
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        autopopulate: true
    }],    
});

pagoSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Pago', pagoSchema);