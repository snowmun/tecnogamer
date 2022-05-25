//orlando listo
const {model , Schema} = require("mongoose");
const comunaSchema = new Schema ({
    nombre:{type:String,require: true},
    regionid: [{
        type: Schema.Types.ObjectId,
        ref: 'region',
        autopopulate: true
    }],    
});

comunaSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Pago', comunaSchema);