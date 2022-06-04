const {model , Schema} = require("mongoose");

const datosPersonalesSchema = new Schema ({
    nombre:{type:String,require: true },
    apellido:{type:String,require: true},
    rut:{type:String,require: true },
    fono:{type:String },
    correo:{type:String,require: true },
    direccionId: [{
        type: Schema.Types.ObjectId,
        ref: 'Direccione',
        autopopulate: true
    }],
});

datosPersonalesSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('datosPeronale', datosPersonalesSchema);