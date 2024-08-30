
module.exports = function(sequelize, DataTypes) {
  const needLevel= sequelize.define('needLevel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'need_level',
    timestamps: false,
  });

  return needLevel
};