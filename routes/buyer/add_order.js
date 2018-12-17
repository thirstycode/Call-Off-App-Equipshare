var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');


router.post('/',func.auth2,function(req, res, next) 
{ 
  req.check('requirement', 'invalid requirement').exists().isLength({min: 2 , max: 1000});
  req.check('site_id','valid site id').isNumeric();
  var verrs=req.validationErrors();
  if(verrs)
  {
    res.json({ success:false,msg: verrs[0].msg,});
  }
  else
  { 

    var reqArray =  req.body.requirement.split(",");
    console.log(reqArray);
    var reqJson = {};
    for (var i=0;i<=reqArray.length/2;i+=2){
      reqJson[reqArray[i]] = parseFloat(reqArray[i+1],10);
    }
    var order = 
    {
      status:'incomplete',   
      site_id:req.body.site_id,
      requirement:JSON.stringify(reqJson),
      email:req.session.email,
      time: new Date()
    };
     con.query("SELECT * FROM users WHERE email=?",req.session.email,function(err,result,fields)
    {
      if(err)
      {
        console.log(err);
        res.json({'success':false,msg: 'something went wrong'});
      }
      else if(result.length > 0)
      { 
      if(result[0].userType == 'Buyer'){

      con.query("SELECT * FROM sites WHERE email = ? AND id = ?",[req.session.email,order.site_id],function(err,resultnew,fields)
      {
        if(err)
      {
        console.log(err);
        res.json({'success':false,msg: 'something went wrong'});
      }
      else if(resultnew.length > 0 ){
           con.query("INSERT INTO orders SET ? ",order,function(err,resultnew,fields)
            {
              if(err)
            {
              console.log(err);
              res.json({'success':false,msg: 'something went wrong'});
            }
            else{
              res.json({ success:true,msg: 'succesful added order', });
            }

          });
      }
      else{
        res.json({ success:false,msg: 'wrong site id', });
      }

    });
        }
        else{
          res.json({success:false,msg: 'You need to be buyer to add site'});
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