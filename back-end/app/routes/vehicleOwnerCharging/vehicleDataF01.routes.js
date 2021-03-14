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

 app.post("/api/getvehicledata",
      [authJwt.verifyToken],     
 //[authJwt.verifyToken],
      controller.vehicleData);
};