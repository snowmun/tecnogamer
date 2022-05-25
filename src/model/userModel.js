const {model , Schema} = require("mongoose");
//orlando modificar listo
const userSchema = new Schema ({
    nombreUsuario:{type:String,require: true},
    contrasena:{type:String,require: true},
    rol:{type:Number,require: true},
    datosPersoId: [{
        type: Schema.Types.ObjectId,
        ref: 'datosPersonales',
        autopopulate: true
    }],
});

userSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('User', userSchema);