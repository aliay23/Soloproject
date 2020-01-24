const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const Sequelize = require('sequelize');
const passport = require('passport');

const Op = Sequelize.Op;

// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/database');

// Login Page
//router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
router.get('/login', (req, res) => res.render('login'));

// Register Page
//router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));
router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/gigs/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

    // Dashboard
    router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
      user: req.user
    })
    );
// Login
//router.post('/login', (req, res, next) => {
  //passport.authenticate('local', {
    //successRedirect: '/gigs',
    //failureRedirect: '/login',
    //failureFlash: true
  //})(req, res, next);
//});
// Add a gig
router.post('/login', (req, res) => {
  let { name, email, password} = req.body;
  let errors = [];
  
// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

term = term.toLowerCase();

Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
  .then(gigs => res.render('gigs', { gigs }))
  .catch(err => console.log(err));
});


module.exports = router;