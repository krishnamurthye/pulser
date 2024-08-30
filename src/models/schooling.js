// .. models/schooling.js
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
        model: 'app_user',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      schoolSystem: {
        type: DataTypes.INTEGER,
        references: {
        model: 'school_system',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',

      },
      grade: DataTypes.INTEGER,
      schoolId: {
        type: DataTypes.INTEGER,
        references: {
        model: 'schools_list',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      status: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      needLevel: DataTypes.INTEGER,
      additionalDetails: DataTypes.STRING
    },{
      tableName: 'schooling',
      timestamps: true,
    });

//  schooling.associate = (models) => {
//    schooling.belongsTo(models.appUser, { foreignKey: 'userId', as: 'appUser' });
//    schooling.belongsTo(models.schoolSystem, { foreignKey: 'schoolSystem', as: 'system' });
//    schooling.belongsTo(models.schoolsList, { foreignKey: 'schoolId', as: 'school' });
//  };

    return schooling;
};