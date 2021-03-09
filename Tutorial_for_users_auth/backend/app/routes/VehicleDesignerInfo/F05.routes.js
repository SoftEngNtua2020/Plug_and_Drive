const { authJwt } = require("../../middleware");
const controller = require("../../controllers/vehicleDesignerInfo/F05.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 app.post("/evcharge/api/getEnergyConsumedByEVType",
      [authJwt.verifyToken],
      controller.F05);
};
