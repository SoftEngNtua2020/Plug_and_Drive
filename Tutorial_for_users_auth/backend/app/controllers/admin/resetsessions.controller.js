const { session } = require("../../models");
const db = require("../../models");
const csv = require("csvtojson");
const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const Event = db.session;
const Program = db.program;

exports.resetsessions = (req, res, next) => {
   Event.destroy({truncate : true, cascade: false}).then(()=>{
      req.body.username = "admin";
      req.body.email = "myemailadmin@admin.com";
      req.body.password = "petrol4ever";
      req.body.roles = ["admin"];
      next();
      res.status(200).send();
   })
     .catch(err => {
      res.status(500).send({ message: err.message });
   });
 
};
