const express = require("express");
const cors = require("cors");
const path = require('path');
const _dirname = "cyber-audit-server";
const app = express();
const jquery = require("jquery");

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

//app.use(cors(corsOptions));
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(
  "/css",
  express.static(path.join(_dirname, "node_modules/bootstrap/dist/css"))
)
app.use(
  "/js",
  express.static(path.join(_dirname, "node_modules/bootstrap/dist/js"))
)
app.use("/js", express.static(path.join(_dirname, "node_modules/jquery/dist")))

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// //force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Audit App." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/question.routes')(app);
require('./app/routes/report.routes')(app);
require('./app/routes/response.routes')(app);
// require('./app/routes/survey.routes')(app);
// require('./app/routes/topic.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


//Inital function to create roles in MySQL
function initial() {
  Role.create({
    roleId: 1,
    name: "user"
  });
 
  Role.create({
    roleId: 2,
    name: "moderator"
  });
 
  Role.create({
    roleId: 3,
    name: "admin"
  });
}