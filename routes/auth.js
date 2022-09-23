const express = require('express');
const router  = express.Router()
const User    = require('../models/users')
const bcrypt  = require('bcrypt');
const rounds  = 10;
const middleware = require('../middleware')

const jwt = require('jsonwebtoken');
const tokenSecret = 'my-token-secret';

router.get('/login', (req, res) => {
  
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) res.status(404).json({error: 'No user found'})
        else {
            bcrypt.compare(req.body.password, user.password, (error,match)=>{
                if(error) res.status(500).json(error)
                else if(match) res.status(200).json({token: generateToken(user)})
                else res.status(403).json({error:'password not match'})
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.get('/jwt-test',middleware.verify, (req, res) => {
    res.status(200).json(req.user);
});

router.post('/signup', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user) res.status(404).json({error: 'Email already registered...!'})
        else {
            bcrypt.hash(req.body.password, rounds, (error, hash)=>{
                if(error) res.status(500).json(error)
                else{
                    const newUser = User(
                        {
                            first_name:req.body.first_name, 
                            last_name:req.body.last_name, 
                            phone_number:req.body.phone_number, 
                            email:req.body.email, 
                            password:hash
                        }
                    )
                    newUser.save()
                    .then(user => {
                         res.status(200).json({token:generateToken(user)});
                    })
                    .catch(error => {
                        res.status(500).json(error)
                    })
                }
            })
        }
    })
});

function generateToken(user){
    return jwt.sign({data:user}, tokenSecret,{expiresIn:'24h'})
}
module.exports = router;


