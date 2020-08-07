const express = require('express');
const path=require("path");
const { dirname } = require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bcrypt = require('bcryptjs');
const passport= require('passport');

const app = express();
const port=process.env.PORT ||3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 // parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
  





const config=require("./config/database");
const connecion=mongoose.connect(config.database,{useNewUrlParser: true,useUnifiedTopology: true});
if(connecion){
  console.log("database connected");
}


const user=require('./routes/users'); 


//front end eka ganne meken
app.use(express.static(path.join(__dirname,"public")));
//user kiyala route ekk awoth user variable ek balanna
app.use('/user',user);



app.get("/",function (req,res){
  res.send("Hellow world");
});

app.listen(port,function(){
  console.log("listen server"+port);

});