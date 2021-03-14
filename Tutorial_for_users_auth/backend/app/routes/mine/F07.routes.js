const { authJwt } = require("../../middleware");
const controller = require("../../controllers/mine/F07.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

 app.post("/api/get_charging_events_by_station",
      [authJwt.verifyToken],
      controller.F07);
};
