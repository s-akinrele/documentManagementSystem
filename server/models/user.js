'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
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
    }
  });

  return User;
};