/*
    @user_name                      :
    @city                           :
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var userSchema = new Schema({
    user_name                        : { type: String, required: true, unique : true},
    city                              : { type: String},
    updated_by                        : { type:String, default: require('os').hostname()},
},{ timestamps: true })

module.exports = mongoose.model("user", userSchema);
