const express   = require('express'); // import express js
const mongoose  = require('mongoose'); // import mongoose db package
require('./config') // import config file

const User = require('./users');
const app = express();

app.use(express.json());

//post API for create user
app.post('/create', async (req,resp)=>{
    let data = new User(req.body);
    // console.log(userData);
    if(data != ''){
        const userData = await User.find({"email" : req.body.email})
        if(userData == ''){
            if(data.first_name == ''){
                resp.status(400).send({status:400,message:"Firstname is Empty!"}); 
            } else if(data.last_name == ''){
                resp.status(400).send({status:400,message:"Lastname is Empty!"}); 
            } else if(data.phone_number == ''){
                resp.status(400).send({status:400,message:"Phone Number is Empty!"}); 
            } else if(data.email == ''){
                resp.status(400).send({status:400,message:"Email is Empty!"}); 
            } else if(data.password == ''){
                resp.status(400).send({status:400,message:"Password is Empty!"}); 
            } else {
                let result  = await data.save();
                resp.status(200).send({status:200,message:"Registration Successfully",data:result});
            }
        } else {
            resp.status(400).send({status:400,message:"Email already exist!"});  
        }
    } else {
        resp.status(400).send({status:400,message:"Request is empty!"}); 
        
    }
});

app.listen(5000);

