module.exports = function(sequelize, DataTypes) {
    const schooling = sequelize.define('schooling', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
        model: 'app_user', // Ensure this matches the actual table name
          key: 'id'
      }
      },
      schoolSystem: {
        type: DataTypes.INTEGER,
        references: {
        model: 'school_system', // Ensure this matches the actual table name
          key: 'id'
      }
      },
      grade: DataTypes.INTEGER,
      schoolId: {
        type: DataTypes.INTEGER,
        references: {
        model: 'schools_list', // Ensure this matches the actual table name
          key: 'id'
      }
      },
      status: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      needLevel: DataTypes.INTEGER,
      additionalDetails: DataTypes.STRING
    },{
      tableName: 'schooling',
      timestamps: true,
    });

  schooling.associate = (models) => {
    schooling.belongsTo(models.appUser, { foreignKey: 'userId', as: 'user' });
    schooling.belongsTo(models.schoolSystem, { foreignKey: 'schoolSystem', as: 'system' });
    schooling.belongsTo(models.schoolsList, { foreignKey: 'schoolId', as: 'school' });
  };

    return schooling;
};