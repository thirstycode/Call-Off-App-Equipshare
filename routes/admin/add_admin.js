//email is unique constraint

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

  // email is required baki he
 console.log(req.body);
  req.check('adminname',' adminname should be more than 2 and less than 100 character').isLength({min:2,max:100});
  req.check('password',' password should be more than 2 and less than 100 character').isLength({min:2,max:100});
  req.check('name',' name should be more than 2 and less than 100 character').isLength({min:2,max:100});
  req.check('email',' email should be more than 2 and less than 100 character').isEmail().isLength({min:2,max:100});
  req.check('mobile1',' mobile should be 10 digit').isLength({min:10,max:10}).isInt();
  req.check('mobile2',' alternate mobile number should be 10 digit ').optional({checkFalsy:true}).isLength({min:10,max:10}).isInt();
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
      admin_password:edo.hashPassword(req.body.password),
      admin_full_name:req.body.name,          
      admin_email:req.body.email,  
      admin_mobile1:req.body.mobile1,
      admin_mobile2:req.body.mobile2,        
      admin_createdby:req.decoded.aid
    };
    con.query("select admin_id from admin where admin_email=? and admin_status=1",admin.admin_email,function(err,result,fields)
    {
        if(err)
        {
          console.log(err);
          res.json({'success':false,msg: 'something went wrong'});
        }
        else if(result.length ==0)
        {
        	 var sql="Insert into admin SET ? ;";
           con.query(sql,admin,function(err,result)
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