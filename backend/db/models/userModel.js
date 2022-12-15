const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var userSchema = new Schema({
    name                              : { type: String, required: true, unique : true},
    phone                             : { type: String},
    location                          : { type: String},
    email                             : { type: String},
    updated_by                        : { type:String, default: require('os').hostname()},
},{ timestamps: true })

module.exports = mongoose.model("user", userSchema);