var express = require('express');
var router = express.Router();
var func = require('../func.js');
// var edo=require('../edonomix.js');
var con = require('../db');

router.get('/',func.auth2,function(req, res, next) 
{  
  con.query("update admin set ? where admin_id= ? and status= 1 ",[{'status':0},req.decoded.aid],function(err,adminresult,fields)
  {
    if(err)
    {
      console.log(err);
      res.json({'success':false});
    }
    else
    { 
      if(adminresult["affectedRows"]==1)
      {
        req.session.destroy();
        res.json({"success":true,'msg':'admin deleted'});
      }
      else
      res.json({"success":false,'msg':'invalid operation'});    
    }      
  });               
});


module.exports = router;