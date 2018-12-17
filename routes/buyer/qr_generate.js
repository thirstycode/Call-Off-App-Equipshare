var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');
var QRCode = require('qrcode')
var crypto = require("crypto");


router.post('/',func.auth2,function(req, res, next) 
{     

    req.check('orderid','order id should be numeric').isNumeric();
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
            if(result[0].userType == 'Buyer'){

               con.query("SELECT * FROM orders WHERE id = ? AND email = ? ",[req.body.orderid,req.session.email],function(err,result,fields)
              {
                if(err)
                {
                  console.log(err);
                  res.json({success:false,msg: 'something went wrong',});
                }
                else if(result.length>0)
                {
                  // console.log(result)

                    con.query("SELECT * FROM qr WHERE orderid = ? AND STATUS = ?",[req.body.orderid,'incomplete'],function(err,result,fields)
                    {
                      if(err)
                      {
                        console.log(err);
                        res.json({'success':false,msg: 'something went wrong'});
                      }
                      else if (result.length >0)
                      { 

                        QRCode.toFile('/qr.png', result[0].hash, {
                              color: {
                                dark: '#00F',  // Blue dots
                                light: '#0000' // Transparent background
                              }
                            }, function (err) {
                              if (err)  {console.log(err);}
                              else{
                              res.sendFile('/qr.png');
                            }
                            })
                      }     
                      else{
                      var hash = crypto.randomBytes(20).toString('hex');

                       con.query("INSERT INTO qr SET ? ",{'orderid':req.body.orderid,'status':'incomplete','hash':hash},function(err,result,fields)
                        {
                          if(err)
                          {
                            console.log(err);
                            res.json({'success':false,msg: 'something went wrong'});
                          }
                          else
                          { 

                             QRCode.toFile('/qr.png', hash, {
                              color: {
                                dark: '#00F',  // Blue dots
                                light: '#0000' // Transparent background
                              }
                            }, function (err) {
                              if (err)  {console.log(err);}
                              else{
                              res.sendFile('/qr.png');
                            }
                            })


                          }
                        });

                      }
                    });

                  
                }
                else{
                  res.json({"success":false,'msg':'this order is not yours'}); 
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