const Sequelize = require('sequelize');
const db = require('../config/database');

const Gig = db.define('gigs', {
  title: {
    type: Sequelize.STRING
  },
  technologies: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  budget: {
    type: Sequelize.STRING
  },
  contact_email: {
    type: Sequelize.STRING
  }
})

module.exports = Gig;


/*module.exports = (sequelize, DataTypes) => {
  const Gig = sequelize.define('Gig', {
    title: DataTypes.STRING,
    technologies: DataTypes.STRING,
    description: DataTypes.STRING,
    budget: DataTypes.STRING,
    contact_email: DataTypes.STRING,
  
  }, {});
  Gig.associate = function(models) {
    Gig.belongsTo(models.User, {  foreignKey: 'userId',  targetKey: 'id' });
    // foreign key id will attach a postId to the likes table. 
  };
  return Gig;
};

//sequelize model:generate --name User --attributes username:string,email:string,password:string
*/

/*const Sequelize = require('sequelize');
const db = require('../config/database');
//var bcrypt = require('bcrypt');

const Gig = db.define('gig', {
  title: {
    type: Sequelize.STRING
  },
  technologies: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  budget: {
    type: Sequelize.STRING
  },
  contact_email: {
    type: Sequelize.STRING
  }
})

module.exports = Gig;

*/