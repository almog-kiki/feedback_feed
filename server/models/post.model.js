const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
    email       : String,
    rating      : String,
    content     : String,
    gravatar    : String
});

module.exports = mongoose.model('Post', postSchema);