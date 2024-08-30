module.exports = function(sequelize, DataTypes) {
  const schoolsList = sequelize.define('schoolsList', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      schoolSystem: {
          type: DataTypes.INTEGER,
          // references: {
          //     model: 'school_system', // Ensure this matches the actual table name
          //     key: 'id'
          // }
      },
      isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
      }
  }, {
      tableName: 'schools_list',
      timestamps: false,
  });



    return schoolsList;


};
