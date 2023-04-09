const { Validator } = require('sequelize');

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
        exclude: ['hashedPassword']
      },
      admin: {
        attributes: {}
      }

    },
  });

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};