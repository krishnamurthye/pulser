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
          model: 'appUser',
          key: 'id'
        }
      },
      schoolSystem: {
        type: DataTypes.INTEGER,
        references: {
          model: 'schoolSystem',
          key: 'id'
        }
      },
      grade: DataTypes.INTEGER,
      schoolId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'schoolName', // Assuming there is a schoolName table
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

    return schooling;
};