'use strict';
export default (sequelize, DataTypes) => {
  const Centers = sequelize.define('Centers', {
    name: {
      type: DataTypes.STRING,
      allowNul: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type:DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    venueType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    facilities: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
});
  Centers.associate = function(models) {
    Centers.hasMany(models.Events, {
      foreignKey: 'centerCode',
    });
    Centers.belongsTo(models.Users, {
      foreignKey: 'userId',
    })
  };
  return Centers;
};