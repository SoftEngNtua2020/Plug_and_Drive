const { authJwt } = require("../../middleware");
const controller = require("../../controllers/SessionsPer/SessionsPerPoint.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 app.get("/evcharge/api/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to",
      authJwt.verifyToken,
      authJwt.isStationAdminOrAdmin,
      controller.SessionsPerPoint);
};
