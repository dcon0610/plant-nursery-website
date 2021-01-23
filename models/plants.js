const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define User Schema
const plant = new Schema({
     name: {type: String, required: true},
   height : {type: Number, required: true},
   cost: {type: Number, required: true}
});

// define model
const plants = mongoose.model("plants", plant);

// export
module.exports = plants;