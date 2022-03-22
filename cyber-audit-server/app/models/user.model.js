const { DataTypes } = require("sequelize");

//Module for users table in MySQL
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userId: {
      type: Sequelize.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    organizationName: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: Sequelize.STRING
  });

  return User;
};
