const { authJwt } = require("../../middleware");
const controller = require("../../controllers/mine/F35.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

 app.post("/api/get_energy_consumed_by_designer_and_vehicle",
      [authJwt.verifyToken],
      controller.F35);
};
