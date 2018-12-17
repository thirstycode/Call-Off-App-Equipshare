var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');
var jwt = require('jsonwebtoken');
const secret = "supersecretkey";


router.get('/',function(req, res, next) 
{

  if(req.cookies && req.cookies.token)
  {
    next();
  }
  else
  {     
    res.json({"success":true,'msg':'login page'});
  }      
},func.auth2,func.user);


router.post('/',function(req,res,next)
{
  console.log(req.body);
  if(req.cookies && req.cookies.token)
  {   
    next();
  }
  else
  {

    req.check('email','invalid email').isEmail().isLength({min:2,max:100});
    req.check('password','invalid password').isLength({min:2,max:100});
    req.check('userType','invalid type').isIn(["Buyer","Supplier","Driver"]);


    var verrs=req.validationErrors();
    if(verrs)
    {
      res.json({ success:false,msg: verrs[0].msg,});
    }
    else
    {
    var user= 
    {
      email:req.body.email,
      password:req.body.password,
      userType:req.body.userType
    };
    con.query("select id, password, userType from users where email=?",user.email,function(err,result,fields)
    {
        if(err)
        {
          console.log(err);
          res.json({'success':false,msg: 'something went wrong'});
        }
        else if(result.length==1)
        { 
          if(result[0].userType == user.userType){
            // console.log(user.password);
            // console.log(result[0].password);
            if(edo.hashPassword(user.password)===result[0].password)
            {
             
              console.log("####"+user.email);
              jwt.sign({data:user.email}, 'supersecretkey',function(err, token)
                {
              if(err){
                console.log(err);
                res.json({"success":false,'msg':'system failure'});
              }
              else
              {
              console.log("&&&&&&&"+token);
              res.cookie('token',token, {maxAge: 48*60*60*1000, httpOnly: true });
                // res.access_token=token;
                // req.session.token = token; //optional  

                next();
              }
            }
               );
            }
            else{
              //wrong pass
              res.json({"success":false,'msg':'login page invalid admin name/password'});
            } 
          }
          else{
            res.json({"success":false,'msg':'invalid userType'});
          }    
        }
        else{ 
            res.json({"success":false,'msg':'login page wrong email'});    
        }      
    });  
    }
  }        
},func.auth2,func.user);

module.exports = router;