// src/models/User.js

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('appUser', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email:DataTypes.STRING,
      role: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      parentId: DataTypes.INTEGER,
      userType: DataTypes.INTEGER,
      phoneNumber: DataTypes.STRING,
      dob: DataTypes.DATE,
      isActive: DataTypes.BOOLEAN,
      nationality: DataTypes.INTEGER
    }
    ,{
      tableName: 'app_user',
      timestamps: true,
    });
  };