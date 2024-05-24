// src/models/User.js

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      role: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      parentId: DataTypes.INTEGER,
      userType: DataTypes.INTEGER,
      phoneNumber: DataTypes.STRING,
      dob: DataTypes.DATE,
      isActive: DataTypes.BOOLEAN,
      nationality: DataTypes.INTEGER
    });
  
    return User;
  };
  