const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const schema=mongoose.Schema;

const noticeSchema=new schema({
    //registation form
    title:{type:String,required:true},
    content:{type:String,required:true},
    date:{type:Date,default:Date.now}
    
   
   
   
   });
   

const Notice=module.exports=mongoose.model("Notice",noticeSchema);