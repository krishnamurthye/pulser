// src/models/appUser.js

const { models } = require("./index");

module.exports = function (sequelize, DataTypes) {
  const appUser = sequelize.define(
    "appUser",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      parentId: DataTypes.INTEGER,
      userType: DataTypes.INTEGER,
      phoneNumber: DataTypes.STRING,
      dob: DataTypes.DATE,
      isActive: DataTypes.BOOLEAN,
    nationality: DataTypes.STRING,
    highestEducation: DataTypes.STRING,
    ethnicity: DataTypes.STRING,
    specialization: DataTypes.STRING,
    gender: DataTypes.STRING,
    cv: DataTypes.BLOB("long"),
  }, {
    tableName: 'app_user',
      timestamps: true,
    }
  );

  // appUser.associate = (models) => {
  //   appUser.hasMany(models.workExperience, {
  //     foreignKey: "appUserId",
  //     as: "workExperiences",
  //   });
  // };
 appUser.associate = (models) => {
    appUser.hasMany(models.lsaRequest, { foreignKey: 'child', as: 'lsaRequests' });
    appUser.hasMany(models.schooling, { foreignKey: 'userId', as: 'schooling' });
  };
  return appUser;
};
