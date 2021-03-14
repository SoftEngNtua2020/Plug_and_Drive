const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/evcharge/api/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authJwt.noDataProvided,
    controller.signup
  );

  app.post("/evcharge/api/login", authJwt.noDataProvided,controller.signin);
  app.post("/evcharge/api/logout", authJwt.verifyToken, controller.logout);
};


/*
post -> plhroforia sto req.body
get -> plhroforia sto url ara to pairnv apo req.params (to get den exei body)
oti yparxei  sto url meta to ? brisketai sto req.query
*/