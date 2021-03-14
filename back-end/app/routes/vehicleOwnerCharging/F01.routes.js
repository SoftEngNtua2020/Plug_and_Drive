//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/vehicleOwnerCharging/vehicleData.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

 app.get("/evcharge/api/getvehicledata",
      authJwt.verifyToken,     
      authJwt.isOwner,
      controller.vehicleData);
};