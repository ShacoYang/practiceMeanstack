/**
 * Main application routes
 */
//global routers for api
'use strict';

var errors = require('./components/errors/index');
var auth = require('./auth/auth.service.js');
var path = require('path');

module.exports = function(app) {

  // Insert routes below

    //prefixed
  app.use('/api/users', require('./api/user/index'));
  app.use('/auth', require('./auth/index'));

  app.use('/api/look', require('./api/look'));
  app.use('/api/links', require('./api/imgScraper'));
  app.use('/api/comments', require('./api/comments'));

  app.post('/forgotpassword', require('./forgotpassword').reset);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);


  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
