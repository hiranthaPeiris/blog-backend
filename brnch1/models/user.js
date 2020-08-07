const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const schema=mongoose.Schema;

const userSchema=new schema({
 //registation form
 Name:{type:String,required:true},
 username:{type:String,required:true},
 email:{type:String,required:true},
 password:{type:String,required:true}



});
const User = module.exports=mongoose.model("User",userSchema);

module.exports.saveUser=function(newUser,callback){

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password=hash;

            if(err) throw err;
            newUser.save(callback);
        });
    });
};

module.exports.findByEmail=function(email,callback)
{
    const query={email:email};
    User.findOne(query,callback);
};

module.exports.passwordCheck=function(plainPassword,hash,callback){
    bcrypt.compare(plainPassword, hash, function(err, res) {
        // res === true
        if(err) throw err;
       if(res){
           callback(null,res);
       }
    });
    
};




module.exports.findUserbyId=function(id,callback){
User.findOne(id,callback);
};