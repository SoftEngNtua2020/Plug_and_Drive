const { authJwt } = require("../../middleware");
const controller = require("../../controllers/mine/F02.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

 app.get("/api/SessionsDesigner/:designerID/:yyyymmdd_from/:yyyymmdd_to",
      [authJwt.verifyToken],
      controller.F02);
};
