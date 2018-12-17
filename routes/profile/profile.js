var express = require('express');
var router = express.Router();

// var add=require('./addprofile');
// router.use('/add', add);

var view=require('./viewprofile');
router.use('/view', view);

var update=require('./updateprofile');
router.use('/update', update);

var del=require('./deleteprofile');
router.use('/delete', del);

// var forgot_password=require('./forgot_password');
// router.use('/forgot_password',forgot_password);

var change_password=require('./change_password');
router.use('/change_password',change_password);

module.exports=router;