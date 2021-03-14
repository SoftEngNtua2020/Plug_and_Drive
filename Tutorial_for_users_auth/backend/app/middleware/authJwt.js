const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-observatory-auth"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  if (db.BANNED.includes( token )) {
    return res.status(401).send({
      message: "Unauthorized!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

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

isDesigner = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "vehicle_designer") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Vehicle Designer Role!"
      });
      return;
    });
  });
};

isOwner = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "vehicle_owner") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Vehicle Owner Role!"
      });
      return;
    });
  });
};

isStationAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "station_admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Station Admin Role!"
      });
      return;
    });
  });
};

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

isOwnerOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "vehicle_owner") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Owner or Admin Role!"
      });
    });
  });
};

isStationAdminOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "station_admin") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Station Admin or Admin Role!"
      });
    });
  });
};

noDataProvided = (req, res, next) => {
  if (!Object.keys(req.body).length){
    return res.status(402).send({
      message: "No Data Provided!"
    });
  }
  next();
  return;
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isDesigner: isDesigner,
  isOwner: isOwner,
  isStationAdmin: isStationAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isOwnerOrAdmin: isOwnerOrAdmin,
  isStationAdminOrAdmin: isStationAdminOrAdmin,
  noDataProvided: noDataProvided
};
module.exports = authJwt;
