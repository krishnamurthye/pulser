const Sequelize = require('sequelize');
const UserModel = require('./user');
const AuthModel = require('./authentication');

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
  console.log('Index.js Database & tables created!');
});

module.exports = {
    sequelize,
    User,
    Authentication,
  };
  