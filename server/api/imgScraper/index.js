/**
 * Created by yanglu on 1/30/17.
 */
/**
 * Created by yanglu on 1/30/17.
 */
'use strict'

var controller = require('./imgScraper.controller');
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');

//localhost:xxxx/api/links/scrape
router.post('/scrape', auth.isAuthenticated(), controller.scrape);

module.exports = router;