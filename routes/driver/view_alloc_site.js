var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');


router.get('/',func.auth2,function(req, res, next) 
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

            con.query("SELECT * FROM runningDriver WHERE driveremail = ? AND status = ?",[req.session.email,'incomplete'],function(err,result,fields)
            {
              if(err)
              {
                console.log(err);
                res.json({'success':false,msg: 'something went wrong'});
              }
              else if(result.length > 0)
              { 
                console.log(result);
                con.query("SELECT * FROM orders WHERE id = ? AND email = ?",[result[0].orderid,result[0].buyeremail],function(err,result,fields)
                {
                  if(err)
                  {
                    console.log(err);
                    res.json({'success':false,msg: 'something went wrong'});
                  }
                  else if(result.length>0)
                  { 
                      console.log(result);
                      con.query("SELECT * FROM sites WHERE id = ? ",result[0].site_id,function(err,result,fields)
                      {
                        if(err)
                        {
                          console.log(err);
                          res.json({'success':false,msg: 'something went wrong'});
                        }
                        else if(result.length>0)
                        { 
                          res.json({'success':true,'msg':'allocated site','site':JSON.parse(result[0].address)});
                        }    
                         
                        else{
                          res.json({'success':false,msg: 'no site found'});
                        }
                      });

                  }     
                });

              }     

              else{
                res.json({'success':false,msg: 'there are no orders on you'});
              }

            });
        }
        else{
          res.json({success:false,msg: 'You need to be driver to view this'});
        }
     }
   });
	   
});


module.exports = router;