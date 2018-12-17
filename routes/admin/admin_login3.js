var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');
var jwt = require('jsonwebtoken');
const secret = "supersecretkey";
var randtoken = require('rand-token') 
var refreshTokens = {} 

router.get('/',function(req, res, next) 
{

  if(req.cookies && req.cookies.token)
  {
    next();
    // res.json({"success":true,'msg':'admin home page'});
  }
  else
  {     
    res.json({"success":true,'msg':'admin login page'});
  }      
},func.auth2,func.admin);

router.post('/',function(req,res,next)
{
  console.log(req.body);
  if(req.cookies && req.cookies.token)
  {   
    next();
  }
  else
  {
    //email and password length and regx check baki he
    req.check('email','invalid email').isEmail().isLength({min:2,max:100});
    req.check('password','invalid password').isLength({min:2,max:100});
     var verrs=req.validationErrors();
    if(verrs)
    {
      res.json({ success:false,msg: verrs[0].msg,});
    }
    else
    {
    var admin= 
    {
      email:req.body.email,
      password:req.body.password
    };
    con.query("select admin_id, admin_password  from admin where admin_status=1 and admin_email=?",admin.email,function(err,result,fields)
    {
        if(err)
        {
          console.log(err);
          res.json({'success':false,msg: 'something went wrong'});
        }
        else if(result.length==1)
        {
          if(edo.hashPassword(admin.password)===result[0].admin_password)
          {
            // var hour = 3600000; 
            // req.session.cookie.expires = new Date(Date.now() + hour);
            // req.session.cookie.maxAge = hour;
            // req.session.adminid=result[0].admin_id;
            //
            jwt.sign({aid :result[0].admin_id}, secret ,function(err, token)
            {
              if(err){
                console.log(err);
                res.json({"success":false,'msg':'system failure'});
              }
              else
              {
                var refreshToken = randtoken.uid(256) 
                refreshTokens[refreshToken] = username

                console.log(token);
                console.log(refreshToken);
                res.cookie('token',token, {maxAge: 60*1000, httpOnly: true });
                res.cookie('refreshToken',refreshToken, {maxAge: 60*60*1000, httpOnly: true });
                // res.access_token=token;
                // req.session.token = token; //optional  
                req.token = token;  
                next();
              }
            });
          }
          else
          {
            //wrong pass
            res.json({"success":false,'msg':'admin login page invalid admin name/password'});
          }     
        }
        else
        { 
            res.json({"success":false,'msg':'admin login page wrong email'});    
        }      
    });  
    }
  }        
},func.auth2,func.admin);

module.exports = router;