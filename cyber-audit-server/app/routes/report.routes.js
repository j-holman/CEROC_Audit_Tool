const controller = require('../controllers/report.controller');
module.exports = function(app) {
    //findAll
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Bearer, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/reports/find", controller.findLatest);
    app.get("/api/reports/findAll", controller.findAll);
    app.post("/api/reports/create", controller.create);

};