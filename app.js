const express = require('express');
const exphbs = require('express-handlebars');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');

// Passport Config
require('./config/passport')(passport);

// Database
const db = require('./config/database');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Express Body Parser
app.use(bodyParser.urlencoded({ extended: true}));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Connect flash
app.use(flash());
// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));
//app.get('/users', (req, res) => res.render('users', { layout: 'landing' }));
//////change landing from above and add the file for users under layouts

// Gig routes
app.use('/gigs', require('./routes/gigs'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));