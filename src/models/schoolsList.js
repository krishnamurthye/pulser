module.exports = function(sequelize, DataTypes) {
    const schoolsList = sequelize.define('schoolsList', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      schoolSystem: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN
    }
    ,{
      tableName: 'schools_list',
      timestamps: false,
    });

    return schoolsList;
};
