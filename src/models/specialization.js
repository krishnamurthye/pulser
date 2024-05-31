module.exports = (sequelize, DataTypes) => {
    return sequelize.define('specialization', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'specialization',
        timestamps: true,
    });
};