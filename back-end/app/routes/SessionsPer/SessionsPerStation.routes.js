const { authJwt } = require("../../middleware");
const controller = require("../../controllers/SessionsPer/SessionsPerStation.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

 app.get("/evcharge/api/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to",
      authJwt.verifyToken,
      authJwt.isStationAdminOrAdmin,
      controller.SessionsPerStation);
};
