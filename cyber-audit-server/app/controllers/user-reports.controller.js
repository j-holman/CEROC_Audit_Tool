const db = require('../models');
const User_Report = db.user_reports;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //Validate
    if(!req.body.userId) {
        res.status(400).send({
            message: "Cannot be empty"
        });
        return;
    }

    //Create User_Report Object to pass into create function
    const user_report = {
        userId: req.body.userId,
        reportId: req.body.reportId
    };

    //Call the sequelize Create functions and pass in the user_report object
    User_Report.create(user_report)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating user_report."
            });
        });
};