//orlando listo
const {model , Schema} = require("mongoose");
const comunaSchema = new Schema ({
    nombre:{type:String,require: true},
    regionId: [{
        type: Schema.Types.ObjectId,
        ref: 'Regione',
        autopopulate: true
    }],    
});

comunaSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Comuna', comunaSchema);