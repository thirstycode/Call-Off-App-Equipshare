var express = require('express');
var router = express.Router();

var view_order=require('./view_order');
router.use('/view_order', view_order);


module.exports=router;