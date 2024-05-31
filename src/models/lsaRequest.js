module.exports = (sequelize, DataTypes) => {
    const lsaRequest = sequelize.define('lsaRequest', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      child: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'appUser',
        //   key: 'id'
        // }
      },
      age: DataTypes.INTEGER,
      grade: DataTypes.INTEGER,
      school: DataTypes.INTEGER,
      needs: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      lsaType: DataTypes.INTEGER,
      experience: DataTypes.INTEGER,
      comments: DataTypes.STRING
    }, {
      tableName: 'lsaRequest',
      timestamps: true,
    });
  
    lsaRequest.associate = (models) => {
      lsaRequest.belongsTo(models.appUser, { foreignKey: 'child', as: 'childDetails' });
  };

    return lsaRequest;
  };
  