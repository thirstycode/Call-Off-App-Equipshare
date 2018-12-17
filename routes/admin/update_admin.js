//who made can update only
var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');

// router.get('/',func.auth,function(req, res, next) 
// {
//  res.json({"success":true,'msg':'add admin page'});     
// });

router.post('/',func.auth2,function(req, res, next) 
{
  console.log(req.body);
  req.check('adminname',' adminname should be more than 2 and less than 100 character').isLength({min:2,max:100});
 // req.check('password',' password').isLength({min:2,max:100});
  req.check('name',' name should be more than 2 and less than 100 character').isLength({min:2,max:100});
  req.check('email',' email is invalid').isEmail().isLength({min:2,max:100});
  req.check('id','invalid id').isInt();
    req.check('mobile1',' mobile should be 10 digit').isLength({min:10,max:10}).isInt();
  req.check('mobile2',' alternate mobile should be 10 digit').optional({ checkFalsy: true }).isLength({min:10,max:10}).isInt();
  var verrs=req.validationErrors();
  if(verrs)
  {
    res.json({ success:false,msg: verrs[0].msg,});
  }
  else
  {
    var admin = 
    {
      adminname:req.body.adminname,
      admin_email:req.body.email,
      admin_full_name:req.body.name,
      admin_mobile1:req.body.mobile1,
      admin_mobile2:req.body.mobile2,           
      admin_createdby:req.decoded.aid
    };
        con.query("select admin_id from admin where admin_email=? and admin_status=1 and admin_id!=? ",[admin.admin_email,req.body.id],function(err,result,fields)
    {
        if(err)
        {
          console.log(err);
          res.json({'success':false,msg: 'something went wrong'});
        }
        else if(result.length ==0)
        {
           con.query("update admin SET ? where admin_id=? and admin_status=1 ;",[admin,req.body.id],function(err,adminresult,fields)
          {
            if(err)
            {
              console.log(err);
              res.json({success:false,msg: 'something went wrong',});
            }
            else
            {
              if(adminresult["affectedRows"]==1)
              res.json({"success":true,'msg':'admin updated'});
              else
              res.json({"success":false,'msg':' operation'}); 
              
            }
          });
                 
         }
        else
        { 
            res.json({success:false,msg:'email is not allowed/already registered'}) ;    
        }      
    });
  }      
});


module.exports = router;