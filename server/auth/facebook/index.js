'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service.js');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signup',
    session: false
  }))

  .get('/callback', passport.authenticate('facebook', {
  	successRedirect: '/main',
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);


module.exports = router;