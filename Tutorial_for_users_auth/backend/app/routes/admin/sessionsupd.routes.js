//const { verifySignUp } = require("../middleware");
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/admin/sessionsupd.controller");
const multer = require('multer');
var upload = multer({ inMemory: true}).single('file');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-observatory-auth, Origin, Content-Type, Accept",
    );
    next();
  });

 app.post("/evcharge/api/admin/system/sessionsupd",
      authJwt.verifyToken,
      authJwt.isAdmin,     
      upload,
      controller.SessionsUpd);
};