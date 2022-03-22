const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false

    // pool: {
    //   max: config.pool.max,
    //   min: config.pool.min,
    //   acquire: config.pool.acquire,
    //   idle: config.pool.idle
    // }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.question = require("../models/question.model.js")(sequelize, Sequelize);
db.report = require("../models/report.model.js")(sequelize, Sequelize);
db.response = require("../models/response.model.js")(sequelize, Sequelize);
db.survey = require("../models/survey.model.js")(sequelize, Sequelize);
db.topic = require("../models/topic.model.js")(sequelize, Sequelize)
db.user_reports = require("../models/user-reports.model.js")(sequelize, Sequelize);
//Foreign Key Setup
//Question -> Topic FK
db.topic.hasMany(db.question, {foreignKey: 'topicId'});
db.question.belongsTo(db.topic, {foreignKey: 'topicId'});

// db.user.belongsToMany(db.report, {through: db.user_reports});
// db.report.belongsToMany(db.user, {through: db.user_reports});

// User -> Report FK
db.user.belongsToMany(db.report, {
  through: db.user_reports,
  foreignKey: "userId",
  // otherKey: "reportId"
});
db.report.belongsToMany(db.user, {
  through: db.user_reports,
  foreignKey: "reportId",
  // otherKey: "userId"
});


//A report has one survey but many reports can have the same survey.
//A Report Table SurveyID will have one Survey Table Survey ID Associated with it. Survey Table [PK Survey ID] -> Report Table [FK Survey ID]
db.survey.hasOne(db.report, {foreignKey: 'surveyId'});
db.report.belongsTo(db.survey, {foreignKey: 'surveyId'});

//A survey has many questions but many questions only have one survey.
//A Survey Table SurveyID will have many questions associated to it. Survey Table [PK Survey ID] -> Question Table [FK Survey ID]
db.survey.hasMany(db.question, {foreignKey: 'surveyId'});
db.question.belongsTo(db.survey, {foreignKey: 'surveyId'});

//A report has many responses but only one of itself.
db.report.hasMany(db.response, {foreignKey: 'responseId', sourceKey: "responseId"});
db.response.belongsTo(db.report, {foreignKey: 'responseId', targetKey: "responseId"});

//A question has many responses but only one of itself. 
db.question.hasMany(db.response, {foreignKey: 'questionId'});
db.response.belongsTo(db.question, {foreignKey: 'questionId'});


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});





db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
