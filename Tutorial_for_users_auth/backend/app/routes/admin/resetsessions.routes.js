//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/admin/resetsessions.controller");
const signupController = require("../../controllers/auth.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

 app.get("/evcharge/api/admin/resetsessions",
      authJwt.verifyToken,
      authJwt.isAdmin,     
      controller.resetsessions,
      signupController.manageUser);
};