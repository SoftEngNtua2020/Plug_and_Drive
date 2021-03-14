//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/vehicleOwnerCharging/vehicleEventData.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

 app.post("/api/getvehicleeventdata",
      [authJwt.verifyToken],     
 //[authJwt.verifyToken],
      controller.vehicleEventData);
};