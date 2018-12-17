var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');


router.post('/',func.auth2,function(req, res, next) 
{     

    req.check('order_id','order id should be numeric').isNumeric();
    req.check('driveremail','invalid email').isEmail().isLength({min:2,max:100});
    req.check('buyeremail','invalid email').isEmail().isLength({min:2,max:100});
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

              con.query("SELECT * FROM orders WHERE id = ? AND email = ? AND status = ?",[req.body.order_id,req.body.buyeremail,'incomplete'],function(err,result,fields)
              {
                if(err)
                {
                  console.log(err);
                  res.json({'success':false,msg: 'something went wrong'});
                }
                else if(result.length>0)
                { 
                  con.query("SELECT * FROM pendingNegotiate WHERE orderid = ? AND email = ? AND status = ?",[req.body.order_id,req.session.email,'accept'],function(err,result,fields)
                  {
                    if(err)
                    {
                      console.log(err);
                      res.json({'success':false,msg: 'something went wrong'});
                    }
                    else if(result.length>0)
                    { 

                              con.query("SELECT * FROM runningDriver WHERE driveremail = ?",req.body.driveremail,function(err,result,fields)
                              {
                                if(err)
                                {
                                  console.log(err);
                                  res.json({'success':false,msg: 'something went wrong'});
                                }
                                else if (result.length == 0)
                                { 
                                    var runningDriver = 
                                  {
                                    orderid:req.body.order_id,
                                    driveremail:req.body.driveremail,    
                                    supplieremail:req.session.email,
                                    buyeremail:req.body.buyeremail,
                                    time: new Date(),
                                    status:'incomplete'
                                  };
                                  con.query("INSERT INTO runningDriver SET ? ",runningDriver,function(err,result,fields)
                                  {
                                    if(err)
                                    {
                                      console.log(err);
                                      res.json({'success':false,msg: 'something went wrong'});
                                    }
                                    else
                                    { 
                                    res.json({'success':true,'msg':'successfully allocated ths driver'});
                                    }     
                                  });
                                }     
                                else{
                                  res.json({'success':false,msg: 'driver already running'});
                                }
                              });

                    } 
                    else{
                      res.json({'success':false,msg: 'offer not accepted by buyer'});
                    }    
                  });
                } 
                else{
                  res.json({'success':false,msg: 'no such order found'});
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