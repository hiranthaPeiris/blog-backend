const express = require('express');
//request handle krnne Router haraha
const router=express.Router();
const User=require('../models/user');
const jwt= require('jsonwebtoken');
const config=require('../config/database');
const passport= require('passport');






router.post("/register",function (req,res){
  //data enawa
  //res.send("Hellow registers");
  //console.log(req.body);]
  //registerta adala routing eka
  const newUser=new User({
    Name:req.body.Name,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password

  });


User.saveUser(newUser,function(err,user){
  if(err){
  res.json({state:false,msg:"do not insreted"});
  }
  
  if(user){
    res.json({state:true,msg:"data inserted"});
  }
  
  });

});

//"/users" me pth ek
router.post("/login",function (req,res){
    const email=req.body.email;
    const password=req.body.password;

    User.findByEmail(email,function(err,user){
       if(err) throw err;
       if(!user){
         res.json({state:false,msg:"NO USER FOUND"});
               //res.console.log(user);
            };

     User.passwordCheck(password,user.password,function(err,match){
       if(err) throw err;
       if(match)
          {
              console.log("email password combination verfied" );
              const token = jwt.sign(user,config.secret,{expiresIn:86400});
              res.json(
                {
                  state:true,
                  token:" JWT "+token,
                  user:{
                    id:user._id,
                    Name:user.Name,
                    username:user.username,
                    email:user.email
                     }
                }
              )
            }

            });
          

         });

       });

  router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.json({user:req.user});
    }
);

module.exports=router;