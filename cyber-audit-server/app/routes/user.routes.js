//User routes that check token and role to determine access
//Can be deleted I think
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Bearer, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users/find", controller.findAll);

};
