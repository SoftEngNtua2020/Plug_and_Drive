const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.get("/api/auth/signin/:username/:password", controller.signin);
};

/*
post -> plhroforia sto req.body
get -> plhroforia sto url ara to pairnv apo req.params (to get den exei body)
oti yparxei  sto url meta to ? brisketai sto req.query
*/
