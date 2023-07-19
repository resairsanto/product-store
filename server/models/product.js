'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  }
  Product.init({
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image is required."
        },
        notEmpty: {
          msg: "Image is required."
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Name must be unique."
      },
      validate: {
        notNull: {
          msg: "Name is required."
        },
        notEmpty: {
          msg: "Name is required."
        }
      }
    },
    buyPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Buy price is required."
        },
        notEmpty: {
          msg: "Buy price is required."
        }
      }
    },
    sellPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Sell price is required."
        },
        notEmpty: {
          msg: "Sell price is required."
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stock is required."
        },
        notEmpty: {
          msg: "Stock is required."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};