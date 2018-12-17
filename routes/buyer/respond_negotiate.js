var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');


router.post('/',func.auth2,function(req, res, next) 
{     

    req.check('negotiation_id','order id should be numeric').isNumeric();
    req.check('status','status must be proper string').isIn(["accept","reject"]);
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

              con.query("UPDATE pendingNegotiate SET status = ? WHERE id = ? AND status IN (?,?,?)",[req.body.status,req.body.negotiation_id,'accept','reject','wait'],function(err,result,fields)
              {
                if(err)
                {
                  console.log(err);
                  res.json({'success':false,msg: 'something went wrong'});
                }
                else
                { 
                res.json({'success':true,'msg':'Updated the status of negotiation'});

                }     
              });
          }
          else{
            res.json({success:false,msg: 'You need to be buyer to view this'});
          }
       }
     });
   }
     
});


module.exports = router;