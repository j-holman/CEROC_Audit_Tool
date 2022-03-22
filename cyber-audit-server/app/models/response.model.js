const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Response = sequelize.define("responses", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      responseId: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      questionId: {
        type: Sequelize.INTEGER
      },
      user_response: {
        type: Sequelize.STRING,
      },
      mod_response: {
        type: Sequelize.STRING,
      }
    });
  
    return Response;
  };