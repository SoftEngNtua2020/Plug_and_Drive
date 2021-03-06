const { authJwt } = require("../../middleware");
const controller = require("../../controllers/mine/SessionsPerStation.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 app.get("/api/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to",
      [authJwt.verifyToken],
      controller.SessionsPerStation);
};
