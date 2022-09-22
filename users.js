/***
 * This file is used for creating model and schema's, Which means we can send the data whatever we had defined it to here.
 * 
 */
const mongoose = require('mongoose'); // connection with database
const userSchema = mongoose.Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    phone_number:{type:Number, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
});
module.exports = mongoose.model('users-collection',userSchema);
