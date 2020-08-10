const mongoose=require('mongoose');
const router = require('../routes/users');
const Notice=require('../models/notice');


  
  

  
module.exports.create=function(newNotice,callback){
  if(err){
    res.json({state:false,msg:"Not Notice created"});
    }
    
    if(Notice){
      res.json({state:true,msg:"Notice created"});
    }
    
    
    
};


module.exports.update=function(newNotice,callback){
    
        if(err){
          res.json({state:false,msg:"Not Notice updated"});
          }
          
          if(Notice){
            res.json({state:true,msg:"Notice updated"});
          }
     
    
    
};

module.exports.delete=function(newNotice,callback){
    
        if(err){
          res.json({state:false,msg:"Not Notice deleted"});
          }
          
          if(Notice){
            res.json({state:true,msg:"Notice deleteed"});
          }
    
    
};