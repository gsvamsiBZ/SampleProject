const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;
var truecallerUserSchema = new Schema({
    phone                             : { type: String, required: true, unique : true},
    name                              : { type: String, required: true},
    location                          : { type: String},
    email                             : { type: String},
    updated_by                        : { type:String, default: require('os').hostname()},
},{ timestamps: true })

truecallerUserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("truecallerUser", truecallerUserSchema);