const Sequelize = require("sequelize");
const userRoleModel = require("./userRole");
const appUserModel = require("./appUser");
const authModel = require("./authentication");
// const addressModel = require("./address");
const schoolSystemModel = require("./schoolSystem");
const schoolsListModel = require("./schoolsList");
// const schoolingModel = require('./schooling');
const lsaRequestModel = require("./lsaRequest");
const messageModel = require("./message");
const educationModel = require("./education");
const specializationModel = require("./specialization");
const profileModel = require("./profile");
const workExperienceModel = require("./workExperience");
const needLevelModel = require("./needLevel");
const gradesModel = require("./grades");

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "pulserdb",
  username: "root",
  password: "password",
  host: "localhost",
  quoteIdentifiers: true
});

// const address = addressModel(sequelize, Sequelize);
const userRole = userRoleModel(sequelize, Sequelize);
const schoolSystem = schoolSystemModel(sequelize, Sequelize);
const schoolsList = schoolsListModel(sequelize, Sequelize);
// const schooling = schoolingModel(sequelize, Sequelize);

const appUser = appUserModel(sequelize, Sequelize);
const authentication = authModel(sequelize, Sequelize);
const lsaRequest = lsaRequestModel(sequelize, Sequelize);
const messageSQLModel = messageModel(sequelize, Sequelize);
const education = educationModel(sequelize, Sequelize);
const specialization = specializationModel(sequelize, Sequelize);
const profileSQLModel = profileModel(sequelize, Sequelize);
const workExperienceSQLModel = workExperienceModel(sequelize, Sequelize);
const needLevel = needLevelModel(sequelize, Sequelize);
const grades = gradesModel(sequelize, Sequelize);

appUser.hasOne(authentication, { foreignKey: "auth_user_id" });
authentication.belongsTo(appUser, { foreignKey: "auth_user_id" });
lsaRequest.hasOne(appUser, { foreignKey: "child" });
appUser.hasMany(workExperienceSQLModel, {
  foreignKey: "appUserId",
  as: "workExperiences",
});
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
  // address,
  schoolSystem,
  schoolsList,
  // schooling,
  lsaRequest,
  messageSQLModel,
  education,
  specialization,
  profileSQLModel,
  workExperienceSQLModel,
  needLevel,
  grades
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, ...models };
