const { authJwt } = require("../../middleware");
const controller = require("../../controllers/VehicleDesignerInfo/F05.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept"
    );
    next();
  });

 app.post("/evcharge/api/getEnergyConsumedByEVType",
      authJwt.verifyToken,
      authJwt.isDesigner,
      controller.F05);
};
