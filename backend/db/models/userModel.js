const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

var userSchema = new mongoose.Schema({
	username             : { type: String, trim: true, unique : true },
    name                 : String,
	email                : { type: String, trim: true, unique : true },
    phoneNumber          : { type: String, trim: true, maxlength: 10, minlength: 10 },
    avatar               : { type: String},
	role                 : { type: String,  required: true, enum: [ 'admin', 'user'], default: 'user' },
    password             : String,
    otp                  : {type :String, default: ""},
    verified             : {type :Boolean, default: false}
},{timestamps:true});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('user', userSchema);