const express = require('express');
const router = express.Router();
const User = require('../models');
const Model = require('../models');

//const Sequelize = require('sequelize');
const passport = require('passport');
require('../config/passport');
//const { ensureAuthenticated, forwardAuthenticated } = require('../config/passport');
//const Op = Sequelize.Op;

/*router.get('/', (req, res) => 
  User.findAll()
    .then(login => res.render('login', {
        login
      }))
    .catch(err => console.log(err)));
*/

router.get('/', (req, res) => res.render('login'));

    // Dashboard
//router.get('/dashboard', ensureAuthenticated, (req, res) =>
//res.render('dashboard', {
  //user: req.user
//})
//);

// Display login form
//router.get('/', (req, res) => res.render('login'));
router.post('/', function (req, res) {
  Model.User
    .findOne({
      username: req.body.username,
      password: req.body.password
    })
    .exec(function (err, result) {
      if(result) { // auth was successful
        req.session.user = result; // so writing user document to session
        return res.redirect('/gigs'); // redirecting user to interface
      }

      // auth not successful, because result is null
      res.redirect('/gigs'); // redirect to login page
  });
});




//////display login ---remove if not working already in loginjs testing 

/*router.get('/login.js', (req, res) => res.render('login'));


const users = require('../models/users');

router.post('/login.js', function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            status: false,
            message: ''
        });
    } else {
        users.create({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        }).then((user) => res.status(201).send(user)).catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    }
});
*/
/*user.create({
  email: req.body.email,
  password: req.body.password,
  username: req.body.username,
*/
// Add a gig
/*router.post('/', (req, res) => {
  let { email, username, password, } = req.body;
  let errors = [];
  router.post('/', passport.authenticate('local'), function(req, res){
    */// this is where we need to check the password
    //router.post('/', passport.authenticate('local'), function(req, res){
      // this is where we need to check the password
    
      //res.sendStatus(200);
    //});

    
 
  
  //router for delete where logout will be
  
  router.delete('/', function(req, res){
    req.logout();
    res.sendStatus(204);
  });


  /*// Validate Fields
  if(!email) {
    errors.push({ text: 'Please add email' });
  }
  if(!username) {
    errors.push({ text: 'Please add username' });
  }
  if(!password) {
    errors.push({ text: 'Please add password' });
  }
 
  // Check for errors
  if(errors.length > 0) {
    res.render('login', {
      errors,
      username, 
      email, 
      password
    })

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // Insert into table
    users.create({
      username,
      email,
      password,
    
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err));
  }
});

*/

//User.findAll({ where: { username: { [Op.like]: '%' + us + '%' } } })
//.then(login => res.render('login', { login }))
//.catch(err => console.log(err));

module.exports = router;










/*const user = require('../models/users');
// Login Page
router.get('/', forwardAuthenticated, (req, res) => res.render('login'));

router.post('/', function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            status: false,
            message: ''
        });
    } else {
        user.create({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        }).then((login) => res.status(201).send(login)).catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    }
});

module.exports = router;



*/





/*
router.get("/", function(req, res) {
console.log(req.user.id);
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {

      client.query("SELECT id, username, email FROM user WHERE id=$1;",
      [req.user.id],
      function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got info from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});


*/


/// Load User model
//const User = require('../models/user');
//const { forwardAuthenticated } = require('../config/passport');



/*// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
//router.get('/login', (req, res) => res.render('login'));




// Login
 router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/gigs',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

  
// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/gigs');
});






module.exports = router;
*/
