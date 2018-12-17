var express = require('express');
var router = express.Router();




var admin_login = require('./admin_login');
router.use('/login', admin_login);
var admin_logout = require('./admin_logout');
router.use('/logout', admin_logout);
var add_admin = require('./add_admin');
router.use('/add', add_admin);
var view_admin = require('./view_admin');
router.use('/view', view_admin);
var update_admin = require('./update_admin');
router.use('/update', update_admin);
var edit_admin = require('./edit_admin');
router.use('/edit', edit_admin);
var delete_admins = require('./delete_admins');
router.use('/delete', delete_admins);

module.exports=router;