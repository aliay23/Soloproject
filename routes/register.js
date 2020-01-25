var router = require('express').Router();
//var User = require('../models');
var Model = require('../models');

router.post('/', function (req, res){
  console.log(Model);
  Model.User.findByUsername(req.body.username).then(function (user){
  if(user) {
      return res.status(400).send('Username already taken');
    }

    
    return User.create(
      {username: req.body.username, 
        name: req.body.name, 
        email: req.body.email, 
        password:  req.body.password }).then(function(user){
        console.log('Created new user');
        req.login(user, function(err){
          if (err) {
            console.log('Error logging in newly registered user', err);
            return res.sendStatus(500); 
          }
        });
              
        res.sendStatus(201);
      });
    }).catch(function(err){
      console.log('Error creating user');
      res.sendStatus(500);
    });
  });
  router.get('/', (req, res) => res.render('register'));

  module.exports = router;

 
//// Register
/*router.post('/register', (req, res) => { 
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
  ////////////////////////////
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
                  res.redirect('/gigs/users');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
*/
  // Register Page
//router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));
//router.get('/register', (req, res) => res.render('register'));