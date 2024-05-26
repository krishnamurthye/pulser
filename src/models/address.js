// src/models/Address.js
module.exports = (sequelize, DataTypes) => {
    const address = sequelize.define('address', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      streetAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
        tableName: 'address',
        timestamps: false,
      });
  
      address.associate = (models) => {
        address.belongsTo(models.appUser, { foreignKey: 'userId', as: 'app_user' });
    };
  
    return address;
  };
  