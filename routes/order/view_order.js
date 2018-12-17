var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');

// router.get('/',func.auth,function(req, res, next) 
// {
// 	res.json({"success":true,'msg':'add location page'});     
// });

router.get('/',func.auth2,function(req, res, next) 
{ 

     con.query("SELECT * FROM orders",function(err,result,fields)
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
	   
});


module.exports = router;