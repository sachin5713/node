/***
 * This file is used for creating model and schema's, Which means we can send the data whatever we had defined it to here.
 * 
 */
const mongoose = require('mongoose'); // connection with database
const userSchema = mongoose.Schema({
    first_name:String,
    last_name:String,
    phone_number:Number,
    email:String,
    password:String
});
module.exports = mongoose.model('users-collection',userSchema);
