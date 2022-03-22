//Module for Question table in MySQL
module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("questions", {
      questionId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      surveyId: {
        type: Sequelize.INTEGER,
      },
      // topicId: {
      //     type: Sequelize.INTEGER
      // },
      question: {
          type: Sequelize.STRING
      }
    });
  
    return Question;
  };