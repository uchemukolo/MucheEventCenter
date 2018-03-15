'use strict';
export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Events.associate = function(models) {
    Events.belongsTo(models.Users,{
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    })
    Events.belongsTo(models.Centers,{
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    })
    };
  return Events;
};