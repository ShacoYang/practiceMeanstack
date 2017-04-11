/**
 * Created by yanglu on 2/5/17.
 */
'use strict'

var controller = require('./comment.controller');
var express = require('express');
var router = express.Router();

router.post('/', controller.addComment);
router.get('/:id', controller.getComment);

module.exports = router;