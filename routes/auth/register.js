var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');


router.post('/',function(req, res, next) 
{

  req.check('password',' password should be more than 2 and less than 100 character').isLength({min:2,max:100});
  req.check('full_name',' name should be more than 2 and less than 100 character').isLength({min:2,max:100});
  req.check('name',' name should be more than 2 and less than 100 character').isLength({min:2,max:100});
  req.check('email',' email should be more than 2 and less than 100 character').isEmail().isLength({min:2,max:100});
  // req.check('mobile1',' mobile should be 10 digit').isLength({min:10,max:10}).isInt();

  // comment below line to add admin
  req.check('userType','invalid type').isIn(["Buyer","Supplier","Driver"]);

  var verrs=req.validationErrors();
  if(verrs)
  {
  	res.json({ success:false,msg: verrs[0].msg,});
  	}
	else
	{
    	var user = 
    {
      name:req.body.name,
      full_name:req.body.full_name,
      password:edo.hashPassword(req.body.password),
      email:req.body.email,
      userType:req.body.userType,      
      password_token:'',
      token_time:'1970-02-01 00:00:01.000000',
      mydp:'',
      admin_ip:'',
      site_address:'',
      mobile:''
      
    };
    con.query("select id from users where email=? ",user.email,function(err,result,fields)
    {
        if(err)
        {
          console.log(err);
          res.json({'success':false,msg: 'something went wrong'});
        }
        else if(result.length ==0)
        {
        	 var sql="Insert into users SET ? ;";
           con.query(sql,user,function(err,result)
           {
        	  if(err)
        	  {
        		  console.log(sql,err);
        		  res.json({success:false,msg: 'something went wrong',});
              }
              else
              {
             	 res.json({ success:true,msg: 'succesful entry', });
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