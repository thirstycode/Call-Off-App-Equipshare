var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');


router.post('/',func.auth2,function(req, res, next) 
{     

    req.check('qrstring','invalid qr string').isLength({min:2,max:1000});
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

               con.query("SELECT * FROM qr WHERE hash = ?",req.body.qrstring,function(err,result,fields)
              {
                if(err)
                {
                  console.log(err);
                  res.json({success:false,msg: 'something went wrong',});
                }
                else if(result.length>0)
                {
                  // console.log(result)

                    con.query("SELECT * FROM runningDriver WHERE orderid = ? AND driveremail = ? AND status = ?",[result[0].orderid,req.session.email,'incomplete'],function(err,result,fields)
                    {
                      if(err)
                      {
                        console.log(err);
                        res.json({'success':false,msg: 'something went wrong'});
                      }
                      else if (result.length >0)
                      { 

                          con.query("UPDATE orders SET status = ? WHERE id = ? ",['complete',result[0].orderid],function(err,result,fields)
                          {
                            if(err)
                            {
                              console.log(err);
                              res.json({'success':false,msg: 'something went wrong'});
                            }
                          });

                          con.query("UPDATE pendingNegotiate SET status = ? WHERE orderid = ? ",['complete',result[0].orderid],function(err,result,fields)
                          {
                            if(err)
                            {
                              console.log(err);
                              res.json({'success':false,msg: 'something went wrong'});
                            }
                          });

                          con.query("UPDATE runningDriver SET status = ? WHERE orderid = ? ",['complete',result[0].orderid],function(err,result,fields)
                          {
                            if(err)
                            {
                              console.log(err);
                              res.json({'success':false,msg: 'something went wrong'});
                            }
                          });

                          con.query("UPDATE qr SET status = ? WHERE orderid = ? ",['complete',result[0].orderid],function(err,result,fields)
                          {
                            if(err)
                            {
                              console.log(err);
                              res.json({'success':false,msg: 'something went wrong'});
                            }
                            else{
                              res.json({'success':true,msg: 'transaction successfull'});
                            }
                          });

                      }     
                      else{
                      res.json({"success":false,'msg':'wrong driver or wrong orderid or transaction already done check invoice'}); 
                      }
                    });

                  
                }
                else{
                  res.json({"success":false,'msg':'qr code invalid'}); 
                }
              });



          }
          else{
            res.json({success:false,msg: 'You need to be driver to view this'});
          }
       }
     });
   }
     
});


module.exports = router;