const db = require('../models');
const User = db.user;
const Role = db.role
const Op = db.Sequelize.Op;


//Export a findAll function that uses a HTTP request (req) and HTTP response (res)
exports.findAll = (req, res) => {
  //Attaching the Sequelize findAll fucntion to the User Model
  User.findAll({
    //Including the Model Role (table) name attribute (column) in the query
    include: [
      {
        model: Role, attributes:['name']
      }
    ]
  }).then(data => { //Storing the data and sending it in a response.
    res.send(data);
  })
  .catch(err => { //Error checking
    message:
      err.message || "Some error occured while getting users"
  })
}

exports.findUser = (req, res) => {
  const userId = req.body.userId

  User.findByPk(userId)
    .then(data => {})
}