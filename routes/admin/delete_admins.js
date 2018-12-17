var express = require('express');
var router = express.Router();
var func = require('../func.js');
// var edo=require('../edonomix.js');
var con = require('../db');

router.get('/',func.auth2,function(req, res, next) 
{
  var admin_id=req.query.admin_id;
  // req.checkQuery('id', 'id must be a number').optional().isNumber();
  req.checkQuery('admin_id', 'id must be a number').isNumeric();
  var verrs=req.validationErrors();
  if(verrs)
  {
    res.json({ success:false,msg: verrs[0].msg,});
  }
  else
  {
    con.query("update admin set ? where admin_id= ? and admin_createdby=? and admin_status=1",[{'admin_status':0},admin_id,req.decoded.aid],function(err,adminresult,fields)
    {
      if(err)
      {
        console.log(err);
        res.json({'success':false,msg: 'something went wrong'});
      }
      else
      { 
        if(adminresult["affectedRows"]==1)
        res.json({"success":true,'msg':'admin deleted'});
        else
        res.json({"success":false,'msg':'invalid operation'});    
      }      
    });  
  }        
});


module.exports = router;