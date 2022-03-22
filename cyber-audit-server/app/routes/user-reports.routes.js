const controller = require('../controllers/user-reports.controller');
module.exports = function(app) {
    app.post("/api/user-reports/create", controller.create);
};