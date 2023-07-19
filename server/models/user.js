'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique."
      },
      validate: {
        notNull: {
          msg: "Email is required."
        },
        notEmpty: {
          msg: "Email is required."
        },
        isEmail: {
          msg: "Email format is invalid."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required."
        },
        notEmpty: {
          msg: "Password is required."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};