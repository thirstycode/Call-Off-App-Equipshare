var express = require('express');
var router = express.Router();



var add_site = require('./add_site');
router.use('/add_site', add_site);

var view=require('./view_sites');
router.use('/view_sites', view);

var del_site=require('./del_site');
router.use('/del_site', del_site);

var add_order=require('./add_order');
router.use('/add_order', add_order);

var view_bids=require('./view_bids');
router.use('/view_bids', view_bids);

var respond_negotiate=require('./respond_negotiate');
router.use('/respond_negotiate', respond_negotiate);

var view_alloc_driver = require('./view_alloc_driver');
router.use('/view_alloc_driver', view_alloc_driver);

var qr_generate = require('./qr_generate');
router.use('/qr_generate', qr_generate);


module.exports=router;