var express = require('express');
var router = express.Router();



var place_bid_on_order = require('./place_bid_on_order');
router.use('/place_bid_on_order', place_bid_on_order);

var view_avai_order = require('./view_avai_order');
router.use('/view_avai_order', view_avai_order);

var view_accepted_bids = require('./view_accepted_bids');
router.use('/view_accepted_bids', view_accepted_bids);

var alloc_driver = require('./alloc_driver');
router.use('/alloc_driver', alloc_driver);

var view_alloc_driver = require('./view_alloc_driver');
router.use('/view_alloc_driver', view_alloc_driver);

module.exports=router;