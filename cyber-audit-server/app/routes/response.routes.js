const controller = require('../controllers/response.controller');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Bearer, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/responses/create", controller.create);
    app.get("/api/responses/find", controller.findAll);
    app.get("/api/responses/findByResponseId", controller.findByResponseId);
    app.put("/api/responses/update/:Id", controller.addModResponse)
}