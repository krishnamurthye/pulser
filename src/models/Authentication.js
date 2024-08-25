module.exports = (sequelize, type) => {
    return sequelize.define('authentication', {
        id: {
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
        },
        blocked: {
            type: type.BOOLEAN,
            defaultValue: false // Block user after 3 failed login attempts
        },
        forcePasswordReset: {
            type: type.BOOLEAN,
            defaultValue: false // Force user to reset password after reset request
      },
      resetToken: {
        type: type.STRING,
        allowNull: true,
      }
    },{
      tableName: 'authentication',
      timestamps: true,
    });
  };
  