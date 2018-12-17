//gives detail of perticular admin to whom  who created

var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');

router.get('/',func.auth2,function(req, res, next) 
{
  var admin_id=req.query.id;
  req.checkQuery('id', 'id must be a number').isNumeric();
  var verrs=req.validationErrors();
  if(verrs)
  {
    res.json({ success:false,msg: verrs[0].msg,});
  }
  else
  {
    con.query("select `adminname`,`admin_mobile1`, `admin_mobile2`,`admin_id`,`admin_full_name`, `admin_email`, FROM_UNIXTIME( UNIX_TIMESTAMP(admin_date_time),'%d %M %Y') `ondate`,`admin_dp` from admin where admin_createdby=? and admin_status=1 and admin_id=?",[req.decoded.aid,admin_id],function(err,adminresult,fields)
    {
      if(err)
      {
        console.log(err);
        res.json({'success':false,msg: 'something went wrong'});
      }
      else
      { 
        res.json({"success":true,'msg':'admins made by you detail','admindata':adminresult});    
      }      
    });  
  }        
});

module.exports = router;