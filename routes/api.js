var express = require('express');
var router = express.Router();

// authorization route
var auth = require('./auth/auth.js');
router.use('/auth', auth);

var buyer = require('./buyer/buyer.js');
router.use('/buyer', buyer);

var order = require('./order/order.js');
router.use('/order', order);

var supplier = require('./supplier/supplier.js');
router.use('/supplier', supplier);

var driver = require('./driver/driver.js');
router.use('/driver', driver);

// var admin = require('./admin/admin.js');
// router.use('/admin', admin);


var invoice = require('./invoice/invoice.js');
router.use('/invoice',invoice);

module.exports = router;