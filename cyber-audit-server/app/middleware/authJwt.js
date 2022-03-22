//Authorization Middleware. Implements jsonwebtoken to provide authorization

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

//Working
verifyToken = (req, res, next) => {
  //NEW TOKEN
  const authHeader = req.headers['authorization']
  const bearerToken = authHeader && authHeader.split(' ')[1]
  if(bearerToken == null) return res.sendStatus(401)
  jwt.verify(bearerToken, config.secret, (err, decoded) => {
    if(err) return res.sendStatus(403) //Have token but its not valid
    req.userId = decoded.userId;
    next();
  })
};

//Checking for admin role by comparing roles and user table
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

//Checking for mod role by comparing roles and user table
isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

//Checking for mod or admin role by comparing roles and user table.
isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
