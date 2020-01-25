const bcrypt = require('bcrypt'),
BCRYPT_SALT_ROUNDS = 12,
JWTstrategy = require('passport-jwt').Strategy,
ExtractJWT = require('passport-jwt').ExtractJwt,
Sequelize = require('sequelize'),
Op = Sequelize.Op,
models = require( '../models/'),
localStrategy = require('passport-local').Strategy;
// passport = require("passport");

// serialize session, only store user id in the session information


module.exports =  async (passport) => {

passport.use(
'register',
new localStrategy(
{
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
},
(req, username, password, done) => {
  try {
     models.User.findOne({
      where: {
        [Op.or]: [
          {
            username: username,
          },
          { email: req.body.email },
        ],
      },
    }).then(user => {
      if (user != null) {
        console.log('username or email already taken');
        return done(null, false, {
          message: 'username or email already taken',
        });
      } else {
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
          models.User.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
          }).then(user => {
            console.log('user created');
            return done(null, user);
          });
        });
      }
    });
  } catch (err) {
    done(err);
  }
},
),
);



passport.use(
'login',
new localStrategy(
{
usernameField: 'username',
passwordField: 'password',
session: false,
},
(username, password, done, req) => {
try {
  models.User.findOne({
    where: {
      [Op.or]: [
        {
          username: username,
        }
      ],
    },
  }).then(user => {
    if (user === null) {
      return done(null, false, { message: 'Username doesn\'t exist' });
    
    } else {
      bcrypt.compare(password, user.password).then(response => {
        if (response !== true) {
          console.log('passwords do not match');
          return done(null, false, { message: 'passwords do not match' });
        }
  
        console.log('user found & authenticated');
        // note the return needed with passport local - remove this return for passport JWT
        return done(null, user);
      });

      
    }
  });
} catch (err) {
  done(err);
}
},
),
);

const opts = {
jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
secretOrKey: process.env.JWT_SECRET,
};




passport.use(
'jwt',
new JWTstrategy(opts, (jwt_payload, done) => {
try {
 models.User.findOne({
  where: {
    username: jwt_payload._id,
  },
}).then(user => {
  if (user) {
    console.log('user found in db in passport');
    // note the return removed with passport JWT - add this return for passport local
    done(null, user);
    // console.log(user);
  } else {
    console.log('user not found in db');
    done(null, false);
  }
});
} catch (err) {
done(err);
}
}),
);

passport.serializeUser(function(user, done) {
done(null, user.id);
console.log(user.id); // gets user id
});

// from the user id, figure out who the user is...
passport.deserializeUser(function(id, done){
models.User.findOne({
where: {
id,
},
}).then(user => done(null, user))
.catch(done);
});

}
/*var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , db = require('../models/users')

// Serialize Sessions
passport.serializeUser(function(users, done){
    done(null, users);
});

//Deserialize Sessions
passport.deserializeUser(function(users, done){
    db.users.find({where: {id: usersname}}).success(function(usersname){
        done(null, users);
    }).error(function(err){
        done(err, null)
    });
});

// For Authentication Purposes
passport.use(new LocalStrategy(
    function(username, password, done){
        db.User.find({where: {username: username}}).success(function(user){
            passwd = user ? user.password : ''
            isMatch = db.users.validPassword(password, passwd, done, user)
        });
    }
));

*/

/*
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
*/
