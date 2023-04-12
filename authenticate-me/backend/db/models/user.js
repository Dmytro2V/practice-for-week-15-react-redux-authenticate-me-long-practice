const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
      len: [4, 30],
      isNotEmail(value){
        if (Validator.isEmail(value)) {
          throw new Error('Username can not be an email');
        }
      }

     }

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       len: [3, 256],
       isEmail(value){
         if (!Validator.isEmail(value)) {
           throw new Error('Enter valid email to email field');
         }
       }
 
      }
    },
    hashedPassword:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       len: [60, 60],
 
      }
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'updatedAt', 'email', 'createdAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword']}
      },
      loginUser: {
        attributes: {}
      }

    },
  });

  User.associate = function(models) {
    // associations can be defined here
  };  
  
  // user functions
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
    
   };

   // static (base level)
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function({credential, password}) {
    let user = await User.scope('loginUser').findOne(  {where: {
      [Op.or]:{
        username:credential,
        email:credential
      }
    }
      }
    )
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  }

  User.signup = async function({username, email, password}) {
    const hashedPassword = bcrypt.hashSync(password)
    const newUser = await User.create(      
      {      
        username,
        email,
        hashedPassword
      }
    )
   

    return await User.scope('currentUser').findByPk(newUser.id);    
  }

  
  return User;
};