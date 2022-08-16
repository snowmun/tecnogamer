const {model , Schema} = require("mongoose");

const categoriaSchema = new Schema ({
    nombreCategoria:{type:String,require: true},
});

module.exports = model('Categoria', categoriaSchema);