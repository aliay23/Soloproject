const User = (sequelize, DataTypes) => {
    const myUser = sequelize.define('User', {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {});
  
    myUser.associate = function(models) {
  
      myUser.hasMany(models.Gig, { foreignKey: 'id', as:'users' });
    };
  
    return myUser;
  };
  
  module.exports = User;









/*
const Sequelize = require('sequelize');
const db = require('../config/database');
//var bcrypt = require('bcrypt');

const users = db.define('users', {

  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
  password: {
    type: Sequelize.STRING
  },
})

module.exports = users;
*/

/*const sequelize = require('../config/database');
var bcrypt = require('bcrypt-nodejs')
//const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const users = sequelize.define('users', {
    email: sequelize.Sequelize.STRING,
    password: sequelize.Sequelize.STRING,
    username: sequelize.Sequelize.STRING,

}, {
    createdAt: false,
    updatedAt: false,
});

users.beforeSave((user) => {
    if (users.changed('password')) {
        users.password = bcrypt.hashSync(users.password, bcrypt.genSaltSync(10), null);
    }
});

users.prototype.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = users;

*/



/*module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
            name: {type: DataTypes.STRING},
            email: {type: DataTypes.STRING, unique: true},
            username: {type: DataTypes.STRING, unique: true},
            password: {type: DataTypes.STRING}
        }
        , {
            instanceMethods: {
                generateHash: function (password, done) {
                    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                        bcrypt.hash(password, salt, null, done);
                    });
                },
                validPassword: function (password, next) {
                    bcrypt.compare(password, this.password, next)
                }
            }
        })
    User.beforeCreate(function (user,options, done) {
        user.generateHash(user.password, function (err, encrypted) {
            if (err) return done(err);
            user.password = encrypted;
            done(null, user);
        })
    })
    return User;

}

*/


/*const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('gig', {
    name: {
    type: Sequelize.STRING
    },
    email: {
    type: Sequelize.STRING
    },
    password: {
    type: Sequelize.STRING
    },
})
  
  module.exports = User;
*/