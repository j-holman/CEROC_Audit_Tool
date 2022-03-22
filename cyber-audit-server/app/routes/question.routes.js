const controller = require('../controllers/question.controller');
module.exports = function(app) {
    //findAll
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Bearer, Origin, Content-Type, Accept"
        );
        next();
      });


    app.get("/api/questions/find", controller.findByTopicId);
    app.post("/api/questions/create", controller.create);
    app.put("/api/questions/update", controller.updateQuestion)
};