var express = require('express');
var router = express.Router();
var func = require('../func.js');


router.get('/',function(req, res, next) 
{
	// console.log("req.session.cookie.maxAge"+req.session.cookie.maxAge);
	// req.session.destroy();

	req.token="";
	res.cookie('token','', { maxAge: 0, httpOnly: true });
	
	res.json({"success":true,'msg':'admin login page'})
	// res.clearCookie("token");
	// req.clearCookie("token"); 
});

module.exports = router;