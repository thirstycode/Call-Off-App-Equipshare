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
          if(result[0].userType == 'Supplier'){
            con.query("SELECT * FROM orders WHERE status = ?",'incomplete',function(err,result,fields)
            {
              if(err)
              {
                console.log(err);
                res.json({'success':false,msg: 'something went wrong'});
              }
              else
              { 
              // console.log(result);
              for (var i=0;i<result.length;i++){
                // console.log(result[i].requirement);
                result[i].requirement =  JSON.parse(result[i].requirement);
            }

            res.json({'success':true,'msg':'view orders','orders':result});

              }     
            });
        }
        else{
          res.json({success:false,msg: 'You need to be supplier to view this'});
        }
     }
   });
	   
});


module.exports = router;