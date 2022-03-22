module.exports = (sequelize, Sequelize) => {
    const Topic = sequelize.define("topics", {
      topicId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      topic: {
        type: Sequelize.STRING,
      },
      description: {
          type: Sequelize.STRING
      }
    });
  
    return Topic;
  };