var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');


router.post('/',func.auth2,function(req, res, next) 
{ 
  req.check('addLine1', 'invalid zone').exists().isLength({min: 2 , max: 100}).withMessage('addLine1 should not be empty, should be more than 2 and less than 100 character').trim();
  req.check('addLine2','invalid location name').exists().isLength({min: 2 , max: 100}).withMessage('addLine2 should not be empty, should be more than 2 and less than 100 character').trim();
  req.check('city', 'invalid city').exists().isLength({min: 2 , max: 30}).withMessage('city should not be empty, should be more than 2 and less than 30 character').trim();
  req.check('state','invalid state').exists().isLength({min: 2 , max: 50}).withMessage('state should not be empty, should be more than 2 and less than 50 character').trim();
  req.check('pin','pin should be 6 digit').isLength({min:6,max:6}).isNumeric();
  var verrs=req.validationErrors();
  if(verrs)
  {
    res.json({ success:false,msg: verrs[0].msg,});
  }
  else
  {
    var site_address = 
    {
      addLine1:req.body.addLine1,
      addLine2:req.body.addLine2,    
      city:req.body.city,
      state:req.body.state,
      pin:req.body.pin,
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

       con.query("INSERT INTO sites SET ?",{'email':req.session.email,'address':JSON.stringify(site_address),'time':new Date()},function(err,result,fields)
      {
        if(err)
        {
          console.log(err);
          res.json({'success':false,msg: 'something went wrong'});
        }
        else 
        {   
          res.json({ success:true,msg: 'succesfully addded site'});
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