
//if user change data which is saved in his session after insertion change that-baki he

var express = require('express');
var router = express.Router();
// var empty = require('is-empty');
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');

// router.get('/',func.auth,function(req, res, next) 
// {
// 	res.json({"success":true,'msg':'add admin page'});     
// });

router.post('/',func.auth2,function(req, res, next) 
{
  //email bhi kr skte he update
  console.log(req.body);
  // req.check('new_password','Invalid new password').isLength({min:2,max:100});
  // req.check('old_password','Invalid old password').isLength({min:2,max:100});
  req.check('full_name','Invalid full name').optional().isLength({min:2,max:100});
  // req.check('email','Invalid email').isEmail().optional().isLength({min:2,max:100});
  req.check('pic','Invalid profile picture').optional().isLength({min:2}).trim();

  var verrs=req.validationErrors();
  if(verrs)
  {
    res.json({ success:false,msg: verrs[0].msg,});
  }
  // else
  // {
  //   con.query("select * from admin where status=1 and admin_id=?",req.session.id,function(err,result,fields)
  //   {
  //     if(err)
  //     {
  //       console.log(err);
  //       res.json({'success':false});
  //     }
  //     else if(result.length==1)
  //     {
  //       if(edo.hashPassword(admin.password)===result[0].password)
  //       {
  //         var hour = 3600000; 
  //         req.session.cookie.expires = new Date(Date.now() + hour);
  //         req.session.cookie.maxAge = hour;
  //         req.decoded.aid=result[0].admin_id;
  //         res.json({'success':true,'msg':'admin home page'})
  //       }
  //       else
  //       {
  //         //wrong pass
  //         res.json({"success":true,'msg':'admin login page invalid admin name/password'});
  //       }     
  //     }
  //     else
  //     { 
  //         res.json({"success":true,'msg':'admin login page wrong adminname'});    
  //     }      
  //   });
    var admin ={};
    if(req.body.full_name)
    {
      admin.full_name=req.body.full_name;
    }    
    if(req.body.pic)
    {
      admin.mydp=req.body.pic;
    }
    // if(!empty(admin))
    if(!edo.isEmpty(admin))
    {
      con.query("update admin SET ? where admin_id=? and status=1 ;",[admin,req.decoded.aid],function(err,adminresult,fields)
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
          res.json({"success":false,'msg':'invalid operation'}); 
          
        }
      });
    }
    else
    {
      res.json({success:false,msg: 'data is not proper',}); 
    }

  		   
});


module.exports = router;