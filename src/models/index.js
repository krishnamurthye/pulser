const Sequelize = require('sequelize');
const UserModel = require('./User');
const AuthModel = require('./Authentication');

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'pulserdb',
  username: 'root',
  password: 'password',
  host: 'localhost',
});

const User = UserModel(sequelize, Sequelize);
const Authentication = AuthModel(sequelize, Sequelize);

User.hasOne(Authentication, { foreignKey: 'auth_user_id' });
Authentication.belongsTo(User, { foreignKey: 'auth_user_id' });

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

module.exports = {
    User,
    Authentication,
    sequelize,  // Export the sequelize instance for closing
  };
  