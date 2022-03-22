const controller = require('../controllers/survey.controller');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Bearer, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/surveys/create", controller.create);
    app.get("/api/surveys/findAll", controller.findAll)
}