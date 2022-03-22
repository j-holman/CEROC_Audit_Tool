module.exports = (sequelize, Sequelize) => {
    const Survey = sequelize.define("surveys", {
      surveyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      surveyName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      creator: {
        type: Sequelize.STRING
      }
    });
  
    return Survey;
  };