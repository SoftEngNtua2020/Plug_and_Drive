//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/vehicleOwnerPayments/F07.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

 app.get("/evcharge/api/getCummulativeCostPerCharge",
      authJwt.verifyToken,     
      authJwt.isOwner,
      controller.CummulativeCostPerCharge);
};