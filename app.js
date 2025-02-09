const express = require('express');
const exphbs = require('express-handlebars');
///const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
//const flash = require('connect-flash');
const session = require('express-session');

const app = express();
// Passport Config
require('./config/passport');

// Database
const db = require('./config/database');



// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))



 //EJS
//app.use(expressLayouts);
//app.set('view engine', 'ejs');
var connection = require('./config/database');
var login = require('./routes/login');
var register = require('./routes/register');
var gigs = require('./routes/gigs');


// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars'); 

// Express Body Parser
app.use(bodyParser.urlencoded({ extended: true}));
// Express session
//app.use(
 // session({
    //secret: 'secret',
    //resave: true,
    //saveUninitialized: true
  //})
//);

//sessionConfig that happens before passport will be. specifying cookie info

var sessionConfig = {
  //not shared with people. searches for it in the environment
  secret: process.env.SECRET || 'super secrect key goes here',
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 50 * 1000, //30 mins. Cookie should only last 30min
    secure: false
  }
}

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());

// Passport middleware
//app.use(passport.initialize());
//app.use(passport.session());
// Connect flash
//app.use(flash());
// Global variables
//app.use(function(req, res, next) {
  //res.locals.success_msg = req.flash('success_msg');
  //res.locals.error_msg = req.flash('error_msg');
  //res.locals.error = req.flash('error');
  //next();
//});
//following routes require auth
app.use('/private', ensureAuthenticated);

app.get('/private/secretInfo', function(req, res){
  console.log('Sending secret info');
  res.send('This is very secret');
});
function ensureAuthenticated(req, res, next){
  console.log('Ensuring the user is authenticated');
  if(req.isAuthenticated()){
    next();
  } else {
    res.sendStatus(401);
  }
}
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));
//app.get('/', (req, res) => res.render('login', { layout: 'landing' }));
//app.get('/', (req, res) => res.render('register', { layout: 'landing' }));



app.get('/User', (req, res) => res.render('User', { layout: 'landing' }));
//////change landing from above and add the file for users under layouts
//var login = require('./routes/login');
//app.use('/, routes');
// Gig routes
//app.use('/login', login);
//app.use('/register', register);
app.use('/gigs', gigs);
//app.get('/loginStatus', function (req,res){
  //res.send(req.isAuthenticated());
//})

//app.post('/' , function(req, res) {

//});
//app.use('/gigs', require('./routes/gigs'));
app.use('/login', require('./routes/login')); 
app.use('/register', require('./routes/register')); 
//app.use('/login', login);
app.get('/loginStatus', function (req,res){
  res.send(req.isAuthenticated());
})



//app.get('/loginStatus', function (req,res){
  //res.send(req.isAuthenticated());
//});
///////////////
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));