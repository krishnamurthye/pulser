const Sequelize = require('sequelize');
const userRoleModel = require('./userRole');
const appUserModel = require('./appUser');
const authModel = require('./authentication');
const addressModel = require('./address');
const schoolSystemModel = require('./schoolSystem');
const schoolsListModel = require('./schoolsList');
// const schoolingModel = require('./schooling');

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "pulserdb",
  username: "root",
  password: "password",
  host: "localhost",
});

const address = addressModel(sequelize, Sequelize);
const userRole = userRoleModel(sequelize, Sequelize);
const schoolSystem = schoolSystemModel(sequelize, Sequelize);
const schoolsList = schoolsListModel(sequelize, Sequelize);
// const schooling = schoolingModel(sequelize, Sequelize);

const appUser = appUserModel(sequelize, Sequelize);
const authentication = authModel(sequelize, Sequelize);

appUser.hasOne(authentication, { foreignKey: "auth_user_id" });
authentication.belongsTo(appUser, { foreignKey: "auth_user_id" });
// appUser.belongsTo(userRole, { foreignKey: 'role' });

// appUser.associate = (models) => {
//   appUser.hasMany(models.address, { foreignKey: 'userId', as: 'addresses' });
// };

sequelize.sync().then(() => {
  console.log("Index.js Database & tables created!");
});

  const models = {
    appUser,
    authentication,
    userRole,
    address,
    schoolSystem,
    schoolsList,
    // schooling,
  };
  
  Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });
  
  module.exports = {sequelize, ...models };
  