var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');


router.post('/',func.auth2,function(req, res, next) 
{     

    req.check('order_id','order id should be numeric').isNumeric();
    req.check('total_amount','total_amount must be nueric').isNumeric();
    var verrs=req.validationErrors();
    // console.log('this is session email')
    // console.log(req.session.email)
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
            if(result[0].userType == 'Supplier'){
              var pendingNegotiate = 
              {
                orderid:req.body.order_id,
                email:req.session.email,    
                cost:req.body.total_amount,
                status:'wait',
                time: new Date()
              };
              con.query("INSERT INTO pendingNegotiate SET ? ",pendingNegotiate,function(err,result,fields)
              {
                if(err)
                {
                  console.log(err);
                  res.json({'success':false,msg: 'something went wrong'});
                }
                else
                { 
                res.json({'success':true,'msg':'placed a bid on given order sucessfully, wait for buyer to confirm'});

                }     
              });
          }
          else{
            res.json({success:false,msg: 'You need to be supplier to view this'});
          }
       }
     });
   }
     
});


module.exports = router;