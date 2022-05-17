const {model , Schema} = require("mongoose");

const marcasSchema = new Schema ({
    nombreMarca:{type:String,require: true},
});

module.exports = model('Marca', marcasSchema);