var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var handler = require('./lib/request-handler');
var util = require('./lib/utility.js');

var app = express();
app.use(bodyParser.json());
//
//user session
app.use(session({
	secret: 'shhh, it\'s a secret',
	resave: false,
	saveUnitialized: true
}));

/////////////////////////////////////////////////////////////////
//AUTHENTICATION
//routes to login page
app.get('/login', util.checkUser);
//routes user login action
app.post('/login', handler.userLogin);

//handles user logout action
app.get('/logout', handler.userLogout);

//handles user signup action
app.post('/signup', handler.userSignup);

//server up static files
app.use(express.static(path.join(__dirname + '/../client')));

//handles bill search
app.post('/searchterm', handler.termSearch);

module.exports = app;
