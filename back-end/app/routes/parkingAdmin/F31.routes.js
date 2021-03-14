//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/parkingAdmin/F31.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

 app.post("/evcharge/api/manageChargingProgram",
      authJwt.verifyToken,     
      authJwt.isStationAdmin,
      authJwt.noDataProvided,
      controller.manageChargingProgram);
};