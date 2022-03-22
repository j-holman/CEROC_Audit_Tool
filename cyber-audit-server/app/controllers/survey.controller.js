const db = require('../models');
const Survey = db.survey;
const Question = db.question;
const Topic = db.topic;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    //Validate for primary key
    if(!req.body.surveyName) {
        res.status(400).send({
            message: "Survey name cannot be empty."
        });
        return;
    }

    //Create survey object to pass to sequelize create function
    const survey = {
        surveyName: req.body.surveyName,
        creator: req.body.creator
    };

    //Save it to the database with the sequelize create function
    Survey.create(survey)
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

exports.findAll = (req, res) => {
    Survey.findAll({
        include: {
            model: Question,
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            message: 
                err.message || "Some error occured while getting all surveys"
        });
}; 

