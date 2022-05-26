const {model , Schema} = require("mongoose");

const regionSchema = new Schema ({
    nombreRegion:{type:String,require: true},
});

module.exports = model('Region', regionSchema);
