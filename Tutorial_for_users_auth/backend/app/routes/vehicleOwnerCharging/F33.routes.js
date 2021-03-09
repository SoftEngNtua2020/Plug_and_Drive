//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/vehicleOwnerCharging/vehicleCostAssumpF33.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 app.get("/evcharge/api/getvehiclecostassump",
      authJwt.verifyToken,     
      authJwt.isOwner,
      controller.vehicleCostAssump);
};