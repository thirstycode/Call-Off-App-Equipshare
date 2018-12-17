var express = require('express');
var router = express.Router();




var login = require('./login');
router.use('/login', login);

var register = require('./register');
router.use('/register', register);

var logout_user = require('./logout');
router.use('/logout', logout_user);

var view_user = require('./view_user');
router.use('/view_user', view_user);

module.exports=router;