const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define User Schema
const plant = new Schema({
     name: {type: String, required: true},
   id : {type: Number, required: true},
   cost: {type: Number, required: true},
   description: {type: String},
   url: {type: String},
   show: {type: Boolean, required: true, default: true}
});

// define model
const plants = mongoose.model("plants", plant);

// export
module.exports = plants;