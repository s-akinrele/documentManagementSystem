'use strict';
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: 6
      }
    },
    RoleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }

  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Document, { foreignKey: 'OwnerId' });
        User.belongsTo(models.Role, {
          onDelete: 'CASCADE',
          foreignKey: { allowNull: false }
        });
      }
    },
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      },
      beforeUpdate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      }
    }
  });

  return User;
};