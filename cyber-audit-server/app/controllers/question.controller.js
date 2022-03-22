const db = require('../models');
const Question = db.question;
const Topic = db.topic;
const Op = db.Sequelize.Op;

//Exporting the create function so it can be used in the question.routes file
exports.create = (req, res) => {
    //Validate by checking for an empty value of questionId in the request body. If empty send error.
    if(!req.body.questionId) {
        res.status(400).send({
            message: "Cannot be empty"
        });
        return;
    }
    //Create a new question object and populate with the data from the HTTP request.
    const question = {
        questionId: req.body.questionId,
        surveyId: req.body.surveyId,
        topicId: req.body.topicId,
        question: req.body.question
    };

    //Attach the Question model declared at the top of the file to the sequelize create function. Pass in the new question object made just above.
    Question.create(question)
        .then(data => { //Store the data and send it with an HTTP response.
            res.send(data);
        })
        .catch(err => { //Error checking
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating question."
            });
        });
};

//Exporting the findAll function to use in the question.routes file.
exports.findByTopicId = (req, res) => {
    //Create a topicId var with the value passed through the URL.
    const topicId = req.query.topicId;
    //Create a condition on topicId. Uses Sequelize Options eq (equal)
    //condition is set to either topicId or null 
    var condition = topicId ? { topicId: { [Op.eq]: `${topicId}` } } : null;
    //Attach the sequelize findAll function to the Question Model declared at the top of this file.
    //Pass in the condtion. findAll where topicId = number passed from front end.
    Question.findAll({ 
        where: condition,
        include: {
            model: Topic, attributes: ['topicId', 'topic']
        }
    })
        .then(data=> { //Store data and send in HTTP response
            res.send(data);
        })
        .catch(err => { //Error Checking
            message:
                err.message || "Some error occurred while getting questions."
        });
};  

exports.updateQuestion = (req, res) => {
    const questionId = req.query.questionId;
    console.log(questionId);

    Question.update(req.body, {
        where: { questionId: questionId }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Question was successfully updated"
                });
            } else {
                res.send({
                    message: `Cannot update question with questionId=${questionId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error while updating question with questionId=${questionId}.`
            });
        });
};