var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');

// router.get('/',func.auth,function(req, res, next) 
// {
// 	res.json({"success":true,'msg':'add admin page'});     
// });

router.post('/',func.auth2,function(req, res, next) 
{
  console.log(req.body);
  console.log(req.ip);
  req.check('old_password','invalid old password').isLength({min:2,max:100});
  req.check('new_password','invalid new password').isLength({min:2,max:100});

  var verrs=req.validationErrors();
  if(verrs)
  {
  	res.json({ success:false,msg: verrs[0].msg,});
	}
	else
	{
  	var admin = 
    {
      password:edo.hashPassword(req.body.new_password),
    };
    con.query("select *  from admin where admin_id=?",req.session.adminid,function(err,result,fields)
    {
      if(err)
      {
        console.log(err);
        res.json({'success':false});
      }
      else if(result.length ==1)
      {
        if(edo.hashPassword(req.body.old_password)===result[0].password)
        {
          con.query("update admin SET ? where admin_id=? and status=1 ;",[admin,req.session.adminid],function(err,adminresult,fields)
          {
            if(err)
            {
              console.log(sql,err);
              res.json({success:false,msg: 'something went wrong',});
            }
            else
            {
              if(adminresult["affectedRows"]==1)
              res.json({"success":true,'msg':'password updated'});
              else
              res.json({"success":false,'msg':'invalid operation'}); 
            }
          });          
        }
        else
        {
          res.json({"success":false,'msg':'password not matched'});
        }
      }
     else
      { 
        res.json({success:true,msg:'something went wrong'}) ;    
      }      
    }); 
	}	
         
	   
});


module.exports = router;