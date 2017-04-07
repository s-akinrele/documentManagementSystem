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
    ownerId: DataTypes.INTEGER,
    access: {
      defaultValue: 'public',
      type: DataTypes.ENUM('public', 'private', 'role')
    }
  },
  {
    classMethod: {
      associate: (models) => {
        Document.belongsTo(models.Access);
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
