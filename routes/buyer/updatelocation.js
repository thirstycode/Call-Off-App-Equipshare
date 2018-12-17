var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');


router.post('/',func.auth2,function(req, res, next) 
{
  console.log(req.body);
  req.check('location_name','invalid location name').exists().isLength({min: 2 , max: 100}).withMessage('Name should not be empty, should be more than 2 and less than 100 character').trim();
  req.check('zone_id','invalid zone').isNumeric();
  req.check('id', 'id must be a number').isNumeric().trim();
   req.check('pin','invalid pin').isLength({min:6,max:6}).isNumeric();

  var verrs=req.validationErrors();
  if(verrs)
  {
    res.json({ success:false,msg: verrs[0].msg,});
  }
  else
  {
    var loc=req.body.location_name;
    var location = 
    {
      location_name:loc.toUpperCase(),
      zone_id:req.body.zone_id,
      location_pin:req.body.pin,
      location_createdby:req.decoded.aid,  
    };
     con.query("select location_id from location where location_name=? and zone_id = ? and location_id !=? and location_status=1 ",[location.location_name,location.zone_id,req.body.id],function(err,result,fields)
    {
      if(err)
      {
        console.log(err);
        res.json({'success':false,msg: 'something went wrong'});
      }
      else if(result.length ==0)
      {
         con.query("update location SET ? where location_id=? and location_status=1 ;",[location,req.body.id],function(err,locationresult,fields)
        {
          if(err)
          {
            console.log(err);
            res.json({success:false,msg: 'something went wrong',});
          }
          else
          {
            if(locationresult["affectedRows"]==1)
            res.json({"success":true,'msg':'location updated'});
            else
            res.json({"success":false,'msg':'invalid operation'}); 
            
          }
        });

      }
      else
      { 
        res.json({success:false,msg:'location name is not allowed'}) ;    
      }      
    });
  }		   
});


module.exports = router;