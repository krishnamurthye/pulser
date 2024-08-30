//..models/schoolSystem.js

module.exports = function(sequelize, DataTypes) {
    const schoolSystem = sequelize.define('schoolSystem', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN
    },{
      tableName: 'school_system',
      timestamps: false,
    });

    return schoolSystem;
};
