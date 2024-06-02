module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define(
    "message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      from: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      to: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachment: {
        type: DataTypes.BLOB("long"), // LOMGBLOB max sise is 50MB as per middleware
        allowNull: true,
      },
      authUserId: {
        type: DataTypes.STRING, // Assuming you are storing the file content as BLOB
        allowNull: false,
      },
    },
    {
      tableName: "message",
      timestamps: true,
    }
  );

  return message;
};
