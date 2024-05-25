const Sequelize = require('sequelize');
const userModel = require('./user');
const AuthModel = require('./authentication');

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'pulserdb',
  username: 'root',
  password: 'password',
  host: 'localhost',
});

const user1 = userModel(sequelize, Sequelize);
const Authentication = AuthModel(sequelize, Sequelize);

user1.hasOne(Authentication, { foreignKey: 'auth_user_id' });
Authentication.belongsTo(user1, { foreignKey: 'auth_user_id' });

sequelize.sync().then(() => {
  console.log('Index.js Database & tables created!');
});

module.exports = {
    sequelize,
    User: user1,
    Authentication,
  };
  