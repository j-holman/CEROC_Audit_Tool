const { user, user_reports } = require('../models');
const db = require('../models');
const Report = db.report;
const User_Report = db.user_reports;
const User = db.user;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    //Validate
    if(!req.body.surveyId) {
        res.status(400).send({
            message: "Cannot be empty"
        });
        return;
    }
    //Create
    const report = {
        surveyId: req.body.surveyId,
        userId: req.body.userId
    };

    //Save it
    Report.create(report) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating report."
            });
        });
};



exports.findLatest = (req, res) => {
    const userId = req.query.userId;
    var condition = userId ? { userId: { [Op.eq]: `${userId}` } } : null;
    Report.findAll({ where: condition, order: [['createdAt', 'DESC']], limit: 1 })
        .then(data=> {
            res.send(data);
        })
        .catch(err => {
            message:
                err.message || "Some error occurred while getting reports."
        });
}; 

exports.findAll = (req, res) => {
    Report.findAll({
        include: [
            {
                model: User, attributes:['username']
            }
        ]
    })
        .then(data=> {
            res.send(data);
        })
        .catch(err => {
            message:
                err.message || "Some error occured while getting all reports."
        });
};
