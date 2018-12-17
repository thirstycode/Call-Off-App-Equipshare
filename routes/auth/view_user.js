var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');

router.post('/',function(req, res) 
{

  req.check('password',' password should be more than 2 and less than 100 character').isLength({min:2,max:100});
  req.check('email',' email should be more than 2 and less than 100 character').isEmail().isLength({min:2,max:100});

  var verrs=req.validationErrors();
  if(verrs)
  {
    res.json({ success:false,msg: verrs[0].msg,});
    }
  else
  {
      var admin = 
    {
      password:edo.hashPassword(req.body.password),
      email:req.body.email,
      
    };
    con.query("select id, password from users where email=? ",admin.email,function(err,result,fields)
    {
        if(err)
        {
          console.log(err);
          res.json({'success':false,msg: 'something went wrong'});
        }
        else if(result.length ==1)
        { 
            if(admin.password == result[0].password){
                con.query("select * from users",  function(err,userslist,fields)
                {
                  if(err)
                  {
                    console.log(err);
                    res.json({'success':false,msg: 'something went wrong'});
                  }
                  else
                  { 
                    res.send({"success":true,'msg':'all users in database ','admindata':userslist});    
                  }      
                });

            }
            else{
              res.json({'success':false,msg: 'Wrong password'});
            }
         }
        else
        { 
            res.json({success:false,msg:'not admin data'}) ;    
        }      
    }); 
  } 
 
});

module.exports = router;