const mongoose = require('mongoose'); // connection with database
const userCredentialsSchema = mongoose.Schema({
    email:String,
    password:String
});
module.exports = mongoose.model('users-collection',userCredentialsSchema);