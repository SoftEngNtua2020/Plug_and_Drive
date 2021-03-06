//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/vehicleOwnerCharging/sessionsupd.controller");
const multer = require('multer');
const upload = multer();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

 app.post("/evcharge/api/sessionsupd",
      authJwt.verifyToken,     
      upload.single(),
      controller.SessionsUpd);
};