const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email       : {type: String, required: true, unique: true},
    gravatar    : String,
    lastActive  : Date
});

module.exports = mongoose.model('User', UserSchema);