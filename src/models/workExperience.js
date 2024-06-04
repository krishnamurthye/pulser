module.exports = (sequelize, DataTypes) => {
  const workExperience = sequelize.define(
    "workExperience",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      school: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      student: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      appUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "work_experiences",
      timestamps: true,
    }
  );

  workExperience.associate = (models) => {
    workExperience.belongsTo(models.appUser, {
      foreignKey: "appUserId",
      as: "appUser",
    });
  };

  return workExperience;
};
