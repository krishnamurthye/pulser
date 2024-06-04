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
      nationality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      highestEducation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ethnicity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cv: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
    },
    {
      tableName: "app_user",
      timestamps: true,
    }
  );

  // appUser.associate = (models) => {
  //   appUser.hasMany(models.workExperience, {
  //     foreignKey: "appUserId",
  //     as: "workExperiences",
  //   });
  // };

  return appUser;
};
