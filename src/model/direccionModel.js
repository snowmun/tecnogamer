const {model , Schema} = require("mongoose");

const direccionSchema = new Schema ({
    calle:{type:String,require: true },
    numero:{type:String,require: true },
    block:{type:String,require: false },
    depto:{type:String,require: false },
    piso:{type:String,require: true },
    comunaId: [{
        type: Schema.Types.ObjectId,
        ref: 'Comuna',
        autopopulate: true
    }],
});

direccionSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Direccione', direccionSchema);