const { authJwt } = require("../../middleware");
const controller = require("../../controllers/stationModeratorInfo/F23.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

 app.post("/evcharge/api/getVehiclesChargingAtTime",
      authJwt.verifyToken,
      authJwt.isStationAdmin,
      controller.F23);
};
