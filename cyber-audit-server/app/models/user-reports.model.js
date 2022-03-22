const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const User_Reports = sequelize.define("user_report", {
        user_report_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
        // userId: {
        //     type: Sequelize.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        // },
        // reportId: {
        //     type: Sequelize.UUID,
        //     defaultValue: DataTypes.UUIDV4
        // }

    });

    return User_Reports;
}