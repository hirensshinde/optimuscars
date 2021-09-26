
const express = require('express');
const logger = require('morgan');
const User = require('./model/user');
const expressLayouts = require('express-ejs-layouts')
const path = require('path');
const authRoutes = require('./router/user');
const accountRoutes = require('./router/index');
const app = express();
const expressSession = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// load configuration files
require('dotenv').config();
require('./config/database').connect();
require('./config/passport')(passport);

// Set logger development mode
app.use(logger('dev'));

// use urlencoded form field
app.use(express.urlencoded({extended: false}));
app.use(expressSession({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Most important step to use flash
// adding custom middleware Global vars
app.use((req, res, next) => {
    
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


// express ejs and layouts settings
app.use(expressLayouts);
app.set('layout', './layouts/boxed-width');
app.set('view engine', 'ejs');

// setting static path for assets files
app.use('/assets', express.static('public'))

// app.use(express.json());



// routes from router module
app.use(authRoutes);
app.use(accountRoutes);



module.exports = app;