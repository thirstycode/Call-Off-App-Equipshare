var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');

router.get('/',func.auth2,function(req, res, next) 
{
  con.query("select admin_id,`admin_mobile1`, `admin_mobile2`, `admin_dp`,`admin_full_name`, `admin_email`, `admin_date_time`, `adminname` from admin where admin_createdby=? and admin_status=1 order by admin_id desc",req.decoded.aid,function(err,adminresult,fields)
  {
    if(err)
    {
      console.log(err);
      res.json({'success':false,msg: 'something went wrong'});
    }
    else
    { 
      // console.log(adminresult);
      res.json({"success":true,'msg':'all admins made by you ','admindata':adminresult});    
    }      
  });          
});

module.exports = router;