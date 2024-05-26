const Sequelize = require('sequelize');
const userRoleModel = require('./userRole');
const appUserModel = require('./appUser');
const authModel = require('./authentication');
const addressModel = require('./address');

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'pulserdb',
  username: 'root',
  password: 'password',
  host: 'localhost',
});


const address = addressModel(sequelize, Sequelize);
const userRole = userRoleModel(sequelize, Sequelize);

const appUser = appUserModel(sequelize, Sequelize);
const authentication = authModel(sequelize, Sequelize);

appUser.hasOne(authentication, { foreignKey: 'auth_user_id' });
authentication.belongsTo(appUser, { foreignKey: 'auth_user_id' });
// appUser.belongsTo(userRole, { foreignKey: 'role' });

// appUser.associate = (models) => {
//   appUser.hasMany(models.address, { foreignKey: 'userId', as: 'addresses' });
// };

sequelize.sync().then(() => {
  console.log('Index.js Database & tables created!');
});

  

  const models = {
    appUser,
    authentication,
    userRole,
    address,
  };
  
  Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });
  
  module.exports = {sequelize, ...models };
  