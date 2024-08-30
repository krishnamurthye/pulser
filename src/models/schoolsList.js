module.exports = function(sequelize, DataTypes) {
    const schoolsList = sequelize.define('schoolsList', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
    schoolSystem: {
      type: DataTypes.INTEGER,
      references: {
        model: 'school_system', // Ensure this matches the actual table name
        key: 'id'
      }
    },
      isActive: DataTypes.BOOLEAN
    }
    ,{
      tableName: 'schools_list',
      timestamps: false,
    });


    return schoolsList;
};
