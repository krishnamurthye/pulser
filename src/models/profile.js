module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define(
    "profile",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      highestEducation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATEONLY,
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
        type: DataTypes.BLOB("long"), // Assuming the CV/resume is stored as a BLOB
        allowNull: true,
      },
    },
    {
      tableName: "profiles",
      timestamps: true,
    }
  );

  profile.associate = (models) => {
    profile.belongsTo(models.appUser, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return profile;
};
