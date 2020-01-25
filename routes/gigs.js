const express = require('express');
const router = express.Router();
//const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/database');

const Op = Sequelize.Op;

// Get gig list
router.get('/', (req, res) => 
  Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
      }))
    .catch(err => console.log(err)));

    // Dashboard
//router.get('/dashboard', ensureAuthenticated, (req, res) =>
//res.render('dashboard', {
  //user: req.user
//})
//);


// Display add gig form
router.get('/add', (req, res) => res.render('add'));






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

// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if(!title) {
    errors.push({ text: 'Please add a title' });
  }
  if(!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if(!description) {
    errors.push({ text: 'Please add a description' });
  }
  if(!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      title, 
      technologies, 
      budget, 
      description, 
      contact_email
    });
  } else {
    if(!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // Insert into table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err));
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log(err));
});

module.exports = router;






