var express = require('express');
var router = express.Router();

var add=require('./addinvoice');
router.use('/add', add);

var view=require('./viewinvoice');
router.use('/view', view);

var update=require('./updateinvoice');
router.use('/update', update);

var del=require('./deleteinvoice');
router.use('/delete', del);

module.exports=router;