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
            if(result[0].userType == 'Buyer'){

              con.query("SELECT * FROM orders WHERE email = ? ",req.session.email,function(err,result,fields)
              {
                if(err)
                {
                  console.log(err);
                  res.json({'success':false,msg: 'something went wrong'});
                }
                else if (result.length > 0 )
                { 
                  var orderids = [];
                  for(var i=0;i<result.length;i++){
                    orderids.push(result[i].id);
                  }

                  con.query("SELECT * FROM pendingNegotiate WHERE orderid IN ("+ "?,".repeat(result.length - 1) + "?" + ")",orderids,function(err,result,fields)
                  {
                    if(err)
                    {
                      console.log(err);
                      res.json({'success':false,msg: 'something went wrong'});
                    }
                    else if (result.length > 0 )
                    { 
                      
                      res.json({'success':true,'msg':'these are bids','bids':result});

                    }     
                  });

                }     
              });
          }
          else{
            res.json({success:false,msg: 'You need to be buyer to view this'});
          }
       }
     });
     
});


module.exports = router;