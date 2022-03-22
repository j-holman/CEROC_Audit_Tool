const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Report = sequelize.define("reports", {
      reportId: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      // surveyId: {
      //     type: Sequelize.INTEGER
      // },
      // Date: {
      //   type: Sequelize.INTEGER
      // },
      responseId: {
          type: Sequelize.UUID,
          defaultValue: DataTypes.UUIDV4,
          unique: true
      }
    });
  
    return Report;
  };