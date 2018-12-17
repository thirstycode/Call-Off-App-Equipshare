var express = require('express');
var router = express.Router();
var func = require('../func.js');


router.get('/',function(req, res, next) 
{

	req.token="";
	res.cookie('token','', { maxAge: 0, httpOnly: true });
	req.session.destroy();
	res.json({"success":true,'msg':'user logged out'})

});

module.exports = router;