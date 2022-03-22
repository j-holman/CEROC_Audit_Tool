const db = require('../models');
const Response = db.response;
const Op = db.Sequelize.Op;
const Question = db.question

//Exporting the create function to be used in the response.routes file
exports.create = (req, res) => {
    //Checks for primaryKey Id in the request body, if no Id exists, send error. 
    if(!req.body.responseId) {
        res.status(400).send({
            message: "Cannot be empty?"
        });
        return
    }
    //Create new response object & populate with data in the HTTP request.
    const response = {
        responseId: req.body.responseId,
        questionId: req.body.questionId,
        user_response: req.body.user_response,
        mod_response: req.body.mod_response
    }

    //Save the question in the database.
    //Attach the model declared at the top of the file to the sequelize create function, passing in the resposne object created just above.
    Response.create(response)
        .then(data => { //Storing the data and sending it in an http response.
            res.send(data);
        })
        .catch(err => { //Error Checking
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a response."
            });
        });
};

exports.findByResponseId = (req, res) => {
    if(!req.query.responseId) {
        res.status(400).send({
            message: "Response ID cannot be empty."
        });
    }
    const responseId = req.query.responseId;
    const topicId = req.query.topicId;
    var condition1 = responseId ? { responseId: { [Op.eq]: `${responseId}` } } : null;
    var condition2 = topicId ? { topicId: { [Op.eq ]: `${topicId}` } } : null;
    Response.findAll({ 
        where: condition1,
        order: [
            ['questionId', 'ASC']
        ],
        include: {
            model: Question, where: condition2, attributes: ['topicId'],
            // where: { condition2 }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            message:
                err.message || "Some error occured while getting response by responseId"
        });
};

exports.findAll = (req, res) => {
    Response.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            message:
                err.message || "Some error occured while getting all responseIds"
        })
};

exports.addModResponse = (req, res) => {
    const Id = req.params.Id
    var condition = Id ? { Id: { [Op.eq]: `${Id}` } } : null;
    
    Response.update(req.body, {
        where: { Id: Id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Response was successfully updated with mod response."
                });
            } else {
                res.send({
                    message: `Cannot update response with Id=${Id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating response with Id = " + Id
            });
        });
};