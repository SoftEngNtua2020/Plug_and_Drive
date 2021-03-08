//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/admin/manageUser.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 app.post("/evcharge/api/admin/usermod/:username/:password",
      authJwt.verifyToken,
      authJwt.isAdmin,
      controller.manageUser);
};