var express = require('express');
var router = express.Router();

var register_for_supplier = require('./register_for_supplier');
router.use('/register_for_supplier', register_for_supplier);

var view_alloc_site = require('./view_alloc_site');
router.use('/view_alloc_site', view_alloc_site);

var scan_qr = require('./scan_qr');
router.use('/scan_qr', scan_qr);

module.exports=router;