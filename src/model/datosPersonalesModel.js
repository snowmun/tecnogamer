const {model , Schema} = require("mongoose");

const datosPersonalesSchema = new Schema ({
    nombre:{type:String,require: true },
    apellido:{type:String,require: true },
    edad:{type:Number,require: true },
    rut:{type:String,require: true },
    fono:{type:String,require: true },
    correo:{type:String,require: true },
});

datosPersonalesSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('datosPeronale', datosPersonalesSchema);