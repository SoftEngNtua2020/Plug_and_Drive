//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/vehicleOwnerPayments/F31.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 app.get("/evcharge/api/getTotalBonus",
      [authJwt.verifyToken],     
 //[authJwt.verifyToken],
      controller.Bonus);
};