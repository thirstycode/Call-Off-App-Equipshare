var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');

router.post('/',func.auth2,function(req, res, next) 
{ 
  req.check('site_id','pin should be 6 digit').isNumeric();
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
        if(result[0].userType == 'Buyer'){
            con.query("SELECT * FROM sites WHERE email = ? AND id = ?;",[req.session.email,req.body.site_id],function(err,result)
            {
              if(err)
              {
                console.log(err);
                res.json({success:false,msg: 'something went wrong'});
              }
              else if (result.length > 0)
              {

                con.query("DELETE FROM sites WHERE email = ? AND id = ?;",[req.session.email,req.body.site_id],function(err,result)
                {
                  if(err)
                  {
                    console.log(err);
                    res.json({success:false,msg: 'something went wrong'});
                  }
                  else
                  {
                    res.json({ success:true,msg: 'succesfully removed site'});
                  }
                }); 
              }
              else{
                res.json({success:false,msg: 'no such site found'});
              }
            });
        }
        else{
          res.json({success:false,msg: 'You need to be buyer to do this'});
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