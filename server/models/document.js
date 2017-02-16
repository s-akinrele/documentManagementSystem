'use strict';

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    OwnerId: DataTypes.INTEGER,
    access: {
      defaultValue: 'public',
      type: DataTypes.ENUM('public', 'private')
    }
  }, {
    classMethod: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          as: 'Owner',
          onDelete: 'CASCADE',
          foreignKey: { allowNull: false }
        });
      }
    }

  });
  return Document;
};