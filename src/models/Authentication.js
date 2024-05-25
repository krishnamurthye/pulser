module.exports = (sequelize, type) => {
    return sequelize.define('authentication', {
      id1: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      auth_user_id: {
        type: type.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: type.DATE,
        allowNull: false
      },
      updatedAt: {
        type: type.DATE,
        allowNull: false
      },
      password: {
        type: type.STRING,
        allowNull: false
      },
      failedAttempts: {
        type: type.INTEGER,
        defaultValue: 0
      }
    });
  };
  