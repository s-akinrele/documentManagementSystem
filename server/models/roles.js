'use strict';

module.exports = (sequelize, Datatypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false
    }
  }, 
  {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User);
      }
    }
  });
  return Role;
};
