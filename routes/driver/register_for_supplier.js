var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');


router.post('/',func.auth2,function(req, res, next) 
{ 
  req.check('supplieremail','invalid email').isEmail().isLength({min:2,max:100});
  var verrs=req.validationErrors();
  if(verrs)
  {
    res.json({ success:false,msg: verrs[0].msg,});
  }
  else
  {
     con.query("SELECT * FROM users WHERE email=?",req.session.email,function(err,result,fields)
    {
      if(err)
      {
        console.log(err);
        res.json({'success':false,msg: 'something went wrong'});
      }
      else if(result.length > 0)
      { 
        if(result[0].userType == 'Driver'){

           con.query("SELECT * FROM users WHERE email=?",req.body.supplieremail,function(err,result,fields)
          {
            if(err)
            {
              console.log(err);
              res.json({'success':false,msg: 'something went wrong'});
            }
            else if(result.length > 0 )
            {   

                 con.query("SELECT * FROM supplierdriver WHERE supplieremail = ? AND driveremail = ? ",[req.body.supplieremail,req.session.email],function(err,result,fields)
                {
                  if(err)
                  {
                    console.log(err);
                    res.json({'success':false,msg: 'something went wrong'});
                  }
                  else if(result.length == 0)
                  {  
                       con.query("INSERT INTO supplierdriver SET ?",{'supplieremail':req.body.supplieremail,'driveremail':req.session.email},function(err,result,fields)
                      {
                        if(err)
                        {
                          console.log(err);
                          res.json({'success':false,msg: 'something went wrong'});
                        }
                        else
                        {  
                          res.json({ success:true,msg: 'successfully registered for supplier'});
                          }
                      });     
                    }
                    else{
                      res.json({'success':false,msg: 'already registered'});
                    }
                });  


      
              
            }
            else{
              res.json({'success':false,msg: 'no such supplier found'});
            }
          });
        }
        else{
          res.json({success:false,msg: 'You need to be driver to do this'});
        }
      }
      else
      { 
        res.json({success:false,msg:'login again'}) ;    
      }      
    });
  }      
});


module.exports = router;