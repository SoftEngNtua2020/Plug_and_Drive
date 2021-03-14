//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/admin/resetsessions.controller");
const signupController = require("../../controllers/initAdmin.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept",
    );
    next();
  });

 app.post("/evcharge/api/admin/resetsessions",
      authJwt.verifyToken,
      authJwt.isAdmin,
      controller.resetsessions,
      signupController.signup);
};