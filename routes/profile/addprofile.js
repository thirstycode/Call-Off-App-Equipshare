// var express = require('express');
// var router = express.Router();
// var func = require('../func.js');
// var edo=require('../edonomix.js');
// var con = require('../db');

// // router.get('/',func.auth,function(req, res, next) 
// // {
// // 	res.json({"success":true,'msg':'add profile page'});     
// // });

// router.post('/',func.auth,function(req, res, next) 
// {
//   console.log(req.body);
//   req.check('name','invalid profile name').exists().isAlphanumeric().withMessage('Name should be alpanumeric').isLength({min: 2 , max: 100}).withMessage('Name should not be empty, should be more than 2 and less than 100 character').trim();
//   req.check('dummy','invalid dummy').isLength({min:6,max:6}).isNumeric();

//   var verrs=req.validationErrors();
//   if(verrs)
//   {
//     res.json({ success:false,msg: verrs[0].msg,});
//   }
//   else
//   {
//     var profile = 
//     {
//       name:req.body.name,
//       dummy:req.body.dummy
//       // created_by:req.session.adminid
//     };
//     con.query("Insert into profile SET ? ;",profile,function(err,result)
//     {
//       if(err)
//       {
//         console.log(sql,err);
//         res.json({success:false,msg: 'something went wrong',});
//       }
//       else
//       {
//         res.json({ success:true,msg: 'succesful entry', });
//       }
//     });
//   }		   
// });


// module.exports = router;