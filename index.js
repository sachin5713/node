const express   = require('express');
const mongooose = require('mongoose');
const bcrypt    = require('bcrypt');
const app       = express();
const authRoute = require('./routes/auth')


const dbURI = "mongodb://localhost:27017/authentication";
app.use(express.json());
app.use('/api/auth',authRoute)


mongooose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongooose.connection

db.on("error", (err) => {console.error(err)})
db.once("open", () => {console.log("DB Started successfully")});

app.listen(2400, ()=> {console.log("Server started: 2400")})